import React, { useCallback, useContext, useEffect, useState } from 'react';

import { getMessageCallStatus, getMessageFromReceipt } from '../lib/amb';
import {
  fetchToAmount,
  fetchTokenLimits,
  fetchToToken,
  transferTokens,
} from '../lib/bridge';
import { ownerAddress } from '../lib/constants';
import {
  defaultDailyLimit,
  defaultMaxPerTx,
  defaultMinPerTx,
  getDefaultToken,
  isxDaiChain,
  parseValue,
  uniqueTokens,
} from '../lib/helpers';
import {
  approveToken,
  fetchAllowance,
  fetchTokenBalanceWithProvider,
} from '../lib/token';
import { fetchTokenList } from '../lib/tokenList';
import { Web3Context } from './Web3Context';

const POLLING_INTERVAL = 2000;

export const BridgeContext = React.createContext({});

export const BridgeProvider = ({ children }) => {
  const { ethersProvider, account, providerNetwork } = useContext(Web3Context);
  const [isOwner, setIsOwner] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [allowed, setAllowed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState();
  const [txHash, setTxHash] = useState();
  const [receipt, setReceipt] = useState();
  const [totalConfirms, setTotalConfirms] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [amountInput, setAmountInput] = useState('');
  const [fromBalance, setFromBalance] = useState();
  const [toBalance, setToBalance] = useState();
  const [tokenLimits, setTokenLimits] = useState();
  const setAmount = useCallback(
    async amount => {
      setFromAmount(amount);
      const gotToAmount = await fetchToAmount(fromToken, toToken, amount);
      setToAmount(gotToAmount);
      if (isxDaiChain(fromToken.chainId)) {
        setAllowed(true);
      } else {
        const gotAllowance = await fetchAllowance(
          fromToken.chainId,
          account,
          fromToken.address,
          ethersProvider,
        );
        setAllowed(window.BigInt(gotAllowance) >= window.BigInt(amount));
      }
    },
    [account, fromToken, toToken, ethersProvider],
  );

  const setToken = useCallback(
    async token => {
      setLoading(true);
      setFromToken(token);
      setTokenLimits({
        minPerTx: defaultMinPerTx(isxDaiChain(token.chainId), token.decimals),
        maxPerTx: defaultMaxPerTx(token.decimals),
        dailyLimit: defaultDailyLimit(token.decimals),
      });
      // console.log(
      //   '===limits1 = ',
      //   defaultMinPerTx(isxDaiChain(token.chainId), token.decimals).toString(),
      // );
      if (
        providerNetwork &&
        (token.chainId === providerNetwork.chainId ||
          (token.chainId == 56 && providerNetwork.chainId == 86))
      ) {
        fetchTokenLimits(token, ethersProvider).then(limits => {
          setTokenLimits(limits);
          // console.log('===limits2 = ', limits.minPerTx.toString());
        });
      }
      setAmountInput('');
      setFromAmount(0);
      setAllowed(true);
      setToToken();
      const gotToToken = await fetchToToken(token);
      setToToken(gotToToken);
      setToAmount(0);
      setLoading(false);
    },
    [ethersProvider, providerNetwork],
  );

  const setDefaultToken = useCallback(
    chainId => {
      // setFromToken();
      // setToToken();
      setToken(getDefaultToken(chainId));
    },
    [setToken],
  );

  const approve = useCallback(async () => {
    setLoading(true);
    try {
      const approveAmount = parseValue('1000000000', fromToken.decimals);
      // console.log('approveAmount = ', approveAmount);
      // await approveToken(ethersProvider, fromToken, fromAmount);
      await approveToken(ethersProvider, fromToken, approveAmount);
      setAllowed(true);
    } catch (error) {
      // eslint-disable-next-line
      console.log({ approveError: error });
    }
    setLoading(false);
  }, [/* fromAmount, */ fromToken, ethersProvider]);

  const transfer = useCallback(async () => {
    setLoading(true);
    try {
      const [tx, numConfirms] = await transferTokens(
        ethersProvider,
        fromToken,
        fromAmount,
      );
      setTotalConfirms(numConfirms);
      setTxHash(tx.hash);
    } catch (error) {
      setTxHash();
      setLoading(false);
      setLoadingText();
      // eslint-disable-next-line
      console.log({ transferError: error });
    }
  }, [fromToken, ethersProvider, fromAmount]);

  useEffect(() => {
    setIsOwner(account === ownerAddress);
    // console.log('is owner', account, ownerAddress);
    const subscriptions = [];
    const unsubscribe = () => {
      subscriptions.forEach(s => {
        clearTimeout(s);
      });
    };
    if (!txHash) return unsubscribe;

    const { chainId } = fromToken;
    let message = null;
    let status = false;

    const getReceipt = async () => {
      try {
        const txReceipt = await ethersProvider.getTransactionReceipt(txHash);
        setReceipt(txReceipt);

        if (txReceipt) {
          message = getMessageFromReceipt(chainId, txReceipt);
          if (txReceipt.confirmations > totalConfirms) {
            setLoadingText('Waiting for Execution');
          }
        }

        if (message) {
          status = await getMessageCallStatus(chainId, message);
        }

        if (status) {
          setTxHash();
          setReceipt();
          await setToken(fromToken);
          // console.log("===formToken = ", fromToken);
          fetchTokenBalanceWithProvider(
            ethersProvider,
            fromToken,
            account,
          ).then(b => setFromBalance(b));
          setLoading(false);
          setLoadingText();
        }

        if (!txReceipt || !message || !status) {
          const timeoutId = setTimeout(() => getReceipt(), POLLING_INTERVAL);
          subscriptions.push(timeoutId);
        }
      } catch (error) {
        setTxHash();
        setReceipt();
        setLoading(false);
        setLoadingText();
        // eslint-disable-next-line
        console.log({ receiptError: error });
      }
    };

    // unsubscribe from previous polls
    unsubscribe();

    getReceipt();
    // unsubscribe when unmount component
    return unsubscribe;
  }, [txHash, totalConfirms, ethersProvider, setToken, fromToken, account]);

  const setDefaultTokenList = useCallback(
    async (chainId, customTokens) => {
      if (!account || !ethersProvider) return;
      let detectedChainId = (await ethersProvider.getNetwork()).chainId;
      if (detectedChainId == 86) detectedChainId = 56;
      const networkMismatch = chainId !== detectedChainId;
      if (networkMismatch) return;

      setLoading(true);
      try {
        let baseTokenList = await fetchTokenList(chainId);
        // console.log('baseTokenList = ', baseTokenList);
        baseTokenList = baseTokenList.filter(
          token => token.symbol != 'SHAKE' && token.symbol != 'MILK2',
        );
        // console.log('baseTokenList = ', baseTokenList);
        const customTokenList = uniqueTokens(
          baseTokenList.concat(
            customTokens.filter(token => token.chainId === chainId),
          ),
        );
        const tokenListWithBalance = await Promise.all(
          customTokenList.map(async token => ({
            ...token,
            balance: await fetchTokenBalanceWithProvider(
              ethersProvider,
              token,
              account,
            ),
          })),
        );
        const sortedTokenList = tokenListWithBalance.sort(function checkBalance(
          { balance: balanceA },
          { balance: balanceB },
        ) {
          return parseInt(
            window.BigInt(balanceB) - window.BigInt(balanceA),
            10,
          );
        });
        setTokenList(sortedTokenList);
      } catch (error) {
        // eslint-disable-next-line
        console.log({ fetchTokensError: error });
      }
      setLoading(false);
    },
    [account, ethersProvider],
  );

  return (
    <BridgeContext.Provider
      value={{
        fromAmount,
        toAmount,
        setAmount,
        fromToken,
        toToken,
        setToken,
        setDefaultToken,
        allowed,
        approve,
        transfer,
        loading,
        loadingText,
        txHash,
        receipt,
        totalConfirms,
        tokenList,
        setDefaultTokenList,
        amountInput,
        setAmountInput,
        fromBalance,
        setFromBalance,
        toBalance,
        setToBalance,
        tokenLimits,
        isOwner,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
};

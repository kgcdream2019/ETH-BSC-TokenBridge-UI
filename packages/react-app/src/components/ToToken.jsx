import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';

import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { networkOptions } from '../lib/constants';
import { formatValue } from '../lib/helpers';
import { fetchTokenBalance } from '../lib/token';
import { Logo } from './Logo';

export const ToToken = () => {
  const { account } = useContext(Web3Context);
  const {
    toToken,
    toAmount: amount,
    toBalance: balance,
    setToBalance,
  } = useContext(BridgeContext);
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    // console.log('========= token == ', toToken);
    const storageNetwork = parseInt(
      window.localStorage.getItem('chosenNetwork'),
      10,
    );
    if (!account) {
      setToBalance();
    }
    // console.log(
    //   '============= toToken == ',
    //   toToken,
    //   '   networkOptions = ',
    //   networkOptions,
    // );
    if (
      toToken &&
      account &&
      toToken.chainId != networkOptions[storageNetwork].value
    ) {
      // setToBalance();
      fetchTokenBalance(toToken, account).then(b => {
        setToBalance(b);
        // console.log('--------- balance: ', toToken.name, b, account);
      });
    }
  }, [toToken, account, setToBalance]);

  return (
    <Flex
      align="center"
      m={{ base: 2, lg: 0 }}
      ml={{ base: 2, lg: -6 }}
      position="relative"
      borderRadius="0.25rem"
      border={{ base: '1px solid #DAE3F0', lg: 'none' }}
      minH={8}
    >
      {!smallScreen && (
        <svg width="100%" viewBox="0 0 381 94" fill="none">
          <path
            d="M20.806 4.484A8 8 0 0127.992 0H373a8 8 0 018 8v78a8 8 0 01-8 8H27.992a8 8 0 01-7.186-4.484l-19.085-39a8 8 0 010-7.032l19.085-39z"
            fill="rgb(43, 47, 54)"
            stroke="rgb(143, 147, 154)"
          />
        </svg>
      )}
      {toToken && (
        <Flex
          position={{ base: 'relative', lg: 'absolute' }}
          h={{ base: 'auto', lg: '100%' }}
          w="100%"
          direction="column"
          py={4}
          pr={4}
          pl={{ base: 4, lg: 12 }}
        >
          <Flex
            justify="space-between"
            align={{ base: 'stretch', sm: 'center' }}
            mb={2}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Flex align="center">
              <Flex
                justify="center"
                align="center"
                background="white"
                border="1px solid #DAE3F0"
                w={8}
                h={8}
                overflow="hidden"
                borderRadius="50%"
                mr={2}
              >
                <Logo uri={toToken.logoURI} reverseFallback />
              </Flex>
              <Text fontSize="lg" fontWeight="bold" color="rgb(230, 232, 236)">
                {toToken.name}
              </Text>
            </Flex>
            {balance >= 0 && (
              <Text color="grey" mt={{ base: 2, lg: 0 }}>
                {`Balance: ${formatValue(balance, toToken.decimals)}`}
              </Text>
            )}
          </Flex>
          <Flex align="flex-end" flex={1}>
            <Text fontWeight="bold" fontSize="2xl" color="rgb(230, 232, 236)">
              {formatValue(amount, toToken.decimals)}
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

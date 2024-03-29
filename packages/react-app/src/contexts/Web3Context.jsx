import WalletConnectProvider from '@walletconnect/web3-provider';
import ethers from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { CONFIG } from '../config';
import { networkOptions } from '../lib/constants';
// import { useHistory } from 'react-router-dom';

export const Web3Context = React.createContext({});

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: CONFIG.infuraId,
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export const Web3Provider = ({ children }) => {
  const [providerNetwork, setProviderNetwork] = useState();
  const [chosenNetwork, setChosenNetwork] = useState(networkOptions[0]);
  const [ethersProvider, setEthersProvider] = useState();
  const [account, setAccount] = useState();
  const [networkMismatch, setNetworkMismatch] = useState(false);
  // const history = useHistory();

  const connectWeb3 = useCallback(async () => {
    try {
      const modalProvider = await web3Modal.connect();

      const web3Provider = new Web3(modalProvider);
      const provider = new ethers.providers.Web3Provider(
        web3Provider.currentProvider,
      );
      setEthersProvider(provider);
      const network = await provider.getNetwork();
      console.log('network = ', network);
      // bug fix for trustwallet
      // if(network.chainId == 86)
      // {
      //   network.chainId = 56;
      // }
      // provider.network = network;

      setProviderNetwork(network);
      const signer = provider.getSigner();
      const gotAccount = await signer.getAddress();
      setAccount(gotAccount);
    } catch (error) {
      // eslint-disable-next-line
      console.log({ web3ModalError: error });
    }
  }, []);

  useEffect(() => {
    if (
      providerNetwork &&
      chosenNetwork &&
      (providerNetwork.chainId === chosenNetwork.value ||
        (providerNetwork.chainId == 86 && chosenNetwork.value == 56))
    ) {
      setNetworkMismatch(false);
    } else {
      setNetworkMismatch(true);
    }
  }, [chosenNetwork, providerNetwork]);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on /* && !active && !error && !suppress */) {
      const handleChainChanged = () => {
        // history.push('/');
        window.location.reload();
      };

      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          // history.push('/');
          window.location.reload();
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      // return () => {
      //   if (ethereum.removeListener) {
      //     ethereum.removeListener('chainChanged', handleChainChanged)
      //     ethereum.removeListener('accountsChanged', handleAccountsChanged)
      //   }
      // }
    }
    // return
  }, []);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setAccount();
    setEthersProvider();
    setProviderNetwork();
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWeb3().catch(error => {
        // eslint-disable-next-line
        console.error({ web3ModalError: error });
      });
    }
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        ethersProvider,
        connectWeb3,
        disconnect,
        providerNetwork,
        network: chosenNetwork,
        setNetwork: setChosenNetwork,
        account,
        networkMismatch,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

import {
  Button,
  Flex,
  Image,
  Input,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import DropDown from '../assets/drop-down.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { networkOptions, ownerAddress } from '../lib/constants';
import { formatValue, parseValue } from '../lib/helpers';
import { fetchTokenBalanceWithProvider } from '../lib/token';
import { ErrorModal } from './ErrorModal';
import { Logo } from './Logo';
import { SelectTokenModal } from './SelectTokenModal';

export const FromToken = () => {
  const {
    ethersProvider,
    providerNetwork,
    network,
    networkMismatch,
    account,
  } = useContext(Web3Context);
  console.log('providerNetwork = ', providerNetwork);
  console.log('networkMismatch = ', networkMismatch);
  const {
    fromToken: token,
    fromBalance: balance,
    setFromBalance: setBalance,
    setAmount,
    amountInput: input,
    setAmountInput: setInput,
  } = useContext(BridgeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const onClick = () => {
    if (!ethersProvider) {
      setMessage('Please connect wallet');
    } else if (networkMismatch) {
      setMessage(`Please switch wallet to ${network.name}`);
    } else {
      setMessage();
    }
    onOpen();
  };
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    setIsOwner(account === ownerAddress);
    const storageNetwork = parseInt(
      window.localStorage.getItem('chosenNetwork'),
      10,
    );
    if (!account) {
      setBalance();
    }
    if (
      token &&
      account &&
      providerNetwork &&
      (providerNetwork.chainId === token.chainId ||
        (providerNetwork.chainId == 86 && token.chainId == 56)) &&
      token.chainId == networkOptions[storageNetwork].value
    ) {
      // console.log('FromToken ####', token);
      setBalance();
      fetchTokenBalanceWithProvider(ethersProvider, token, account).then(b =>
        setBalance(b),
      );
    }
  }, [token, account, setBalance, ethersProvider, providerNetwork]);

  return (
    <Flex
      align="center"
      m={{ base: 2, lg: 0 }}
      mr={{ base: 2, lg: -6 }}
      position="relative"
      borderRadius="0.25rem"
      border={{ base: '1px solid #DAE3F0', lg: 'none' }}
      minH={8}
    >
      {message && (
        <ErrorModal message={message} isOpen={isOpen} onClose={onClose} />
      )}
      {!message && (
        <SelectTokenModal onClose={onClose} isOpen={isOpen} isOwner={isOwner} />
      )}
      {!smallScreen && (
        <svg width="100%" viewBox="0 0 381 94" fill="none">
          <path
            d="M359.745 4.703A7.5 7.5 0 00353.008.5H8A7.5 7.5 0 00.5 8v78A7.5 7.5 0 008 93.5h345.008a7.5 7.5 0 006.737-4.203l19.085-39a7.499 7.499 0 000-6.594l-19.085-39z"
            fill="rgb(43, 47, 54)"
            stroke="rgb(143, 147, 154)"
          />
        </svg>
      )}
      {token && (
        <Flex
          position={{ base: 'relative', lg: 'absolute' }}
          h={{ base: 'auto', lg: '100%' }}
          w="100%"
          direction="column"
          py={4}
          pl={4}
          pr={{ base: 4, lg: 12 }}
        >
          <Flex
            justify="space-between"
            align={{ base: 'stretch', sm: 'center' }}
            mb={2}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Flex align="center" cursor="pointer" onClick={onClick}>
              <Flex
                justify="center"
                align="center"
                background="white"
                border="1px solid #DAE3F0"
                boxSize={8}
                overflow="hidden"
                borderRadius="50%"
              >
                <Logo uri={token.logoURI} />
              </Flex>
              <Text
                fontSize="lg"
                fontWeight="bold"
                mx={2}
                color="rgb(230, 232, 236)"
              >
                {token.name}
              </Text>
              <Image src={DropDown} cursor="pointer" />
            </Flex>
            {balance >= 0 && (
              <Text color="grey" mt={{ base: 2, lg: 0 }}>
                {`Balance: ${formatValue(balance, token.decimals)}`}
              </Text>
            )}
          </Flex>
          <Flex align="flex-end" flex={1}>
            <Input
              flex={1}
              variant="unstyled"
              type="number"
              color="rgb(230, 232, 236)"
              value={input}
              placeholder="0.000"
              textAlign="left"
              fontWeight="bold"
              onChange={e => {
                setInput(e.target.value);
                setAmount(parseValue(e.target.value, token.decimals));
              }}
              fontSize="2xl"
            />
            <Button
              ml={2}
              color="rgb(230, 232, 236)"
              bg="#414344"
              size="sm"
              fontSize="sm"
              fontWeight="normal"
              _hover={{ bg: 'rgb(30,34,36)' }}
              onClick={() => {
                setInput(formatValue(balance, token.decimals));
                setAmount(balance);
              }}
            >
              Max
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

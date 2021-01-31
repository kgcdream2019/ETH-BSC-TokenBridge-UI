import {
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { utils } from 'ethers';
import React, { useContext, useRef, useState } from 'react';

import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { uniqueTokens } from '../lib/helpers';
import { fetchTokenDetails } from '../lib/token';

export const CustomTokenModal = ({ isOwner, isOpen, onClose, onBack }) => {
  const { setToken } = useContext(BridgeContext);
  const { network } = useContext(Web3Context);
  const [customToken, setCustomToken] = useState({
    address: '',
    name: '',
    symbol: '',
    decimals: 0,
    chainId: network.value,
    logo: '',
  });

  const [addressInput, setAddressInput] = useState('');
  const [addressInvalid, setAddressInvalid] = useState(false);

  const onClick = () => {
    onClose();
    addCustomToken();
  };

  const addCustomToken = () => {
    let localTokensList = window.localStorage.getItem('customTokens3');
    let customTokensList = [];

    if (!localTokensList) {
      localTokensList = [];
    }
    if (localTokensList.length < 1) {
      customTokensList = localTokensList.concat([customToken]);
    } else {
      customTokensList = JSON.parse(localTokensList);
      customTokensList.push(customToken);
    }
    customTokensList = uniqueTokens(customTokensList);
    window.localStorage.setItem(
      'customTokens3',
      JSON.stringify(customTokensList),
    );
    setToken(customToken);
  };

  const handleChange = async e => {
    if (e.target.id === 'address') {
      setAddressInput(e.target.value);
      if (utils.isAddress(e.target.value)) {
        const tokenAddress = e.target.value;
        fetchTokenDetails(network.value, tokenAddress)
          .then(tokenDetails => {
            setAddressInvalid(false);
            setCustomToken({
              ...customToken,
              ...tokenDetails,
            });
          })
          .catch(() => setAddressInvalid(true));
      } else {
        setAddressInvalid(true);
      }
    } else {
      setCustomToken({ ...customToken, [e.target.id]: e.target.value });
    }
  };

  const initialRef = useRef();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="rgb(11, 14, 17) 0px 0px 16px"
          borderRadius="1rem"
          maxW="30rem"
          mx={{ base: 12, lg: 0 }}
          background="rgb(30, 32, 38)"
        >
          <ModalHeader p={6}>
            <Text color="rgb(230,232,236)">Add Custom Token</Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            // _focus={{ border: 'none', outline: 'none' }}
          />
          <ModalBody px={6} py={0}>
            <Flex flexDirection="column">
              <Text mb={2} color="rgb(230,232,236)">
                Token Contract Address
              </Text>
              <InputGroup mb={4} borderColor="#DAE3F0">
                <Input
                  id="address"
                  placeholder="0xAbC ..."
                  size="sm"
                  onChange={handleChange}
                  _placeholder={{ color: 'grey' }}
                  value={addressInput}
                  ref={initialRef}
                  isInvalid={addressInvalid}
                  color="rgb(230,232,236)"
                />
              </InputGroup>
              <Text mb={2} color="rgb(230,232,236)">
                Token Symbol
              </Text>
              <InputGroup mb={4} borderColor="#DAE3F0">
                <Input
                  id="symbol"
                  placeholder="ETH"
                  size="sm"
                  onChange={handleChange}
                  _placeholder={{ color: 'grey' }}
                  value={customToken.symbol}
                  color="rgb(230,232,236)"
                />
              </InputGroup>
              <Text mb={2} color="rgb(230,232,236)">
                Decimals of Precision
              </Text>
              <InputGroup mb={4} borderColor="#DAE3F0">
                <Input
                  id="decimals"
                  placeholder="18"
                  size="sm"
                  onChange={handleChange}
                  _placeholder={{ color: 'grey' }}
                  value={customToken.decimals}
                  color="rgb(230,232,236)"
                />
              </InputGroup>
            </Flex>
          </ModalBody>
          <ModalFooter p={6}>
            <Flex
              w="100%"
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Button
                px={12}
                onClick={onBack}
                background="background"
                _hover={{ background: '#bfd3f2' }}
                color="#687D9D"
              >
                Back
              </Button>
              {isOwner && (
                <Button
                  px={12}
                  onClick={onClick}
                  colorScheme="blue"
                  mt={{ base: 2, md: 0 }}
                >
                  Add Token
                </Button>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

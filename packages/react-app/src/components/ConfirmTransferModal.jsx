import {
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import TransferImage from '../assets/confirm-transfer.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { formatValue, isxDaiChain } from '../lib/helpers';
// import { DaiWarning, isERC20DaiAddress } from './DaiWarning';

export const ConfirmTransferModal = ({ isOpen, onClose }) => {
  const { fromToken, toToken, fromAmount, toAmount, transfer } = useContext(
    BridgeContext,
  );
  const [fee, setFee] = useState(0);

  const isxDai = isxDaiChain(fromToken.chainId);
  const fromAmt = formatValue(fromAmount, fromToken.decimals);
  const fromUnit = fromToken.symbol + (isxDai ? ' on BSC' : '');
  const toAmt = formatValue(toAmount, toToken.decimals);
  const toUnit = toToken.symbol + (isxDai ? '' : ' on BSC');
  // const isERC20Dai = isERC20DaiAddress(fromToken);
  useEffect(() => {
    setFee(
      isxDai
        ? `${Number(
            formatValue(
              Number(fromAmount) - Number(toAmount),
              toToken.decimals,
            ),
          ).toFixed(2) 
            } ${ 
            toToken.symbol}`
        : `${((Number(fromAmount) - Number(toAmount)) * 100) /
            Number(fromAmount).toFixed(2) 
            }%`,
    );
  }, [fromAmount, toAmount]);
  const onClick = () => {
    transfer();
    onClose();
  };
  const smallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="rgb(11, 14, 17) 0px 0px 16px"
          borderRadius="1rem"
          maxW="30rem"
          mx={{ base: 12, lg: 0 }}
          background="rgb(30, 32, 38)"
        >
          <ModalHeader p={6}>
            {/* {isERC20Dai && <DaiWarning />} */}
            <Text color="rgb(230,232,234)">Confirm Transfer</Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            // _focus={{ border: 'none', outline: 'none' }}
          />
          <ModalBody px={6} py={0}>
            <Flex align="center" direction={{ base: 'column', md: 'row' }}>
              <Flex
                justify="center"
                align="center"
                direction="column"
                border="1px solid #DAE3F0"
                borderRadius="0.25rem"
                w="10rem"
                h="4rem"
                px={4}
              >
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  color="rgb(230,232,234)"
                >
                  {fromAmt}
                </Text>
                <Text textAlign="center" fontSize="sm" color="rgb(230,232,234)">
                  {fromUnit}
                </Text>
              </Flex>
              <Flex
                flex={1}
                minH="5rem"
                h="5rem"
                w={{ base: '10rem', md: 'auto' }}
                justify="center"
                align="center"
                position="relative"
              >
                <Divider
                  color="#DAE3F0"
                  orientation={smallScreen ? 'vertical' : 'horizontal'}
                />
                <Image
                  src={TransferImage}
                  position="absolute"
                  left="50%"
                  top="50%"
                  transform={{
                    base: 'translate(-50%, -50%) rotate(90deg)',
                    md: 'translate(-50%, -50%)',
                  }}
                />
              </Flex>
              <Flex
                justify="center"
                align="center"
                direction="column"
                border="1px solid #DAE3F0"
                borderRadius="0.25rem"
                w="10rem"
                h="4rem"
                px={4}
              >
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  color="rgb(230,232,234)"
                >
                  {toAmt}
                </Text>
                <Text textAlign="center" fontSize="sm" color="rgb(230,232,234)">
                  {toUnit}
                </Text>
              </Flex>
            </Flex>
            <Flex
              align="center"
              fontSize="sm"
              justify="center"
              mt={4}
              color="rgb(230,232,234)"
            >
              {`Bridge Fees ${fee}`}
            </Flex>
            <Divider color="#DAE3F0" my={4} />
            <Flex w="100%" fontSize="sm" color="grey" align="center">
              {`Please confirm that you would like to send ${fromAmt} and receive ${toAmt}.`}
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
                onClick={onClose}
                background="background"
                _hover={{ background: '#bfd3f2' }}
                color="#687D9D"
              >
                Cancel
              </Button>
              <Button
                px={12}
                onClick={onClick}
                colorScheme="blue"
                mt={{ base: 2, md: 0 }}
              >
                Continue
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

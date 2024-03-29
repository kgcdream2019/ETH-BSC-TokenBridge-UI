import {
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Archive } from 'react-feather';
import ReactLoading from 'react-loading';
import styled from 'tachyons-components';

import LoadingImage from '../assets/loading.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { getMonitorUrl } from '../lib/helpers';
import { ProgressRing } from './ProgressRing';

export const Article = styled('div')`
w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;
export const Section = styled('div')`
flex flex-wrap content-center justify-center w-100 h-100 bg-blue`;

const getTransactionString = hash => {
  if (!hash) return 'here';
  const len = hash.length;
  return `${hash.substr(0, 6)}...${hash.substr(len - 4, len - 1)}`;
};

export const LoadingModal = ({ loadingProps }) => {
  const {
    loading,
    loadingText,
    fromToken,
    txHash,
    receipt,
    totalConfirms,
  } = useContext(BridgeContext);

  return (
    <Modal
      isOpen={loading || loadingProps}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay background="modalBG" transition="background 0s">
        {(!receipt || totalConfirms === 0) && (
          <ModalContent background="none" boxShadow="none" borderRadius="0">
            <Flex direction="column" align="center" justify="center">
              <Image src={LoadingImage} mb={4} />
              {/* <Text color="white" fontWeight="bold">
                Loading ...
              </Text> */}
              <ReactLoading type="bars" color="#fff" />
            </Flex>
          </ModalContent>
        )}
        {receipt && totalConfirms && (
          <ModalContent
            boxShadow="rgb(11, 14, 17) 0px 0px 16px"
            borderRadius="full"
            mx={{ base: 12, lg: 0 }}
            maxW={{ base: '20rem', md: '25rem' }}
            background="rgb(30, 32, 38)"
          >
            <ModalBody p={4}>
              <Flex
                align={{ base: 'center', md: 'stretch' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <Flex
                  height="5rem"
                  width="5rem"
                  align="center"
                  justify="center"
                  border="5px solid #eef4fd"
                  borderRadius="50%"
                  mr={4}
                  position="relative"
                >
                  <Text color="white">{`${
                    receipt.confirmations < totalConfirms
                      ? receipt.confirmations
                      : totalConfirms
                  }/${totalConfirms}`}</Text>
                  <Flex
                    position="absolute"
                    justify="center"
                    align="center"
                    color="blue.500"
                  >
                    <ProgressRing
                      radius={47.5}
                      stroke={5}
                      progress={
                        receipt.confirmations < totalConfirms
                          ? receipt.confirmations
                          : totalConfirms
                      }
                      totalProgress={totalConfirms}
                    />
                  </Flex>
                </Flex>
                <Flex
                  flex={1}
                  direction="column"
                  align={{ base: 'stretch', md: 'center' }}
                >
                  <Text width="100%" color="rgb(230,232,234)">
                    {`${loadingText || 'Waiting for Block Confirmations'}...`}
                  </Text>
                  <Text width="100%" color="grey">
                    {'Monitor at ALM '}
                    <Link
                      href={getMonitorUrl(fromToken.chainId, txHash)}
                      rel="noreferrer noopener"
                      target="_blank"
                      color="blue.500"
                    >
                      {getTransactionString(txHash)}
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        )}
      </ModalOverlay>
    </Modal>
  );
};

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { ErrorIcon } from '../icons/ErrorIcon';

export const ErrorModal = ({ message, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="rgb(11, 14, 17) 0px 0px 16px"
          borderRadius={{ base: '1rem', md: 'full' }}
          mx={{ base: 12, lg: 0 }}
          maxW={{ base: '20rem', md: '25rem' }}
          background="rgb(30, 32, 38)"
        >
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            // _focus={{ border: 'none', outline: 'none' }}
          />
          <ModalBody p={4}>
            <Flex
              align={{ base: 'center', md: 'stretch' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <ErrorIcon size={20} mr={4} color="red.500" />
              <Flex flex={1} direction="column">
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  width="100%"
                  color="white"
                >
                  Error
                </Text>
                <Text width="100%" color="grey">
                  {message || ''}
                </Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

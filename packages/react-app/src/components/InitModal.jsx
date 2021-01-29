import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

export const InitModal = ({ isOpen, onClose }) => {
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
          <ModalHeader p={6} textAlign="center">
            <Text color="rgb(230,232,236)">
              I hereby confirm I&apos;ve read the following Articles:
            </Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            // _focus={{ border: 'none', outline: 'none' }}
          />
          <ModalBody px={6} py={0}>
            <Flex style={{ textAlign: 'justify' }}>
              <Text mb={2} color="rgb(230,232,236)">
                1. Fees & Minimum Amounts for JustLiquidity Universal Token
                Bridge &nbsp;&nbsp;&nbsp;
                <Link
                  style={{}}
                  color="blue.500"
                  href="https://bit.ly/3t6HZ5R"
                  rel="noreferrer noopener"
                  target="_blank"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Read HERE
                </Link>
              </Text>
            </Flex>
            <Flex style={{ textAlign: 'justify' }}>
              <Text mb={2} color="rgb(230,232,236)">
                2. How to get your Token listed on the Token
                Bridge?&nbsp;&nbsp;&nbsp;
                <Link
                  color="blue.500"
                  href="https://bit.ly/3iV6rmb"
                  rel="noreferrer noopener"
                  target="_blank"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Read HERE
                </Link>
              </Text>
            </Flex>
            <Flex style={{ textAlign: 'justify' }}>
              <Text mb={2} color="rgb(230,232,236)">
                Contact Support:&nbsp;&nbsp;&nbsp;
                <Link
                  color="blue.500"
                  href="https://bit.ly/2Ym6pu6b"
                  rel="noreferrer noopener"
                  target="_blank"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Read HERE
                </Link>
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter p={6}>
            <Flex
              w="100%"
              justify="center"
              align={{ base: 'center', md: 'center' }}
              direction={{ base: 'row', md: 'row' }}
            >
              <Button
                px={12}
                onClick={onClose}
                background="background"
                _hover={{ background: '#bfd3f2' }}
                color="#687D9D"
              >
                OK
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

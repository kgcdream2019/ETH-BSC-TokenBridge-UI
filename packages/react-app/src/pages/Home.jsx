import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { BridgeTokens } from '../components/BridgeTokens';
import { InitModal } from '../components/InitModal';

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <>
      <InitModal isOpen={isOpen} onClose={onClose} />
      <BridgeTokens />
    </>
  );
};

import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { BridgeTokens } from '../components/BridgeTokens';
import { InitModal } from '../components/InitModal';

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const init = window.sessionStorage.getItem('initStart');
    if (!init) {
      onOpen();
      window.sessionStorage.setItem('initStart', true);
    }
  }, [onOpen]);
  return (
    <>
      <InitModal isOpen={isOpen} onClose={onClose} />
      <BridgeTokens />
    </>
  );
};

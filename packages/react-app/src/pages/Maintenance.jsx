import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { BridgeTokens } from '../components/BridgeTokens';
import { InitModal } from '../components/InitModal';

export const Maintenance = () => {
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
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '40px',
          color: 'white',
        }}
      >
        Maintenance Period Until{' '}
        <span style={{ color: 'green', paddingLeft: '20px' }}>
          {' '}
          2021-04-04 16:35 UTC{' '}
        </span>
      </div>
    </>
  );
};

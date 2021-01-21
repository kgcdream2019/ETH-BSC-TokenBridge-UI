import React, { useState } from 'react';

import { CustomTokenModal } from './CustomTokenModal';
import { TokenSelectorModal } from './TokenSelectorModal';

export const SelectTokenModal = ({ isOpen, onClose, isOwner }) => {
  const [custom, setCustom] = useState(false);
  return (
    <>
      {!custom && (
        <TokenSelectorModal
          isOwner={isOwner}
          isOpen={isOpen}
          onClose={onClose}
          onCustom={() => setCustom(true)}
        />
      )}
      {custom && (
        <CustomTokenModal
          isOwner={isOwner}
          isOpen={isOpen}
          onClose={onClose}
          onBack={() => setCustom(false)}
        />
      )}
    </>
  );
};

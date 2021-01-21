import React from 'react';

import { CONFIG } from '../config';
import { NetworkIcon } from '../icons/NetworkIcon';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

// export const networkOptions = [ // prod
//   {
//     value: 100,
//     key: 0,
//     bridge: { chainId: 1, name: 'ETH Mainnet' },
//     label: 'xDai',
//     name: 'xDai Chain',
//     icon: <NetworkIcon />,
//   },
//   {
//     value: 1,
//     key: 1,
//     bridge: { chainId: 100, name: 'xDai Chain' },
//     label: 'Mainnet',
//     name: 'ETH Mainnet',
//     icon: <NetworkIcon />,
//   },
// ];
export const networkOptions = [
  // stage
  {
    value: 56,
    key: 0,
    bridge: { chainId: 1, name: 'ETH Mainnet' },
    label: 'Binance Smart Chain',
    name: 'Binance Smart Chain',
    icon: <NetworkIcon />,
  },
  {
    value: 1,
    key: 1,
    bridge: { chainId: 56, name: 'Binance Smart Chain' },
    label: 'Mainnet',
    name: 'ETH Mainnet',
    icon: <NetworkIcon />,
  },
  // {
  //   value: 100,
  //   key: 0,
  //   bridge: { chainId: 1, name: 'ETH Mainnet' },
  //   label: 'xDai',
  //   name: 'xDai Chain',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 1,
  //   key: 1,
  //   bridge: { chainId: 100, name: 'xDai Chain' },
  //   label: 'Mainnet',
  //   name: 'ETH Mainnet',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 77,
  //   key: 2,
  //   bridge: { chainId: 42, name: 'Kovan Testnet' },
  //   label: 'Sokol',
  //   name: 'Sokol Testnet',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 42,
  //   key: 3,
  //   bridge: { chainId: 77, name: 'Sokol Testnet' },
  //   label: 'Kovan',
  //   name: 'Kovan Testnet',
  //   icon: <NetworkIcon />,
  // },
];

export const networkNames = {
  100: 'xDai Chain',
  1: 'ETH Mainnet',
  77: 'Sokol Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
};

export const chainUrls = {
  100: {
    rpc: 'https://xdai.poanetwork.dev',
    explorer: 'https://blockscout.com/poa/xdai',
    chainId: 100,
    name: 'xDai Chain',
  },
  1: {
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
    explorer: 'https://etherscan.io',
    chainId: 1,
    name: 'ETH Mainnet',
  },
  77: {
    rpc: 'https://sokol.poa.network',
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: 'Sokol Testnet',
  },
  42: {
    rpc: `https://kovan.infura.io/v3/${CONFIG.infuraId}`,
    explorer: 'https://kovan.etherscan.io',
    chainId: 42,
    name: 'Kovan Testnet',
  },
  56: {
    rpc: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: 'Binance Smart Chain',
  },
};
export const ownerAddress = '0xba008eC024511EE309152B0010335B8F9cF5bA5b';

export const defaultTokens = {
  100: {
    name: 'Stake on xDai',
    address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 100,
  },
  1: {
    name: 'KIMCHI',
    address: '0x1E18821E69B9FAA8e6e75DFFe54E7E25754beDa0',
    symbol: 'KIMCHI',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1E18821E69B9FAA8e6e75DFFe54E7E25754beDa0/logo.png',
  },
  77: {
    name: 'FaucetToken on xDai',
    address: '0x1b457c787792d17bea8d41885ada00e764712cdd',
    symbol: 'FAU',
    decimals: 18,
    chainId: 77,
  },
  42: {
    name: 'FaucetToken',
    address: '0xfab46e002bbf0b4509813474841e0716e6730136',
    symbol: 'FAU',
    decimals: 18,
    chainId: 42,
  },
  56: {
    name: 'KIMCHI on BSC',
    address: '0x3454Cc4C19F5609b7ba5AD15BB7880BdB8B40DEe',
    symbol: 'KIMCHI',
    decimals: 18,
    chainId: 56,
  },
};

export const graphEndpoints = {
  // 100: 'https://api.thegraph.com/subgraphs/name/dan13ram/xdai-omnibridge',
  // 1: 'https://api.thegraph.com/subgraphs/name/dan13ram/mainnet-omnibridge',
  // 77: 'https://api.thegraph.com/subgraphs/name/dan13ram/sokol-omnibridge',
  // 42: 'https://api.thegraph.com/subgraphs/name/dan13ram/kovan-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/kgcdream2019/julswap-bridge',
  56: 'https://subgraph.swapliquidity.org/subgraphs/name/justliquidity/bsc-to-mainnet-julswap-bridge',
};

export const mediators = {
  //  42: '0xA960d095470f7509955d5402e36d9DB984B5C8E2',
  //  77: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
  1: '0xF652B3BbA068b4611616FE627c96562938529305',
  56: '0x0694569C3bD531B4320AC70117E9133f9439D4Fa',
};

export const ambs = {
  //  42: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  //  77: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  1: '0xb733Eb1fd233956CC689a6c082D4D0a47e3975E1',
  56: '0xB066E69BD0AB1bBEf358A117C570D6D80C7DCfc7',
};

// export const defaultTokensUrl = {
//   100: 'https://tokens.honeyswap.org',
//   1: 'https://tokens.uniswap.org',
//   42: '',
//   77: '',
//   56: '',
// };
export const defaultTokensUrl = {
  100: '',
  1: '',
  42: '',
  77: '',
  56: '',
};

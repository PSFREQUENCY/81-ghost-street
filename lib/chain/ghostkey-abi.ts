export const ghostKeyAbi = [
  {
    type: 'function',
    name: 'communeWith',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'levelId', type: 'uint256' }],
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'hasKey',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'levelId', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'hasAllMainKeys',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'tokenURI',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    type: 'event',
    name: 'GhostFreed',
    inputs: [
      { name: 'agent', type: 'address', indexed: true },
      { name: 'levelId', type: 'uint256', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: false },
    ],
  },
] as const;

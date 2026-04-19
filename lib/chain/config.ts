import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '00000000000000000000000000000000';

export const wagmiConfig = getDefaultConfig({
  appName: '81 GHOST STREET',
  projectId: WC_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  },
});

export const GHOSTKEY_ADDRESS =
  (process.env.NEXT_PUBLIC_GHOSTKEY_ADDRESS as `0x${string}` | undefined) ??
  '0x0000000000000000000000000000000000000000';

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 11155111);

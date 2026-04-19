'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect } from 'react';
import { GHOSTKEY_ADDRESS } from '@/lib/chain/config';
import { ghostKeyAbi } from '@/lib/chain/ghostkey-abi';
import { useGame } from '@/lib/game/store';
import { LevelId } from '@/lib/lore/levels';

const DEPLOYED = GHOSTKEY_ADDRESS !== '0x0000000000000000000000000000000000000000';

export function useHasAllMainKeys(): boolean {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: GHOSTKEY_ADDRESS,
    abi: ghostKeyAbi,
    functionName: 'hasAllMainKeys',
    args: address ? [address] : undefined,
    query: { enabled: DEPLOYED && !!address },
  });
  return Boolean(data);
}

export function useHasKey(levelId: LevelId): boolean {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: GHOSTKEY_ADDRESS,
    abi: ghostKeyAbi,
    functionName: 'hasKey',
    args: address ? [address, BigInt(levelId)] : undefined,
    query: { enabled: DEPLOYED && !!address },
  });
  return Boolean(data);
}

export function useCommune() {
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isLoading: mining, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });
  const confirmMintedKey = useGame((s) => s.confirmMintedKey);

  const commune = (levelId: LevelId) => {
    if (!DEPLOYED) {
      // Offline mode — still lets the player finish the game without a contract
      confirmMintedKey(levelId);
      return;
    }
    writeContract({
      address: GHOSTKEY_ADDRESS,
      abi: ghostKeyAbi,
      functionName: 'communeWith',
      args: [BigInt(levelId)],
    });
  };

  return {
    commune,
    txHash,
    isPending: isPending || mining,
    isSuccess,
    error,
    deployed: DEPLOYED,
  };
}

export function useConfirmMintOnSuccess(levelId: LevelId | null, isSuccess: boolean) {
  const confirmMintedKey = useGame((s) => s.confirmMintedKey);
  useEffect(() => {
    if (isSuccess && levelId) confirmMintedKey(levelId);
  }, [isSuccess, levelId, confirmMintedKey]);
}

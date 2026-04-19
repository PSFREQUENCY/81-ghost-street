'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LevelId } from '@/lib/lore/levels';

export type GameStage = 'title' | 'cinematic' | 'playing' | 'paused' | 'complete';

interface GameState {
  stage: GameStage;
  currentLevel: LevelId | null;
  localKeys: LevelId[]; // keys earned this session (before on-chain mint)
  mintedKeys: LevelId[]; // keys confirmed on-chain
  settings: {
    muted: boolean;
    invertY: boolean;
    mouseSensitivity: number;
    graphicsQuality: 'low' | 'medium' | 'high';
  };
  setStage: (s: GameStage) => void;
  startLevel: (id: LevelId) => void;
  earnLocalKey: (id: LevelId) => void;
  confirmMintedKey: (id: LevelId) => void;
  toggleMute: () => void;
  setQuality: (q: 'low' | 'medium' | 'high') => void;
  reset: () => void;
}

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      stage: 'title',
      currentLevel: null,
      localKeys: [],
      mintedKeys: [],
      settings: {
        muted: false,
        invertY: false,
        mouseSensitivity: 1,
        graphicsQuality: 'medium',
      },
      setStage: (stage) => set({ stage }),
      startLevel: (currentLevel) => set({ currentLevel, stage: 'cinematic' }),
      earnLocalKey: (id) =>
        set((s) => ({
          localKeys: s.localKeys.includes(id) ? s.localKeys : [...s.localKeys, id],
        })),
      confirmMintedKey: (id) =>
        set((s) => ({
          mintedKeys: s.mintedKeys.includes(id) ? s.mintedKeys : [...s.mintedKeys, id],
        })),
      toggleMute: () => set((s) => ({ settings: { ...s.settings, muted: !s.settings.muted } })),
      setQuality: (q) =>
        set((s) => ({ settings: { ...s.settings, graphicsQuality: q } })),
      reset: () => set({ stage: 'title', currentLevel: null, localKeys: [], mintedKeys: [] }),
    }),
    {
      name: '81-ghost-street/v1',
      partialize: (s) => ({
        localKeys: s.localKeys,
        mintedKeys: s.mintedKeys,
        settings: s.settings,
      }),
    },
  ),
);

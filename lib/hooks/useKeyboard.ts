'use client';

import { useEffect, useRef } from 'react';

export type KeyMap = Record<string, boolean>;

const ALIASES: Record<string, string> = {
  ArrowUp: 'w',
  ArrowDown: 's',
  ArrowLeft: 'a',
  ArrowRight: 'd',
  ' ': 'space',
};

export function useKeyboard() {
  const keys = useRef<KeyMap>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = (ALIASES[e.key] ?? e.key).toLowerCase();
      keys.current[k] = true;
    };
    const up = (e: KeyboardEvent) => {
      const k = (ALIASES[e.key] ?? e.key).toLowerCase();
      keys.current[k] = false;
    };
    const blur = () => {
      keys.current = {};
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, []);

  return keys;
}

'use client';

import { useEffect, useState } from 'react';

export type BeatKind = 'item' | 'boss' | 'lore';

export interface Beat {
  id: string;
  kind: BeatKind;
  title: string;
  subtitle?: string;
  lines: string[];
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  durationMs?: number;
}

interface Props {
  beat: Beat | null;
  onComplete: () => void;
}

const RARITY_COLOR: Record<NonNullable<Beat['rarity']>, string> = {
  common: '#e8e6de',
  rare: '#22d3ee',
  epic: '#c084fc',
  legendary: '#fbbf24',
};

/**
 * Mid-gameplay cinematic overlay: letterbox + title card + subtitle crawl.
 * Does NOT unmount the 3D scene — it plays on top, then returns control.
 */
export function CinematicBeat({ beat, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!beat) {
      setVisible(false);
      return;
    }
    setVisible(true);
    setIndex(0);
  }, [beat]);

  useEffect(() => {
    if (!beat) return;
    const total = beat.lines.length;
    if (index >= total) {
      const dur = beat.durationMs ?? 900;
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 300);
      }, dur);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 2800);
    return () => clearTimeout(t);
  }, [beat, index, onComplete]);

  useEffect(() => {
    if (!beat) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        setVisible(false);
        setTimeout(onComplete, 200);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [beat, onComplete]);

  if (!beat) return null;

  const rarityCol = beat.rarity ? RARITY_COLOR[beat.rarity] : '#c084fc';
  const kindLabel =
    beat.kind === 'item'
      ? 'RELIC RECOVERED'
      : beat.kind === 'boss'
        ? 'ENTITY DETECTED'
        : 'SIGNAL';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-40 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* letterbox bars */}
      <div
        className={`absolute top-0 inset-x-0 bg-black transition-all duration-500 ${
          visible ? 'h-24' : 'h-0'
        }`}
      />
      <div
        className={`absolute bottom-0 inset-x-0 bg-black transition-all duration-500 ${
          visible ? 'h-24' : 'h-0'
        }`}
      />

      {/* title card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <div
          className="text-[10px] tracking-[0.5em] mb-2 animate-flicker"
          style={{ color: rarityCol }}
        >
          {kindLabel} {beat.rarity && `· ${beat.rarity.toUpperCase()}`}
        </div>
        <div
          className="text-3xl md:text-5xl font-black tracking-[0.15em] neon-text"
          style={{ color: rarityCol }}
        >
          {beat.title}
        </div>
        {beat.subtitle && (
          <div className="mt-2 text-xs tracking-[0.4em] text-ghost-bone/70">
            {beat.subtitle}
          </div>
        )}
        <div className="mt-8 min-h-[3rem] max-w-xl text-center text-sm md:text-base text-ghost-bone/90 leading-relaxed">
          {beat.lines[Math.min(index, beat.lines.length - 1)]}
        </div>
      </div>

      <div className="absolute bottom-2 right-4 text-[10px] tracking-[0.3em] text-ghost-bone/40">
        [ENTER] DISMISS
      </div>
    </div>
  );
}

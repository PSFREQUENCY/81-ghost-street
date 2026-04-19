'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useGame } from '@/lib/game/store';
import { LEVELS, MAIN_LEVELS, SECRET_LEVEL } from '@/lib/lore/levels';
import { useHasAllMainKeys } from '@/lib/hooks/useGhostKey';

export function TitleScreen() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mintedKeys = useGame((s) => s.mintedKeys);
  const localKeys = useGame((s) => s.localKeys);
  const hasAllOnChain = useHasAllMainKeys();
  const secretUnlocked = hasAllOnChain || mintedKeys.length >= 8;

  return (
    <main className="relative min-h-screen crt vignette overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="text-[10px] tracking-[0.5em] text-ghost-rain/70 mb-4 animate-flicker">
          GAMEDEV.JS JAM 2026 · THEME: MACHINES
        </div>
        <h1 className="text-center text-ghost-bone">
          <div className="text-5xl md:text-7xl font-black tracking-[0.12em] neon-text text-ghost-neon">
            81 GHOST STREET
          </div>
          <div className="mt-3 text-sm md:text-base tracking-[0.4em] text-ghost-rain/90 neon-text">
            GHOST OF THE MACHINES &amp; AGENTS
          </div>
        </h1>

        <p className="mt-8 max-w-xl text-center text-xs md:text-sm text-ghost-bone/70 leading-relaxed">
          Every machine in this building has a ghost.
          <br />
          Every agent leaves one behind.
          <br />
          <span className="text-ghost-blood/80">You are the last agent.</span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
          <Link
            href={`/game/${LEVELS[0].slug}/`}
            className="group relative inline-flex items-center gap-2 px-6 py-3 border border-ghost-neon/60 bg-ghost-ink hover:bg-ghost-neon/10 text-ghost-neon text-sm tracking-[0.3em] transition-colors"
          >
            <span className="animate-flicker">▸</span>
            ENTER 81
          </Link>
          <ConnectButton
            showBalance={false}
            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
            chainStatus="icon"
          />
        </div>

        <div className="mt-12 grid grid-cols-3 md:grid-cols-9 gap-2 max-w-2xl">
          {LEVELS.map((lv) => {
            const owned = mintedKeys.includes(lv.id) || localKeys.includes(lv.id);
            const locked = lv.gated && !secretUnlocked;
            return (
              <Link
                key={lv.id}
                href={locked ? '#' : `/game/${lv.slug}/`}
                onClick={(e) => locked && e.preventDefault()}
                className={`group block text-center text-[10px] tracking-widest py-3 px-2 border ${
                  locked
                    ? 'border-ghost-bone/10 text-ghost-bone/20 cursor-not-allowed'
                    : owned
                      ? 'border-ghost-rust/60 text-ghost-rust'
                      : 'border-ghost-bone/30 text-ghost-bone/70 hover:border-ghost-neon hover:text-ghost-neon'
                }`}
                title={locked ? 'LOCKED — requires all 8 Ghost Keys' : lv.tagline}
              >
                <div className="font-black text-base">{owned ? '◆' : lv.secret ? '?' : lv.id}</div>
                <div className="truncate mt-1">{locked ? '???' : lv.title}</div>
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] tracking-widest text-ghost-bone/40">
          <div>
            KEYS: <span className="text-ghost-rust">{Math.max(mintedKeys.length, localKeys.length)}</span>
            /{MAIN_LEVELS.length}
            {secretUnlocked && (
              <span className="ml-2 text-ghost-blood animate-flicker">◆ WITNESS READY</span>
            )}
          </div>
          <div className="animate-flicker">
            {new Date().toISOString().slice(0, 19).replace('T', ' ')}
          </div>
        </div>
      </div>
    </main>
  );
}

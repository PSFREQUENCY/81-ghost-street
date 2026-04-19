'use client';

import Link from 'next/link';
import { Level } from '@/lib/lore/levels';
import { useGame } from '@/lib/game/store';

interface Props {
  level: Level;
  objectiveText?: string;
  pending?: boolean;
  txHash?: string;
}

export function HUD({ level, objectiveText, pending, txHash }: Props) {
  const localKeys = useGame((s) => s.localKeys);
  const mintedKeys = useGame((s) => s.mintedKeys);
  const keysEarned = Math.max(mintedKeys.length, localKeys.length);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 font-mono text-ghost-bone">
      {/* top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-3 text-[11px] tracking-[0.3em]">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="pointer-events-auto text-ghost-bone/60 hover:text-ghost-neon transition-colors"
          >
            ◂ 81
          </Link>
          <div className="text-ghost-neon/80 neon-text">
            L{level.id} · {level.title}
          </div>
        </div>
        <div className="text-ghost-rust">
          KEYS {keysEarned}/8
        </div>
      </div>

      {/* objective */}
      <div className="absolute top-16 left-5 max-w-xs">
        <div className="text-[10px] tracking-[0.4em] text-ghost-rain/70 mb-1">OBJECTIVE</div>
        <div className="text-xs leading-relaxed text-ghost-bone/90">
          {objectiveText ?? level.objective}
        </div>
      </div>

      {/* tx status */}
      {pending && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto text-center">
          <div className="px-4 py-3 border border-ghost-neon/40 bg-ghost-ink/80 backdrop-blur-sm">
            <div className="text-[10px] tracking-[0.4em] text-ghost-neon animate-flicker loading-dots">
              COMMUNING WITH THE GHOST
            </div>
            {txHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-[10px] text-ghost-rain/70 underline hover:text-ghost-rain"
              >
                VIEW ON SEPOLIA
              </a>
            )}
          </div>
        </div>
      )}

      {/* controls */}
      <div className="absolute bottom-3 right-5 text-right text-[10px] tracking-widest text-ghost-bone/40 leading-relaxed">
        <div>WASD MOVE · MOUSE LOOK</div>
        <div>SHIFT SPRINT · C CROUCH</div>
        <div>E INTERACT · ESC MENU</div>
      </div>
    </div>
  );
}

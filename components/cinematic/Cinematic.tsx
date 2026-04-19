'use client';

import { useEffect, useRef, useState } from 'react';
import { Level } from '@/lib/lore/levels';

interface Props {
  level: Level;
  onComplete: () => void;
  perLineSeconds?: number;
}

export function Cinematic({ level, onComplete, perLineSeconds = 3.4 }: Props) {
  const [index, setIndex] = useState(0);
  const [skipping, setSkipping] = useState(false);
  const total = level.cinematic.length;
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (index >= total) {
      done.current = true;
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), perLineSeconds * 1000);
    return () => clearTimeout(t);
  }, [index, total, perLineSeconds, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        if (skipping) return;
        setSkipping(true);
        done.current = true;
        onComplete();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onComplete, skipping]);

  const line = level.cinematic[Math.min(index, total - 1)];

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="h-16 bg-black letterbox" />
      <div className="flex-1 flex items-center justify-center px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, rgba(192,132,252,0.25), transparent 65%)',
          }}
        />
        <div className="max-w-3xl text-center space-y-6">
          <div className="text-[11px] tracking-[0.5em] text-ghost-rain/60">
            LEVEL {level.id} · {level.subtitle}
          </div>
          <div className="text-2xl md:text-4xl font-black tracking-[0.15em] text-ghost-neon neon-text">
            {level.title}
          </div>
          <div className="text-xs tracking-[0.3em] text-ghost-bone/60">
            MACHINE: {level.machine}
          </div>
          <p
            key={index}
            className="mt-12 text-lg md:text-xl text-ghost-bone leading-loose animate-crawl"
            style={{ animationDuration: `${perLineSeconds}s` }}
          >
            {line}
          </p>
        </div>
      </div>
      <div className="h-16 bg-black letterbox flex items-center justify-between px-6 text-[10px] tracking-[0.4em] text-ghost-bone/40">
        <div>
          <span className="text-ghost-neon">{Math.min(index + 1, total)}</span> / {total}
        </div>
        <div className="animate-flicker">[ENTER / ESC] SKIP</div>
      </div>
    </div>
  );
}

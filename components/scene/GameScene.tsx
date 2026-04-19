'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Player, PlayerHandle } from './Player';
import { Stage } from './Stage';
import { Machine } from './props/Machine';
import { GhostKey } from './props/GhostKey';
import { Building } from './props/Building';
import { Cinematic } from '@/components/cinematic/Cinematic';
import { CinematicBeat, Beat } from '@/components/cinematic/CinematicBeat';
import { HUD } from '@/components/ui/HUD';
import { Level } from '@/lib/lore/levels';
import { LEVEL_BEATS } from '@/lib/lore/beats';
import { useGame } from '@/lib/game/store';
import { useAccount } from 'wagmi';
import { useCommune, useConfirmMintOnSuccess } from '@/lib/hooks/useGhostKey';

const PALETTES = [
  { floor: '#0b0d14', fog: '#05060a', accent: '#c084fc' }, // L1 — purple
  { floor: '#0a1520', fog: '#04080d', accent: '#22d3ee' }, // L2 — cyan cathedral
  { floor: '#181025', fog: '#060410', accent: '#e879f9' }, // L3 — magenta switchboard
  { floor: '#0b100d', fog: '#040a07', accent: '#22c55e' }, // L4 — green safe
  { floor: '#1a0a08', fog: '#0a0303', accent: '#f43f5e' }, // L5 — blood rooftop kiln
  { floor: '#101018', fog: '#05050a', accent: '#fbbf24' }, // L6 — gold arena
  { floor: '#0a0820', fog: '#02020a', accent: '#a855f7' }, // L7 — dream
  { floor: '#0b0b0b', fog: '#000000', accent: '#ffffff' }, // L8 — architect
  { floor: '#0f0f0f', fog: '#050505', accent: '#fbbf24' }, // L9 — witness gold
];

interface Props {
  level: Level;
}

export function GameScene({ level }: Props) {
  const [stage, setStage] = useState<'cinematic' | 'playing' | 'outro'>('cinematic');
  const [beat, setBeat] = useState<Beat | null>(null);
  const [keyTaken, setKeyTaken] = useState(false);
  const [bossSeen, setBossSeen] = useState(false);

  const playerRef = useRef<PlayerHandle>(null);
  const palette = PALETTES[level.id - 1];

  const earnLocalKey = useGame((s) => s.earnLocalKey);
  const { address } = useAccount();
  const { commune, txHash, isPending, isSuccess } = useCommune();

  useConfirmMintOnSuccess(keyTaken ? level.id : null, isSuccess);

  // proximity-triggered beats
  useEffect(() => {
    if (stage !== 'playing') return;
    const id = setInterval(() => {
      const pos = playerRef.current?.position;
      if (!pos) return;
      const distToMachine = Math.hypot(pos.x, pos.z);
      if (!bossSeen && distToMachine < 6) {
        setBossSeen(true);
        setBeat(LEVEL_BEATS[level.id]?.machine_proximity ?? null);
      }
      if (bossSeen && !keyTaken && distToMachine < 2.2) {
        setKeyTaken(true);
        earnLocalKey(level.id);
        setBeat(LEVEL_BEATS[level.id]?.key_found ?? null);
        if (address) commune(level.id);
      }
    }, 150);
    return () => clearInterval(id);
  }, [stage, bossSeen, keyTaken, level.id, earnLocalKey, address, commune]);

  return (
    <>
      <div className="fixed inset-0 bg-ghost-ink">
        <Canvas
          shadows
          camera={{ position: [0, 4, 10], fov: 62, near: 0.1, far: 200 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Stage palette={palette} rain={level.id !== 7} seed={level.id} />
            <Building accent={palette.accent} showSign={level.id === 1 || level.id === 9} />
            <Machine
              levelId={level.id}
              position={[0, 0, 0]}
              accent={palette.accent}
              active={bossSeen}
            />
            <GhostKey
              position={[0, 2, 0]}
              accent={palette.accent}
              visible={bossSeen && !keyTaken}
            />
            <Player ref={playerRef} spawn={[0, 0, 12]} accent={palette.accent} />
            <EffectComposer>
              <Bloom
                intensity={0.85}
                luminanceThreshold={0.25}
                luminanceSmoothing={0.4}
                mipmapBlur
              />
              <ChromaticAberration
                offset={new THREE.Vector2(0.0008, 0.0008)}
                radialModulation={false}
                modulationOffset={0}
              />
              <Vignette eskil={false} offset={0.15} darkness={0.92} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {stage === 'cinematic' && (
        <Cinematic level={level} onComplete={() => setStage('playing')} />
      )}

      <CinematicBeat beat={beat} onComplete={() => setBeat(null)} />

      {stage === 'playing' && (
        <HUD
          level={level}
          objectiveText={
            !bossSeen
              ? `Approach the ${level.machine}. Commune with ${level.ghostName}.`
              : !keyTaken
                ? `Take the Ghost Key. It is soulbound to your wallet.`
                : 'The ghost is freed. Return to 81 to continue.'
          }
          pending={isPending}
          txHash={txHash}
        />
      )}
    </>
  );
}

'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { LevelId } from '@/lib/lore/levels';

interface Props {
  levelId: LevelId;
  position?: [number, number, number];
  accent: string;
  active: boolean;
}

/**
 * One machine per floor. Abstract neon sculpture — not literal props.
 * Lets the 3D show breadth across 9 levels without modelling each one.
 */
export function Machine({ levelId, position = [0, 0, 0], accent, active }: Props) {
  const root = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!root.current) return;
    root.current.rotation.y += delta * (active ? 0.6 : 0.15);
    if (glow.current) {
      const t = state.clock.elapsedTime;
      glow.current.intensity = 6 + Math.sin(t * (active ? 6 : 2)) * (active ? 3 : 1);
    }
  });

  const shape = useMemo(() => MACHINE_SHAPES[levelId] ?? MACHINE_SHAPES[1], [levelId]);

  return (
    <group position={position}>
      <pointLight ref={glow} color={accent} intensity={6} distance={14} decay={2} position={[0, 2.5, 0]} />

      {/* base plinth */}
      <mesh receiveShadow castShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.4, 2.6, 0.3, 16]} />
        <meshStandardMaterial color="#0b0d14" roughness={0.35} metalness={0.7} />
      </mesh>

      <Text
        position={[0, 0.32, 2.45]}
        rotation-x={-Math.PI / 2}
        fontSize={0.22}
        color={accent}
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
        outlineWidth={0.005}
      >
        {shape.label}
      </Text>

      {/* rotating shape */}
      <group ref={root} position={[0, 1.2, 0]}>
        {shape.render(accent)}
      </group>
    </group>
  );
}

type ShapeSpec = { label: string; render: (accent: string) => JSX.Element };

const mat = (accent: string, emissive = 0.9, metal = 0.6) => (
  <meshStandardMaterial
    color={accent}
    emissive={accent}
    emissiveIntensity={emissive}
    metalness={metal}
    roughness={0.2}
  />
);

const MACHINE_SHAPES: Record<number, ShapeSpec> = {
  1: {
    label: 'TURNSTILE — LEDGER-0',
    render: (a) => (
      <>
        <mesh castShadow>
          <torusGeometry args={[1, 0.08, 12, 40]} />
          {mat(a)}
        </mesh>
        <mesh castShadow rotation-z={Math.PI / 2}>
          <torusGeometry args={[1, 0.08, 12, 40]} />
          {mat(a)}
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2.2, 8]} />
          {mat(a)}
        </mesh>
      </>
    ),
  },
  2: {
    label: 'SERVER CATHEDRAL — SYSADMIN-9',
    render: (a) => (
      <>
        {[-0.6, 0, 0.6].map((x) => (
          <mesh key={x} castShadow position={[x, 0, 0]}>
            <boxGeometry args={[0.35, 2, 0.35]} />
            {mat(a, 0.4)}
          </mesh>
        ))}
        <mesh castShadow position={[0, 1.3, 0]}>
          <boxGeometry args={[2, 0.1, 1]} />
          {mat(a)}
        </mesh>
      </>
    ),
  },
  3: {
    label: 'SWITCHBOARD — OPERATOR-7',
    render: (a) => (
      <>
        <mesh castShadow>
          <boxGeometry args={[2, 1.2, 0.2]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (i % 4) * 0.45 - 0.65;
          const y = Math.floor(i / 4) * 0.35 - 0.35;
          return (
            <mesh key={i} position={[x, y, 0.12]}>
              <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
              {mat(a, 1.2)}
            </mesh>
          );
        })}
      </>
    ),
  },
  4: {
    label: 'MERKLE SAFE — CIPHER-4G',
    render: (a) => (
      <>
        <mesh castShadow>
          <octahedronGeometry args={[1, 0]} />
          {mat(a)}
        </mesh>
        <mesh castShadow scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#05060a" />
        </mesh>
      </>
    ),
  },
  5: {
    label: 'KILN — WARLORD-K',
    render: (a) => (
      <>
        <mesh castShadow>
          <coneGeometry args={[1, 2, 6]} />
          {mat(a, 1.5)}
        </mesh>
        <pointLight color="#f43f5e" intensity={4} distance={8} position={[0, 0.4, 0]} />
      </>
    ),
  },
  6: {
    label: 'RING — CHAMPION-R',
    render: (a) => (
      <>
        <mesh castShadow>
          <torusGeometry args={[1.2, 0.15, 16, 32]} />
          {mat(a)}
        </mesh>
        <mesh castShadow position={[0, -0.4, 0]}>
          <torusGeometry args={[1.2, 0.06, 16, 32]} />
          {mat(a, 0.6)}
        </mesh>
      </>
    ),
  },
  7: {
    label: 'DREAMCATCHER — ONEIROS-7',
    render: (a) => (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} rotation-y={(i / 8) * Math.PI * 2}>
            <torusGeometry args={[1 + i * 0.05, 0.02, 6, 16, Math.PI]} />
            {mat(a, 0.7)}
          </mesh>
        ))}
      </>
    ),
  },
  8: {
    label: 'THE ARCHITECT — 81 ITSELF',
    render: (a) => (
      <>
        <mesh castShadow>
          <icosahedronGeometry args={[1.1, 0]} />
          {mat(a, 2)}
        </mesh>
        <mesh castShadow scale={1.6}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial color={a} emissive={a} emissiveIntensity={0.3} wireframe />
        </mesh>
      </>
    ),
  },
  9: {
    label: 'THE WITNESS — YOU',
    render: (a) => (
      <>
        <mesh castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#e8e6de"
            emissive={a}
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>
      </>
    ),
  },
};

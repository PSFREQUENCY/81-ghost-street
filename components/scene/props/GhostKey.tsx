'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  accent: string;
  visible: boolean;
}

export function GhostKey({ position, accent, visible }: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.9;
    group.current.position.y = position[1] + Math.sin(t * 1.6) * 0.15;
  });

  if (!visible) return null;

  return (
    <group ref={group} position={position}>
      <pointLight color={accent} intensity={5} distance={6} decay={2} />
      <mesh castShadow>
        <torusKnotGeometry args={[0.22, 0.06, 64, 8]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={1.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={accent} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

interface StageProps {
  palette: { floor: string; fog: string; accent: string };
  rain?: boolean;
  seed?: number;
}

export function Stage({ palette, rain = true, seed = 0 }: StageProps) {
  const rainRef = useRef<THREE.Points>(null);
  const COUNT = 2000;

  const rainGeom = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (!rain || !rainRef.current) return;
    const pos = rainRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] -= delta * 18;
      if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = 30;
    }
    pos.needsUpdate = true;
  });

  return (
    <>
      <fog attach="fog" args={[palette.fog, 8, 55]} />
      <color attach="background" args={[palette.fog]} />

      <ambientLight intensity={0.15} color={palette.accent} />
      <directionalLight
        position={[8, 18, 6]}
        intensity={0.35}
        color={palette.accent}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[0, 4, 0]} intensity={12} color={palette.accent} distance={18} decay={2} />

      {/* floor */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[200, 200, 1, 1]} />
        <meshStandardMaterial
          color={palette.floor}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* wet grid decals */}
      <gridHelper args={[200, 80, palette.accent, palette.accent]} position={[0, 0.02, 0]} />

      {rain && (
        <points ref={rainRef} geometry={rainGeom}>
          <pointsMaterial
            color={palette.accent}
            size={0.04}
            transparent
            opacity={0.5}
            sizeAttenuation
          />
        </points>
      )}
    </>
  );
}

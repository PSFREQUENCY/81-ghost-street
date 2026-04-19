'use client';

import { Text } from '@react-three/drei';

interface Props {
  accent: string;
  showSign?: boolean;
}

export function Building({ accent, showSign = true }: Props) {
  return (
    <group position={[0, 0, -15]}>
      {/* facade */}
      <mesh position={[0, 10, 0]} castShadow receiveShadow>
        <boxGeometry args={[24, 20, 1]} />
        <meshStandardMaterial color="#0b0d14" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* windows — procedural grid */}
      {Array.from({ length: 8 }).map((_, floor) =>
        Array.from({ length: 5 }).map((_, col) => {
          const lit = (floor * 7 + col * 3) % 5 !== 0;
          return (
            <mesh
              key={`${floor}-${col}`}
              position={[(col - 2) * 4, floor * 2.2 + 3, 0.52]}
            >
              <planeGeometry args={[1.6, 1]} />
              <meshStandardMaterial
                color={lit ? '#fbbf24' : '#0b0d14'}
                emissive={lit ? accent : '#000000'}
                emissiveIntensity={lit ? 0.6 : 0}
              />
            </mesh>
          );
        }),
      )}
      {/* door */}
      <mesh position={[0, 1.5, 0.52]}>
        <planeGeometry args={[2.4, 3]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      {/* neon 81 sign */}
      {showSign && (
        <Text
          position={[0, 17, 0.6]}
          fontSize={2.2}
          color={accent}
          anchorX="center"
          outlineColor="#000"
          outlineWidth={0.02}
        >
          81
        </Text>
      )}
      {showSign && (
        <Text
          position={[0, 15, 0.6]}
          fontSize={0.7}
          color="#e8e6de"
          anchorX="center"
          outlineColor="#000"
          outlineWidth={0.008}
        >
          GHOST STREET
        </Text>
      )}
    </group>
  );
}

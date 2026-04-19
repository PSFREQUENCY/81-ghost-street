'use client';

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '@/lib/hooks/useKeyboard';

export interface PlayerHandle {
  group: THREE.Group | null;
  position: THREE.Vector3;
}

interface Props {
  spawn?: [number, number, number];
  accent?: string;
}

export const Player = forwardRef<PlayerHandle, Props>(function Player(
  { spawn = [0, 0, 8], accent = '#c084fc' },
  externalRef,
) {
  const group = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const { camera, gl } = useThree();

  const yaw = useRef(0);
  const pitch = useRef(-0.12);
  const velocity = useRef(new THREE.Vector3());
  const tmp = useRef(new THREE.Vector3());
  const pos = useRef(new THREE.Vector3(...spawn));
  const pointerLocked = useRef(false);

  useImperativeHandle(
    externalRef,
    () => ({
      group: group.current,
      position: pos.current,
    }),
    [],
  );

  useEffect(() => {
    const dom = gl.domElement;
    const onClick = () => {
      if (!pointerLocked.current) dom.requestPointerLock();
    };
    const onLockChange = () => {
      pointerLocked.current = document.pointerLockElement === dom;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!pointerLocked.current) return;
      yaw.current -= e.movementX * 0.0022;
      pitch.current -= e.movementY * 0.0022;
      pitch.current = Math.max(-1.2, Math.min(0.8, pitch.current));
    };
    dom.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onLockChange);
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      dom.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onLockChange);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [gl]);

  useFrame((_, delta) => {
    const k = keys.current;
    const speed = (k.shift ? 7.5 : k.c ? 2.2 : 4.4) * delta;

    tmp.current.set(0, 0, 0);
    if (k.w) tmp.current.z -= 1;
    if (k.s) tmp.current.z += 1;
    if (k.a) tmp.current.x -= 1;
    if (k.d) tmp.current.x += 1;
    if (tmp.current.lengthSq() > 0) tmp.current.normalize();

    tmp.current.applyEuler(new THREE.Euler(0, yaw.current, 0, 'YXZ'));
    velocity.current.lerp(tmp.current.multiplyScalar(speed * 60), 0.18);

    pos.current.x += velocity.current.x * delta;
    pos.current.z += velocity.current.z * delta;

    // world bounds
    pos.current.x = Math.max(-40, Math.min(40, pos.current.x));
    pos.current.z = Math.max(-40, Math.min(40, pos.current.z));

    if (group.current) {
      group.current.position.copy(pos.current);
      const moving = tmp.current.lengthSq() > 0.01;
      if (moving) {
        const targetRot = Math.atan2(velocity.current.x, velocity.current.z);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRot, 0.18);
      }
    }

    // third-person camera
    const camDist = 5.5;
    const camHeight = 2.2 + pitch.current * 2;
    const camOffset = new THREE.Vector3(0, camHeight, camDist);
    camOffset.applyEuler(new THREE.Euler(0, yaw.current, 0, 'YXZ'));
    camera.position.lerp(
      tmp.current.copy(pos.current).add(camOffset),
      0.12,
    );
    camera.lookAt(pos.current.x, pos.current.y + 1.3, pos.current.z);
  });

  const crouching = keys.current.c;

  return (
    <group ref={group} position={spawn}>
      {/* capsule body */}
      <mesh castShadow position={[0, crouching ? 0.55 : 0.85, 0]}>
        <capsuleGeometry args={[0.28, crouching ? 0.6 : 0.95, 4, 10]} />
        <meshStandardMaterial
          color="#0b0d14"
          emissive={accent}
          emissiveIntensity={0.25}
          roughness={0.5}
        />
      </mesh>
      {/* head */}
      <mesh castShadow position={[0, crouching ? 1.1 : 1.55, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#e8e6de" emissive={accent} emissiveIntensity={0.15} />
      </mesh>
      {/* forward marker */}
      <mesh position={[0, 0.85, -0.35]}>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      {/* agent ground glow */}
      <pointLight color={accent} intensity={2} distance={3} decay={2} position={[0, 0.15, 0]} />
    </group>
  );
});

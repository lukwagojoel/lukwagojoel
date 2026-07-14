"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeRig() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    // ambient rotation
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x += delta * 0.05;

    // gentle pointer-reactive tilt
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    group.current.rotation.y += mouse.current.x * 0.0015;
    group.current.rotation.x += -mouse.current.y * 0.0015;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#f4f2ed" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#ff3d2e" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <WireframeRig />
    </Canvas>
  );
}

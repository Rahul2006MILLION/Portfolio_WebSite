"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CoreGeometryProps {
  reducedMotion?: boolean;
}

export function CoreGeometry({ reducedMotion = false }: CoreGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!reducedMotion) {
      // Gentle ambient rotation
      if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.15;
        meshRef.current.rotation.y += delta * 0.25;
      }
      if (wireframeRef.current) {
        wireframeRef.current.rotation.x -= delta * 0.1;
        wireframeRef.current.rotation.y += delta * 0.2;
      }

      // Smooth pointer reaction
      if (groupRef.current) {
        const targetX = (state.pointer.x * Math.PI) / 6;
        const targetY = (-state.pointer.y * Math.PI) / 6;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetX,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetY,
          0.05
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Inner dark matte volumetric core */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color="#0B0C0E"
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Outer technical acid-green wireframe shell */}
      <lineSegments ref={wireframeRef} scale={2.05}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 1)]} />
        <lineBasicMaterial
          color="#d4ff00"
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Geometric orbital ring marker */}
      <mesh rotation={[Math.PI / 3, 0, 0]} scale={2.4}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#7B8291" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

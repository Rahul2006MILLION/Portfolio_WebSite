"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface PortraitModelProps {
  wireframe: boolean;
  targetYaw: number | null; // target Y angle in radians, or null if user is dragging
  onAngleUpdate?: (currentYawDeg: number) => void;
  onMetricsReady?: (metrics: {
    vertices: number;
    polygons: number;
    format: string;
    textureResolution: string;
  }) => void;
}

export function PortraitModel({
  wireframe,
  targetYaw,
  onAngleUpdate,
  onMetricsReady,
}: PortraitModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Load GLB model
  const { scene } = useGLTF("/models/rahul-head.glb");

  // Load realistic PBR maps with SRGB colorSpace configured on load
  const [map, normalMap, roughnessMap, alphaMap] = useTexture(
    [
      "/models/rahul-texture.png",
      "/models/rahul-normal.png",
      "/models/rahul-roughness.png",
      "/models/rahul-mask.png",
    ],
    (loaded) => {
      const [colorTex] = Array.isArray(loaded) ? loaded : [loaded];
      if (colorTex) {
        colorTex.colorSpace = THREE.SRGBColorSpace;
      }
    }
  );

  // Clone geometry from loaded GLB scene and extract real vertex & polygon metrics
  const { geometry, metrics } = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !geo) {
        geo = (child as THREE.Mesh).geometry.clone();
      }
    });

    const fallbackGeo = geo || new THREE.PlaneGeometry(1.96, 3.2, 200, 325);
    const vertCount = fallbackGeo.attributes.position.count;
    const polyCount = fallbackGeo.index
      ? fallbackGeo.index.count / 3
      : vertCount / 3;

    return {
      geometry: fallbackGeo,
      metrics: {
        vertices: vertCount,
        polygons: Math.round(polyCount),
        format: "GLB (GLTF 2.0 Binary)",
        textureResolution: "700 × 1140 sRGB",
      },
    };
  }, [scene]);

  useEffect(() => {
    if (onMetricsReady) {
      onMetricsReady(metrics);
    }
  }, [metrics, onMetricsReady]);

  // Smooth angle interpolation and real-time yaw tracking
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (targetYaw !== null) {
      // Smooth lerp to requested inspection angle (0°, -25°, +25°, ±45°)
      const current = groupRef.current.rotation.y;
      const step = 8.0 * delta;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(current, targetYaw, step);
    }

    if (onAngleUpdate) {
      const deg = THREE.MathUtils.radToDeg(groupRef.current.rotation.y);
      onAngleUpdate(deg);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          map={map}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.65, 0.65)}
          roughnessMap={roughnessMap}
          alphaMap={alphaMap}
          transparent={true}
          roughness={0.62}
          metalness={0.0}
          clearcoat={0.06}
          clearcoatRoughness={0.4}
          wireframe={wireframe}
          side={THREE.DoubleSide}
          toneMapped={true}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/rahul-head.glb");

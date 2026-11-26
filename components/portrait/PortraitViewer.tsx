"use client";

import React, { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { PortraitModel } from "./PortraitModel";
import { PortraitControls } from "./PortraitControls";

interface Metrics {
  vertices: number;
  polygons: number;
  format: string;
  textureResolution: string;
}

export function PortraitViewer() {
  const [activeAngle, setActiveAngle] = useState<number | null>(0);
  const [targetYaw, setTargetYaw] = useState<number | null>(0);
  const [currentYawDeg, setCurrentYawDeg] = useState<number>(0);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<"studio" | "contrast" | "soft">("studio");
  const [fps, setFps] = useState<number>(60);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const orbitRef = useRef<OrbitControlsImpl>(null);

  // Measure genuine real-time FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (time: number) => {
      frameCount++;
      const delta = time - lastTime;
      if (delta >= 500) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = time;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSelectAngle = useCallback((deg: number) => {
    setActiveAngle(deg);
    const rad = THREE.MathUtils.degToRad(deg);
    setTargetYaw(rad);
    // Align camera toward center
    if (orbitRef.current) {
      orbitRef.current.target.set(0, 0, 0);
    }
  }, []);

  const handleReset = useCallback(() => {
    setActiveAngle(0);
    setTargetYaw(0);
    if (orbitRef.current) {
      orbitRef.current.reset();
      orbitRef.current.target.set(0, 0, 0);
    }
  }, []);

  const handleAngleUpdate = useCallback((deg: number) => {
    setCurrentYawDeg(deg);
  }, []);

  const handleMetricsReady = useCallback((m: Metrics) => {
    setMetrics(m);
  }, []);

  // When user begins dragging with the mouse, release the targetYaw lock
  const handleOrbitStart = useCallback(() => {
    setTargetYaw(null);
    setActiveAngle(null);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#070809] select-none">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 38 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x070809, 1);
        }}
      >
        {/* Cinematic Studio Lighting Presets */}
        {lightingPreset === "studio" && (
          <>
            <ambientLight intensity={0.38} color="#ffffff" />
            <directionalLight
              position={[2.2, 2.5, 3.8]}
              intensity={1.35}
              color="#fff8f0"
              castShadow={false}
            />
            <directionalLight
              position={[-2.8, 0.8, 2.5]}
              intensity={0.55}
              color="#e2e8f0"
            />
            <directionalLight
              position={[0, 3.5, -2.2]}
              intensity={0.75}
              color="#f8fafc"
            />
          </>
        )}

        {lightingPreset === "contrast" && (
          <>
            <ambientLight intensity={0.22} color="#ffffff" />
            <directionalLight
              position={[3.2, 2.0, 3.2]}
              intensity={1.65}
              color="#ffffff"
            />
            <directionalLight
              position={[-3.2, 0.5, 2.0]}
              intensity={0.30}
              color="#94a3b8"
            />
            <directionalLight
              position={[-1.0, 3.0, -2.0]}
              intensity={1.10}
              color="#38bdf8"
            />
          </>
        )}

        {lightingPreset === "soft" && (
          <>
            <ambientLight intensity={0.55} color="#ffffff" />
            <directionalLight
              position={[1.5, 2.0, 3.5]}
              intensity={0.95}
              color="#ffffff"
            />
            <directionalLight
              position={[-1.5, 1.0, 3.0]}
              intensity={0.75}
              color="#f1f5f9"
            />
          </>
        )}

        <Suspense fallback={null}>
          <PortraitModel
            wireframe={wireframe}
            targetYaw={targetYaw}
            onAngleUpdate={handleAngleUpdate}
            onMetricsReady={handleMetricsReady}
          />
        </Suspense>

        <OrbitControls
          ref={orbitRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={2.2}
          maxDistance={6.0}
          minPolarAngle={Math.PI * 0.25}
          maxPolarAngle={Math.PI * 0.75}
          onStart={handleOrbitStart}
        />
      </Canvas>

      {/* Technical HUD Overlay */}
      <PortraitControls
        currentYawDeg={currentYawDeg}
        activeAngle={activeAngle}
        onSelectAngle={handleSelectAngle}
        onReset={handleReset}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe((w) => !w)}
        lightingPreset={lightingPreset}
        onChangeLighting={setLightingPreset}
        fps={fps}
        metrics={metrics}
      />
    </div>
  );
}

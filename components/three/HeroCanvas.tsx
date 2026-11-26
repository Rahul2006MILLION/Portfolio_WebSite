"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { CoreGeometry } from "./CoreGeometry";
import { WebGLFallback } from "./WebGLFallback";
import { checkWebGLSupport, prefersReducedMotion } from "@/lib/utils/device";

const emptySubscribe = () => () => {};

export function HeroCanvas() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isSupported = useSyncExternalStore(
    emptySubscribe,
    () => checkWebGLSupport(),
    () => true
  );

  const isReducedMotion = useSyncExternalStore(
    emptySubscribe,
    () => prefersReducedMotion(),
    () => false
  );

  if (!isMounted) {
    return <div className="h-full w-full bg-transparent" />;
  }

  if (!isSupported) {
    return <WebGLFallback />;
  }

  return (
    <div
      data-cursor="webgl"
      data-cursor-label="ORBIT"
      className="relative h-full w-full select-none cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Performance capped DPR
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#d4af37" />
        
        <Suspense fallback={null}>
          <CoreGeometry reducedMotion={isReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

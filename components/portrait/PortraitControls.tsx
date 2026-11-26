"use client";

import React from "react";

interface Metrics {
  vertices: number;
  polygons: number;
  format: string;
  textureResolution: string;
}

interface PortraitControlsProps {
  currentYawDeg: number;
  activeAngle: number | null;
  onSelectAngle: (deg: number) => void;
  onReset: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  lightingPreset: "studio" | "contrast" | "soft";
  onChangeLighting: (preset: "studio" | "contrast" | "soft") => void;
  fps: number;
  metrics: Metrics | null;
}

const PRESET_ANGLES = [
  { label: "-45°", deg: -45, note: "Left Profile" },
  { label: "-25°", deg: -25, note: "Key Left", highlight: true },
  { label: "0° FRONT", deg: 0, note: "True Front", highlight: true },
  { label: "+25°", deg: 25, note: "Key Right", highlight: true },
  { label: "+45°", deg: 45, note: "Right Profile" },
];

export function PortraitControls({
  currentYawDeg,
  activeAngle,
  onSelectAngle,
  onReset,
  wireframe,
  onToggleWireframe,
  lightingPreset,
  onChangeLighting,
  fps,
  metrics,
}: PortraitControlsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 select-none font-mono text-xs text-[#a0aab2]">
      {/* Top Bar: Title & Status */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="pointer-events-auto rounded-lg border border-[#20252b] bg-[#0c0e12]/85 p-4 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <h1 className="text-sm font-semibold tracking-wider text-white">
              PHASE 2A — RAHUL 3D HEAD PROTOTYPE
            </h1>
          </div>
          <p className="mt-1 text-[11px] text-[#717d8a]">
            PHOTOGRAPHIC VERIFICATION & FACIAL ACCURACY INSPECTOR
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-[10px] text-[#8e9aa8]">
            <span className="rounded bg-[#1a1f26] px-1.5 py-0.5 text-[#38bdf8]">
              MODEL: HIGH-DENSITY 2.5D RELIEF
            </span>
            <span>SOURCE: rahul-dark.png (Frontal Video Call Reference)</span>
          </div>
        </div>

        {/* Top-Right: Telemetry HUD */}
        <div className="pointer-events-auto rounded-lg border border-[#20252b] bg-[#0c0e12]/85 p-4 backdrop-blur-md shadow-2xl min-w-[240px]">
          <div className="flex items-center justify-between border-b border-[#1c2128] pb-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#5c6875]">
              TECHNICAL HUD
            </span>
            <span className="text-[11px] font-bold text-[#10b981]">
              {fps > 0 ? `${fps} FPS` : "MEASURING..."}
            </span>
          </div>
          <div className="mt-2 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#5c6875]">MODEL TYPE</span>
              <span className="text-white font-medium">HIGH-DENSITY 2.5D RELIEF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5c6875]">FORMAT</span>
              <span className="text-[#e2e8f0]">{metrics?.format || "GLB (GLTF 2.0)"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5c6875]">POLYGONS</span>
              <span className="text-[#38bdf8] font-mono">
                {metrics ? metrics.polygons.toLocaleString() : "128,952"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5c6875]">VERTICES</span>
              <span className="text-[#38bdf8] font-mono">
                {metrics ? metrics.vertices.toLocaleString() : "65,000"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5c6875]">TEXTURES</span>
              <span className="text-[#e2e8f0]">
                {metrics?.textureResolution || "700 × 1140 sRGB"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5c6875]">RENDERER</span>
              <span className="text-[#e2e8f0]">WebGL2 (PBR Physical)</span>
            </div>
            <div className="flex justify-between border-t border-[#1c2128] pt-1">
              <span className="text-[#5c6875]">YAW ANGLE</span>
              <span className="font-bold text-[#f59e0b]">
                {currentYawDeg.toFixed(1)}°
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center: Inspection Controls */}
      <div className="flex flex-col items-center gap-3">
        {/* Secondary Toggles: Wireframe & Lighting */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#20252b] bg-[#0c0e12]/90 px-3 py-1.5 backdrop-blur-md shadow-xl">
          <span className="text-[10px] uppercase tracking-wider text-[#5c6875] mr-1">
            VIEW:
          </span>
          <button
            type="button"
            onClick={onToggleWireframe}
            className={`rounded px-2.5 py-1 text-[11px] transition-colors ${
              wireframe
                ? "bg-[#38bdf8] text-black font-semibold shadow"
                : "bg-[#181d24] text-[#cbd5e1] hover:bg-[#222933]"
            }`}
          >
            {wireframe ? "WIREFRAME ON" : "SHADED PBR"}
          </button>

          <span className="mx-1 h-3.5 w-[1px] bg-[#222933]" />

          <span className="text-[10px] uppercase tracking-wider text-[#5c6875]">
            LIGHT:
          </span>
          {(["studio", "contrast", "soft"] as const).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChangeLighting(preset)}
              className={`rounded px-2 py-0.5 text-[10px] uppercase transition-colors ${
                lightingPreset === preset
                  ? "bg-[#10b981] text-black font-semibold"
                  : "bg-[#181d24] text-[#94a3b8] hover:bg-[#222933]"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Primary Angle Selector Buttons */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[#262c35] bg-[#0a0c10]/95 p-2 shadow-2xl backdrop-blur-md">
          <span className="px-2 text-[10px] uppercase tracking-widest text-[#64748b]">
            CRITICAL ANGLES:
          </span>

          {PRESET_ANGLES.map(({ label, deg, note, highlight }) => {
            const isSelected = activeAngle === deg;
            return (
              <button
                key={deg}
                type="button"
                onClick={() => onSelectAngle(deg)}
                className={`relative flex flex-col items-center rounded-lg px-3.5 py-2 transition-all ${
                  isSelected
                    ? "bg-[#38bdf8] text-black font-bold shadow-lg scale-105"
                    : highlight
                    ? "bg-[#181d24] text-white hover:bg-[#222933] border border-[#334155]/60"
                    : "bg-[#12161c] text-[#94a3b8] hover:bg-[#1a2028]"
                }`}
              >
                <span className="text-xs font-semibold">{label}</span>
                <span
                  className={`text-[9px] ${
                    isSelected ? "text-slate-900" : "text-[#64748b]"
                  }`}
                >
                  {note}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={onReset}
            className="ml-2 rounded-lg border border-[#334155] bg-[#1a2028] px-3 py-2 text-xs font-medium text-[#e2e8f0] hover:bg-[#242c38] transition-colors"
          >
            RESET
          </button>
        </div>

        {/* Interaction Hint */}
        <p className="text-[10px] text-[#55606d]">
          CLICK & DRAG TO ORBIT FREELY • SCROLL TO ZOOM • SELECT BUTTONS TO LOCK ANGLES
        </p>
      </div>

      {/* Bottom Footer Information */}
      <div className="flex items-center justify-between text-[10px] text-[#485360]">
        <span>OBSIDIAN INSPECTION STUDIO #070809</span>
        <span>NO ANIMATION / PARTICLES INCLUDED — GEOMETRY INSPECTION ONLY</span>
      </div>
    </div>
  );
}

# ThreeUI Architectural Inspection & Technique Selections

Reference Repository: [https://github.com/MengTo/threeui](https://github.com/MengTo/threeui)

## Evaluation Summary
ThreeUI provides a wide range of WebGL shader components (e.g., `FluxVortex`, `DataField`, `DimensionalField`, `InterfaceLines`, `DotMatrixBackground`). Rather than bundling the full external library (which introduces unneeded dependencies and potential React 19 SSR hydration mismatches), we inspect its core shader patterns and extract the most impactful techniques directly into our custom R3F architecture.

---

## 3 Selected Techniques for Rahul Jain's Portfolio

### 1. Vertex-Displaced Procedural Form (from `FluxVortex` / `Neuform`)
- **Concept**: A 3D mathematical geometry (icosahedron / toroid) deformed in the vertex shader using simplex/perlin noise coordinates combined with mouse pointer vector uniforms.
- **Application**: The Hero 3D core sculpture. Allows the object to ripple and flex subtly in response to cursor hover and scroll acceleration while maintaining 60fps performance through GPU execution.

### 2. Telemetry Guide Lines & Field Distortion (from `InterfaceLines` / `DefenseLines`)
- **Concept**: Procedural line geometries with animated dash-offsets and responsive vertex spacing.
- **Application**: Subtle aerospace/F1 telemetry HUD rings and scroll markers surrounding the main typography without visual noise.

### 3. Screen-Space Gradient & Metallic Fresnel Shading (from `BrandOrbs` / `DimensionalField`)
- **Concept**: Dynamic Fresnel reflection mixing deep obsidian slate with subtle acid-lime edge grazing lights (`#D4FF00`).
- **Application**: Gives the 3D geometry extreme physical depth and tactile presence against the near-black `#070809` background.

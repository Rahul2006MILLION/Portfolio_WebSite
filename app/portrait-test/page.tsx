import type { Metadata } from "next";
import { PortraitViewer } from "@/components/portrait/PortraitViewer";

export const metadata: Metadata = {
  title: "Rahul 3D Head Prototype — Phase 2A Inspection",
  description:
    "Isolated 3D inspection prototype of Rahul's head geometry, facial resemblance, and lighting response.",
};

export default function PortraitTestPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#070809]">
      <PortraitViewer />
    </main>
  );
}

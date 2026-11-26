import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Shell } from "@/components/layout/Shell";
import { CustomCursor } from "@/components/motion/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "N. P. Rahul Jain — Creative Technologist · AI/ML Developer · Researcher",
  description:
    "Portfolio of N. P. Rahul Jain, B.Tech CSE (AI & ML) student at Dayananda Sagar University, Bengaluru: LLM confidence calibration, multi-robot coordination and full-stack AI systems.",
  openGraph: {
    title: "N. P. Rahul Jain — Creative Technologist",
    description: "AI/ML developer and researcher. LLM calibration, robotics coordination, full-stack AI systems.",
    images: [{ url: "/character/rahul-character.webp", width: 1056, height: 1024 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#9ca288",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <CustomCursor />
          <Shell>{children}</Shell>
        </SmoothScroll>
      </body>
    </html>
  );
}

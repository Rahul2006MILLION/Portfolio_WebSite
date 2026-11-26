import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "N. P. Rahul Jain // AI/ML Engineer · Software Developer · AI Researcher",
  description:
    "Official engineering and research portfolio of N. P. Rahul Jain, Computer Science and Engineering (AI & ML) student at Dayananda Sagar University. Showcasing LLM calibration, multi-robot coordination, and intelligent systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#060913] text-[#F8FAFC]">
        <SmoothScroll>
          <CustomCursor />
          <Shell>{children}</Shell>
        </SmoothScroll>
      </body>
    </html>
  );
}

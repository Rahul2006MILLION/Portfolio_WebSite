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
  title: "Rahul Jain // Software Engineer",
  description:
    "Award-level interactive developer portfolio of Rahul Jain. Software engineering, high-performance systems, DSA, and modern creative web craft.",
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
      <body className="min-h-full flex flex-col bg-[#070809] text-[#F5F6F8]">
        <SmoothScroll>
          <CustomCursor />
          <Shell>{children}</Shell>
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishesh Tripathi - Portfolio",
  description: "Vishesh Tripathi is a full-stack developer portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#f7f7fb] text-gray-900 relative min-h-screen overflow-x-hidden`}
      >
        {/* BACKGROUND BLOBS */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-175 h-100 bg-[#dbd7fb] blur-[120px] rounded-full -z-10" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-175 h-100 bg-[#fbe2e3] blur-[120px] rounded-full -z-10" />

        {/* HEADER — full width, centered pill */}
        <Header />

        {/* CONTENT */}
        <main className="flex justify-center w-full px-4 sm:px-6 pt-32 pb-20">
          <div className="w-full max-w-6xl">{children}</div>
        </main>
      </body>
    </html>
  );
}

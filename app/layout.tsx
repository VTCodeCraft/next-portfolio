import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishesh Tripathi - Portfolio",
  description:
    "Vishesh Tripathi is a full-stack developer portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f7f7fb] text-gray-900 relative min-h-screen`}>

        {/* BACKGROUND BLOBS */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#dbd7fb] blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#fbe2e3] blur-[120px] rounded-full -z-10" />

        {/* NAVBAR */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="flex justify-center w-full px-6 pt-32 pb-20">
          <div className="w-full max-w-6xl">{children}</div>
        </main>

      </body>
    </html>
  );
}
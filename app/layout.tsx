import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import AuroraBackground from "@/components/aurora-background";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("!scroll-smooth", "font-sans", geist.variable)} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#f7f7fb] text-gray-900 relative min-h-screen overflow-x-hidden`}
        suppressHydrationWarning
      >
        <AuroraBackground />

        <ActiveSectionContextProvider>
        <Header />
        {/* CONTENT */}
        <main className="w-full pt-32 pb-20">
          <div className="w-full">{children}</div>
        </main>
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}

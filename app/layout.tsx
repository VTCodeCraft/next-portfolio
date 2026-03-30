import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
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
        {/* BACKGROUND BLOBS */}
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        
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

import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
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
    <html
      lang="en"
      className="dark !scroll-smooth"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body
        className={`${manrope.className} ${manrope.variable} ${sora.variable} relative min-h-screen overflow-x-hidden bg-[#f4fbfc] text-gray-900 transition-colors duration-300 dark:bg-[#05070b] dark:text-white`}
        suppressHydrationWarning
      >
        <div className="light-canvas light-only absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-20 hidden bg-[#05070b] dark:block" />
        {/* BACKGROUND BLOBS */}
        <div className="light-only absolute top-[-7rem] right-[8rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-[#fff1dc] blur-[9rem] sm:w-[72rem]"></div>
        <div className="light-only absolute top-[-2rem] left-[-32rem] -z-10 h-[32rem] w-[54rem] rounded-full bg-[#d8f4ef] blur-[9rem] sm:w-[72rem] md:left-[-30rem] lg:left-[-24rem] xl:left-[-12rem] 2xl:left-[-4rem]"></div>
        <div className="light-only absolute left-[22%] top-[5rem] -z-10 h-[30rem] w-[46rem] rounded-full bg-[#c9f2ff] opacity-85 blur-[11rem]" />
        <div className="absolute inset-0 -z-10 hidden bg-[#05070b] dark:block" />
        
        <ActiveSectionContextProvider>
        <Header />
        {/* CONTENT */}
        <main className="w-full pt-32 pb-10">
          <div className="w-full">{children}</div>
        </main>
        <Footer />
        <Toaster position="top-right"/>
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}

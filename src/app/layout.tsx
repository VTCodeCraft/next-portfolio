import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "lenis/dist/lenis.css";
import "./globals.css";
import "@/styles/mdx.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import LenisProvider from "@/components/providers/lenis-provider";
// import GalaxyDeferred from "@/components/3d/GalaxyDeferred";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vtcodecraft.in";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body
        className={`${manrope.className} ${manrope.variable} ${sora.variable} relative flex min-h-screen min-h-dvh flex-col overflow-x-hidden bg-background text-foreground transition-colors duration-300`}
        suppressHydrationWarning
      >
        <div className="light-canvas light-only absolute inset-0 -z-20" />
        <div className="dark-canvas absolute inset-0 -z-20 hidden dark:block" />
        {/* <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <GalaxyDeferred />
        </div> */}
        {/* BACKGROUND BLOBS */}
        <div className="light-only absolute top-[-7rem] right-[8rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-[var(--project-glow-primary)] blur-[9rem] sm:w-[72rem]"></div>
        <div className="light-only absolute top-[-2rem] left-[-32rem] -z-10 h-[32rem] w-[54rem] rounded-full bg-secondary/70 blur-[9rem] sm:w-[72rem] md:left-[-30rem] lg:left-[-24rem] xl:left-[-12rem] 2xl:left-[-4rem]"></div>
        <div className="light-only absolute left-[22%] top-[5rem] -z-10 h-[30rem] w-[46rem] rounded-full bg-accent/60 opacity-85 blur-[11rem]" />

        <LenisProvider>
          <ActiveSectionContextProvider>
            <Header />
            {/* CONTENT */}
            <main className="w-full flex-1 pt-32 pb-24 sm:pb-10">
              <div className="w-full">{children}</div>
            </main>
            <Footer />
            <Toaster position="top-right" />
            <Analytics />
            <SpeedInsights />
          </ActiveSectionContextProvider>
        </LenisProvider>
      </body>
    </html>
  );
}


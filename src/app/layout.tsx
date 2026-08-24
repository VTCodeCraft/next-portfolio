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
import { MotionProvider } from "@/components/ui/reveal";

const siteUrl = "https://www.vtcodecraft.in";
const siteName = "Vishesh Tripathi";
const siteTitle = "Vishesh Tripathi | Full-Stack Developer";
const siteDescription =
  "Building scalable web applications, API-driven systems, Chrome extensions, and modern digital experiences using Next.js, React, TypeScript, and backend technologies.";
const ogImageUrl = `${siteUrl}/OG_image.png?v=2`;
const ogImage = {
  url: ogImageUrl,
  secureUrl: ogImageUrl,
  width: 1731,
  height: 909,
  alt: "Dark premium developer branding for Vishesh Tripathi, Full-Stack Developer at VTCodeCraft.",
  type: "image/png",
};

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
  title: {
    default: siteTitle,
    template: "%s | Vishesh Tripathi",
  },
  description: siteDescription,
  applicationName: "VTCodeCraft",
  keywords: [
    "Full-Stack Developer",
    "Vishesh Tripathi",
    "VTCodeCraft",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Portfolio Website",
    "Software Engineer",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  // No canonical here on purpose: a canonical set on the root layout is
  // inherited by every route, so /projects and /blog both declared the
  // homepage as their canonical URL. Each route sets its own.
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "VTCodeCraft",
    type: "website",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VTCodeCraft_",
    creator: "@VTCodeCraft_",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
        <div className="dark-canvas absolute inset-0 -z-20 hidden dark:block" />

        <MotionProvider>
          <LenisProvider>
            <ActiveSectionContextProvider>
              <a
                href="#main-content"
                className="sr-only rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200]"
              >
                Skip to content
              </a>
              <Header />
              {/* CONTENT */}
              <main id="main-content" className="w-full flex-1 pt-32 pb-24 sm:pb-10">
                <div className="w-full">{children}</div>
              </main>
              <Footer />
              <Toaster position="top-right" />
              <Analytics />
              <SpeedInsights />
            </ActiveSectionContextProvider>
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}


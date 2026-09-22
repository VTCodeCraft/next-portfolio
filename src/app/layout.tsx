import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "lenis/dist/lenis.css";
import "./globals.css";
import "@/styles/mdx.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";
import LenisProvider from "@/components/providers/lenis-provider";
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/ui/reveal";
import {
  ROLE_FULL,
  ROLE_PRIMARY,
  ROLE_SECONDARY,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const siteUrl = SITE_URL;
const siteName = SITE_NAME;

/*
  The <title> carries the primary role only.

  Both roles is 61 characters, and Google cuts the title around 580px —
  roughly 57 — so the full version renders as "… / Software Engi…", which
  loses the second role anyway and looks broken doing it. The pairing is
  carried in full by the description, the JSON-LD `jobTitle` and every
  visible label on the page.
*/
const siteTitle = `${siteName} | ${ROLE_PRIMARY}`;
const siteDescription = `${ROLE_PRIMARY} and ${ROLE_SECONDARY} building scalable web applications, API-driven systems, Chrome extensions, and modern digital experiences using Next.js, React, TypeScript, and backend technologies.`;
const ogImageUrl = `${siteUrl}/OG_image.png?v=2`;
const ogImage = {
  url: ogImageUrl,
  secureUrl: ogImageUrl,
  width: 1731,
  height: 909,
  alt: `Dark premium developer branding for Vishesh Tripathi, ${ROLE_FULL} at VTCodeCraft.`,
  type: "image/png",
};

/*
  One family and its mono companion, rather than two unrelated sans faces.

  Sora is a geometric display with wide apertures and decorative terminals;
  at heading sizes it gave the site a startup-deck voice. Geist is a neutral
  grotesque drawn for developer tooling — it has real tabular figures, which
  the dates, durations and contribution counts here depend on, and Geist Mono
  is metrically related, so labels set in mono sit on the same rhythm as the
  prose instead of looking pasted in from another system.
*/
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
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
    ROLE_PRIMARY,
    ROLE_SECONDARY,
    "AI Engineer",
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
  /*
    className and colorScheme stay dark here so the server-rendered document
    is the dark theme, which is the default. The head script corrects it to
    light before first paint when that is what the visitor chose or their
    system asks for.
  */
  return (
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        {/*
          Blocking on purpose, and ahead of everything else. Any later
          mechanism — an effect, a provider, a cookie round trip — paints the
          dark document first and flashes it at light-theme visitors.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body
        className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} relative flex min-h-screen min-h-dvh flex-col overflow-x-hidden bg-background text-foreground`}
        suppressHydrationWarning
      >
        {/* Dark-only: the wash exists to keep the dark page from reading as
            flat black. Light mode wants plain paper, so this stays hidden. */}
        <div className="dark-canvas absolute inset-0 -z-20 hidden dark:block" />

        <ThemeProvider>
        <MotionProvider>
          <LenisProvider>
              <a
                href="#main-content"
                className="sr-only rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200]"
              >
                Skip to content
              </a>
              <Header />
              {/* CONTENT */}
              {/* pt was 32 (8rem) to clear a fixed header. The header is
                  sticky now, so it occupies flow space and this only needs
                  to be the gap between the bar and the first section. */}
              <main id="main-content" className="w-full flex-1 pt-14 pb-24 sm:pt-20 sm:pb-10">
                <div className="w-full">{children}</div>
              </main>
              <Footer />
              <Toaster position="top-right" />
              <Analytics />
              <SpeedInsights />
          </LenisProvider>
        </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


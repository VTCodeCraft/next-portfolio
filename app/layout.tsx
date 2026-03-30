import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";

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
  const themeScript = `
    try {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = storedTheme ? storedTheme === "dark" : prefersDark;
      document.documentElement.classList.toggle("dark", isDark);
    } catch (error) {}
  `;

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} relative min-h-screen overflow-x-hidden bg-[#f7f7fb] text-gray-900 transition-colors duration-300 dark:bg-[#05070b] dark:text-white`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="absolute inset-0 -z-20 hidden bg-[#05070b] dark:block" />
        {/* BACKGROUND BLOBS */}
        <div className="absolute top-[-6rem] right-[11rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-cyan-400/12 sm:w-[68.75rem]"></div>
        <div className="absolute top-[-1rem] left-[-35rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-blue-500/16 sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        <div className="absolute inset-x-0 top-0 -z-10 hidden h-[26rem] bg-[radial-gradient(circle_at_top,rgba(16,93,140,0.38),transparent_58%)] dark:block" />
        
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

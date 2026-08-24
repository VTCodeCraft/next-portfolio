import type { Metadata } from "next";
import Contact from "@/components/sections/contact";
import Intro from "@/components/sections/intro";
import MyJourney from "@/components/sections/my-journey";
import ProfileSidebar from "@/components/layout/profile-sidebar";
import Sidebar from "@/components/layout/sidebar";
import Skills from "@/components/sections/skills";

const siteUrl = "https://www.vtcodecraft.in";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vishesh Tripathi",
  url: siteUrl,
  image: `${siteUrl}/images/profile.png`,
  jobTitle: "Full-Stack Engineer",
  email: "mailto:work.vishesh12.05@gmail.com",
  sameAs: [
    "https://github.com/VTCodeCraft",
    "https://x.com/VTCodeCraft_",
    "https://linkedin.com/in/vishesh-tripathi-6b6a41213",
    "https://leetcode.com/u/VTCodeCraft/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VTCodeCraft",
  url: siteUrl,
  author: { "@type": "Person", name: "Vishesh Tripathi" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd, websiteJsonLd]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <div className="page-shell">
        <div className="page-grid">
          {/* Section index. Desktop only — on small screens the top nav is the
              single navigation system and a second one would compete with it. */}
          <aside
            aria-label="Sections"
            className="col-rail hidden lg:sticky lg:top-32 lg:block lg:self-start"
          >
            <Sidebar />
          </aside>

          {/* Not <main>: the root layout already provides the single main landmark. */}
          <div className="col-main section-rhythm">
            <Intro />
            <div className="deferred-section">
              <Skills />
            </div>
            <div className="deferred-section">
              <MyJourney />
            </div>
            <div className="deferred-section">
              <Contact />
            </div>
          </div>

          {/* Margin column: metadata, not navigation. Fills the wide-screen
              gutter that previously sat empty. */}
          <aside className="col-margin hidden xl:sticky xl:top-32 xl:block xl:self-start">
            <ProfileSidebar />
          </aside>
        </div>
      </div>
    </>
  );
}


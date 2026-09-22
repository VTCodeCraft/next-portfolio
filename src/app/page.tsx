import type { Metadata } from "next";
import { posts } from "#site/content";

import { ROLE_PRIMARY, ROLE_SECONDARY } from "@/lib/site";
import BuildNotes from "@/components/sections/build-notes";
import Contact from "@/components/sections/contact";
import Contributions from "@/components/sections/contributions";
import SelectedWork from "@/components/sections/selected-work";
import Intro from "@/components/sections/intro";
import Education from "@/components/sections/education";
import Experience from "@/components/sections/experience";
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
  /* schema.org allows repeated values for jobTitle, so the two roles go in
     as separate strings rather than one slash-joined label a parser would
     have to split. */
  jobTitle: [ROLE_PRIMARY, ROLE_SECONDARY],
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
  const notes = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      slugAsParams: post.slugAsParams,
      readingTime: post.readingTime,
      date: post.date,
    }));

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

      <div className="page-shell section-rhythm">
        <Intro />
        <Contributions />
        <SelectedWork />
        <Skills />
        <Experience />
        <Education />
        <BuildNotes notes={notes} />
        <Contact />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { posts } from "#site/content";

import BuildNotes from "@/components/sections/build-notes";
import Contact from "@/components/sections/contact";
import LaptopBand from "@/components/sections/laptop-band";
import Proof from "@/components/sections/proof";
import SelectedWork from "@/components/sections/selected-work";
import Intro from "@/components/sections/intro";
import MyJourney from "@/components/sections/my-journey";
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
  const notes = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      slugAsParams: post.slugAsParams,
      readingTime: post.readingTime,
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
        <Proof />
      </div>

      <div className="mt-20 sm:mt-24 lg:mt-28">
        <LaptopBand />
      </div>

      <div className="page-shell section-rhythm mt-20 sm:mt-24 lg:mt-28">
        <SelectedWork />
        <Skills />
        <MyJourney />
        <BuildNotes notes={notes} />
        <Contact />
      </div>
    </>
  );
}

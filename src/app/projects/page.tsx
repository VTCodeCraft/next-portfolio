import type { Metadata } from "next";
import Project from "@/components/sections/project";
import { MotionMountSection } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering work — an AI voice interview coach, a browser-native gesture CAPTCHA, a timezone-aware scheduling platform, and production Chrome extensions.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Vishesh Tripathi",
    description:
      "Selected engineering work — AI voice pipelines, computer-vision CAPTCHA, scheduling infrastructure, and production Chrome extensions.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <MotionMountSection
      delay={0.06}
      className="-mt-16 px-4 pb-0 sm:px-6"
    >
      <Project />
    </MotionMountSection>
  );
}


import Project from "@/components/sections/project";
import { MotionMountSection } from "@/components/ui/reveal";

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


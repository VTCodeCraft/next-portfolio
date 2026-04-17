import Project from "@/components/sections/project";
import { MotionSection } from "@/components/ui/reveal";

export default function ProjectsPage() {
  return (
    <MotionSection
      delay={0.06}
      className="-mt-14 px-4 pb-4 sm:px-6"
    >
      <Project />
    </MotionSection>
  );
}


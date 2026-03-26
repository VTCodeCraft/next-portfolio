import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import Sidebar from "@/components/sidebar";
import Skills from "@/components/skills";
import ProfileSidebar from "@/components/profile-sidebar";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-14">

      {/* LEFT COLUMN — Nav links only */}
      <aside className="w-full lg:w-44 lg:shrink-0 lg:sticky lg:top-32 lg:self-start">
        <Sidebar />
      </aside>

      {/* PROFILE IMAGE — its own column between sidebar and content */}
      {/* On mobile: shown inline above main content */}
      <div className="hidden lg:flex lg:items-center lg:justify-start lg:shrink-0 lg:sticky lg:top-28 lg:self-start lg:pt-2">
        <ProfileSidebar />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex min-w-0 w-full flex-1 flex-col items-center space-y-24 sm:space-y-28 lg:items-stretch lg:space-y-32">
        <Intro />
        <SectionDivider />
        <Skills />
      </main>

    </div>
  );
}

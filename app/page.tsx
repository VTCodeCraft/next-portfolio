import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import Sidebar from "@/components/sidebar";
import Skills from "@/components/skills";
import ProfileSidebar from "@/components/profile-sidebar";

export default function Home() {
  return (
    <div className="flex max-w-6xl mx-auto px-6 gap-16">
      
      {/* LEFT SIDE (NAV) */}
      <div className="hidden lg:flex flex-col gap-16 w-60">
        <Sidebar />
      </div>

      <div className="flex flex-col gap-16 w-50 position- top-20">
        <ProfileSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 space-y-32">
        <Intro />
        <SectionDivider />
        <Skills />
      </div>

    </div>
  );
}
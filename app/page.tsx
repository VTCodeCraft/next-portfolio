import Intro from "@/components/intro";
import ProfileSidebar from "@/components/profile-sidebar";
import SectionDivider from "@/components/section-divider";
import Sidebar from "@/components/sidebar";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[20%_20%_60%] lg:gap-0">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:sticky lg:top-32 lg:flex lg:min-h-[calc(100vh-8rem)] lg:items-center lg:self-start">
        <Sidebar />
      </aside>

      {/* PROFILE IMAGE SECTION */}
      <div className="hidden lg:sticky lg:top-32 lg:flex lg:min-h-[calc(100vh-8rem)] lg:items-center lg:justify-center lg:self-start">
        <ProfileSidebar />
      </div>

      {/* RIGHT CONTENT AREA */}
      <main className="min-w-0 lg:pl-8 xl:pl-10">
        <div className="space-y-24 sm:space-y-28 lg:space-y-32">
          <Intro />
          <SectionDivider />
          {/* <Skills /> */}
        </div>
      </main>
    </div>
  );
}

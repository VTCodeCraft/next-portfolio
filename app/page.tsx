import Intro from "@/components/intro";
import ProfileSidebar from "@/components/profile-sidebar";
import SectionDivider from "@/components/section-divider";
import Sidebar from "@/components/sidebar";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-start lg:gap-16 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-20">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:self-start">
        <Sidebar />
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="min-w-0">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-16">
          <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <ProfileSidebar />
          </div>

          <div className="min-w-0 space-y-24 sm:space-y-28 lg:space-y-32">
            <Intro />
            <SectionDivider />
            {/* <Skills /> */}
          </div>
        </div>
      </main>
    </div>
  );
}

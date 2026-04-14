import Contact from "@/components/sections/contact";
import Intro from "@/components/sections/intro";
import MyJourney from "@/components/sections/my-journey";
import ProfileSidebar from "@/components/layout/profile-sidebar";
import SectionDivider from "@/components/ui/section-divider";
import Sidebar from "@/components/layout/sidebar";
import Skills from "@/components/sections/skills";

export default function Home() {
  return (
    <div className="flex w-full flex-col lg:flex-row">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-[10rem] lg:flex-none lg:pl-0 lg:sticky lg:top-24 lg:flex lg:min-h-[calc(100vh-16rem)] lg:items-center lg:self-start">
        <Sidebar />
      </aside>

      <div className="w-full min-w-0 px-4 sm:px-6 lg:flex-1">
        <div className="mx-auto w-full max-w-[940px]">
          <div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-[20%_80%] lg:gap-0">
            {/* PROFILE IMAGE SECTION */}
            <div className="hidden lg:flex lg:justify-center lg:self-start lg:sticky lg:top-28 lg:pt-2">
              <ProfileSidebar />
            </div>

            {/* RIGHT CONTENT AREA */}
            <main className="min-w-0 max-w-full lg:pl-4 xl:pl-6">
              <div className="space-y-24 sm:space-y-28 lg:space-y-32">
                <Intro />
                <div className="deferred-section">
                  <SectionDivider />
                  <Skills />
                </div>
                <div className="deferred-section">
                  <SectionDivider />
                  <MyJourney />
                </div>
                <div className="deferred-section">
                  <SectionDivider />
                  <Contact />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


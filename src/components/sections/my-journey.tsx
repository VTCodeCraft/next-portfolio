import SectionHeading from "@/components/ui/section-heading";
import { educationData, experiencesData } from "@/lib/data";

/**
 * Experience as scannable rows rather than a decorated timeline.
 *
 * Each entry answers what was built, with what, and why it mattered. Replaces
 * react-vertical-timeline-component, which shipped its own stylesheet and an
 * observer to render two items.
 */
export default function MyJourney() {
  return (
    <section id="experience" className="scroll-mt-32">
      <SectionHeading index="04" rule meta="2 roles">
        Where I&apos;ve built
      </SectionHeading>

      <ol className="m-0 list-none p-0">
        {experiencesData.map((item) => (
          <li key={item.company} className="border-t border-border">
            <div className="grid gap-x-5 gap-y-1.5 py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
              <p
                className={`type-eyebrow tabular-nums tracking-[0.12em] ${
                  item.current ? "text-primary" : ""
                }`}
              >
                {item.date}
              </p>

              <div>
                <h3 className="text-[0.88rem] font-medium text-foreground">
                  {item.role}
                </h3>
                <p className="type-eyebrow mt-1 tracking-[0.14em]">
                  {item.company}
                </p>
                <p className="mt-2.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}

        <li className="border-y border-border">
          <div className="grid gap-x-5 gap-y-1.5 py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
            <p className="type-eyebrow tabular-nums tracking-[0.12em]">
              {educationData.date}
            </p>
            <div>
              <h3 className="text-[0.88rem] font-medium text-foreground">
                {educationData.degree}
              </h3>
              <p className="type-eyebrow mt-1 tracking-[0.14em]">
                {educationData.school}
              </p>
              <p className="mt-2.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                {educationData.detail}
              </p>
            </div>
          </div>
        </li>
      </ol>
    </section>
  );
}

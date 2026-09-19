import { MotionMountSection } from "@/components/ui/reveal";

const RESUME_HREF =
  "https://drive.google.com/file/d/1uljZezLmLt1QII77AEl0bsHr-VCr-NSZ/view?usp=sharing";

/**
 * Route hero.
 *
 * Compact on purpose, matching /projects: the record is the point of this
 * page, so the introduction says what the work is and gets out of the way
 * rather than taking a viewport of its own.
 *
 * The role count is read off the data so it cannot drift out of date.
 */
export default function ExperienceHeader({ roleCount }: { roleCount: number }) {
  return (
    <MotionMountSection delay={0.05} aria-labelledby="experience-title">
      {/* Plain text, no hidden punctuation. An earlier version hid the slash
          and substituted a comma for screen readers, which put a stray comma
          into the accessible name for no gain. */}
      <p className="type-eyebrow text-[var(--text-subtle)]">
        Work experience / 01
      </p>

      <div className="mt-5 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <h1 id="experience-title" className="type-display text-foreground">
            Software I&rsquo;ve built in production
          </h1>
          <p className="type-prose type-body mt-5 text-muted-foreground">
            I&rsquo;m a software engineer working across full-stack systems,
            real-time infrastructure and AI-powered products — mostly backend
            architecture, media pipelines and the tool harnesses that let a
            model do useful work without being trusted with the database.
          </p>
        </div>

        <dl className="flex shrink-0 gap-8 sm:gap-10">
          <div>
            <dt className="type-eyebrow text-[var(--text-subtle)]">Roles</dt>
            <dd className="type-h3 m-0 mt-1.5 tabular-nums text-foreground">
              {roleCount}
            </dd>
          </div>
          <div>
            <dt className="type-eyebrow text-[var(--text-subtle)]">Since</dt>
            <dd className="type-h3 m-0 mt-1.5 tabular-nums text-foreground">
              <time dateTime="2025-06">2025</time>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6">
        <a
          href={RESUME_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-11 items-center gap-1.5 type-button text-muted-foreground transition-colors hover:text-foreground"
        >
          Résumé
          <span
            aria-hidden
            className="translate-y-px transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
          >
            ↗
          </span>
        </a>
      </div>
    </MotionMountSection>
  );
}

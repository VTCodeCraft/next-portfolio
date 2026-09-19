import type { Experience } from "@/lib/experience";

/**
 * The masthead of a role: company, then role, location and dates as mono
 * metadata beneath it.
 *
 * Dates are two <time> elements rather than one string, because a range is
 * two instants and dateTime cannot express "Jul 2026 — Present" in one
 * attribute. A current role has no end date, so the second element is a plain
 * word — writing today's date into a dateTime would be a claim the role ended.
 */
export default function ExperienceMeta({
  item,
  headingId,
}: {
  item: Experience;
  headingId: string;
}) {
  return (
    <header>
      <h2 id={headingId} className="type-statement text-foreground">
        {item.company}
      </h2>

      {/*
        Stacks on small screens and only sits on one row once there is room
        for it. The middot separators are hidden from assistive tech, which
        would otherwise read them out between every field.
      */}
      <p className="type-meta mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-muted-foreground">
        <span className="text-foreground">{item.role}</span>
        <span aria-hidden className="text-[var(--text-faint)]">
          ·
        </span>
        <span>{item.location}</span>
        <span aria-hidden className="text-[var(--text-faint)]">
          ·
        </span>
        <span className="tabular-nums">
          <time dateTime={item.startISO}>{item.start}</time>
          <span aria-hidden> — </span>
          <span className="sr-only"> to </span>
          {item.endISO ? (
            <time dateTime={item.endISO}>{item.end}</time>
          ) : (
            <span>{item.end}</span>
          )}
        </span>
      </p>
    </header>
  );
}

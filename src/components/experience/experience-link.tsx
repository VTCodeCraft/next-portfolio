import type { ExperienceLink as ExperienceLinkData } from "@/lib/experience";

/**
 * The one link treatment on this route.
 *
 * Text with a trailing arrow rather than a button: a page with eight outbound
 * links and eight filled buttons reads as a landing page. The 44px target is
 * carried by min-h rather than by padding, so the link still sits on the text
 * baseline of the row it belongs to.
 */
export default function ExperienceLink({ label, href }: ExperienceLinkData) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex min-h-11 items-center gap-1.5 type-button text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
      <span
        aria-hidden
        className="translate-y-px transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
      >
        ↗
      </span>
    </a>
  );
}

/** Wraps a set of links so the wrap behaviour is defined once. */
export function ExperienceLinks({ links }: { links: ExperienceLinkData[] }) {
  if (links.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6">
      {links.map((link) => (
        <ExperienceLink key={link.href} {...link} />
      ))}
    </div>
  );
}

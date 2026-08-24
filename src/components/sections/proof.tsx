import { proofData } from "@/lib/data";

/**
 * Compact credibility row directly under the hero.
 *
 * Deliberately not a stat dashboard: no cards, no fills, no icons — just
 * figures on hairlines. Every value is verifiable from the resume or a live
 * artifact, and nothing here is rounded up.
 */
export default function Proof() {
  return (
    <section aria-label="Highlights" className="page-column">
      <dl className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-4">
        {proofData.map((item) => (
          <div
            key={item.label}
            className="border-b border-r border-border px-3 py-4 text-center"
          >
            <dt className="sr-only">{item.label}</dt>
            <dd className="m-0">
              <span
                className={`block font-heading text-lg font-semibold tabular-nums tracking-[-0.03em] sm:text-xl ${
                  "accent" in item && item.accent ? "text-primary" : "text-foreground"
                }`}
              >
                {item.value}
              </span>
              <span className="type-eyebrow mt-1.5 block tracking-[0.14em]">
                {item.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

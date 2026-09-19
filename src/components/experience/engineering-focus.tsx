/**
 * What the work is, in six words or fewer per line.
 *
 * A two-column list on wide screens, one on a phone. No icons: six lucide
 * glyphs beside six two-word labels adds decoration and nothing else, and it
 * is the point at which a technical page starts reading as a feature grid.
 */
export default function EngineeringFocus({
  label = "Engineering focus",
  items,
}: {
  label?: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="border-t border-border pt-6">
      <p className="type-eyebrow text-[var(--text-subtle)]">{label}</p>

      <ul className="mt-4 grid list-none grid-cols-1 gap-x-8 gap-y-0 p-0 sm:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-baseline gap-3 border-b border-border py-2.5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <span
              aria-hidden
              className="type-eyebrow shrink-0 tabular-nums text-[var(--text-faint)]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="type-meta text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

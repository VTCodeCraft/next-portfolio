/**
 * A stack list.
 *
 * Plain wrapping text separated by middots rather than a row of pills. Twelve
 * bordered chips is the single fastest way to make a page look like a
 * template, and the list carries no more information for the border.
 */
export default function TechnologyList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="type-eyebrow text-[var(--text-subtle)]">{label}</p>
      {/*
        leading is loosened because uppercase mono at 11px wraps to three or
        four lines on a phone, and at the default line height those lines
        close up into a block.
      */}
      <ul className="mt-3 flex list-none flex-wrap items-baseline gap-x-2.5 gap-y-1.5 p-0 type-meta leading-[1.6] text-muted-foreground">
        {items.map((item, index) => (
          <li key={item} className="flex items-baseline gap-2.5">
            {index > 0 ? (
              <span aria-hidden className="text-[var(--text-faint)]">
                ·
              </span>
            ) : null}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type TocItem = {
  title: string;
  url: string;
  items?: TocItem[];
};

type TocProps = {
  items: TocItem[];
};

function TocItems({ items }: TocProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            {item.title}
          </a>
          {item.items && item.items.length > 0 ? (
            <div className="mt-2 border-l border-border pl-3">
              <TocItems items={item.items} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function Toc({ items }: TocProps) {
  if (items.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-border bg-card/80 p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        On This Page
      </p>
      <TocItems items={items} />
    </aside>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/", label: "Home", detail: "Intro, skills, and how to reach me" },
  { href: "/projects", label: "Projects", detail: "Selected engineering work" },
  { href: "/blog", label: "Blog", detail: "Notes on frontend and systems" },
];

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[940px] flex-col px-4 sm:px-6">
      <p className="type-eyebrow text-primary">Error 404</p>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>

      <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
        The link may be out of date, or the page may have moved. Here is where
        to go instead.
      </p>

      <nav aria-label="Suggested pages" className="mt-10 flex flex-col gap-px overflow-hidden rounded-xl border border-border">
        {destinations.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-baseline justify-between gap-4 bg-[var(--surface-glass)] px-5 py-4 transition hover:bg-accent"
          >
            <span className="text-sm font-medium text-foreground">
              {item.label}
            </span>
            <span className="text-right text-[0.78rem] text-muted-foreground">
              {item.detail}
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}

"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { links } from "@/lib/data";

const RESUME_HREF =
  "https://drive.google.com/file/d/1uljZezLmLt1QII77AEl0bsHr-VCr-NSZ/view?usp=sharing";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-3 z-50 sm:top-4">
      <div className="page-shell">
        <m.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center justify-between gap-3 rounded-full border border-border bg-[var(--surface-glass-strong)] px-2.5 py-2 shadow-[var(--shadow-soft)] backdrop-blur-md sm:px-3"
        >
          {/* Identity */}
          <Link
            href="/"
            aria-label="Vishesh Tripathi, home"
            className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2 transition hover:opacity-90"
          >
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/50 bg-[var(--surface-accent-soft)] font-heading text-[0.62rem] font-semibold text-primary"
            >
              VT
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-heading text-[0.78rem] font-semibold tracking-[-0.02em] text-foreground">
                Vishesh Tripathi
              </span>
              <span className="type-eyebrow block tracking-[0.14em]">
                Full-stack engineer
              </span>
            </span>
          </Link>

          {/* Primary navigation */}
          <nav aria-label="Primary">
            <ul className="flex list-none items-center gap-0.5 p-0">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-11 items-center rounded-full px-3 text-[0.78rem] font-medium leading-none transition sm:px-4 ${
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Status and secondary action */}
          <div className="flex shrink-0 items-center gap-2.5">
            <span className="hidden items-center gap-1.5 lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--surface-available-dot)]" />
              <span className="type-eyebrow tracking-[0.14em] text-[var(--surface-available-text)]">
                Available
              </span>
            </span>

            <Link
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center rounded-full border border-border px-3.5 text-[0.75rem] font-medium text-foreground transition hover:border-primary hover:bg-accent sm:px-4"
            >
              Résumé
            </Link>
          </div>
        </m.div>
      </div>
    </header>
  );
}

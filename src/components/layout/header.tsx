"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/components/ui/theme-toggle";
import { links } from "@/lib/data";

const RESUME_HREF =
  "https://drive.google.com/file/d/1uljZezLmLt1QII77AEl0bsHr-VCr-NSZ/view?usp=sharing";

/**
 * Site header.
 *
 * Sticky rather than floating. The previous version was a rounded-full bar
 * with a translucent fill, a blur and a drop shadow, sitting detached in the
 * top margin — the arrangement reads as a widget placed over the page rather
 * than as part of it. This one spans the full width, sits on the page
 * background, and is separated from the content by the same hairline the
 * section rules use, so it belongs to the same system as everything below.
 *
 * The mount animation is gone too: a bar sliding down on every navigation is
 * motion that carries no information, and it was the only reason this file
 * pulled in framer-motion.
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-8">
          {/*
            Wordmark, not a logo chip. The boxed "VT" monogram this replaces
            was a decorative element standing in for a brand that is really
            just a name — the name itself is the stronger mark.
          */}
          <Link
            href="/"
            aria-label="Vishesh Tripathi, home"
            className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-70"
          >
            {/*
              Both marks are always in the DOM and crossfaded by theme rather
              than swapped, so the change happens under the sweep instead of
              popping at the frame where the class flips.

              Two real assets, not one filtered: the supplied files are traced
              artwork, and a CSS invert would not produce the other version of
              it — it would produce a photographic negative.
            */}
            <span className="relative block h-7 w-7 shrink-0">
              <Image
                src="/images/logo_dark.svg"
                alt=""
                aria-hidden
                fill
                sizes="28px"
                priority
                /* next/image refuses SVG unless dangerouslyAllowSVG is on
                   globally. These are our own assets and vectors gain
                   nothing from the optimiser, so they bypass it here
                   instead of loosening the setting for every image. */
                unoptimized
                className="object-contain opacity-0 transition-opacity duration-300 dark:opacity-100 motion-reduce:transition-none"
              />
              <Image
                src="/images/logo_light.svg"
                alt=""
                aria-hidden
                fill
                sizes="28px"
                priority
                /* next/image refuses SVG unless dangerouslyAllowSVG is on
                   globally. These are our own assets and vectors gain
                   nothing from the optimiser, so they bypass it here
                   instead of loosening the setting for every image. */
                unoptimized
                className="object-contain opacity-100 transition-opacity duration-300 dark:opacity-0 motion-reduce:transition-none"
              />
            </span>

            {/* Initials below sm: the full name plus three links plus the
                résumé action and the theme control does not fit a 375px row
                without crowding. */}
            <span className="flex flex-col justify-center leading-none">
              <span className="type-button text-foreground sm:hidden">VT</span>
              <span className="hidden type-button text-foreground sm:block">
                Vishesh Tripathi
              </span>
              <span className="type-eyebrow mt-1.5 hidden text-[var(--text-subtle)] sm:block">
                Full-stack engineer
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-7">
            <nav aria-label="Primary">
              <ul className="flex list-none items-center gap-3 p-0 sm:gap-6">
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    /*
                      The item is the full height of the header so its active
                      indicator can sit exactly on the bottom border, reading
                      as a tab rather than as an underline floating mid-row.
                      64px also clears the 44px touch target on its own.
                    */
                    <li key={link.href} className="relative flex h-16 items-center">
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`type-button transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>

                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/*
              Squared rather than pill-shaped, on the shared --radius. It is
              the one action in the bar, so it keeps an outline; the outline
              is the same hairline as every other border on the site.

              Hidden below sm. With four nav items the row needs ~422px and a
              375px phone has 335px of content width, so something has to go;
              this is the only item in the bar that is not navigation, and it
              is reachable from /experience and from the résumé link in the
              page itself. Losing a nav destination would cost more.
            */}
            <Link
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-9 shrink-0 items-center rounded-md border border-border px-3 type-button text-foreground transition-colors hover:bg-accent sm:flex"
            >
              Résumé
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

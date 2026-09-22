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
            The mark alone.

            It used to sit next to the name and the role, which meant three
            brand elements competing in a 64px row — and the mark was the
            smallest of them, so it read as an icon decorating a wordmark
            rather than as the logo. The name is still the link's accessible
            name, so nothing was lost for anyone not looking at it.
          */}
          {/*
            The link is the positioning context now — the wrapper span it used
            to need is gone. It spans the full 64px row so the mark centres
            against the nav items rather than against a box of its own.

            Both marks stay in the DOM and crossfade by theme rather than
            being swapped, so the change happens under the sweep instead of
            popping at the frame where the class flips. Two real assets, not
            one filtered: a CSS invert would produce a photographic negative
            of the traced artwork, not the other version of it.
          */}
          <Link
            href="/"
            aria-label="Vishesh Tripathi, home"
            className="relative flex h-16 w-[50px] shrink-0 items-center sm:w-[57px]"
          >
            {/* 75% of the row height, full width, centred by the auto margins
                against inset-0. `object-contain` keeps the artwork's own 1.78
                aspect inside that box instead of stretching it. */}
            <Image
              src="/images/logo_dark.svg"
              alt=""
              aria-hidden
              width={728}
              height={409}
              priority
              /* next/image refuses SVG unless dangerouslyAllowSVG is on
                 globally. These are our own assets and vectors gain
                 nothing from the optimiser, so they bypass it here
                 instead of loosening the setting for every image. */
              unoptimized
              className="absolute inset-0 m-auto h-[75%] w-full object-contain opacity-0 transition-opacity duration-300 dark:opacity-100 motion-reduce:transition-none"
            />
            <Image
              src="/images/logo_light.svg"
              alt=""
              aria-hidden
              width={981}
              height={551}
              priority
              /* next/image refuses SVG unless dangerouslyAllowSVG is on
                 globally. These are our own assets and vectors gain
                 nothing from the optimiser, so they bypass it here
                 instead of loosening the setting for every image. */
              unoptimized
              className="absolute inset-0 m-auto h-[75%] w-full object-contain opacity-100 transition-opacity duration-300 dark:opacity-0 motion-reduce:transition-none"
            />
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

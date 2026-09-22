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
          <Link
            href="/"
            aria-label="Vishesh Tripathi, home"
            className="group flex shrink-0 items-center transition-opacity hover:opacity-70"
          >
            {/*
              Both marks are always in the DOM and crossfaded by theme rather
              than swapped, so the change happens under the sweep instead of
              popping at the frame where the class flips.

              Two real assets, not one filtered: the supplied files are traced
              artwork, and a CSS invert would not produce the other version of
              it — it would produce a photographic negative.
            */}
            {/*
              Sized by the artwork's own 1.78 aspect rather than forced into
              a square. In a square box `object-contain` scaled the mark to
              fit the height it did not have, so a 28px slot rendered a 14px
              glyph — most of the space went to the letterbox.

              36x64 on a phone, 40x71 from sm. Against a 64px bar that puts
              the glyph at roughly 37px tall, which is about four times what
              was on screen before.
            */}
            <span className="relative block h-9 w-16 shrink-0 sm:h-10 sm:w-[71px]">
              <Image
                src="/images/logo_dark.svg"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 64px, 71px"
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
                sizes="(max-width: 640px) 64px, 71px"
                priority
                /* next/image refuses SVG unless dangerouslyAllowSVG is on
                   globally. These are our own assets and vectors gain
                   nothing from the optimiser, so they bypass it here
                   instead of loosening the setting for every image. */
                unoptimized
                className="object-contain opacity-100 transition-opacity duration-300 dark:opacity-0 motion-reduce:transition-none"
              />
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

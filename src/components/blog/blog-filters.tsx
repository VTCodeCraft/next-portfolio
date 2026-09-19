"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Title search, kept as a field and stripped of its chrome.
 *
 * This already existed and already drove `?search=`, so the URL contract and
 * the behaviour are unchanged — what went is the presentation. It used to be
 * an input with a rounded border sitting inside a rounded, shadowed glass
 * panel: two nested containers and a drop shadow above an editorial list.
 *
 * Now it is a line. The rule under it is the same hairline the archive uses,
 * so the control sits in the page rather than on it.
 *
 * Not switched to tag tabs: there are nine tags across three notes, every one
 * of them used exactly once, so a tab bar would be ten controls that each
 * return a single result.
 */
export default function BlogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();
    /* `replace`, not `push`: typing should not fill the back button with a
       history entry per keystroke. */
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="max-w-xs">
      <label htmlFor="blog-search" className="sr-only">
        Search build notes by title
      </label>
      <input
        id="blog-search"
        type="search"
        value={search}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search"
        /*
          Border rather than an outline for the focus state. The global
          stylesheet sets `outline: none !important` on every anchor and
          button and clears box-shadow with it, so a ring utility here would
          be silently dropped; a border colour is not.
        */
        className="
          type-meta w-full border-b border-border bg-transparent pb-2
          text-foreground outline-none transition-colors duration-200
          placeholder:text-[var(--text-subtle)]
          focus:border-foreground
          motion-reduce:transition-none
        "
      />
    </div>
  );
}

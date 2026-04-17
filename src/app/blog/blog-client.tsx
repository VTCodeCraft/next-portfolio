"use client";

import { useDeferredValue } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PostList } from "@/components/blog/post-list";
import type { PostCardData } from "@/components/blog/post-card";

type BlogClientProps = {
  posts: PostCardData[];
};

export default function BlogClient({ posts }: BlogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(deferredSearch),
  );

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className="max-w-md rounded-2xl border border-border bg-[var(--surface-glass)] p-2.5 shadow-[var(--shadow-card)]">
        <label htmlFor="blog-search" className="sr-only">
          Search posts
        </label>
        <input
          id="blog-search"
          value={search}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder="Search the archive..."
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <PostList posts={filteredPosts} />
    </>
  );
}


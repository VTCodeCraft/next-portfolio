"use client";

import { useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";

import BlogFilters from "@/components/blog/blog-filters";
import BlogList from "@/components/blog/blog-list";
import type { Post } from "@/lib/blog";

/**
 * The archive and its search field.
 *
 * Filtering runs on the client against the already-shipped list rather than
 * off `searchParams` on the server, which would opt the whole route out of
 * static rendering to narrow a handful of items the browser already has.
 */
export default function BlogClient({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const visiblePosts = deferredSearch
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(deferredSearch),
      )
    : posts;

  return (
    <>
      <div className="mb-8">
        <BlogFilters />
      </div>

      <BlogList
        posts={visiblePosts}
        emptyMessage={
          deferredSearch ? "Nothing matches that." : "No build notes yet."
        }
        emptyDetail={
          deferredSearch
            ? "Clear the search to see everything."
            : "I write these up as I build. The first one is on the way."
        }
      />
    </>
  );
}

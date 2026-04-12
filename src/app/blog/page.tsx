import type { Metadata } from "next";
import { Suspense } from "react";

import { posts } from "#site/content";

import BlogClient from "@/app/blog/blog-client";
import type { PostCardData } from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "Blog | Vishesh Tripathi",
  description:
    "Notes on full-stack development, UI engineering, performance, and the craft behind Vishesh Tripathi's portfolio work.",
};

const publishedPosts = posts
  .filter((post) => post.published)
  .sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ) satisfies PostCardData[];

export default function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Blog
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Field notes from the build
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Practical notes on building polished interfaces, fast apps, and
          maintainable full-stack systems.
        </p>
      </div>

      <Suspense>
        <BlogClient posts={publishedPosts} />
      </Suspense>
    </section>
  );
}

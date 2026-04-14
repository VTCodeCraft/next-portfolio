import type { Metadata } from "next";
import { Suspense } from "react";

import { posts } from "#site/content";

import BlogClient from "@/app/blog/blog-client";
import type { PostCardData } from "@/components/blog/post-card";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Blog | Vishesh Tripathi",
  description:
    "Notes on design systems, frontend craft, and the implementation details behind polished products.",
};

const publishedPosts = posts
  .filter((post) => post.published)
  .sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ) satisfies PostCardData[];

export default function BlogPage() {
  return (
    <section className="mx-auto -mt-8 w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start">
        <SectionHeading className="mb-4 items-start lg:items-start">
          My Blog
        </SectionHeading>

        <div className="w-full rounded-[28px] border border-border bg-card/80 px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-8">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Thoughts on interface design, frontend systems, performance, and
            the small decisions that shape how a product feels in everyday use.
          </p>
        </div>
      </div>

      <Suspense>
        <BlogClient posts={publishedPosts} />
      </Suspense>
    </section>
  );
}


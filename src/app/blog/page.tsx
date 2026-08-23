import type { Metadata } from "next";
import { Suspense } from "react";

import { posts } from "#site/content";

import BlogClient from "@/app/blog/blog-client";
import { BlogPageShell } from "@/components/blog/blog-page-shell";
import type { PostCardData } from "@/components/blog/post-card";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  // Just "Blog": the root layout's title template appends the name, so
  // spelling it out here produced "Blog | Vishesh Tripathi | Vishesh Tripathi".
  title: "Blog",
  description:
    "Notes on design systems, frontend craft, and the implementation details behind polished products.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Vishesh Tripathi",
    description:
      "Notes on design systems, frontend craft, and the implementation details behind polished products.",
    url: "/blog",
  },
};

const publishedPosts = posts
  .filter((post) => post.published)
  .sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ) satisfies PostCardData[];

export default function BlogPage() {
  return (
    <BlogPageShell
      intro={
        <>
          <SectionHeading as="h1" className="mb-4 items-start lg:items-start">
            My Blog
          </SectionHeading>

          <div className="w-full rounded-[28px] border border-border bg-[var(--surface-glass)] px-6 py-7 shadow-[var(--shadow-card-strong)] sm:px-8">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              Thoughts on interface design, frontend systems, performance, and
              the small decisions that shape how a product feels in everyday
              use.
            </p>
          </div>
        </>
      }
      content={
        <Suspense>
          <BlogClient posts={publishedPosts} />
        </Suspense>
      }
    />
  );
}


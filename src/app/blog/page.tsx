import type { Metadata } from "next";
import { Suspense } from "react";

import BlogClient from "@/app/blog/blog-client";
import BlogHeader from "@/components/blog/blog-header";
import BlogList from "@/components/blog/blog-list";
import { publishedPosts } from "@/lib/blog";

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

export default function BlogPage() {
  return (
    /*
      One centred column, wider than the site's reading measure.

      `page-column` is 46rem, which would put the two covers at 352px each —
      narrow enough that a 16:9 photograph stops reading as a picture. 56rem
      gives 432px tiles, and the grid still sits well inside the 1240px shell
      rather than spreading across it.
    */
    <div className="page-shell pb-24">
      <div className="mx-auto w-full max-w-[56rem]">
        <BlogHeader />

        <div className="mt-10">
          {/*
            `useSearchParams` inside BlogClient forces a Suspense boundary,
            and on a static route the fallback is what lands in the HTML —
            so the fallback is the full archive. Crawlers and a visitor
            without JavaScript get every note and every link; hydration adds
            the search field on top of the same list.
          */}
          <Suspense fallback={<BlogList posts={publishedPosts} />}>
            <BlogClient posts={publishedPosts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

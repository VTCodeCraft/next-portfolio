import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogArticleHeader from "@/components/blog/blog-article-header";
import { MdxContent } from "@/components/blog/mdx-content";
import RelatedPosts from "@/components/blog/related-posts";
import { getPost, getRelatedPosts, publishedPosts } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// www is canonical; the bare host 301s to it, so JSON-LD must not point there.
const siteUrl = "https://www.vtcodecraft.in";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slugAsParams }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    // Bare titles only — the root layout's template appends the site name.
    return { title: "Post not found" };
  }

  const url = `/blog/${post.slugAsParams}`;
  const images = post.cover ? [post.cover] : [];

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const articleUrl = new URL(`/blog/${post.slugAsParams}`, siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: articleUrl,
    author: {
      "@type": "Person",
      name: "Vishesh Tripathi",
    },
    image: post.cover ? new URL(post.cover, siteUrl).toString() : undefined,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/*
        One column for the whole page — masthead, body and the next-notes
        list share a left edge. It is the measure rather than a container:
        no panel, no radius, no shadow around the text.

        36rem, measured rather than guessed. The body face averages 7.73px
        per character at 16px, so 576px is about 75 characters a line, the
        top of the readable band. Worth noting `max-width: 70ch` would not
        have given that: `ch` is the advance of a zero, 10.61px here, so 70ch
        is 743px and closer to 96 characters.

        The body used to sit in a 30px-radius glass card with an extra-large
        shadow inside a wider wrapper, so the reading column had a visible
        frame and started 90px right of the header above it.
      */}
      <div className="page-shell pb-24">
        <div className="mx-auto w-full max-w-[36rem]">
          <article>
            <BlogArticleHeader post={post} />

            <div className="mdx-content mt-12 border-t border-border pt-10">
              <MdxContent code={post.body} />
            </div>
          </article>

          <RelatedPosts posts={getRelatedPosts(post)} />
        </div>
      </div>
    </>
  );
}

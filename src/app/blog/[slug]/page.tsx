import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { posts } from "#site/content";

import { MdxContent } from "@/components/blog/mdx-content";
import { PostHeader } from "@/components/blog/post-header";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = "https://vtcodecraft.in";

const getPost = (slug: string) =>
  posts.find((post) => post.slugAsParams === slug && post.published);

export const dynamicParams = false;

export function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slugAsParams }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Vishesh Tripathi",
    };
  }

  const url = `/blog/${post.slugAsParams}`;
  const images = post.cover ? [post.cover] : [];

  return {
    title: `${post.title} | Vishesh Tripathi`,
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

      <article className="mx-auto -mt-8 w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <PostHeader
            title={post.title}
            description={post.description}
            date={post.date}
            readingTime={post.readingTime}
            cover={post.cover}
            tags={post.tags}
          />

          <div className="mx-auto mt-12 max-w-3xl rounded-[30px] border border-border bg-card/75 px-5 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:px-8 lg:px-10">
            <div className="mdx-content">
              <MdxContent code={post.body} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}


import Link from "next/link";

import { Tag } from "@/components/blog/tag";

export type PostCardData = {
  title: string;
  description: string;
  date: string;
  slugAsParams: string;
  readingTime: string;
  tags: string[];
};

type PostCardProps = {
  post: PostCardData;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slugAsParams}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/95 p-5 text-card-foreground shadow-[0_20px_60px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/8 blur-2xl transition duration-500 group-hover:bg-primary/14"
      />

      <div className="relative flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground transition group-hover:text-primary">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

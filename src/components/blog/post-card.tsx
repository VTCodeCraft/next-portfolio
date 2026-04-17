import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/blog/tag";

export type PostCardData = {
  title: string;
  description: string;
  date: string;
  slugAsParams: string;
  readingTime: string;
  tags: string[];
  cover?: string;
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
      className="group relative flex h-full flex-col gap-5 text-card-foreground transition duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-border bg-card shadow-[var(--shadow-card-strong)]">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            width={1200}
            height={800}
            className="aspect-[16/11] w-full object-cover opacity-82 transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[16/11] w-full bg-gradient-to-br from-card via-secondary to-background" />
        )}
      </div>

      <div className="relative flex flex-1 flex-col gap-4 px-0.5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>{post.tags[0] ?? "Journal"}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-[family:var(--font-heading)] text-2xl font-semibold leading-tight tracking-[-0.05em] text-foreground transition group-hover:text-primary sm:text-[2rem]">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}


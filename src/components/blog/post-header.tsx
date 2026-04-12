import Image from "next/image";

import { Tag } from "@/components/blog/tag";

type PostHeaderProps = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  cover?: string;
  tags: string[];
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export function PostHeader({
  title,
  description,
  date,
  readingTime,
  cover,
  tags,
}: PostHeaderProps) {
  return (
    <header className="space-y-8">
      <div className="mx-auto max-w-3xl space-y-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          <time dateTime={date}>{formatDate(date)}</time>
          <span aria-hidden>•</span>
          <span>{readingTime}</span>
        </div>

        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      {cover ? (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
          <Image
            src={cover}
            alt=""
            width={1600}
            height={900}
            priority
            className="aspect-[16/9] w-full object-cover opacity-90"
          />
        </div>
      ) : null}
    </header>
  );
}

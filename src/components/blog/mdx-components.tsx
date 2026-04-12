"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

const getTextContent = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: React.ReactNode };
    return getTextContent(props.children);
  }
  return "";
};

function CustomImage(props: React.ComponentProps<"img">) {
  const src = typeof props.src === "string" ? props.src : "";

  if (!src) return null;

  return (
    <span className="relative my-8 block overflow-hidden rounded-2xl border border-border bg-card">
      <Image
        src={src}
        alt={props.alt ?? ""}
        width={1400}
        height={788}
        className="h-auto w-full object-cover"
      />
    </span>
  );
}

function CustomLink(props: React.ComponentProps<"a">) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    return <Link href={href}>{props.children}</Link>;
  }

  return (
    <a target="_blank" rel="noreferrer" {...props}>
      {props.children}
    </a>
  );
}

function CodeBlock({ children, className }: ComponentProps) {
  const [copied, setCopied] = useState(false);
  const code = getTextContent(children).trim();

  const copyCode = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground opacity-0 transition hover:text-foreground group-hover:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className={className}>{children}</pre>
    </div>
  );
}

function Callout({
  children,
  type = "note",
}: {
  children: React.ReactNode;
  type?: "note" | "warning" | "success";
}) {
  const label = {
    note: "Note",
    warning: "Heads up",
    success: "Nice",
  }[type];

  return (
    <aside className="my-6 rounded-2xl border border-border bg-secondary/60 px-5 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <div className="text-sm leading-7 text-foreground">{children}</div>
    </aside>
  );
}

function YouTube({ id, title = "YouTube video" }: { id: string; title?: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
      />
    </div>
  );
}

export const mdxComponents = {
  img: CustomImage,
  a: CustomLink,
  pre: CodeBlock,
  Callout,
  YouTube,
};

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
    <span className="relative my-8 block overflow-hidden rounded-[var(--radius)] border border-border bg-card">
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
    <div className="group relative my-6 overflow-hidden rounded-[var(--radius)] border border-border">
      {/*
        The block keeps a fixed dark surface in both themes (see mdx.css), so
        the control is styled against that rather than against the page — a
        light pill on a light page vanished the moment the theme flipped.

        `focus-visible:opacity-100` because the opacity is the only thing
        hiding it: without that, tabbing to the button moves focus to
        something invisible.
      */}
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-2.5 top-2.5 z-10 rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60 opacity-0 transition hover:text-white focus-visible:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
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

  // A margin note, not a filled panel — same hairline treatment as a
  // blockquote, so the two asides in the system match.
  return (
    <aside className="my-7 border-l border-border py-1 pl-5">
      <p className="type-eyebrow mb-2 text-[var(--text-subtle)]">{label}</p>
      <div className="type-body text-foreground">{children}</div>
    </aside>
  );
}

function YouTube({ id, title = "YouTube video" }: { id: string; title?: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-[var(--radius)] border border-border bg-card">
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

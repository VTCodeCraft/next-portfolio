"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";

import { mdxComponents } from "@/components/blog/mdx-components";

type MdxContentProps = {
  code: string;
};

type MdxComponent = React.ComponentType<{
  components?: typeof mdxComponents;
}>;

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMemo(() => {
    const fn = new Function(code);
    return fn(runtime).default as MdxComponent;
  }, [code]);

  return <Component components={mdxComponents} />;
}

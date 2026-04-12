import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import readingTime from "reading-time";
import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(320),
      date: s.isodate(),
      published: s.boolean().default(false),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      slug: s.path(),
      body: s.mdx(),
      raw: s.raw(),
      toc: s.toc({ maxDepth: 3 }),
    })
    .transform((post) => {
      const slugAsParams = post.slug.replace(/^blog\//, "");

      return {
        ...post,
        slugAsParams,
        readingTime: readingTime(post.raw).text,
      };
    }),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to heading",
          },
          content: {
            type: "text",
            value: "#",
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
        },
      ],
    ],
  },
});

import type { MetadataRoute } from "next";

import { posts } from "#site/content";

const siteUrl = "https://www.vtcodecraft.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = posts.filter((post) => post.published);

  const latestPostDate = publishedPosts.reduce<string | null>(
    (latest, post) =>
      !latest || new Date(post.date) > new Date(latest) ? post.date : latest,
    null,
  );

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: latestPostDate ? new Date(latestPostDate) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slugAsParams}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...routes, ...postRoutes];
}

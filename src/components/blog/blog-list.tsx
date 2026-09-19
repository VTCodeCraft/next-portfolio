import BlogPostCard from "@/components/blog/blog-post-card";
import type { Post } from "@/lib/blog";

/**
 * The archive, as a grid of tiles.
 *
 * Still a real <ul>: the tiles are a set with a count, and a list tells
 * assistive technology how many notes there are before it starts reading
 * them. Unordered rather than ordered — the grid reads left-to-right then
 * down, so the visual sequence is not the single ranking an <ol> claims.
 *
 * Two columns from the `sm` breakpoint up, one below. No third column: a
 * 16:9 cover at a third of this measure is 280px wide, at which point the
 * picture stops carrying anything.
 */
export default function BlogList({
  posts,
  emptyMessage = "No build notes yet.",
  emptyDetail = "I write these up as I build. The first one is on the way.",
}: {
  posts: Post[];
  emptyMessage?: string;
  emptyDetail?: string;
}) {
  if (posts.length === 0) {
    /*
      A short paragraph under the same hairline the grid would have used,
      not a dashed box. An empty state framed like a container implies
      something failed to load; this one is just a fact.
    */
    return (
      <div className="border-t border-border py-10">
        <p className="type-h3 text-foreground">{emptyMessage}</p>
        <p className="type-prose type-body mt-2 text-muted-foreground">
          {emptyDetail}
        </p>
      </div>
    );
  }

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2">
      {posts.map((post, index) => (
        <BlogPostCard key={post.slugAsParams} post={post} index={index} />
      ))}
    </ul>
  );
}

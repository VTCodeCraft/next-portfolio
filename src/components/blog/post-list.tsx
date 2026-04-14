import { PostCard, type PostCardData } from "@/components/blog/post-card";

type PostListProps = {
  posts: PostCardData[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/70 px-6 py-12 text-center text-sm text-muted-foreground">
        No published posts match that search yet.
      </div>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slugAsParams} post={post} />
      ))}
    </div>
  );
}


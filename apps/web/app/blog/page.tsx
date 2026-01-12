import Link from 'next/link';

import { BlogCard } from '~/features/blog/components/BlogCard';
import { BlogPagination } from '~/features/blog/components/BlogPagination';
import { BlogService } from '~/features/blog/services/BlogService';
import { apolloClient } from '~/lib/apollo';

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const limit = 5;

  const service = new BlogService(apolloClient);
  const { data } = await service.getPosts(page, limit);
  console.log('data', data);

  const totalPosts = data.posts_aggregate?.aggregate?.count || 0;
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link
          href="/blog/create"
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Create Post
        </Link>
      </div>

      {data.posts && data.posts.length > 0 ? (
        <>
          <div className="space-y-6">
            {data.posts.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <BlogPagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/blog"
            />
          )}
        </>
      ) : (
        <div className="rounded border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">No posts yet.</p>
          <Link
            href="/blog/create"
            className="mt-4 inline-block text-blue-500 hover:underline"
          >
            Be the first to create one
          </Link>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';

import dayjs from 'dayjs';
import { ArrowLeft } from 'lucide-react';

import { BlogService } from '~/features/blog/services/BlogService';
import { apolloClient } from '~/lib/apollo';

export const revalidate = 120;

export default async function BlogDetail({ params }: any) {
  const service = new BlogService(apolloClient);

  try {
    const { data } = await service.getPostById(params.id);

    const post = data.posts_by_pk;

    if (!post) {
      notFound();
    }

    return (
      <article className="mx-auto max-w-2xl py-8">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-500 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <time dateTime={post.created_at}>
              {dayjs(post.created_at).format('MMMM DD, YYYY')}
            </time>
            <span>·</span>
            <span>{post.author?.email}</span>
          </div>
        </header>

        <div className="prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap">
          {post.body}
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}

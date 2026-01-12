import Link from 'next/link';

import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';

export function BlogCard({ post }: any) {
  return (
    <article className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.id}`} className="group">
        <h2 className="mb-2 text-2xl font-semibold transition-colors group-hover:text-blue-500">
          {post.title}
        </h2>
      </Link>

      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <time dateTime={post.created_at}>
          {dayjs(post.created_at).format('MMM DD, YYYY')}
        </time>
        <span>·</span>
        <span>{post.author?.email}</span>
      </div>

      <p className="mb-4 line-clamp-3 text-gray-600">{post.body}</p>

      <Link
        href={`/blog/${post.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
      >
        Read more
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

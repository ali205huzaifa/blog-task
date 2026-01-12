'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';

import { CREATE_POST } from '~/features/blog/graphql/mutations';
import {
  BlogFormValues,
  blogSchema,
} from '~/features/blog/schemas/blog.schema';
import { useAuth } from '~/lib/auth/use-auth';

export default function CreateBlogPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [createPost, { loading: isSubmitting }] = useMutation(CREATE_POST);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = async (values: BlogFormValues) => {
    if (!user) {
      toast.error('You must be logged in to create a post');
      return;
    }

    try {
      const result = await createPost({
        variables: {
          ...values,
          author_id: user.sub,
        },
      });

      if (result.data?.insert_posts_one) {
        toast.success('Post created successfully!');
        router.push('/blog');
      }
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast.error(error?.message || 'Failed to create post. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-6 text-3xl font-bold">Create New Post</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            {...form.register('title')}
            placeholder="Enter post title"
            disabled={isSubmitting}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 disabled:opacity-50"
          />
          {form.formState.errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="body"
            {...form.register('body')}
            placeholder="Enter post content"
            disabled={isSubmitting}
            rows={10}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 disabled:opacity-50"
          />
          {form.formState.errors.body && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.body.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

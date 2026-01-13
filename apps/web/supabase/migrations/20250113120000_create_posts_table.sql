-- Create posts table
create table if not exists public.posts (
    id uuid primary key default extensions.uuid_generate_v4(),
    title text,
    body text,
    author_id uuid,
    created_at timestamp with time zone default now()
);

comment on table public.posts is 'Blog posts created by users';
comment on column public.posts.id is 'Unique identifier for the post';
comment on column public.posts.title is 'Title of the blog post';
comment on column public.posts.body is 'Content of the blog post';
comment on column public.posts.author_id is 'User ID of the post author';
comment on column public.posts.created_at is 'Timestamp when the post was created';

-- Enable RLS on posts table
alter table public.posts enable row level security;

-- Policy: Anyone can read posts
create policy posts_read on public.posts for select to authenticated, anon using (true);

-- Policy: Users can only create their own posts
create policy posts_create on public.posts for insert to authenticated with check (auth.uid() = author_id);

-- Policy: Users can only update their own posts
create policy posts_update on public.posts for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);

-- Policy: Users can only delete their own posts
create policy posts_delete on public.posts for delete to authenticated using (auth.uid() = author_id);

-- Grant permissions
grant select, insert, update, delete on public.posts to authenticated;
grant select on public.posts to anon;

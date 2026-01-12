'use client';

import Link from 'next/link';

import { useAuth } from '~/lib/auth/use-auth';

export function HeaderProfile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Link href="/auth/sign-in">Login</Link>;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-muted-foreground text-sm">{user.email}</span>

      <Link href="/blog/create" className="text-sm font-medium">
        Create Post
      </Link>

      <button onClick={signOut} className="text-sm text-red-500">
        Logout
      </button>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Bookmark {
  id: string;
  guideSlug: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchBookmarks();
    }
  }, [session]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    try {
      const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--ds-background-primary)]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--ds-background-accent)]"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--ds-background-primary)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-[var(--ds-text-muted)] mb-6">
            You need to be signed in to view your dashboard.
          </p>
          <Link href="/auth/signin" className="btn">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ds-background-primary)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, {session.user?.name}!</h1>
          <p className="mt-2 text-[var(--ds-text-muted)]">Manage your bookmarked guides and account settings.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-[var(--ds-background-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[var(--ds-text-muted)] truncate">Bookmarked Guides</dt>
                  <dd className="text-lg font-medium text-white">{bookmarks.length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-[var(--ds-background-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[var(--ds-text-muted)] truncate">Account Status</dt>
                  <dd className="text-lg font-medium text-white">Active</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-[var(--ds-background-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[var(--ds-text-muted)] truncate">Member Since</dt>
                  <dd className="text-lg font-medium text-white">{new Date().toLocaleDateString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks */}
        <div className="card">
          <div className="px-6 py-4 border-b border-[var(--ds-border-subtle)]">
            <h2 className="text-lg font-medium text-white">Your Bookmarked Guides</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded bg-[var(--ds-background-secondary)]"></div>
                ))}
              </div>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-[var(--ds-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">No bookmarks yet</h3>
              <p className="mt-1 text-sm text-[var(--ds-text-muted)]">Start exploring our guides and bookmark your favorites!</p>
              <div className="mt-6">
                <Link href="/guides" className="btn">Browse Guides</Link>
              </div>
            </div>
          ) : (
            <div className="divide-y border-t-0 divide-[var(--ds-border-subtle)]">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="p-6 hover:bg-[var(--ds-background-secondary)]/60">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">
                        <Link href={`/guides/${bookmark.guideSlug}`} className="hover:text-[var(--ds-background-accent)]">
                          {bookmark.title}
                        </Link>
                      </h3>
                      {bookmark.description && (
                        <p className="mt-1 text-sm text-[var(--ds-text-muted)]">{bookmark.description}</p>
                      )}
                      <p className="mt-2 text-xs text-[var(--ds-text-muted)]">Bookmarked on {new Date(bookmark.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <Link href={`/guides/${bookmark.guideSlug}`} className="text-sm text-[var(--ds-background-accent)] hover:underline">
                        View Guide
                      </Link>
                      <Button onClick={() => removeBookmark(bookmark.id)} variant="ghost" size="sm" className="">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

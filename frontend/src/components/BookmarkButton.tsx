'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface BookmarkButtonProps {
  guideSlug: string;
  title: string;
  description?: string;
}

export default function BookmarkButton({ guideSlug, title, description }: BookmarkButtonProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      checkBookmarkStatus();
    }
  }, [session, guideSlug]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const bookmarks = await response.json();
        const isAlreadyBookmarked = bookmarks.some((bookmark: any) => bookmark.guideSlug === guideSlug);
        setIsBookmarked(isAlreadyBookmarked);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!session) {
      // Redirect to sign in if not authenticated
      window.location.href = '/auth/signin';
      return;
    }

    setIsLoading(true);

    try {
      if (isBookmarked) {
        // Remove bookmark - we need to find the bookmark ID first
        const response = await fetch('/api/bookmarks');
        if (response.ok) {
          const bookmarks = await response.json();
          const bookmark = bookmarks.find((b: any) => b.guideSlug === guideSlug);
          if (bookmark) {
            await fetch(`/api/bookmarks/${bookmark.id}`, {
              method: 'DELETE',
            });
            setIsBookmarked(false);
          }
        }
      } else {
        // Add bookmark
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guideSlug,
            title,
            description: description || '',
          }),
        });
        
        if (response.ok) {
          setIsBookmarked(true);
        } else {
          const error = await response.json();
          console.error('Bookmark error:', error.message);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={toggleBookmark}
      disabled={isLoading}
      loading={isLoading}
      variant={isBookmarked ? "default" : "outline"}
      size="sm"
      className={`flex items-center gap-2 transition-all duration-200 ${
        isBookmarked 
          ? 'shadow-lg shadow-red-500/25' 
          : 'border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:border-red-400 dark:hover:border-red-600'
      }`}
    >
      <svg
        className={`w-4 h-4 transition-all duration-200 ${
          isBookmarked ? 'scale-110' : 'scale-100'
        }`}
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
}

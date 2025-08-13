'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import GuideLayout from '@/components/GuideLayout';
import MarkdownPreview from '@/components/MarkdownPreview';
import { GuideMetadata } from '@/lib/mdx';

interface GuideData {
  metadata: GuideMetadata;
  content: string;
}

interface GuidePageProps {
  params: {
    slug: string[];
  };
}

export default function AdminGuidePage({ params }: GuidePageProps) {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchGuideData();
  }, []);

  const fetchGuideData = async () => {
    try {
      const resolvedParams = await params;
      const guideSlug = resolvedParams.slug.join('/');
      
      const response = await fetch(`/api/admin/guides?slug=${encodeURIComponent(guideSlug)}`);
      
      if (response.ok) {
        const data = await response.json();
        
        setGuide({
          metadata: {
            ...data.metadata,
            lastUpdated: data.metadata.lastUpdated || new Date().toISOString().split('T')[0],
            slug: guideSlug,
          },
          content: data.content,
        });
      } else if (response.status === 404) {
        setError('Guide not found');
      } else {
        setError('Failed to load guide');
      }
    } catch (error) {
      console.error('Error fetching guide:', error);
      setError('Error loading guide');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading guide...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="text-lg text-red-600 dark:text-red-400 mb-4">{error}</div>
          <button
            onClick={() => router.push('/admin/guides')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Guides
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!guide) {
    return (
      <AdminLayout>
        <div></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
                📋 Admin Guide View
              </h2>
              <p className="text-blue-700 dark:text-blue-300">
                Viewing guide in admin mode. You can edit or preview this guide.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/guides/preview?slug=${encodeURIComponent(guide.metadata.slug || '')}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Preview
              </Link>
              <Link
                href={`/admin/guides/edit?slug=${encodeURIComponent(guide.metadata.slug || '')}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Guide
              </Link>
              <Link
                href="/admin/guides"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Guide Content */}
        <GuideLayout metadata={guide.metadata}>
          <MarkdownPreview content={guide.content} />
        </GuideLayout>
      </div>
    </AdminLayout>
  );
}

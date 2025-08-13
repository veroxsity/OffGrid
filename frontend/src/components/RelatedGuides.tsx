'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GuideMetadata } from '@/lib/mdx';

interface RelatedGuidesProps {
  currentGuide: GuideMetadata;
}

export default function RelatedGuides({ currentGuide }: RelatedGuidesProps) {
  const [relatedGuides, setRelatedGuides] = useState<GuideMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedGuides();
  }, [currentGuide.slug]);

  const fetchRelatedGuides = async () => {
    try {
      const response = await fetch(`/api/guides/related?slug=${currentGuide.slug}`);
      if (response.ok) {
        const data = await response.json();
        setRelatedGuides(data.relatedGuides);
      }
    } catch (error) {
      console.error('Error fetching related guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Related Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedGuides.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Related Guides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {guide.category}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[guide.difficulty]}`}>
                {guide.difficulty}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {guide.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
              {guide.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>⏱️ {guide.time}</span>
              {guide.ukSpecific && (
                <span className="text-blue-600 dark:text-blue-400">🇬🇧 UK</span>
              )}
            </div>
            
            {guide.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {guide.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {guide.tags.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{guide.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

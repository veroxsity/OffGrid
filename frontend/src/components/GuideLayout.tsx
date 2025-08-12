'use client';

import Link from 'next/link';
import { GuideMetadata } from '@/lib/mdx';

interface GuideLayoutProps {
  metadata: GuideMetadata;
  children: React.ReactNode;
}

export default function GuideLayout({ metadata, children }: GuideLayoutProps) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-red-600 dark:hover:text-red-400">
              Home
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <Link 
              href="/guides" 
              className="hover:text-red-600 dark:hover:text-red-400"
            >
              Guides
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <Link 
              href={`/guides/${metadata.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-red-600 dark:hover:text-red-400"
            >
              {metadata.category}
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li className="text-gray-900 dark:text-gray-100">
            {metadata.title}
          </li>
        </ol>
      </nav>

      {/* Guide Header */}
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            {metadata.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[metadata.difficulty]}`}>
            {metadata.difficulty}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ⏱️ {metadata.time}
          </span>
          {metadata.ukSpecific && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              🇬🇧 UK Specific
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {metadata.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {metadata.description}
        </p>

        {/* Guide Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <span className="font-medium">Last Updated:</span> {metadata.lastUpdated}
          </div>
          {metadata.testedOn && metadata.testedOn.length > 0 && (
            <div>
              <span className="font-medium">Tested On:</span> {metadata.testedOn.join(', ')}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/guides/search?q=${encodeURIComponent(tag)}`}
                className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          📋 What You'll Learn
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This guide covers everything from prerequisites to troubleshooting. 
          All commands are tested and work exactly as written.
        </p>
      </div>

      {/* Guide Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none
                     prose-headings:text-gray-900 dark:prose-headings:text-white
                     prose-p:text-gray-700 dark:prose-p:text-gray-300
                     prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
                     prose-code:text-red-600 dark:prose-code:text-red-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                     prose-pre:bg-gray-900 prose-pre:text-gray-100
                     prose-blockquote:border-l-red-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                     prose-strong:text-gray-900 dark:prose-strong:text-white">
        {children}
      </div>

      {/* Security Warning */}
      <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              🛡️ Security Reminder
            </h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              <p>
                This guide prioritizes security and privacy. Follow the security sections carefully. 
                If you're unsure about any step, ask for help in our Matrix chat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <Link
            href="/guides"
            className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            ← Back to All Guides
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href={`/guides/search?category=${encodeURIComponent(metadata.category)}`}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              More {metadata.category} guides →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

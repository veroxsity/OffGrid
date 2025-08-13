'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  title?: string;
  className?: string;
  stickyOffset?: number;
}

export function TableOfContents({ title = '📋 Table of Contents', className = '', stickyOffset = 96 }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Generate TOC from headings in the document
    const headings = Array.from(document.querySelectorAll('h2, h3, h4')).map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    }));

    setToc(headings);

    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -70% 0%' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`my-8 ${className}`}>
      <div style={{ top: stickyOffset }} className="sticky">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-900/5 dark:shadow-black/30 backdrop-blur-sm">
          <h2 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 uppercase">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-red-600/10 text-red-600 dark:text-red-400 text-xs font-bold">§</span>
            {title}
          </h2>
          <nav className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 ${
                  activeId === item.id
                    ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                }`}
                style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}
              >
                <span className="opacity-40 group-hover:opacity-60 text-[10px]">
                  {item.level === 2 ? '●' : item.level === 3 ? '•' : '◦'}
                </span>
                <span className="truncate">{item.text}</span>
              </button>
            ))}
          </nav>
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-[10px] tracking-wide font-medium text-gray-500 dark:text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

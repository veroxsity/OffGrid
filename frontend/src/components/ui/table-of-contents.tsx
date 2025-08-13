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

export function TableOfContents({ title = 'Table of Contents', className = '', stickyOffset = 96 }: TableOfContentsProps) {
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
    <aside className={`${className}`}>
      <div
        className="sticky"
        style={{ top: stickyOffset, maxHeight: `calc(100vh - ${stickyOffset + 16}px)` }}
      >
        <div className="card p-4 md:p-5 overflow-hidden">
          <h2 className="text-xs font-semibold tracking-wide text-[var(--ds-text-normal)] mb-3 flex items-center gap-2 uppercase">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] text-[10px] font-bold">§</span>
            {title}
          </h2>
          <nav className="-m-1 pr-1 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${stickyOffset + 80}px)` }}>
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={activeId === item.id}
                className={`group w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors border border-transparent hover:bg-[var(--ds-background-tertiary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-background-accent)] ${
                  activeId === item.id
                    ? 'bg-[var(--ds-background-tertiary)] text-white border-[var(--ds-border-subtle)]'
                    : 'text-[var(--ds-text-muted)]'
                }`}
                style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeId === item.id ? 'bg-[var(--ds-background-accent)]' : 'bg-[var(--ds-border-subtle)] group-hover:bg-[var(--ds-background-accent)]'}`}></span>
                <span className="truncate">{item.text}</span>
              </button>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-[var(--ds-border-subtle)]">
            <p className="text-[10px] tracking-wide font-medium text-[var(--ds-text-muted)] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click to navigate
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { GuideMetadata } from '@/lib/mdx';
import BookmarkButton from '@/components/BookmarkButton';
import RelatedGuides from './RelatedGuides';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface GuideLayoutProps {
  metadata: GuideMetadata;
  children: React.ReactNode;
}

export default function GuideLayout({ metadata, children }: GuideLayoutProps) {
  const difficultyClasses: Record<string, string> = {
    Beginner: 'bg-green-500/10 text-green-300 border border-green-400/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/20',
    Advanced: 'bg-red-500/10 text-red-300 border border-red-400/20',
  };

  return (
    <div className="min-h-screen bg-[var(--ds-background-primary)] text-[var(--ds-text-normal)]">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-10 text-xs font-medium tracking-wide">
          <ol className="flex flex-wrap items-center gap-2 text-[var(--ds-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--ds-background-accent)] transition-colors">Home</Link></li>
            <li className="opacity-40">/</li>
            <li><Link href="/guides" className="hover:text-[var(--ds-background-accent)] transition-colors">Guides</Link></li>
            <li className="opacity-40">/</li>
            <li><Link href={`/guides/${metadata.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[var(--ds-background-accent)] transition-colors">{metadata.category}</Link></li>
            <li className="opacity-40">/</li>
            <li className="text-white font-semibold">{metadata.title}</li>
          </ol>
        </nav>

        {/* Hero Card */}
        <Card className="mb-10 overflow-hidden">
          <CardHeader className="relative bg-[var(--ds-background-accent)] text-white p-8 md:p-10">
            <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_40%_40%,white,transparent_75%)]" />
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-5 relative z-10">
              <span className="text-[11px] uppercase tracking-wider font-semibold bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 shadow-sm">
                {metadata.category}
              </span>
              <span className={`text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full backdrop-blur-sm shadow-sm ${difficultyClasses[metadata.difficulty] || 'bg-white/10 text-white border border-white/20'}`}>{metadata.difficulty}</span>
              {metadata.time && (
                <span className="flex items-center text-xs font-medium bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  <svg className="w-4 h-4 mr-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {metadata.time}
                </span>
              )}
              {metadata.ukSpecific && (
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-white border border-blue-400/40 shadow-sm">🇬🇧 UK</span>
              )}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 relative z-10">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-sm">
                  {metadata.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl leading-relaxed">
                  {metadata.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <BookmarkButton guideSlug={metadata.slug} title={metadata.title} description={metadata.description} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs sm:text-sm text-[var(--ds-text-muted)] font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span className="uppercase tracking-wider text-[11px]">Updated</span>
                <span className="text-white/90 font-semibold">{metadata.lastUpdated}</span>
              </div>
              {Array.isArray(metadata.testedOn) && metadata.testedOn.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="uppercase tracking-wider text-[11px]">Tested On</span>
                  <span className="text-white/80">{metadata.testedOn.join(', ')}</span>
                </div>
              )}
            </div>
            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {metadata.tags.map(tag => (
                <Link key={tag} href={`/guides/search?q=${encodeURIComponent(tag)}`} className="group inline-flex items-center gap-1 pl-2 pr-3 py-1 rounded-full text-[11px] font-medium tracking-wide border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)] text-[var(--ds-text-muted)] hover:border-[var(--ds-border-strong)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ds-background-accent)]" /> #{tag}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 order-last lg:order-first">
            <TableOfContents className="lg:mt-2" stickyOffset={140} />
          </div>
          <div className="lg:col-span-9">
            <div className="prose prose-lg dark:prose-invert max-w-none relative">
              {/* gradient top fade for large code blocks */}
              <div className="pointer-events-none absolute -top-4 left-0 right-0 h-6 bg-gradient-to-b from-[var(--ds-background-primary)] to-transparent" />
              {children}
            </div>

            {/* Security Note */}
            <Card className="mt-14 border-l-[3px] border-yellow-400 bg-yellow-500/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Security & Privacy First</h3>
                    <p className="text-[var(--ds-text-muted)] leading-relaxed text-sm">
                      This guide emphasizes hardened, privacy-respecting configurations. Follow each security step; do not skip for convenience. When unsure, consult community resources before proceeding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Guides */}
            <RelatedGuides currentGuide={metadata} />

            {/* Footer Navigation */}
            <div className="mt-16 pt-8 border-t border-[var(--ds-border-subtle)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link href="/guides" className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--ds-text-muted)] hover:text-white transition-colors">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--ds-background-secondary)] group-hover:bg-[var(--ds-background-tertiary)] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </span>
                Back to Guides
              </Link>
              <Link href={`/guides/search?category=${encodeURIComponent(metadata.category)}`} className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--ds-text-muted)] hover:text-white transition-colors">
                More {metadata.category}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--ds-background-secondary)] group-hover:bg-[var(--ds-background-tertiary)] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

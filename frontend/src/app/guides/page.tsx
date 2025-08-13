import Link from 'next/link';
import { getAllGuides } from '@/lib/mdx';

export const metadata = {
  title: 'All Guides | Off-Grid Freedom',
  description: 'Browse all our no-bullshit self-hosting and privacy guides. UK-focused tutorials that actually work.',
};

export default async function GuidesPage() {
  const guides = await getAllGuides({ includeDrafts: false });

  // Group guides by category
  const guidesByCategory = guides.reduce((acc, guide) => {
    const category = guide.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(guide);
    return acc;
  }, {} as Record<string, typeof guides>);

  const difficultyClasses: Record<string, string> = {
    Beginner: 'bg-green-500/10 text-green-300 border border-green-400/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/20',
    Advanced: 'bg-red-500/10 text-red-300 border border-red-400/20',
  };

  return (
    <div className="bg-[var(--ds-background-primary)] text-[var(--ds-text-normal)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">All Guides</h1>
          <p className="text-[var(--ds-text-muted)] max-w-3xl mx-auto mt-2">
            No-bullshit tutorials for self-hosting, privacy, and digital freedom. Every command tested.
          </p>
          <div className="mt-6">
            <Link href="/guides/search" className="btn inline-flex">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Guides</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{guides.length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">Total Guides</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{guides.filter(g => g.ukSpecific).length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">UK-Specific</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{guides.filter(g => g.difficulty === 'Beginner').length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">Beginner</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{Object.keys(guidesByCategory).length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">Categories</div>
          </div>
        </div>

        {/* Guides by Category */}
        {Object.entries(guidesByCategory).map(([category, categoryGuides]) => (
          <section key={category} className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl md:text-2xl font-bold text-white">{category}</h2>
              <Link
                href={`/guides/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[var(--ds-background-accent)] hover:underline font-medium"
              >
                View all {category.toLowerCase()} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="card hover:border-[var(--ds-border-strong)] transition-colors overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${difficultyClasses[guide.difficulty] || 'bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] border border-[var(--ds-border-subtle)]'}`}>
                        {guide.difficulty}
                      </span>
                      {guide.ukSpecific && (
                        <span className="text-xs px-2 py-1 rounded-full border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)]">🇬🇧 UK</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{guide.title}</h3>
                    <p className="text-sm text-[var(--ds-text-muted)] mb-4 line-clamp-2">{guide.description}</p>

                    <div className="flex items-center justify-between text-xs text-[var(--ds-text-muted)]">
                      <span>⏱️ {guide.time}</span>
                      <span>{guide.lastUpdated}</span>
                    </div>

                    {/* Tags */}
                    {guide.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {guide.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="inline-block px-2 py-1 rounded bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] text-xs border border-[var(--ds-border-subtle)]">#{tag}</span>
                        ))}
                        {guide.tags.length > 3 && (
                          <span className="text-xs text-[var(--ds-text-muted)]">+{guide.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* No guides message */}
        {guides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[var(--ds-text-muted)] text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">No guides yet</h2>
            <p className="text-[var(--ds-text-muted)]">We're working on creating awesome content. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

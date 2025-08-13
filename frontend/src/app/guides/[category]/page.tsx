import { getAllGuides } from '@/lib/mdx';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Map URL slugs to display names
const categoryNames: Record<string, string> = {
  'home-servers': 'Home Servers',
  'vpn-tunnels': 'VPN & Tunnels',
  'networking': 'Networking',
  'security': 'Security & Privacy',
  'storage': 'Storage & Backup',
};

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryName = categoryNames[resolvedParams.category];

  if (!categoryName) {
    return {
      title: 'Category Not Found | Off-Grid Freedom',
    };
  }

  return {
    title: `${categoryName} Guides | Off-Grid Freedom`,
    description: `No bullshit ${categoryName.toLowerCase()} tutorials. Self-hosting guides that actually work.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const categoryName = categoryNames[categorySlug];

  if (!categoryName) {
    notFound();
  }

  const allGuides = await getAllGuides({ includeDrafts: false });
  
  // More flexible category matching
  const categoryGuides = allGuides.filter((guide) => {
    const guideCategory = guide.category.toLowerCase();
    const normalizedGuideCategory = guideCategory
      .replace(/\s+/g, '-')
      .replace(/&/g, '')
      .replace(/--+/g, '-');
    
    return normalizedGuideCategory === categorySlug || 
           guideCategory.replace(/\s+/g, '-') === categorySlug ||
           guideCategory.replace(/\s*&\s*/g, '-').replace(/\s+/g, '-') === categorySlug;
  });

  const difficultyClasses: Record<string, string> = {
    Beginner: 'bg-green-500/10 text-green-300 border border-green-400/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/20',
    Advanced: 'bg-red-500/10 text-red-300 border border-red-400/20',
  };

  return (
    <div className="bg-[var(--ds-background-primary)] text-[var(--ds-text-normal)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center gap-3 text-sm">
              <li>
                <Link href="/guides" className="text-[var(--ds-text-muted)] hover:text-white">All Guides</Link>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[var(--ds-text-muted)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-semibold">{categoryName}</span>
              </li>
            </ol>
          </nav>
          
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">{categoryName} Guides</h1>
            <p className="text-[var(--ds-text-muted)] text-lg">{getCategoryDescription(categoryName!)}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{categoryGuides.length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">Total Guides</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{categoryGuides.filter(g => g.ukSpecific).length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">UK-Specific</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{categoryGuides.filter(g => g.difficulty === 'Beginner').length}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">Beginner</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white">{new Set(categoryGuides.flatMap(g => g.tags)).size}</div>
            <div className="text-sm text-[var(--ds-text-muted)]">Unique Tags</div>
          </div>
        </div>

        {/* Guides Grid */}
        {categoryGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card hover:border-[var(--ds-border-strong)] transition-colors overflow-hidden"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${difficultyClasses[guide.difficulty] || 'bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] border border-[var(--ds-border-subtle)]'}`}>
                        {guide.difficulty}
                      </span>
                      {guide.ukSpecific && (
                        <span className="text-xs px-2 py-1 rounded-full border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)]">🇬🇧 UK</span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--ds-text-muted)]">⏱️ {guide.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-1">{guide.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--ds-text-muted)] mb-4 line-clamp-3">{guide.description}</p>

                  {/* Tags */}
                  {guide.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="inline-block px-2 py-1 rounded bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] text-xs border border-[var(--ds-border-subtle)]">#{tag}</span>
                      ))}
                      {guide.tags.length > 4 && (
                        <span className="text-xs text-[var(--ds-text-muted)]">+{guide.tags.length - 4}</span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-[var(--ds-text-muted)]">
                    <span>Updated {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                    <span className="text-[var(--ds-background-accent)]">Read guide →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-[var(--ds-text-muted)] text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">No guides yet in {categoryName}</h2>
            <p className="text-[var(--ds-text-muted)] mb-6">We're working on creating awesome {categoryName!.toLowerCase()} content. Check back soon!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/guides" className="btn">Browse All Guides</Link>
              <Link href="/guides/search" className="btn btn-outline">Search Guides</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryDescription(categoryName: string): string {
  const descriptions: Record<string, string> = {
    'Home Servers': 'Self-host your own services. Stop feeding Big Tech with your data.',
    'VPN & Tunnels': 'Secure connections and privacy tools. Your traffic, your rules.',
    'Networking': 'Router configs, port forwarding, and network setup. UK ISP focused.',
    'Security & Privacy': 'Lock down your digital life. Security that actually works.',
    'Storage & Backup': 'Your data, your control. Reliable backup and storage solutions.',
  };
  
  return descriptions[categoryName] || 'Expert guides for digital freedom and privacy.';
}

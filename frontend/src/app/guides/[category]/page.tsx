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

  const allGuides = await getAllGuides();
  
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

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/guides" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                All Guides
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-4 text-gray-900 dark:text-white font-medium">{categoryName}</span>
            </li>
          </ol>
        </nav>
        
        <div className="mt-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryName} Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {getCategoryDescription(categoryName)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {categoryGuides.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Guides
          </div>
        </div>
        
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {categoryGuides.filter(g => g.ukSpecific).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            UK-Specific
          </div>
        </div>
        
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {categoryGuides.filter(g => g.difficulty === 'Beginner').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Beginner
          </div>
        </div>
        
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {new Set(categoryGuides.flatMap(g => g.tags)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Unique Tags
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      {categoryGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[guide.difficulty]}`}>
                      {guide.difficulty}
                    </span>
                    {guide.ukSpecific && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        🇬🇧 UK
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ⏱️ {guide.time}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {guide.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {guide.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {guide.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {guide.tags.length > 4 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{guide.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Updated {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                  <span className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                    Read guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No guides yet in {categoryName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're working on creating awesome {categoryName.toLowerCase()} content. Check back soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Browse All Guides
            </Link>
            <Link
              href="/guides/search"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Search Guides
            </Link>
          </div>
        </div>
      )}
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

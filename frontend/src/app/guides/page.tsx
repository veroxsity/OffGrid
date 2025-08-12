import Link from 'next/link';
import { getAllGuides } from '@/lib/mdx';

export const metadata = {
  title: 'All Guides | Off-Grid Freedom',
  description: 'Browse all our no-bullshit self-hosting and privacy guides. UK-focused tutorials that actually work.',
};

export default async function GuidesPage() {
  const guides = await getAllGuides();

  // Group guides by category
  const guidesByCategory = guides.reduce((acc, guide) => {
    const category = guide.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(guide);
    return acc;
  }, {} as Record<string, typeof guides>);

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          All Guides
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
          No bullshit tutorials for self-hosting, privacy, and digital freedom. 
          Every command tested, every config included.
        </p>
        
        {/* Search Link */}
        <Link
          href="/guides/search"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Guides
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {guides.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Guides
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {guides.filter(g => g.ukSpecific).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            UK-Specific
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {guides.filter(g => g.difficulty === 'Beginner').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Beginner
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {Object.keys(guidesByCategory).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Categories
          </div>
        </div>
      </div>

      {/* Guides by Category */}
      {Object.entries(guidesByCategory).map(([category, categoryGuides]) => (
        <section key={category} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {category}
            </h2>
            <Link
              href={`/guides/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              View all {category.toLowerCase()} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[guide.difficulty]}`}>
                      {guide.difficulty}
                    </span>
                    {guide.ukSpecific && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        🇬🇧 UK
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {guide.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>⏱️ {guide.time}</span>
                    <span>{guide.lastUpdated}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {guide.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {guide.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{guide.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* No guides message */}
      {guides.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No guides yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're working on creating awesome content. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

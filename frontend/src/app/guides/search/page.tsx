'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface SearchResult {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  slug: string;
  ukSpecific?: boolean;
  tags: string[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(searchParams.get('category') || '');

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const categories = [
    'All Categories',
    'Home Servers',
    'VPN & Tunnels',
    'Networking',
    'Security & Privacy',
    'Storage & Backup',
  ];

  useEffect(() => {
    if (query.trim() || category) {
      performSearch();
    }
  }, [query, category]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append('q', query.trim());
      if (category && category !== 'All Categories') params.append('category', category);

      const response = await fetch(`/api/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Search Guides
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find exactly what you need. No bullshit results.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides, tools, technologies..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                {cat}
              </option>
            ))}
          </select>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Search Results */}
      <div className="space-y-6">
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Searching guides...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/guides/${result.slug}`}
                  className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {result.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[result.difficulty]}`}>
                        {result.difficulty}
                      </span>
                      {result.ukSpecific && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                          🇬🇧 UK
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ⏱️ {result.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {result.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {result.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {result.tags.length > 5 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{result.tags.length - 5} more
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No results found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try different keywords or browse our categories below.
            </p>
            <Link
              href="/guides"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Browse All Guides
            </Link>
          </div>
        )}

        {!loading && !query && !category && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Start Your Search
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter keywords to find the guides you need, or browse by category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

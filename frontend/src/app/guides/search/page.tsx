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

  // Discord-style subtle difficulty chips
  const difficultyClasses: Record<SearchResult['difficulty'], string> = {
    Beginner: 'bg-green-500/10 text-green-300 border border-green-400/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/20',
    Advanced: 'bg-red-500/10 text-red-300 border border-red-400/20',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      } else {
        setResults([]);
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
    <div className="bg-[var(--ds-background-primary)] text-[var(--ds-text-normal)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Search Guides
          </h1>
          <p className="text-lg text-[var(--ds-text-muted)]">
            Find exactly what you need. No bullshit results.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides, tools, technologies..."
                className="input w-full h-11"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input h-11"
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
              className="btn h-11 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Search Results */}
        <div className="space-y-6">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--ds-background-accent)]"></div>
              <p className="mt-2 text-[var(--ds-text-muted)]">Searching guides...</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </h2>
              </div>

              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/guides/${result.slug}`}
                    className="block card p-5 hover:border-[var(--ds-border-strong)] transition-colors overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[var(--ds-text-muted)]">
                          {result.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${difficultyClasses[result.difficulty]}`}
                        >
                          {result.difficulty}
                        </span>
                        {result.ukSpecific && (
                          <span className="text-xs px-2 py-1 rounded-full border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)]">
                            🇬🇧 UK
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[var(--ds-text-muted)]">⏱️ {result.time}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{result.title}</h3>

                    <p className="text-sm text-[var(--ds-text-muted)] mb-4">
                      {result.description}
                    </p>

                    {result.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 rounded bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] text-xs border border-[var(--ds-border-subtle)]"
                          >
                            #{tag}
                          </span>
                        ))}
                        {result.tags.length > 5 && (
                          <span className="text-xs text-[var(--ds-text-muted)]">
                            +{result.tags.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[var(--ds-text-muted)] text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
              <p className="text-[var(--ds-text-muted)] mb-4">
                Try different keywords or browse our categories below.
              </p>
              <Link href="/guides" className="btn">
                Browse All Guides
              </Link>
            </div>
          )}

          {!loading && !query && !category && (
            <div className="text-center py-12">
              <div className="text-[var(--ds-text-muted)] text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-white mb-2">Start Your Search</h2>
              <p className="text-[var(--ds-text-muted)]">
                Enter keywords to find the guides you need, or browse by category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

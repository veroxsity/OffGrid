'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Guide {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  slug: string;
  ukSpecific?: boolean;
  tags: string[];
  lastUpdated: string;
}

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  const categories = [
    'All Categories',
    'Home Servers',
    'VPN & Tunnels',
    'Networking',
    'Security & Privacy',
    'Storage & Backup',
  ];

  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-300 border border-green-400/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/20',
    Advanced: 'bg-red-500/10 text-red-300 border border-red-400/20',
  } as const;

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch('/api/admin/guides');
      if (response.ok) {
        const data = await response.json();
        setGuides(data.guides || []);
      } else {
        console.error('Failed to fetch guides');
      }
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
    setLoading(false);
  };

  const handleDeleteGuide = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this guide? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(slug);
    try {
      const response = await fetch(`/api/admin/guides/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGuides(guides.filter(guide => guide.slug !== slug));
        alert('Guide deleted successfully');
      } else {
        const error = await response.json();
        alert(`Error deleting guide: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting guide:', error);
      alert('Error deleting guide. Please try again.');
    }
    setDeleteLoading(null);
  };

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === '' || selectedCategory === 'All Categories' ||
      guide.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96 text-[var(--ds-text-muted)]">Loading guides...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Manage Guides</h1>
            <p className="text-[var(--ds-text-muted)] mt-1 text-sm">Create, edit, and manage all platform guides</p>
          </div>
          <Button size="sm" className="h-9 px-3">
            <Link href="/admin/guides/new">Create New Guide</Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full h-9 text-sm"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input h-9 text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guides List */}
        <div className="space-y-3">
          {filteredGuides.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-[var(--ds-text-muted)]">{searchQuery || selectedCategory !== 'All Categories' ? 'No guides found matching your filters.' : 'No guides created yet.'}</div>
                {(!searchQuery && selectedCategory === 'All Categories') && (
                  <Button className="mt-4">
                    <Link href="/admin/guides/new">Create Your First Guide</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredGuides.map((guide) => (
              <Card key={guide.slug} className="hover:border-[var(--ds-border-strong)] transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-base md:text-lg font-bold text-white leading-snug">{guide.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyColors[guide.difficulty]}`}>
                          {guide.difficulty}
                        </span>
                        {guide.ukSpecific && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)]">
                            🇬🇧 UK
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[var(--ds-text-muted)] text-sm mb-2">{guide.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--ds-text-muted)] mb-2">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {guide.category}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {guide.time}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Updated {guide.lastUpdated}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {guide.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="inline-block px-1.5 py-0.5 rounded bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] text-[10px] border border-[var(--ds-border-subtle)]"
                          >
                            #{tag}
                          </span>
                        ))}
                        {guide.tags.length > 3 && (
                          <span className="text-[10px] text-[var(--ds-text-muted)]">
                            +{guide.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 ml-2">
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                        <Link href={`/guides/${guide.slug}`} target="_blank">View Live</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                        <Link href={`/admin/guides/preview?slug=${encodeURIComponent(guide.slug)}`}>Preview</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                        <Link href={`/admin/guides/edit?slug=${encodeURIComponent(guide.slug)}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => handleDeleteGuide(guide.slug)}
                        loading={deleteLoading === guide.slug}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Stats */}
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-[var(--ds-text-muted)]">Showing {filteredGuides.length} of {guides.length} total guides</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

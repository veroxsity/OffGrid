'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalGuides: number;
  totalUsers: number;
  popularGuides: Array<{
    title: string;
    slug: string;
    views: number;
  }>;
  recentActivity: Array<{
    type: 'guide_created' | 'guide_updated' | 'user_registered';
    title: string;
    timestamp: string;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch real guide data from admin API
      const response = await fetch('/api/admin/guides');
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalGuides: data.totalCount || data.guides?.length || 0,
          totalUsers: 156, // Mock data for now
          popularGuides: data.guides?.slice(0, 3).map((guide: any) => ({
            title: guide.title,
            slug: guide.slug,
            views: Math.floor(Math.random() * 300) + 50 // Mock views for now
          })) || [],
          recentActivity: [
            { type: 'guide_created', title: 'Recent guides have been added', timestamp: '2 hours ago' },
            { type: 'guide_updated', title: 'Guides are being maintained', timestamp: '5 hours ago' },
            { type: 'user_registered', title: 'Users are joining the platform', timestamp: '1 day ago' },
          ],
        });
      } else {
        // Fallback to mock data if API fails
        setStats({
          totalGuides: 12,
          totalUsers: 156,
          popularGuides: [
            { title: 'Setting Up Solar Panels', slug: 'solar-panels-setup', views: 234 },
            { title: 'Rainwater Collection System', slug: 'rainwater-collection', views: 187 },
            { title: 'Building a Composting Toilet', slug: 'composting-toilet', views: 156 },
          ],
          recentActivity: [
            { type: 'guide_created', title: 'New guide "Wind Power Basics" created', timestamp: '2 hours ago' },
            { type: 'guide_updated', title: 'Guide "Solar Panels Setup" updated', timestamp: '5 hours ago' },
            { type: 'user_registered', title: '3 new users registered', timestamp: '1 day ago' },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Fallback to mock data
      setStats({
        totalGuides: 12,
        totalUsers: 156,
        popularGuides: [
          { title: 'Setting Up Solar Panels', slug: 'solar-panels-setup', views: 234 },
          { title: 'Rainwater Collection System', slug: 'rainwater-collection', views: 187 },
          { title: 'Building a Composting Toilet', slug: 'composting-toilet', views: 156 },
        ],
        recentActivity: [
          { type: 'guide_created', title: 'New guide "Wind Power Basics" created', timestamp: '2 hours ago' },
          { type: 'guide_updated', title: 'Guide "Solar Panels Setup" updated', timestamp: '5 hours ago' },
          { type: 'user_registered', title: '3 new users registered', timestamp: '1 day ago' },
        ],
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96 text-[var(--ds-text-muted)]">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="rounded-lg p-6 text-white bg-[var(--ds-background-accent)]">
          <h2 className="text-2xl font-bold mb-2">Welcome to OffGrid Admin</h2>
          <p className="text-white/80">Manage your off-grid guides and community from here.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-4 bg-[var(--ds-background-tertiary)]">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ds-text-muted)]">Total Guides</p>
                  <p className="text-2xl font-bold text-white">{stats?.totalGuides || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-4 bg-[var(--ds-background-tertiary)]">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ds-text-muted)]">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats?.totalUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-4 bg-[var(--ds-background-tertiary)]">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ds-text-muted)]">Monthly Views</p>
                  <p className="text-2xl font-bold text-white">2.4k</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-4 bg-[var(--ds-background-tertiary)]">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ds-text-muted)]">Avg. Rating</p>
                  <p className="text-2xl font-bold text-white">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                <Link href="/admin/guides/new" className="flex flex-col items-center">
                  <span className="text-2xl mb-2">➕</span>
                  <span>Create New Guide</span>
                </Link>
              </Button>
              
              <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                <Link href="/admin/guides" className="flex flex-col items-center">
                  <span className="text-2xl mb-2">📝</span>
                  <span>Manage Guides</span>
                </Link>
              </Button>
              
              <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                <Link href="/admin/users" className="flex flex-col items-center">
                  <span className="text-2xl mb-2">👤</span>
                  <span>View Users</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Guides */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.popularGuides?.map((guide, index) => (
                  <div key={guide.slug} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-[var(--ds-background-tertiary)]">
                        <span className="text-sm font-medium text-white">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{guide.title}</p>
                        <p className="text-sm text-[var(--ds-text-muted)]">{guide.views} views</p>
                      </div>
                    </div>
                    <Link
                      href={`/admin/guides/edit?slug=${encodeURIComponent(guide.slug)}`}
                      className="text-[var(--ds-background-accent)] hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-1 rounded-full mr-3 mt-1 bg-[var(--ds-background-tertiary)]">
                      <span className="text-sm">{activity.type === 'guide_created' && '📝'}{activity.type === 'guide_updated' && '✏️'}{activity.type === 'user_registered' && '👤'}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-[var(--ds-text-muted)]">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

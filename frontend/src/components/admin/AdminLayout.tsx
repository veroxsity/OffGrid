'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '🏠' },
  { name: 'Guides', href: '/admin/guides', icon: '📚' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Analytics', href: '/admin/analytics', icon: '📊' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--ds-background-primary)] text-[var(--ds-text-normal)]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[var(--ds-background-secondary)] border-r border-[var(--ds-border-subtle)]">
          <div className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--ds-background-accent)] text-white">
                <span className="font-bold text-lg">⚡</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-bold text-white">OffGrid</div>
                <div className="text-xs text-[var(--ds-text-muted)] font-medium">
                  Admin Panel
                </div>
              </div>
            </div>
          </div>
          
          <nav className="mt-2 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-[6px] transition-colors
                      ${isActive
                        ? 'bg-[var(--ds-background-accent)] text-[var(--ds-text-inverted)]'
                        : 'text-[var(--ds-text-muted)] hover:bg-[var(--ds-background-tertiary)] hover:text-white'}
                    `}
                  >
                    <span className={`text-lg mr-3 ${isActive ? '' : 'opacity-90'}`}>{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Quick Stats */}
          <div className="mt-6 px-3 pb-6">
            <div className="rounded-[8px] p-4 border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)]">
              <h4 className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider mb-2">
                Quick Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--ds-text-muted)]">Total Guides</span>
                  <span className="font-medium text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--ds-text-muted)]">Published</span>
                  <span className="font-medium text-green-400">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--ds-text-muted)]">Drafts</span>
                  <span className="font-medium text-yellow-300">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-[var(--ds-background-secondary)] border-b border-[var(--ds-border-subtle)]">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-xs text-[var(--ds-text-muted)]">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                  </div>
                  <Link
                    href="/"
                    className="px-3 py-1.5 text-xs font-medium text-[var(--ds-text-muted)] hover:text-white"
                  >
                    ← Back to Site
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6 h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

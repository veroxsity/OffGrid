'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTheme } from '@/hooks/useTheme';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/guides/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const navigation = [
    { name: 'All Guides', href: '/guides' },
    { name: 'Home Servers', href: '/guides/home-servers' },
    { name: 'VPN & Tunnels', href: '/guides/vpn-tunnels' },
    { name: 'Networking', href: '/guides/networking' },
    { name: 'Security', href: '/guides/security' },
    { name: 'Storage', href: '/guides/storage' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full header-discord">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-md bg-[var(--ds-background-accent)] text-white flex items-center justify-center">⚡</div>
              <span className="text-[15px] font-semibold text-[var(--ds-text-normal)] group-hover:text-white transition-colors">
                Off-Grid Freedom
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-[6px] text-sm font-medium ${
                    active
                      ? 'sidebar-nav-item sidebar-nav-item--active !m-0 !text-[var(--ds-text-normal)]'
                      : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)] hover:bg-[var(--ds-background-secondary)]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Search and Auth */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setThemeMenuOpen((o) => !o)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-[6px] text-sm font-medium border border-[var(--ds-border-subtle)] bg-[var(--ds-background-tertiary)] text-[var(--ds-text-normal)] hover:bg-[var(--ds-background-secondary)] focus:ring-2 focus:ring-[var(--ds-background-accent)] focus:outline-none"
                aria-haspopup="true"
                aria-expanded={themeMenuOpen}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="hidden lg:inline">Theme</span>
              </button>
              {themeMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-[6px] border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)] shadow-lg p-1 z-50"
                  role="menu"
                >
                  {(['light', 'dark', 'high-contrast', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[6px] text-sm capitalize hover:bg-[var(--ds-background-tertiary)] ${
                        theme === t ? 'text-white bg-[var(--ds-interactive-active)]' : 'text-[var(--ds-text-normal)]'
                      }`}
                      role="menuitem"
                    >
                      {t.replace('-', ' ')}{theme === t && ' ✓'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides..."
                  className="w-64 pl-9 pr-3 py-2 rounded-[6px] header-search text-[var(--ds-text-normal)] placeholder-[var(--ds-text-muted)]"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ds-text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>

            {/* Authentication */}
            <div className="hidden md:flex items-center gap-3">
              {status === 'loading' ? (
                <div className="w-8 h-8 rounded-full bg-[var(--ds-background-tertiary)] animate-pulse"></div>
              ) : session ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]">
                    Dashboard
                  </Link>
                  {session.user?.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-[var(--ds-text-muted)]">{session.user?.name}</span>
                  <button onClick={() => signOut()} className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => signIn()} className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]">
                    Sign In
                  </button>
                  <Link href="/auth/signin" className="btn">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)] hover:bg-[var(--ds-background-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-background-accent)]"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[var(--ds-border-subtle)]">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="sm:hidden mb-3">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides..."
                  className="w-full px-3 py-2 rounded-[6px] header-search"
                />
              </form>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-[6px] text-base font-medium ${
                    pathname.startsWith(item.href)
                      ? 'bg-[var(--ds-background-secondary)] text-[var(--ds-text-normal)]'
                      : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)] hover:bg-[var(--ds-background-secondary)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Authentication */}
              <div className="border-t border-[var(--ds-border-subtle)] pt-4 mt-4">
                {status === 'loading' ? (
                  <div className="px-3 py-2">
                    <div className="w-full h-10 bg-[var(--ds-background-tertiary)] rounded animate-pulse"></div>
                  </div>
                ) : session ? (
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-3">
                      {session.user?.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <span className="text-sm text-[var(--ds-text-muted)]">{session.user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)] hover:bg-[var(--ds-background-secondary)] rounded-[6px]"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 space-y-2">
                    <button
                      onClick={() => {
                        signIn();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)] hover:bg-[var(--ds-background-secondary)] rounded-[6px]"
                    >
                      Sign In
                    </button>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-3 py-2 text-base font-medium text-center btn"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

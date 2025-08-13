'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast' | 'system';
const STORAGE_KEY = 'og-theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'high-contrast');
  if (theme === 'dark') root.classList.add('dark');
  else if (theme === 'high-contrast') root.classList.add('high-contrast');
  else if (theme === 'system') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.matches) root.classList.add('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');

  useEffect(() => {
    // Initialize from storage
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) || 'system';
    setThemeState(stored);
    // Apply immediately
    applyTheme(stored);
    // Resolve
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const computeResolved = (t: Theme) => {
      if (t === 'high-contrast') return 'high-contrast';
      if (t === 'dark') return 'dark';
      if (t === 'system') return mq.matches ? 'dark' : 'light';
      return 'light';
    };
    setResolvedTheme(computeResolved(stored));
    const listener = () => {
      setResolvedTheme(computeResolved(theme));
      if (theme === 'system') applyTheme('system');
    };
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    // Update resolved
    if (next === 'high-contrast') setResolvedTheme('high-contrast');
    else if (next === 'dark') setResolvedTheme('dark');
    else if (next === 'light') setResolvedTheme('light');
    else setResolvedTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  return { theme, setTheme, resolvedTheme };
}

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthSessionProvider>
      {/* ThemeProvider removed due to dependency conflict with React 19 */}
        {children}
    </NextAuthSessionProvider>
  );
}

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export function ThemeProvider(props: React.PropsWithChildren<Partial<ThemeProviderProps>>) {
  const { children, ...rest } = props;
  return (
    // @ts-ignore next-themes types children mismatch
    <NextThemesProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="system"
      enableSystem
      themes={['light','dark','high-contrast']}
      {...rest}
    >
      {children}
    </NextThemesProvider>
  );
}

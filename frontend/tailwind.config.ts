import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: 'var(--color-brand)',
          foreground: 'var(--color-brand-foreground)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)'
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        border: 'var(--color-border)',
        ring: 'var(--color-ring)'
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'heading-1': 'var(--font-size-4xl)',
        'heading-2': 'var(--font-size-3xl)',
        'heading-3': 'var(--font-size-2xl)',
        'heading-4': 'var(--font-size-xl)'
      },
      boxShadow: {
        'soft': 'var(--shadow-sm)',
        'elevated': 'var(--shadow-lg)',
        'floating': 'var(--shadow-xl)'
      },
      borderRadius: {
        xl: 'var(--radius)'
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(4px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'scale-in': { '0%': { opacity: '0', transform: 'scale(.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } }
      },
      animation: {
        'fade-in': 'fade-in .4s ease-out',
        'scale-in': 'scale-in .25s ease-out'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'rgb(220 38 38)', // red-600
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            '[class~="dark"] &': {
              color: 'rgb(251 113 133)', // red-400
            },
            code: {
              color: 'rgb(220 38 38)', // red-600
              backgroundColor: 'rgb(243 244 246)', // gray-100
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '400',
            },
            '[class~="dark"] & code': {
              color: 'rgb(248 113 113)', // red-400
              backgroundColor: 'rgb(31 41 55)', // gray-800
            },
            pre: {
              backgroundColor: 'rgb(17 24 39)', // gray-900
              color: 'rgb(243 244 246)', // gray-100
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            'pre code': {
              color: 'rgb(243 244 246)', // gray-100
              backgroundColor: 'transparent',
              padding: '0',
            },
            blockquote: {
              borderLeftColor: 'rgb(239 68 68)', // red-500
            },
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-links': 'var(--color-brand)',
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'h2, h3': { scrollMarginTop: '6rem' }
          }
        },
        invert: {
          css: {
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-links': 'var(--color-brand)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addComponents }) {
      addComponents({
        '.og-container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen sm': { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
          '@screen lg': { maxWidth: '72rem' }
        }
      });
    })
  ]
};

export default config;

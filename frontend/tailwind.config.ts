import type { Config } from "tailwindcss";

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
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

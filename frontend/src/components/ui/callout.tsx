import { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'security' | 'uk';
  title?: string;
  children: ReactNode;
}

const calloutStyles = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    content: 'text-blue-700 dark:text-blue-300',
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-200',
    content: 'text-yellow-700 dark:text-yellow-300',
    iconPath: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    content: 'text-red-700 dark:text-red-300',
    iconPath: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
  },
  success: {
    container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-200',
    content: 'text-green-700 dark:text-green-300',
    iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  security: {
    container: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    title: 'text-purple-800 dark:text-purple-200',
    content: 'text-purple-700 dark:text-purple-300',
    iconPath: 'M9 12.75L11.25 15 15 9.75m-3.75 5.25a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  uk: {
    container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    content: 'text-blue-700 dark:text-blue-300',
    iconPath: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
  }
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = calloutStyles[type];
  
  const defaultTitles = {
    info: '💡 Info',
    warning: '⚠️ Warning',
    error: '❌ Error',
    success: '✅ Success',
    security: '🛡️ Security Note',
    uk: '🇬🇧 UK Specific'
  };

  return (
    <div className={`my-6 p-4 rounded-lg border-l-4 ${style.container} shadow-sm`}>
      <div className="flex items-start">
        <svg className={`flex-shrink-0 w-5 h-5 mr-3 mt-0.5 ${style.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={style.iconPath} />
        </svg>
        <div className="flex-1">
          {(title || defaultTitles[type]) && (
            <h4 className={`font-semibold mb-2 ${style.title}`}>
              {title || defaultTitles[type]}
            </h4>
          )}
          <div className={`${style.content} prose prose-sm dark:prose-invert max-w-none`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

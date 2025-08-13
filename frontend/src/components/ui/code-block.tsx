import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  copy?: boolean;
}

export function CodeBlock({ children, language = 'bash', title, copy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group my-6">
      {title && (
        <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-600">
          <span className="text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {title}
          </span>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
            {language}
          </span>
        </div>
      )}
      
      <div className="relative">
        <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${title ? 'rounded-b-lg' : 'rounded-lg'} border border-gray-700`}>
          <code className="text-sm leading-relaxed font-mono">
            {children}
          </code>
        </pre>
        
        {copy && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md border border-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-105"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
        
        {copied && (
          <div className="absolute top-12 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg animate-fade-in">
            Copied!
          </div>
        )}
      </div>
    </div>
  );
}

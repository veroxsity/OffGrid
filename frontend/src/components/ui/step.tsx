import { ReactNode } from 'react';

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
  completed?: boolean;
}

export function Step({ number, title, children, completed = false }: StepProps) {
  return (
    <div className="relative my-8 group">
      {/* Step connector line */}
      <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700 group-last:hidden"></div>
      
      <div className="flex items-start">
        {/* Step number */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-200 ${
          completed 
            ? 'bg-green-600 shadow-green-500/25' 
            : 'bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/25'
        }`}>
          {completed ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            number
          )}
        </div>

        {/* Step content */}
        <div className="ml-6 flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
            {title}
          </h3>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

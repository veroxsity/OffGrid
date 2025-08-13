import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface GuideCardProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime?: number;
  image?: string;
  tags?: string[];
  lastUpdated?: string;
}

const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800'
  },
  intermediate: {
    label: 'Intermediate', 
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800'
  },
  advanced: {
    label: 'Advanced',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800'
  }
};

export function GuideCard({
  title,
  description,
  slug,
  category,
  difficulty,
  readTime,
  image,
  tags = [],
  lastUpdated
}: GuideCardProps) {
  const difficultyStyle = difficultyConfig[difficulty];

  return (
    <Link href={`/guides/${slug}`} className="group block">
      <Card className="h-full group-hover:border-red-200 dark:group-hover:border-red-800 transition-all duration-300">
        {image && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyStyle.color} ${difficultyStyle.border}`}>
                {difficultyStyle.label}
              </span>
            </div>
          </div>
        )}
        
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">
              {category}
            </span>
            {readTime && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} min read
              </span>
            )}
          </div>
          
          {!image && (
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyStyle.color} ${difficultyStyle.border}`}>
                {difficultyStyle.label}
              </span>
            </div>
          )}
          
          <CardTitle className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
            {title}
          </CardTitle>
          
          <CardDescription className="line-clamp-3 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {lastUpdated && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Updated {lastUpdated}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

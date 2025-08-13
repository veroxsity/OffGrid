import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export interface GuideMetadata {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  ukSpecific?: boolean;
  lastUpdated: string;
  testedOn?: string[];
  tags: string[];
  slug: string;
  status?: 'draft' | 'published';
}

export interface Guide {
  metadata: GuideMetadata;
  content: React.ReactElement;
  slug: string;
}

export interface RawGuide {
  metadata: GuideMetadata;
  content: string; // Raw MDX content
  slug: string;
}

const contentDirectory = path.join(process.cwd(), '..', 'content');

function normalizeFrontmatter(frontmatter: any): Omit<GuideMetadata, 'slug'> {
  const fm = { ...frontmatter };
  // Ensure required shapes and safe defaults
  fm.tags = Array.isArray(fm.tags) ? fm.tags : [];
  if (typeof fm.ukSpecific !== 'boolean') fm.ukSpecific = false;
  if (!fm.difficulty) fm.difficulty = 'Beginner';
  if (!fm.time) fm.time = '—';
  return fm as Omit<GuideMetadata, 'slug'>;
}

// Get all guide slugs for static generation
export function getAllGuideSlugs(): string[] {
  const englishDir = path.join(contentDirectory, 'en');
  
  if (!fs.existsSync(englishDir)) {
    return [];
  }

  const slugs: string[] = [];
  
  function walkDirectory(dir: string, basePath: string = '') {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDirectory(filePath, path.join(basePath, file));
      } else if (file.endsWith('.mdx')) {
        const slug = path.join(basePath, file.replace(/\.mdx$/, ''));
        slugs.push(slug.replace(/\\/g, '/'));
      }
    }
  }
  
  walkDirectory(englishDir);
  return slugs;
}

// Get guide content by slug
export async function getGuideBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<Guide | null> {
  try {
    const filePath = path.join(contentDirectory, 'en', `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    if (frontmatter.status === 'draft' && !opts.includeDrafts) return null;

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
      },
    });

    const metadata: GuideMetadata = {
      ...normalizeFrontmatter(frontmatter),
      slug,
    };

    return {
      metadata,
      content: mdxContent,
      slug,
    };
  } catch (error) {
    console.error(`Error loading guide ${slug}:`, error);
    return null;
  }
}

// Get all guides with metadata (for listings)
export async function getAllGuides(opts: { includeDrafts?: boolean } = {}): Promise<GuideMetadata[]> {
  const slugs = getAllGuideSlugs();
  const guides: GuideMetadata[] = [];

  for (const slug of slugs) {
    try {
      const filePath = path.join(contentDirectory, 'en', `${slug}.mdx`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      if (frontmatter.status === 'draft' && !opts.includeDrafts) continue;
      guides.push({ ...normalizeFrontmatter(frontmatter), slug });
    } catch (error) {
      console.error(`Error loading metadata for ${slug}:`, error);
    }
  }
  return guides;
}

// Get guides by category
export async function getGuidesByCategory(category: string, opts: { includeDrafts?: boolean } = {}) {
  const allGuides = await getAllGuides(opts);
  return allGuides.filter(g => g.category.toLowerCase().replace(/\s+/g,'-') === category.toLowerCase());
}

// Search guides by title, description, or tags
export async function searchGuides(query: string, opts: { includeDrafts?: boolean } = {}) {
  const allGuides = await getAllGuides(opts);
  const term = query.toLowerCase();
  return allGuides.filter(guide => 
    guide.title.toLowerCase().includes(term) || 
    guide.description.toLowerCase().includes(term) || 
    (Array.isArray(guide.tags) ? guide.tags : []).some(t => (t || '').toLowerCase().includes(term))
  );
}

// Get raw guide content for editing
export async function getRawGuideBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<RawGuide | null> {
  try {
    const filePath = path.join(contentDirectory, 'en', `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    if (frontmatter.status === 'draft' && !opts.includeDrafts) return null;

    const metadata: GuideMetadata = {
      ...normalizeFrontmatter(frontmatter),
      slug,
    };

    return {
      metadata,
      content, // Raw MDX content without frontmatter
      slug,
    };
  } catch (error) {
    console.error(`Error loading raw guide ${slug}:`, error);
    return null;
  }
}

// Process markdown content for preview
export async function processMarkdown(content: string): Promise<React.ReactElement> {
  try {
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
      },
    });

    return mdxContent;
  } catch (error) {
    console.error('Error processing markdown:', error);
    throw error;
  }
}

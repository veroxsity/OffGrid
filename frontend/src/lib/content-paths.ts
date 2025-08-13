import path from 'path';

// Root content directory (monorepo: root/content)
export const CONTENT_ROOT = path.join(process.cwd(), '..', 'content');

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getGuideFilePath(locale: string, categorySlug: string, guideSlug: string) {
  return path.join(CONTENT_ROOT, locale, categorySlug, `${guideSlug}.mdx`);
}

export interface GuideFrontmatterInput {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tags: string[];
  ukSpecific: boolean;
  testedOn: string[];
  status?: 'draft' | 'published';
  slug: string; // categorySlug/guideSlug
}

export function buildGuideMDX(frontmatter: GuideFrontmatterInput, body: string) {
  const {
    title,
    description,
    category,
    difficulty,
    time,
    tags,
    ukSpecific,
    testedOn,
    status = 'published',
    slug
  } = frontmatter;

  return `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndescription: "${description.replace(/"/g, '\\"')}"\ncategory: "${category}"\ndifficulty: "${difficulty}"\ntime: "${time}"\nlastUpdated: "${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}"\nslug: "${slug}"\nstatus: ${status}\ntags: [${tags.map(t => `"${t}"`).join(', ')}]\nukSpecific: ${ukSpecific}\ntestedOn: [${testedOn.map(t => `"${t}"`).join(', ')}]\n---\n\n${body}\n`;
}

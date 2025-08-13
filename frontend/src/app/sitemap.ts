import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://offgrid.example.com';
  const guides = await getAllGuides({ includeDrafts: false });

  const guideEntries: MetadataRoute.Sitemap = guides.map(g => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(g.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...guideEntries,
  ];
}

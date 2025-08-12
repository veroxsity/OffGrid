import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/mdx';
import GuideLayout from '@/components/GuideLayout';

interface GuidePageProps {
  params: {
    slug: string[];
  };
}

// Generate static params for all guides
export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

// Generate metadata for each guide
export async function generateMetadata({ params }: GuidePageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | Off-Grid Freedom',
    };
  }

  return {
    title: `${guide.metadata.title} | Off-Grid Freedom`,
    description: guide.metadata.description,
    keywords: guide.metadata.tags.join(', '),
    openGraph: {
      title: guide.metadata.title,
      description: guide.metadata.description,
      type: 'article',
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <GuideLayout metadata={guide.metadata}>
      {guide.content}
    </GuideLayout>
  );
}

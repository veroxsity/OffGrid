import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname } from 'path';
import { categoryToSlug, slugifyTitle, getGuideFilePath, buildGuideMDX } from '@/lib/content-paths';
import sanitizeHtml from 'sanitize-html';
import { guideSchema } from '@/lib/validation';
import { rateLimit, formatRetryAfter } from '@/lib/rate-limit';

interface GuideData {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tags: string[];
  ukSpecific: boolean;
  testedOn: string[];
  content: string;
  status?: 'draft' | 'published';
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || user.role !== 'ADMIN') return NextResponse.json({ message: 'Admin access required' }, { status: 403 });

    // Rate limit admin guide creation (20/hour per IP)
    const rl = rateLimit(req, 'admin-guides-create', { limit: 20, windowMs: 60 * 60 * 1000 });
    if (!rl.allowed) {
      return NextResponse.json({ message: 'Rate limit exceeded', retryAfter: formatRetryAfter(rl.reset) }, { status: 429 });
    }

    const rawData = await req.json();
    const parseResult = guideSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json({ message: 'Validation failed', errors: parseResult.error.flatten() }, { status: 400 });
    }
    const guideData = parseResult.data;

    // Basic validation (can be replaced with zod)
    if (!guideData.title || !guideData.description || !guideData.category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const categorySlug = categoryToSlug(guideData.category);
    const guideSlug = slugifyTitle(guideData.title);
    const fullSlug = `${categorySlug}/${guideSlug}`;
    const filePath = getGuideFilePath('en', categorySlug, guideSlug);

    // Ensure directory exists
    if (!existsSync(dirname(filePath))) await mkdir(dirname(filePath), { recursive: true });

    const safeContent = sanitizeHtml(guideData.content, { allowedTags: false, allowedAttributes: false });

    const mdxContent = buildGuideMDX({
      title: guideData.title,
      description: guideData.description,
      category: guideData.category,
      difficulty: guideData.difficulty,
      time: guideData.time,
      tags: guideData.tags || [],
      ukSpecific: guideData.ukSpecific || false,
      testedOn: guideData.testedOn || [],
      status: guideData.status || 'published',
      slug: fullSlug,
    }, safeContent || '');

    await writeFile(filePath, mdxContent, 'utf8');

    return NextResponse.json({ message: 'Guide created successfully', slug: fullSlug, filePath }, { status: 201 });
  } catch (error) {
    console.error('Create guide error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || user.role !== 'ADMIN') return NextResponse.json({ message: 'Admin access required' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      try {
        const { getRawGuideBySlug } = await import('@/lib/mdx');
        const guide = await getRawGuideBySlug(slug);
        if (!guide) return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
        return NextResponse.json({ metadata: guide.metadata, content: guide.content });
      } catch (error) {
        console.error('Error loading guide:', error);
        return NextResponse.json({ message: 'Error loading guide' }, { status: 500 });
      }
    }

    // Reuse search endpoint for list (could be refactored later)
    const searchResponse = await fetch(`${req.nextUrl.origin}/api/search`);
    const searchData = await searchResponse.json();
    return NextResponse.json({ guides: searchData.results || [], totalCount: searchData.totalCount || 0 });
  } catch (error) {
    console.error('Get guides error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

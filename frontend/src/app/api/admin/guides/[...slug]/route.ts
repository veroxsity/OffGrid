import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname } from 'path';
import { getGuideBySlug, getRawGuideBySlug } from '@/lib/mdx';
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

async function requireAdmin(sessionEmail?: string) {
  if (!sessionEmail) return { ok: false as const, status: 401, message: 'Unauthorized' };
  const user = await prisma.user.findUnique({ where: { email: sessionEmail } });
  if (!user || user.role !== 'ADMIN') return { ok: false as const, status: 403, message: 'Admin access required' };
  return { ok: true as const };
}

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    const session = await getServerSession(authOptions);
    const email = (session?.user?.email ?? undefined) as string | undefined;
    const auth = await requireAdmin(email);
    if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });

    const guideSlug = params.slug.join('/');
    const guide = await getRawGuideBySlug(guideSlug);
    if (!guide) return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
    return NextResponse.json({ metadata: guide.metadata, content: guide.content });
  } catch (error) {
    console.error('Get guide error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    const session = await getServerSession(authOptions);
    const email = (session?.user?.email ?? undefined) as string | undefined;
    const auth = await requireAdmin(email);
    if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });

    // Rate limit updates (60/hour per IP)
    const rl = rateLimit(req, 'admin-guides-update', { limit: 60, windowMs: 60 * 60 * 1000 });
    if (!rl.allowed) return NextResponse.json({ message: 'Rate limit exceeded', retryAfter: formatRetryAfter(rl.reset) }, { status: 429 });

    const originalSlug = params.slug.join('/');
    const existing = await getGuideBySlug(originalSlug);
    if (!existing) return NextResponse.json({ message: 'Guide not found' }, { status: 404 });

    const raw = await req.json();
    const parsed = guideSchema.partial({ status: true }).safeParse(raw);
    if (!parsed.success) return NextResponse.json({ message: 'Validation failed', errors: parsed.error.flatten() }, { status: 400 });
    const data = { ...parsed.data } as GuideData;

    const categorySlug = categoryToSlug(data.category);
    const newGuideSlug = slugifyTitle(data.title);
    const newFullSlug = `${categorySlug}/${newGuideSlug}`;

    const newFilePath = getGuideFilePath('en', categorySlug, newGuideSlug);
    const oldFilePath = getGuideFilePath('en', categoryToSlug(existing.metadata.category), originalSlug.split('/').pop() || newGuideSlug);

    if (!existsSync(dirname(newFilePath))) await mkdir(dirname(newFilePath), { recursive: true });

    const safeContent = sanitizeHtml(data.content, { allowedTags: false, allowedAttributes: false });

    const mdxContent = buildGuideMDX({
      title: data.title,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      time: data.time,
      tags: data.tags || [],
      ukSpecific: data.ukSpecific || false,
      testedOn: data.testedOn || [],
      status: data.status || 'published',
      slug: newFullSlug,
    }, safeContent || '');

    await writeFile(newFilePath, mdxContent, 'utf8');

    if (oldFilePath !== newFilePath) {
      try { await unlink(oldFilePath); } catch (e) { console.warn('Old file removal failed (may be expected if path changed):', oldFilePath); }
    }

    return NextResponse.json({ message: 'Guide updated successfully', slug: newFullSlug }, { status: 200 });
  } catch (error) {
    console.error('Update guide error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    const session = await getServerSession(authOptions);
    const email = (session?.user?.email ?? undefined) as string | undefined;
    const auth = await requireAdmin(email);
    if (!auth.ok) return NextResponse.json({ message: auth.message }, { status: auth.status });

    // Rate limit deletions (30/hour per IP)
    const rl = rateLimit(req, 'admin-guides-delete', { limit: 30, windowMs: 60 * 60 * 1000 });
    if (!rl.allowed) return NextResponse.json({ message: 'Rate limit exceeded', retryAfter: formatRetryAfter(rl.reset) }, { status: 429 });

    const fullSlug = params.slug.join('/');
    const existing = await getGuideBySlug(fullSlug);
    if (!existing) return NextResponse.json({ message: 'Guide not found' }, { status: 404 });

    const categorySlug = categoryToSlug(existing.metadata.category);
    const fileName = fullSlug.split('/').pop()!;
    const filePath = getGuideFilePath('en', categorySlug, fileName);

    try { await unlink(filePath); } catch (e) { return NextResponse.json({ message: 'Failed to delete file' }, { status: 500 }); }

    return NextResponse.json({ message: 'Guide deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete guide error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getAllGuides, getGuideBySlug } from '@/lib/mdx';
import { findRelatedGuides } from '@/lib/guide-utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Guide slug is required' },
        { status: 400 }
      );
    }

    const currentGuide = await getGuideBySlug(slug);
    if (!currentGuide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }

    const allGuides = await getAllGuides();
    const relatedGuides = findRelatedGuides(currentGuide.metadata, allGuides, 3);

    return NextResponse.json({
      relatedGuides,
      count: relatedGuides.length,
    });
  } catch (error) {
    console.error('Related guides error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related guides' },
      { status: 500 }
    );
  }
}

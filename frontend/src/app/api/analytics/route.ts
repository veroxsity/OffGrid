import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllGuides } from '@/lib/mdx';

export async function GET(req: NextRequest) {
  try {
    const allGuides = await getAllGuides();
    
    // Get bookmark statistics for each guide
    const bookmarkStats = await prisma.bookmark.groupBy({
      by: ['guideSlug'],
      _count: {
        guideSlug: true,
      },
      orderBy: {
        _count: {
          guideSlug: 'desc',
        },
      },
    });

    // Create analytics data
    const analytics = {
      totalGuides: allGuides.length,
      totalBookmarks: await prisma.bookmark.count(),
      
      // Most bookmarked guides
      mostBookmarked: bookmarkStats.slice(0, 10).map((stat: any) => {
        const guide = allGuides.find(g => g.slug === stat.guideSlug);
        return {
          slug: stat.guideSlug,
          title: guide?.title || 'Unknown Guide',
          bookmarks: stat._count.guideSlug,
          category: guide?.category,
          difficulty: guide?.difficulty,
        };
      }),

      // Category breakdown
      categoryStats: allGuides.reduce((acc: any, guide) => {
        acc[guide.category] = (acc[guide.category] || 0) + 1;
        return acc;
      }, {}),

      // Difficulty breakdown
      difficultyStats: allGuides.reduce((acc: any, guide) => {
        acc[guide.difficulty] = (acc[guide.difficulty] || 0) + 1;
        return acc;
      }, {}),

      // UK-specific content
      ukSpecificCount: allGuides.filter(guide => guide.ukSpecific).length,
      
      // Recent activity (last 30 days)
      recentBookmarks: await prisma.bookmark.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Tag popularity
      tagStats: allGuides.reduce((acc: any, guide) => {
        guide.tags.forEach((tag: string) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {}),
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

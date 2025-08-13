import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getAllGuides } from '@/lib/mdx';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin (for now, you can make anyone admin by updating their role in the database)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get admin statistics
    const [totalUsers, totalBookmarks, recentUsers, allGuides] = await Promise.all([
      prisma.user.count(),
      prisma.bookmark.count(),
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          bookmarks: true,
          accounts: true,
        },
      }),
      getAllGuides(),
    ]);

    return NextResponse.json({
      totalUsers,
      totalBookmarks,
      totalGuides: allGuides.length,
      recentUsers: recentUsers.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        bookmarks: user.bookmarks,
        accountsCount: user.accounts.length,
      })),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

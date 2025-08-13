import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    const bookmarkCount = await prisma.bookmark.count();
    
    return NextResponse.json({
      status: 'Database connected successfully',
      counts: {
        users: userCount,
        bookmarks: bookmarkCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        status: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

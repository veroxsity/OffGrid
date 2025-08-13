import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { message: 'Bookmark not found' },
        { status: 404 }
      );
    }

    await prisma.bookmark.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: 'Bookmark deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete bookmark error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DEPRECATED: This endpoint is disabled for security. Use proper admin management via database migrations or secure CLI.
export async function POST() {
  return NextResponse.json({ message: 'Endpoint disabled' }, { status: 410 });
}

/* export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });

    return NextResponse.json({
      message: 'User role updated to ADMIN',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error('Make admin error:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
} */

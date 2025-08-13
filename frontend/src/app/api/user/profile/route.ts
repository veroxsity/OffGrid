import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bookmarks: true,
        accounts: { select: { provider: true, providerAccountId: true } },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data without sensitive information
    const { password, ...userWithoutPassword } = user as any;

    return NextResponse.json({
      user: userWithoutPassword,
      session: session,
    });
  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

const updateSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().min(8).max(128).optional(),
  newPassword: z.string().min(12, 'Password too short').max(128).optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, email, currentPassword, newPassword } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const dataToUpdate: any = {};

    if (name && name !== user.name) dataToUpdate.name = name;

    if (email && email !== user.email) {
      // Ensure email not taken
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== user.id) {
        return NextResponse.json(
          { message: 'Email already in use' },
          { status: 409 }
        );
      }
      dataToUpdate.email = email;
    }

    if (newPassword) {
      // If user already has password, require currentPassword to change
      if (user.password) {
        if (!currentPassword) {
          return NextResponse.json(
            { message: 'Current password required' },
            { status: 400 }
          );
        }
        const ok = await bcrypt.compare(currentPassword, user.password);
        if (!ok)
          return NextResponse.json(
            { message: 'Current password incorrect' },
            { status: 400 }
          );
      }
      const hashed = await bcrypt.hash(newPassword, 12);
      dataToUpdate.password = hashed;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ message: 'No changes' });
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    return NextResponse.json({
      message: 'Profile updated',
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        image: updated.image,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

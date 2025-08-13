import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || !(file instanceof File)) return NextResponse.json({ message: 'No file' }, { status: 400 });

    // For demo: store as data URL (in real deployment, upload to S3 or similar)
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mime = file.type || 'image/png';
    const dataUrl = `data:${mime};base64,${base64}`;

    const updated = await prisma.user.update({ where: { id: session.user.id }, data: { image: dataUrl } });

    return NextResponse.json({ url: updated.image });
  } catch (e) {
    console.error('avatar upload error', e);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}

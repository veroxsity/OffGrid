import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DISABLED: Temporary admin setup endpoint removed for security.
export async function POST() {
  return NextResponse.json({ message: 'Endpoint removed' }, { status: 410 });
}

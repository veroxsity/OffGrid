import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://offgrid.example.com';
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`; // next will serve sitemap at /sitemap.xml
  return new NextResponse(body, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}

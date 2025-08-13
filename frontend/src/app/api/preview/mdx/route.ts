import { NextRequest, NextResponse } from 'next/server';
import { processMarkdown } from '@/lib/mdx';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import sanitizeHtml from 'sanitize-html';
import { rateLimit, formatRetryAfter } from '@/lib/rate-limit';
import { renderToStaticMarkup } from 'react-dom/server';

// Secure MDX preview endpoint for the editor
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const rl = rateLimit(req, 'mdx-preview', { limit: 120, windowMs: 60 * 60 * 1000 });
    if (!rl.allowed) return NextResponse.json({ message: 'Rate limit exceeded', retryAfter: formatRetryAfter(rl.reset) }, { status: 429 });

    const { content } = await req.json();
    if (typeof content !== 'string') {
      return NextResponse.json({ message: 'Invalid content' }, { status: 400 });
    }

    // Strip potentially dangerous raw HTML (MDX will still allow whitelisted markdown)
    const stripped = sanitizeHtml(content, { allowedTags: false, allowedAttributes: false });

    const compiled = await processMarkdown(stripped);
    const html = renderToStaticMarkup(compiled);
    return NextResponse.json({ ok: true, html });
  } catch (e) {
    console.error('Preview compile error', e);
    return NextResponse.json({ message: 'Failed to compile preview' }, { status: 500 });
  }
}

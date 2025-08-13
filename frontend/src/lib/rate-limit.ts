import type { NextRequest } from 'next/server';

interface RateLimitOptions {
  limit: number;          // Max number of requests in window
  windowMs: number;       // Window size in ms
}

interface RateLimitState {
  count: number;
  reset: number; // timestamp in ms when window resets
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

// In-memory store (NON-PERSISTENT). For production replace with Redis or similar.
const store: Map<string, RateLimitState> = (globalThis as any)._rateLimitStore || new Map();
if (!(globalThis as any)._rateLimitStore) {
  (globalThis as any)._rateLimitStore = store;
}

function getClientKey(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  const ip = (req as any).ip || (fwd ? fwd.split(',')[0].trim() : 'unknown');
  return ip;
}

export function rateLimit(req: NextRequest, key: string, options: RateLimitOptions): RateLimitResult {
  const baseKey = getClientKey(req);
  const fullKey = `${key}:${baseKey}`;
  const now = Date.now();
  let entry = store.get(fullKey);
  if (!entry || entry.reset < now) {
    entry = { count: 0, reset: now + options.windowMs };
  }
  entry.count += 1;
  store.set(fullKey, entry);

  const allowed = entry.count <= options.limit;
  return {
    allowed,
    remaining: Math.max(0, options.limit - entry.count),
    reset: entry.reset,
  };
}

export function formatRetryAfter(msTimestamp: number): string {
  return new Date(msTimestamp).toISOString();
}

/*
Usage example in a route handler:

const rl = rateLimit(req, 'admin-guides-write', { limit: 20, windowMs: 60 * 60 * 1000 });
if (!rl.allowed) return NextResponse.json({ message: 'Rate limit exceeded', retryAfter: formatRetryAfter(rl.reset) }, { status: 429 });

Note: This in-memory limiter resets on server restart and is NOT distributed. Replace with Redis for multi-instance deployments.
*/

import "server-only";

// Simple in-memory sliding-window limiter. Counters live per Worker instance,
// so this is a first line of defence; add a Cloudflare rate limiting rule for
// /api/* in production.

const RETENTION_MS = 60 * 60_000; // the privacy policy promises at most 1 hour
const hits = new Map<string, number[]>();

function forgetExpired(now: number) {
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= RETENTION_MS)) hits.delete(key);
  }
}

export function rateLimit(key: string, { max, windowMs }: { max: number; windowMs: number }) {
  const now = Date.now();
  forgetExpired(now);
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  const allowed = recent.length < max;
  if (allowed) recent.push(now);
  hits.set(key, recent);
  return allowed;
}

export function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

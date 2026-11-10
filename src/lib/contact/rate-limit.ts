/**
 * Fixed-window in-memory rate limiter. Suitable for a single server instance;
 * replace with a shared store (e.g. Redis / Upstash) when running multiple instances
 * or on serverless platforms where memory is not shared between invocations.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
    if (hits.size > 5000) {
      for (const [k, entry] of hits) if (entry.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }
    entry.count += 1;
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: entry.count <= limit, retryAfterSeconds };
  };
}

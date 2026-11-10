import "server-only";

/** Verifies a Cloudflare Turnstile token. Returns true when Turnstile is not configured. */
export async function verifyTurnstile(token: string | undefined, ip: string | null, secret = process.env.TURNSTILE_SECRET_KEY): Promise<boolean> {
  if (!secret) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

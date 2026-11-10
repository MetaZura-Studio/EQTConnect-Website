import { NextResponse, type NextRequest } from "next/server";
import { getDeliveryProvider } from "@/lib/contact/delivery";
import { handleContactSubmission } from "@/lib/contact/handler";
import { createRateLimiter } from "@/lib/contact/rate-limit";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import type { ContactApiResponse } from "@/lib/contact/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function clientIp(request: NextRequest): string | null {
  return request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

function json(body: ContactApiResponse, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Unsupported request format." }, 415);
  }

  // Reject cross-site posts. Compare against the Host header so this works behind proxies.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (!originHost || originHost !== host) {
      return json({ ok: false, code: "bad_request", message: "Invalid request origin." }, 403);
    }
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, code: "bad_request", message: "Request is too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request", message: "Invalid request body." }, 400);
  }

  const ip = clientIp(request);
  const result = await handleContactSubmission(payload, {
    provider: getDeliveryProvider(),
    verifyHuman: (token) => verifyTurnstile(token, ip),
    rateLimit: () => limiter(ip ?? "unknown"),
    // Log codes only — never form contents.
    onError: (code, detail) => console.error(`[contact] ${code}`, detail ?? ""),
  });

  return json(result.body, result.status, result.headers);
}

export function GET() {
  return json({ ok: false, code: "bad_request", message: "Method not allowed." }, 405, { Allow: "POST" });
}

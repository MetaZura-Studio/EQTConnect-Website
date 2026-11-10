import type { ContactApiResponse, ContactFields } from "@/lib/contact/schema";
import { contactSubmissionSchema } from "@/lib/contact/schema";
import type { DeliveryProvider } from "@/lib/contact/delivery";

/** Submissions faster than this after the form rendered are treated as automated. */
export const MIN_FILL_TIME_MS = 2500;
/** Forms left open longer than this must be reloaded. */
export const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 6;

type HandlerDeps = {
  provider: DeliveryProvider | null;
  verifyHuman: (token: string | undefined) => Promise<boolean>;
  rateLimit: () => { allowed: boolean; retryAfterSeconds: number };
  now?: () => number;
  onError?: (code: string, detail?: unknown) => void;
};

export type HandlerResult = { status: number; body: ContactApiResponse; headers?: Record<string, string> };

export async function handleContactSubmission(payload: unknown, deps: HandlerDeps): Promise<HandlerResult> {
  const now = deps.now?.() ?? Date.now();

  const limit = deps.rateLimit();
  if (!limit.allowed) {
    return {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfterSeconds) },
      body: { ok: false, code: "rate_limited", message: "Too many requests. Please wait a few minutes and try again." },
    };
  }

  const parsed = contactSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFields, string>> = {};
    let metaInvalid = false;
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "website" || key === "startedAt" || key === "turnstileToken") metaInvalid = true;
      else if (typeof key === "string" && !(key in fieldErrors)) fieldErrors[key as keyof ContactFields] = issue.message;
    }
    if (metaInvalid && Object.keys(fieldErrors).length === 0) {
      return { status: 400, body: { ok: false, code: "verification_failed", message: "We couldn't verify this submission. Please reload the page and try again." } };
    }
    return { status: 422, body: { ok: false, code: "invalid", message: "Please correct the highlighted fields.", fieldErrors } };
  }

  const { website, startedAt, turnstileToken, ...inquiry } = parsed.data;
  const age = now - startedAt;
  if (website || age < MIN_FILL_TIME_MS || age > MAX_FORM_AGE_MS) {
    return { status: 400, body: { ok: false, code: "verification_failed", message: "We couldn't verify this submission. Please reload the page and try again." } };
  }

  if (!(await deps.verifyHuman(turnstileToken))) {
    return { status: 400, body: { ok: false, code: "verification_failed", message: "Verification failed. Please complete the check and try again." } };
  }

  if (!deps.provider) {
    deps.onError?.("not_configured");
    return {
      status: 503,
      body: {
        ok: false,
        code: "not_configured",
        message: "Online demo requests are not available yet. Your details have not been sent.",
      },
    };
  }

  try {
    await deps.provider.send(inquiry, { submittedAt: new Date(now).toISOString() });
  } catch (error) {
    deps.onError?.("delivery_failed", error instanceof Error ? { name: error.name, status: (error as { status?: number }).status } : undefined);
    return {
      status: 502,
      body: { ok: false, code: "delivery_failed", message: "We couldn't send your request just now. Your details have not been sent — please try again shortly." },
    };
  }

  return { status: 200, body: { ok: true } };
}

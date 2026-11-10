import "server-only";
import type { ContactInquiry } from "@/lib/contact/schema";

/**
 * Inquiry delivery adapters. Configure exactly one via environment variables (see .env.example).
 * If none is configured, submissions are rejected with a clear "not configured" response —
 * they are never silently discarded or reported as sent.
 */
export type DeliveryProvider = {
  name: "webhook" | "resend";
  send(inquiry: ContactInquiry, context: { submittedAt: string }): Promise<void>;
};

export class DeliveryError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "DeliveryError";
  }
}

const TIMEOUT_MS = 10_000;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function webhookProvider(url: string, secret: string | undefined): DeliveryProvider {
  return {
    name: "webhook",
    async send(inquiry, context) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({ type: "demo_request", submittedAt: context.submittedAt, inquiry }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      if (!response.ok) throw new DeliveryError("Webhook rejected the inquiry", response.status);
    },
  };
}

function resendProvider(apiKey: string, to: string, from: string): DeliveryProvider {
  return {
    name: "resend",
    async send(inquiry, context) {
      const rows: [string, string][] = [
        ["Name", inquiry.fullName],
        ["Work email", inquiry.workEmail],
        ["Company", inquiry.company],
        ["Job title", inquiry.jobTitle],
        ["Phone", inquiry.phone || "—"],
        ["Submitted", context.submittedAt],
      ];
      const html = `<h2>New EQTConnect demo request</h2><table>${rows
        .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join("")}</table><p><strong>Message</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, "<br>")}</p>`;
      const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${inquiry.message}`;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: inquiry.workEmail,
          subject: `Demo request — ${inquiry.company}`.slice(0, 200),
          html,
          text,
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      if (!response.ok) throw new DeliveryError("Email provider rejected the inquiry", response.status);
    },
  };
}

export function getDeliveryProvider(env: NodeJS.ProcessEnv = process.env): DeliveryProvider | null {
  if (env.CONTACT_WEBHOOK_URL) {
    return webhookProvider(env.CONTACT_WEBHOOK_URL, env.CONTACT_WEBHOOK_SECRET);
  }
  if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL) {
    return resendProvider(env.RESEND_API_KEY, env.CONTACT_TO_EMAIL, env.CONTACT_FROM_EMAIL);
  }
  return null;
}

export function isDeliveryConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return getDeliveryProvider(env) !== null;
}

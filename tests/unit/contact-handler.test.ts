import { describe, expect, it, vi } from "vitest";
import { handleContactSubmission, MIN_FILL_TIME_MS } from "@/lib/contact/handler";
import type { DeliveryProvider } from "@/lib/contact/delivery";

const NOW = 1_800_000_000_000;

const valid = {
  fullName: "Jane Doe",
  workEmail: "jane@company.example",
  company: "Example Co",
  jobTitle: "Company Secretary",
  phone: "",
  message: "We would like to see the dispatch tracking workflow.",
  website: "",
  startedAt: NOW - 10_000,
};

function deps(overrides: Partial<Parameters<typeof handleContactSubmission>[1]> = {}) {
  return {
    provider: null as DeliveryProvider | null,
    verifyHuman: async () => true,
    rateLimit: () => ({ allowed: true, retryAfterSeconds: 0 }),
    now: () => NOW,
    ...overrides,
  };
}

describe("handleContactSubmission", () => {
  it("never reports success when no delivery provider is configured", async () => {
    const result = await handleContactSubmission(valid, deps());
    expect(result.status).toBe(503);
    expect(result.body).toMatchObject({ ok: false, code: "not_configured" });
  });

  it("delivers a valid inquiry through the provider", async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    const result = await handleContactSubmission(valid, deps({ provider: { name: "webhook", send } }));
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(send).toHaveBeenCalledOnce();
    const [inquiry] = send.mock.calls[0]!;
    expect(inquiry).not.toHaveProperty("website");
    expect(inquiry).not.toHaveProperty("startedAt");
    expect(inquiry.workEmail).toBe("jane@company.example");
  });

  it("reports delivery failures honestly", async () => {
    const send = vi.fn().mockRejectedValue(new Error("boom"));
    const onError = vi.fn();
    const result = await handleContactSubmission(valid, deps({ provider: { name: "webhook", send }, onError }));
    expect(result.status).toBe(502);
    expect(result.body).toMatchObject({ ok: false, code: "delivery_failed" });
    expect(onError).toHaveBeenCalledWith("delivery_failed", expect.anything());
  });

  it("returns field errors for invalid input", async () => {
    const result = await handleContactSubmission({ ...valid, workEmail: "not-an-email", message: "hi" }, deps());
    expect(result.status).toBe(422);
    if (result.body.ok) throw new Error("expected failure");
    expect(result.body.fieldErrors?.workEmail).toMatch(/valid email/i);
    expect(result.body.fieldErrors?.message).toMatch(/at least 10/i);
  });

  it("rejects a filled honeypot", async () => {
    const result = await handleContactSubmission({ ...valid, website: "spam.example" }, deps());
    expect(result.status).toBe(400);
    expect(result.body).toMatchObject({ code: "verification_failed" });
  });

  it("rejects submissions completed implausibly fast", async () => {
    const result = await handleContactSubmission({ ...valid, startedAt: NOW - (MIN_FILL_TIME_MS - 1) }, deps());
    expect(result.body).toMatchObject({ code: "verification_failed" });
  });

  it("rejects failed human verification", async () => {
    const result = await handleContactSubmission(valid, deps({ verifyHuman: async () => false }));
    expect(result.body).toMatchObject({ code: "verification_failed" });
  });

  it("enforces rate limiting before parsing", async () => {
    const result = await handleContactSubmission(valid, deps({ rateLimit: () => ({ allowed: false, retryAfterSeconds: 120 }) }));
    expect(result.status).toBe(429);
    expect(result.headers).toEqual({ "Retry-After": "120" });
  });

  it("rejects non-object payloads", async () => {
    const result = await handleContactSubmission("nope", deps());
    expect(result.body.ok).toBe(false);
  });
});

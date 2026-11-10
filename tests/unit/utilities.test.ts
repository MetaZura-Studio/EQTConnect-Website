import { describe, expect, it } from "vitest";
import { contactFieldsSchema } from "@/lib/contact/schema";
import { createRateLimiter } from "@/lib/contact/rate-limit";
import { getDeliveryProvider } from "@/lib/contact/delivery";
import { isActivePath } from "@/lib/navigation";
import { filterResources } from "@/lib/resources";
import { resources } from "@/content/resources";
import { sampleMetrics, percent } from "@/content/mock-data";
import { capabilities, capabilityDetails } from "@/content/capabilities";
import { footerNav, mainNav } from "@/content/site";
import { platformContent } from "@/content/platform";
import { routes } from "@/lib/seo";

describe("contactFieldsSchema", () => {
  const base = { fullName: "Jane Doe", workEmail: "jane@co.example", company: "Co", jobTitle: "CFO", message: "Hello there team" };

  it("accepts valid input and trims whitespace", () => {
    const result = contactFieldsSchema.parse({ ...base, fullName: "  Jane Doe  " });
    expect(result.fullName).toBe("Jane Doe");
    expect(result.phone).toBe("");
  });

  it.each(["+92 300 1234567", "(021) 555-0101", ""])("accepts phone %s", (phone) => {
    expect(contactFieldsSchema.safeParse({ ...base, phone }).success).toBe(true);
  });

  it.each(["abc", "12", "<script>"])("rejects phone %s", (phone) => {
    expect(contactFieldsSchema.safeParse({ ...base, phone }).success).toBe(false);
  });

  it("rejects overly long messages", () => {
    expect(contactFieldsSchema.safeParse({ ...base, message: "x".repeat(2001) }).success).toBe(false);
  });
});

describe("createRateLimiter", () => {
  it("allows up to the limit per window then blocks", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("ip", 0).allowed).toBe(true);
    expect(check("ip", 10).allowed).toBe(true);
    const blocked = check("ip", 20);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
    expect(check("other", 20).allowed).toBe(true);
    expect(check("ip", 1001).allowed).toBe(true);
  });
});

describe("getDeliveryProvider", () => {
  it("returns null when nothing is configured", () => {
    expect(getDeliveryProvider({} as NodeJS.ProcessEnv)).toBeNull();
  });
  it("requires all Resend variables", () => {
    expect(getDeliveryProvider({ RESEND_API_KEY: "k", CONTACT_TO_EMAIL: "a@b.c" } as unknown as NodeJS.ProcessEnv)).toBeNull();
    expect(
      getDeliveryProvider({ RESEND_API_KEY: "k", CONTACT_TO_EMAIL: "a@b.c", CONTACT_FROM_EMAIL: "x@y.z" } as unknown as NodeJS.ProcessEnv)?.name,
    ).toBe("resend");
  });
  it("prefers the webhook when configured", () => {
    expect(getDeliveryProvider({ CONTACT_WEBHOOK_URL: "https://hooks.example" } as unknown as NodeJS.ProcessEnv)?.name).toBe("webhook");
  });
});

describe("isActivePath", () => {
  it.each([
    ["/", "/", true],
    ["/platform", "/", false],
    ["/platform", "/platform", true],
    ["/platform/x", "/platform", true],
    ["/platforms", "/platform", false],
    ["/resources", "/resources#faqs", true],
    [null, "/", false],
  ] as const)("%s vs %s → %s", (pathname, href, expected) => {
    expect(isActivePath(pathname, href)).toBe(expected);
  });
});

describe("filterResources", () => {
  it("filters by category", () => {
    const result = filterResources(resources, { query: "", category: "Help articles" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.category === "Help articles")).toBe(true);
  });
  it("matches all terms case-insensitively", () => {
    expect(filterResources(resources, { query: "RIDER app", category: "All" }).map((r) => r.id)).toEqual(["help-rider-app"]);
  });
  it("returns empty for no match", () => {
    expect(filterResources(resources, { query: "zzzz", category: "All" })).toEqual([]);
  });
});

describe("content integrity", () => {
  it("sample metrics are internally consistent", () => {
    const { totals, physical } = sampleMetrics;
    expect(totals.emailRecipients + totals.physicalRecipients).toBe(totals.shareholders);
    expect(physical.delivered + physical.outForDelivery + physical.notDelivered).toBe(totals.physicalRecipients);
    expect(percent(1, 0)).toBe(0);
  });

  it("documents all six capability groups with details", () => {
    expect(capabilities).toHaveLength(6);
    for (const c of capabilities) expect(capabilityDetails[c.id].benefits.length).toBeGreaterThan(0);
  });

  it("every navigation link points to a real route", () => {
    const hrefs = [...mainNav, ...footerNav.flatMap((g) => g.items)].map((i) => i.href.split("#")[0]);
    for (const href of hrefs) expect(routes).toContain(href);
  });

  it("exposes exactly the six primary pages", () => {
    expect([...routes].sort()).toEqual(["/", "/about", "/contact", "/platform", "/pricing", "/resources"]);
  });

  it("every workflow step links to a documented capability", () => {
    const ids = capabilities.map((c) => c.id) as string[];
    for (const step of platformContent.workflow.steps) expect(ids).toContain(step.capability);
  });

  it("footer anchors exist on the platform page", () => {
    const anchors = footerNav.flatMap((g) => g.items).map((i) => i.href).filter((h) => h.startsWith("/platform#"));
    const ids = [...capabilities.map((c) => c.id), platformContent.workflow.id] as string[];
    for (const a of anchors) expect(ids).toContain(a.split("#")[1]);
  });
});

import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", h1: "Run every AGM from one connected platform." },
  { path: "/platform", h1: "Everything your AGM needs, connected end to end." },
  { path: "/pricing", h1: "Plans for teams that coordinate AGM communications." },
  { path: "/about", h1: "Bringing structure to the work behind every AGM." },
  { path: "/contact", h1: "See EQTConnect with your team." },
  { path: "/resources", h1: "Guides and answers for AGM communication teams." },
];

function trackConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

test.describe("pages", () => {
  for (const { path, h1 } of pages) {
    test(`${path} renders with one h1, metadata and no runtime errors`, async ({ page }) => {
      const errors = trackConsoleErrors(page);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
      await expect(page).toHaveTitle(/EQTConnect/);
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
      expect(response?.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
      expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
      expect(errors).toEqual([]);
    });

    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
    });
  }

  test("page titles are unique", async ({ page }) => {
    const titles = new Set<string>();
    for (const { path } of pages) {
      await page.goto(path);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(pages.length);
  });
});

test.describe("responsive layout", () => {
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const { path } of pages) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe("navigation", () => {
  test("desktop nav marks the active page and every internal link resolves", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop navigation");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Platform" }).click();
    await expect(page).toHaveURL(/\/platform$/);
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Platform" })).toHaveAttribute("aria-current", "page");

    const hrefs = new Set<string>();
    for (const { path } of pages) {
      await page.goto(path);
      for (const href of await page.locator('a[href^="/"]').evaluateAll((els) => els.map((el) => el.getAttribute("href")!))) hrefs.add(href);
    }
    expect([...hrefs].some((h) => h === "#" || h === "")).toBe(false);
    for (const href of hrefs) {
      const [path, hash] = href.split("#");
      const response = await page.request.get(path || "/");
      expect(response.status(), href).toBe(200);
      if (hash) {
        await page.goto(href);
        await expect(page.locator(`[id="${hash}"]`), href).toHaveCount(1);
      }
    }
  });

  test("mobile menu opens, traps focus, closes on Escape and navigates", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(dialog).toBeHidden();
  });

  test("skip link moves focus to main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("unknown routes render the 404 page", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page could not be found.");
  });

  test("legacy paths redirect", async ({ page }) => {
    await page.goto("/book-a-demo");
    await expect(page).toHaveURL(/\/contact$/);
    for (const legacy of ["/agm-lifecycle", "/lifecycle"]) {
      await page.goto(legacy);
      await expect(page).toHaveURL(/\/platform#agm-workflow$/);
      await expect(page.getByRole("heading", { level: 2, name: "How the platform supports the work around your AGM." })).toBeVisible();
    }
  });

  test("no navigation references the removed lifecycle page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href*="lifecycle"]')).toHaveCount(0);
  });
});

test.describe("interactions", () => {
  test("FAQ accordion toggles", async ({ page }) => {
    await page.goto("/resources#faqs");
    const button = page.getByRole("button", { name: "What is the rider app?" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("region", { name: "What is the rider app?" })).toBeVisible();
  });

  test("resource search filters and shows an empty state", async ({ page }) => {
    await page.goto("/resources");
    await page.getByRole("searchbox", { name: "Search resources" }).fill("rider");
    await expect(page.getByRole("heading", { level: 3, name: "Getting started with the rider app" })).toBeVisible();
    await page.getByRole("searchbox", { name: "Search resources" }).fill("qqqq");
    await expect(page.getByText("No resources match your search")).toBeVisible();
  });

  test("platform workflow content is fully visible with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/platform#agm-workflow");
    for (const name of ["Organize shareholder information", "Report on operational activity", "What stays connected across every step"]) {
      await expect(page.getByRole("heading", { level: 3, name })).toBeVisible();
    }
  });
});

test.describe("contact form", () => {
  test("validates client-side and reports unconfigured delivery honestly", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Online submissions are not active yet")).toBeVisible();
    await page.getByRole("button", { name: "Request a demo" }).click();
    await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Full name")).toBeFocused();

    await page.getByLabel("Full name").fill("Jane Doe");
    await page.getByLabel("Work email").fill("jane@company.example");
    await page.getByLabel("Company name").fill("Example Co");
    await page.getByLabel("Job title").fill("Company Secretary");
    await page.getByLabel("How can we help?").fill("We would like a walkthrough of dispatch tracking.");
    await page.waitForTimeout(2600);
    await page.getByRole("button", { name: "Request a demo" }).click();
    await expect(page.locator("form").getByRole("alert")).toContainText("have not been sent");
    await expect(page.getByText(/request has been sent/i)).toHaveCount(0);
  });

  test("API rejects cross-origin, oversized and non-JSON requests", async ({ request, baseURL }) => {
    expect((await request.post("/api/contact", { data: "x", headers: { "content-type": "text/plain" } })).status()).toBe(415);
    expect((await request.post("/api/contact", { data: {}, headers: { origin: "https://evil.example" } })).status()).toBe(403);
    expect((await request.post("/api/contact", { data: { message: "x".repeat(20_000) }, headers: { origin: baseURL! } })).status()).toBe(413);
    const bot = await request.post("/api/contact", {
      data: { fullName: "Bot", workEmail: "b@b.co", company: "Bot", jobTitle: "Bot", message: "spam spam spam", website: "x", startedAt: Date.now() },
    });
    expect(bot.status()).toBe(400);
  });
});

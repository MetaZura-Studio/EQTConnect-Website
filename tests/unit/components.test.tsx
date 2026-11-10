import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "@/components/ui/accordion";
import { ResourceLibrary } from "@/components/sections/resources/resource-library";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { resourceCategories, resources } from "@/content/resources";

describe("Accordion", () => {
  it("toggles panels with correct ARIA state", async () => {
    const user = userEvent.setup();
    render(<Accordion items={[{ id: "a", title: "Question A", content: <p>Answer A</p> }]} />);
    const button = screen.getByRole("button", { name: "Question A" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Answer A")).not.toBeVisible();
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Question A" })).toBeVisible();
  });
});

describe("ResourceLibrary", () => {
  it("filters by category and search and shows an empty state", async () => {
    const user = userEvent.setup();
    render(<ResourceLibrary resources={resources} categories={resourceCategories} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(resources.length);

    await user.click(screen.getByRole("button", { name: /Downloads/ }));
    expect(screen.getByRole("button", { name: /Downloads/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: /^All/ }));
    await user.type(screen.getByRole("searchbox", { name: "Search resources" }), "nothing-matches");
    expect(screen.getByText("No resources match your search")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(resources.length);
  });

  it("does not render unpublished resources as links", () => {
    render(<ResourceLibrary resources={resources} categories={resourceCategories} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});

describe("ContactForm", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });
  afterEach(() => vi.unstubAllGlobals());

  async function fillValid(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("Full name"), "Jane Doe");
    await user.type(screen.getByLabelText("Work email"), "jane@company.example");
    await user.type(screen.getByLabelText("Company name"), "Example Co");
    await user.type(screen.getByLabelText("Job title"), "Company Secretary");
    await user.type(screen.getByLabelText("How can we help?"), "We want to review dispatch tracking.");
  }

  it("shows accessible errors and does not submit invalid data", async () => {
    const user = userEvent.setup();
    render(<ContactForm deliveryConfigured />);
    await user.click(screen.getByRole("button", { name: "Request a demo" }));
    const name = screen.getByLabelText("Full name");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/enter your full name/i);
    expect(name).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("warns when delivery is not configured and surfaces the server's honest error", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: false, code: "not_configured", message: "Online demo requests are not available yet. Your details have not been sent." }), {
        status: 503,
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm deliveryConfigured={false} />);
    expect(screen.getByText("Online submissions are not active yet")).toBeInTheDocument();
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Request a demo" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/have not been sent/i);
    expect(screen.queryByText(/request has been sent/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toHaveValue("Jane Doe");
  });

  it("shows success only after the server confirms delivery", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const user = userEvent.setup();
    render(<ContactForm deliveryConfigured />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Request a demo" }));
    await waitFor(() => expect(screen.getByText(/your request has been sent/i)).toBeInTheDocument());
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
    expect(body).toMatchObject({ fullName: "Jane Doe", website: "" });
    expect(typeof body.startedAt).toBe("number");
  });

  it("maps server field errors onto inputs", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ ok: false, code: "invalid", message: "Please correct the highlighted fields.", fieldErrors: { company: "Company rejected." } }), {
        status: 422,
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm deliveryConfigured />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Request a demo" }));
    expect(await screen.findByText("Company rejected.")).toBeInTheDocument();
    expect(screen.getByLabelText("Company name")).toHaveAttribute("aria-invalid", "true");
  });
});

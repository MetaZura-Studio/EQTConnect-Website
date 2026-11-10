import type { CapabilityId } from "@/types/content";

export type WorkflowStep = {
  step: string;
  title: string;
  summary: string;
  points: string[];
  capability: CapabilityId;
};

/** Platform Overview copy (source: supplied website document, except where noted). */
export const platformContent = {
  hero: {
    eyebrow: "Platform overview",
    heading: "Everything your AGM needs, connected end to end.",
    subheading:
      "One system for shareholder data, invitation mapping, notices, dispatch tracking and reporting, with the controls an enterprise expects.",
    primaryCta: { label: "Book a demo", href: "/contact" },
    secondaryCta: { label: "See pricing", href: "/pricing" },
  },
  glance: {
    eyebrow: "Platform at a glance",
    heading: "A Clearer View of Your Entire AGM Workflow",
    description:
      "EQTConnect brings the essential activities involved in AGM preparation and shareholder communications into one connected environment. Instead of coordinating information across separate tools and manual processes, your team can work from a centralized operational view.",
  },
  /**
   * PROPOSED NARRATIVE — pending business review. Not in the source document: describes how
   * documented capabilities relate to AGM communication work. Not an official or exhaustive AGM process.
   */
  workflow: {
    id: "agm-workflow",
    navLabel: "AGM workflow",
    eyebrow: "Across your AGM workflow",
    heading: "How the platform supports the work around your AGM.",
    subheading:
      "From organizing shareholder information to reviewing delivery outcomes, each part of EQTConnect draws on the same records and statuses.",
    reviewNote:
      "Proposed narrative for business review. Steps illustrate how documented platform functions relate to one another; your AGM process may differ.",
    steps: [
      {
        step: "01",
        title: "Organize shareholder information",
        summary: "Start from one centralized set of investor and shareholder records.",
        points: ["Maintain shareholder information in one organized platform.", "Make records easier for authorized users to access and manage."],
        capability: "shareholder-data",
      },
      {
        step: "02",
        title: "Coordinate AGM communications",
        summary: "Bring the operational information and activities required for AGM communications together.",
        points: ["Organize AGM-related operational information.", "Coordinate shareholder communication activities through a structured workflow."],
        capability: "agm-operations",
      },
      {
        step: "03",
        title: "Manage digital and physical invitations",
        summary: "Handle email invitations and physical dispatches from the same shareholder list.",
        points: ["Manage email-based shareholder invitations.", "Coordinate the preparation and dispatch of physical AGM invitations and documents."],
        capability: "communications",
      },
      {
        step: "04",
        title: "Monitor dispatch progress",
        summary: "Follow physical notices through the delivery process with rider-app-supported operations.",
        points: ["Review available dispatch statuses as items progress.", "Access delivery updates recorded through dispatch and rider workflows."],
        capability: "dispatch",
      },
      {
        step: "05",
        title: "Review delivery statuses and exceptions",
        summary: "Identify items that remain pending, encounter delivery issues, or need follow-up.",
        points: [
          "Identify dispatches that remain pending or encounter delivery issues.",
          "Use communication and dispatch statuses to decide what needs further attention.",
        ],
        capability: "dispatch",
      },
      {
        step: "06",
        title: "Report on operational activity",
        summary: "Review communication and delivery progress through centralized reports.",
        points: ["Review operational summaries of communications and dispatch activities.", "Export dispatch, delivery and attendance records for review."],
        capability: "reporting",
      },
    ] satisfies WorkflowStep[],
    connected: {
      heading: "What stays connected across every step",
      items: [
        { title: "One shareholder list", description: "Email and physical communications are coordinated from the same centralized records." },
        { title: "Shared status information", description: "Communication and dispatch statuses are available to authorized teams in one place." },
        { title: "Structured administration", description: "Supported platform settings and user access are managed from one environment." },
      ],
    },
  },
  cta: {
    heading: "See the connected AGM workflow in action.",
    subheading: "Book a demo to walk through shareholder data, communications, dispatch tracking and reporting with the EQTConnect team.",
  },
} as const;

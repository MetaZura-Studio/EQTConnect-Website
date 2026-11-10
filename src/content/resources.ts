import type { Faq, Resource, ResourceCategory } from "@/types/content";

export const resourceCategories: ResourceCategory[] = ["AGM explainers", "Platform guides", "Help articles", "Downloads"];

/**
 * SAMPLE ENTRIES — not published content. They exist to exercise search and filtering
 * and show the intended structure. Replace with approved resources (set `sample: false`
 * and provide an `href`) before launch.
 */
export const resources: Resource[] = [
  {
    id: "guide-shareholder-records",
    title: "Preparing shareholder records for AGM communications",
    summary: "How centralized records support invitation workflows in EQTConnect.",
    category: "Platform guides",
    href: null,
    sample: true,
  },
  {
    id: "guide-digital-physical",
    title: "Coordinating email and physical invitations from one list",
    summary: "An overview of managing both communication channels in the platform.",
    category: "Platform guides",
    href: null,
    sample: true,
  },
  {
    id: "guide-dispatch-statuses",
    title: "Understanding dispatch and delivery statuses",
    summary: "What each status in the dispatch workflow represents and when to follow up.",
    category: "Help articles",
    href: null,
    sample: true,
  },
  {
    id: "help-rider-app",
    title: "Getting started with the rider app",
    summary: "How delivery activity connects with the wider EQTConnect workflow.",
    category: "Help articles",
    href: null,
    sample: true,
  },
  {
    id: "explainer-agm-communications",
    title: "What goes into AGM shareholder communications",
    summary: "A general explainer on the communication work surrounding an AGM. Not legal or regulatory guidance.",
    category: "AGM explainers",
    href: null,
    sample: true,
  },
  {
    id: "download-overview",
    title: "EQTConnect platform overview",
    summary: "A downloadable summary of the platform's capability groups.",
    category: "Downloads",
    href: null,
    sample: true,
  },
];

/**
 * DRAFT FAQs. Answers restate the supplied platform document and are pending business review.
 * Do not add legal, regulatory or compliance guidance without approval.
 */
export const faqs: Faq[] = [
  {
    id: "what-is",
    question: "What is EQTConnect?",
    answer:
      "EQTConnect is a centralized platform for AGM management. It brings shareholder data, AGM invitations, digital and physical communications, dispatch tracking and reporting together in one connected environment.",
    draft: true,
  },
  {
    id: "channels",
    question: "Does EQTConnect support both email and physical invitations?",
    answer:
      "Yes. EQTConnect brings digital and physical communication workflows together, so teams can manage email-based invitations and coordinate the preparation and dispatch of physical AGM invitations and documents through one platform.",
    draft: true,
  },
  {
    id: "rider-app",
    question: "What is the rider app?",
    answer:
      "The rider app supports delivery operations by connecting physical delivery activities with the wider EQTConnect workflow. Delivery information recorded through dispatch and rider workflows is available to your team for review.",
    draft: true,
  },
  {
    id: "exceptions",
    question: "Can we see which notices were not delivered?",
    answer:
      "EQTConnect helps teams identify dispatches that remain pending, encounter delivery issues, or require further investigation, based on the statuses and information available.",
    draft: true,
  },
  {
    id: "reporting",
    question: "What can we report on?",
    answer:
      "Centralized reports give a view of communication and delivery progress, including operational summaries, delivery monitoring and exception follow-ups. Dispatch, delivery and attendance records can be exported for review.",
    draft: true,
  },
  {
    id: "access",
    question: "Can we control who has access?",
    answer:
      "EQTConnect provides centralized administration for managing users, access permissions and platform operations, according to the permissions available in the platform.",
    draft: true,
  },
];

export const resourcesContent = {
  hero: {
    eyebrow: "Resources",
    heading: "Guides and answers for AGM communication teams.",
    subheading: "Platform guides, help articles and frequently asked questions about working with EQTConnect.",
  },
  libraryHeading: "Resource library",
  sampleNotice: "Sample entries shown to illustrate structure. Approved resources have not been published yet.",
  faqHeading: "Frequently asked questions",
  faqNotice: "Draft answers based on the platform overview, pending review.",
} as const;

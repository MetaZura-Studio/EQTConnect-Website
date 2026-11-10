import type { Benefit, Capability, CapabilityId } from "@/types/content";

/** The six documented capability groups (source: "Platform at a glance"). */
export const capabilities: Capability[] = [
  {
    id: "shareholder-data",
    index: "01",
    title: "Shareholder Data",
    shortTitle: "Shareholder data",
    summary: "Organize and manage investor and shareholder records.",
  },
  {
    id: "agm-operations",
    index: "02",
    title: "AGM Operations",
    shortTitle: "AGM operations",
    summary: "Coordinate information and activities required for AGM communications.",
  },
  {
    id: "communications",
    index: "03",
    title: "Digital and Physical Communications",
    shortTitle: "Communications",
    summary:
      "Manage AGM invitations through email and physical dispatches, keeping all shareholder communications organized in one place.",
  },
  {
    id: "dispatch",
    index: "04",
    title: "Dispatch Visibility and Rider App",
    shortTitle: "Dispatch & rider app",
    summary:
      "Track physical dispatch progress, monitor delivery statuses, and coordinate delivery operations through the rider app.",
  },
  {
    id: "reporting",
    index: "05",
    title: "Reporting and Operational Oversight",
    shortTitle: "Reporting",
    summary:
      "Get a clear view of communication and delivery progress through centralized reports, helping your team monitor activities and follow up when needed.",
  },
  {
    id: "administration",
    index: "06",
    title: "Enterprise Administration and Control",
    shortTitle: "Administration",
    summary: "Manage users, access permissions, and platform operations through a centralized administration system.",
  },
];

export function getCapability(id: CapabilityId): Capability {
  const capability = capabilities.find((item) => item.id === id);
  if (!capability) throw new Error(`Unknown capability: ${id}`);
  return capability;
}

type CapabilityDetail = {
  eyebrow: string;
  heading: string;
  description: string[];
  benefitsLabel: string;
  benefits: Benefit[];
};

/** Detailed copy for each capability (source: Platform Overview page). */
export const capabilityDetails: Record<CapabilityId, CapabilityDetail> = {
  "shareholder-data": {
    eyebrow: "Investor and shareholder data",
    heading: "Your Shareholder Data, Organized and Accessible.",
    description: [
      "Effective AGM management starts with reliable shareholder information. EQTConnect helps your team organize investor and shareholder records in one centralized environment, making it easier to manage the information required for AGM preparation and communications.",
    ],
    benefitsLabel: "Key benefits",
    benefits: [
      { title: "Centralized Records", description: "Maintain shareholder information in one organized platform." },
      {
        title: "Communication Readiness",
        description: "Access the information needed to prepare AGM invitation workflows.",
      },
      {
        title: "Improved Visibility",
        description: "Make shareholder records easier for authorized users to access and manage.",
      },
      {
        title: "Operational Consistency",
        description: "Support more structured data handling throughout the AGM process.",
      },
    ],
  },
  "agm-operations": {
    eyebrow: "AGM operations",
    heading: "Coordinate Your AGM Operations with Greater Control",
    description: [
      "AGM preparation involves multiple activities that need to come together at the right time. EQTConnect helps centralize the operational workflow surrounding AGM communications, giving teams a more structured way to coordinate preparation and execution.",
    ],
    benefitsLabel: "Key benefits",
    benefits: [
      { title: "Organize AGM-related operational information." },
      { title: "Coordinate shareholder communication activities." },
      { title: "Monitor the progress of relevant workflows." },
      { title: "Identify outstanding activities that may require attention." },
      { title: "Maintain a clearer operational overview throughout the process." },
    ],
  },
  communications: {
    eyebrow: "Digital and physical communications",
    heading: "Connect Digital Invitations with Physical Communications",
    description: [
      "Shareholder communications often require more than one delivery method. While email provides a digital communication channel, some AGM invitations and documents also need to be delivered physically.",
      "EQTConnect brings digital and physical communication workflows together, helping your team coordinate activities across both channels through a centralized platform.",
    ],
    benefitsLabel: "Features",
    benefits: [
      {
        title: "Digital Communications",
        description: "Manage email-based shareholder invitations and maintain visibility into communication activity.",
      },
      {
        title: "Physical Dispatches",
        description: "Coordinate the preparation and dispatch of physical AGM invitations and documents.",
      },
      {
        title: "Unified Operational View",
        description:
          "Bring communication-related information together so teams can review progress without relying entirely on separate tracking processes.",
      },
      {
        title: "Better Follow-Up",
        description: "Use available communication and dispatch statuses to identify items that may require further attention.",
      },
    ],
  },
  dispatch: {
    eyebrow: "Dispatch visibility and rider app",
    heading: "From Dispatch to Delivery, Stay Informed",
    description: [
      "Sending a physical AGM invitation is only part of the journey. Knowing where it is in the delivery process and whether it has reached its destination is equally important.",
      "EQTConnect helps teams monitor physical dispatch progress and access available delivery updates through a connected operational workflow. With dispatch visibility and rider-app-supported delivery operations, your team can better understand delivery progress and identify items that may need follow-up.",
    ],
    benefitsLabel: "Features",
    benefits: [
      {
        title: "Dispatch Status Tracking",
        description:
          "Review available dispatch statuses to understand which items are progressing through the delivery process and which may require attention.",
      },
      {
        title: "Delivery Updates",
        description:
          "Access delivery information recorded through the relevant dispatch and rider workflows, helping your team maintain better operational visibility.",
      },
      {
        title: "Rider App Integration",
        description:
          "Support delivery operations through a rider app that connects physical delivery activities with the wider EQTConnect workflow.",
      },
      {
        title: "Exception Identification",
        description:
          "Identify dispatches that remain pending, encounter delivery issues, or require further investigation based on the statuses and information available.",
      },
      {
        title: "Centralized Oversight",
        description:
          "Review dispatch and delivery information in one place instead of depending solely on separate updates from delivery teams.",
      },
    ],
  },
  reporting: {
    eyebrow: "Reporting and operational oversight",
    heading: "Turn Operational Activity into Actionable Visibility",
    description: [
      "When AGM communications involve large shareholder lists, multiple dispatches, and different delivery channels, a clear operational overview becomes essential.",
      "EQTConnect helps bring relevant operational information together, making it easier for teams to review progress, monitor communication and delivery statuses, and identify areas that may need attention.",
    ],
    benefitsLabel: "Key capabilities",
    benefits: [
      {
        title: "Operational Summaries",
        description: "Review relevant information about shareholder communications and dispatch activities.",
      },
      {
        title: "Delivery Monitoring",
        description: "Understand delivery progress through available dispatch and delivery status information.",
      },
      {
        title: "Exception Follow-Ups",
        description: "Identify outstanding or unsuccessful deliveries that may require additional action.",
      },
      {
        title: "Centralized Oversight",
        description: "Give authorized teams a shared view of operational activity to support coordination and decision-making.",
      },
    ],
  },
  administration: {
    eyebrow: "Enterprise administration and control",
    heading: "Structured Administration. Greater Operational Control.",
    description: [
      "Managing AGM communications requires coordination between people, data, and operational responsibilities. EQTConnect provides a centralized environment for administering supported platform functions and organizing access to relevant information.",
      "Designed for structured business workflows, the platform helps organizations maintain a more consistent approach to managing their AGM communication operations.",
    ],
    benefitsLabel: "Key benefits",
    benefits: [
      {
        title: "Centralized Administration",
        description: "Manage supported platform settings and operational functions from one environment.",
      },
      {
        title: "Access Management",
        description: "Support controlled access for authorized users according to the platform's available permissions.",
      },
      {
        title: "Operational Coordination",
        description: "Help relevant teams work with a consistent view of AGM communication activities.",
      },
      {
        title: "Organized Workflows",
        description: "Support a more structured approach to managing recurring AGM operations.",
      },
    ],
  },
};

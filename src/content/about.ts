/**
 * About page. The source lists the sections (hero, mission, what we do, why an AGM platform)
 * without copy. Text marked `provisional` restates the documented platform purpose and needs
 * approval; `mission` stays null until an official statement is supplied.
 */
export const aboutContent = {
  hero: {
    eyebrow: "About EQTConnect",
    heading: "Bringing structure to the work behind every AGM.",
    subheading:
      "EQTConnect is a centralized platform that helps organizations coordinate shareholder data, AGM communications, physical dispatches and reporting.",
    provisional: true,
  },
  mission: {
    heading: "Our mission",
    statement: null as string | null,
    context:
      "EQTConnect exists to move AGM communication work away from fragmented spreadsheets, disconnected tools and manual delivery processes, toward one organized and connected workflow.",
    provisional: true,
  },
  whatWeDo: {
    heading: "What we do",
    subheading: "One platform for the essential parts of AGM communication work.",
  },
  whyPlatform: {
    eyebrow: "Why an AGM platform",
    heading: "Because AGM communications span people, data and delivery.",
    paragraphs: [
      "When AGM communications involve large shareholder lists, multiple dispatches, and different delivery channels, a clear operational overview becomes essential.",
      "Instead of coordinating information across separate tools and manual processes, your team can work from a centralized operational view.",
    ],
    before: ["Registers in files that differ by version and owner", "Email and printed notices sent from separate tools", "Physical notices that disappear once they leave the office"],
    after: ["One centralized shareholder register", "Email and print-and-post coordinated from the same list", "Dispatch statuses and delivery updates in one place"],
  },
  reserved: {
    heading: "Company story and team",
    description:
      "Space reserved for approved company history, leadership and team information, office locations and photography.",
  },
} as const;

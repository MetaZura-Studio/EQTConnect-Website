/** Home page copy. Hero, problem and platform copy are taken from the supplied website document. */
export const homeContent = {
  hero: {
    eyebrow: "AGM management platform",
    heading: "Run every AGM from one connected platform.",
    subheading:
      "Manage shareholder data, coordinate AGM invitations, track physical dispatches, and oversee communications through one connected platform. EQTConnect brings the essential parts of AGM management together to help your team work with greater visibility, accuracy, and control.",
    primaryCta: { label: "Book a demo", href: "/contact" },
    secondaryCta: { label: "Explore the platform", href: "/platform" },
  },
  trust: {
    heading: "Trusted by teams who run AGMs every year",
    /** Number of reserved logo slots. Replace with approved client logos only. */
    logoSlots: 6,
  },
  problem: {
    eyebrow: "The problem",
    heading: "AGMs shouldn't run on spreadsheets and courier receipts.",
    columns: { problem: "Problem", cost: "What it costs you" },
    items: [
      {
        id: "data",
        title: "Scattered investor data.",
        description: "Registers live in files that differ by version and owner.",
        cost: "Wrong addresses, duplicate records, missed shareholders.",
      },
      {
        id: "dispatch",
        title: "Manual notice dispatch.",
        description: "Email and printed notices are sent from separate tools.",
        cost: "No single record of who was sent what, and when.",
      },
      {
        id: "visibility",
        title: "No delivery visibility.",
        description: "Physical notices disappear once they leave the office.",
        cost: "You can't prove delivery or act on failed attempts.",
      },
    ],
  },
  platform: {
    eyebrow: "One connected platform",
    heading: "Everything You Need to Coordinate Your AGM Communications.",
    subheading:
      "EQTConnect connects shareholder information, AGM communications, physical dispatch operations, and reporting in one centralized platform.",
    pillars: {
      investorData: {
        title: "Investor data",
        description: "Import, clean and maintain one trusted shareholder register.",
      },
      invitations: {
        title: "AGM invitation management",
        description: "Coordinate AGM invitations and communication activities through a structured, centralized workflow.",
      },
      communications: {
        title: "Digital and physical communications",
        description: "Send notices by email and print-and-post from the same list.",
      },
      dispatch: {
        title: "Dispatch tracking",
        description: "Follow every physical notice to delivered or not delivered, with the rider app.",
      },
      reporting: {
        title: "Reporting",
        description: "Export dispatch, delivery and attendance records ready for compliance review.",
      },
    },
  },
  workflow: {
    eyebrow: "Connected workflow",
    heading: "Related workflows, one shared environment.",
    subheading:
      "Shareholder records, AGM communications, dispatch monitoring and reporting draw on the same information — so each part of the work stays connected to the rest.",
    note: "Illustrative relationship between platform areas. Teams can work across these areas in the order their AGM requires.",
  },
  cta: {
    heading: "Bring greater clarity and control to your next AGM.",
    subheading: "See how EQTConnect brings shareholder data, communications, dispatch tracking and reporting into one place.",
    primaryCta: { label: "Book a demo", href: "/contact" },
    secondaryCta: { label: "Explore the platform", href: "/platform" },
  },
} as const;

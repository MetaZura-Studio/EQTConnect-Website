import type { StatusTone } from "@/types/content";

/**
 * Fictional sample data shared by every conceptual product visualization.
 * No real shareholders, organisations or operational data are represented here.
 * Totals are internally consistent so mockups agree with each other.
 */
export const sampleOrg = {
  name: "Sample Holdings Ltd",
  meeting: "AGM 2026",
  meetingDate: "14 Jun 2026",
};

const totals = {
  shareholders: 12480,
  emailRecipients: 9862,
  physicalRecipients: 2618,
};

const physical = {
  delivered: 2284,
  outForDelivery: 188,
  notDelivered: 146,
};

const email = {
  sent: 9862,
  followUp: 214,
};

export const sampleMetrics = { totals, physical, email };

export type DispatchStatus = "Delivered" | "Out for delivery" | "Not delivered" | "Prepared";

export const dispatchTone: Record<DispatchStatus, StatusTone> = {
  Delivered: "success",
  "Out for delivery": "info",
  "Not delivered": "danger",
  Prepared: "neutral",
};

export type SampleShareholder = {
  folio: string;
  name: string;
  city: string;
  holding: number;
  channel: "Email" | "Physical";
  record: "Verified" | "Review" | "Duplicate?";
};

export const sampleShareholders: SampleShareholder[] = [
  { folio: "F-004812", name: "A. Rahman", city: "Lahore", holding: 12500, channel: "Email", record: "Verified" },
  { folio: "F-004813", name: "M. Okafor", city: "Karachi", holding: 4200, channel: "Physical", record: "Verified" },
  { folio: "F-004817", name: "L. Chen", city: "Islamabad", holding: 860, channel: "Email", record: "Review" },
  { folio: "F-004821", name: "S. Iqbal", city: "Lahore", holding: 31000, channel: "Physical", record: "Verified" },
  { folio: "F-004822", name: "S. Iqbal", city: "Lahore", holding: 1500, channel: "Physical", record: "Duplicate?" },
  { folio: "F-004830", name: "J. Fernandes", city: "Karachi", holding: 7350, channel: "Email", record: "Verified" },
  { folio: "F-004836", name: "R. Malik", city: "Multan", holding: 2100, channel: "Physical", record: "Verified" },
];

export const recordTone: Record<SampleShareholder["record"], StatusTone> = {
  Verified: "success",
  Review: "warning",
  "Duplicate?": "danger",
};

export type SampleDispatch = {
  ref: string;
  recipient: string;
  area: string;
  rider: string;
  status: DispatchStatus;
  updated: string;
};

export const sampleDispatches: SampleDispatch[] = [
  { ref: "DSP-20931", recipient: "M. Okafor", area: "Clifton", rider: "Rider 07", status: "Delivered", updated: "10:42" },
  { ref: "DSP-20932", recipient: "S. Iqbal", area: "Gulberg", rider: "Rider 03", status: "Out for delivery", updated: "11:05" },
  { ref: "DSP-20935", recipient: "R. Malik", area: "Cantt", rider: "Rider 11", status: "Not delivered", updated: "11:18" },
  { ref: "DSP-20937", recipient: "H. Siddiqui", area: "DHA Ph. 5", rider: "Rider 03", status: "Delivered", updated: "11:26" },
  { ref: "DSP-20940", recipient: "N. Ahmed", area: "F-7", rider: "—", status: "Prepared", updated: "11:31" },
];

export type WorkflowStage = { label: string; state: "done" | "active" | "upcoming"; detail: string };

export const sampleWorkflow: WorkflowStage[] = [
  { label: "Register prepared", state: "done", detail: "12,480 records" },
  { label: "Invitations prepared", state: "done", detail: "2 channels" },
  { label: "Email invitations", state: "done", detail: "9,862 sent" },
  { label: "Physical dispatch", state: "active", detail: "87% delivered" },
  { label: "Reporting", state: "upcoming", detail: "Not started" },
];

export const sampleActivity = [
  { time: "11:31", text: "Batch 14 prepared for physical dispatch", tone: "neutral" as StatusTone },
  { time: "11:18", text: "DSP-20935 marked not delivered by rider", tone: "danger" as StatusTone },
  { time: "11:05", text: "Rider 03 started route · 24 items", tone: "info" as StatusTone },
  { time: "10:42", text: "DSP-20931 delivered · confirmation recorded", tone: "success" as StatusTone },
];

export const sampleOutstanding = [
  { label: "Review 38 records flagged as possible duplicates", owner: "Registry team", tone: "warning" as StatusTone },
  { label: "Follow up on 146 not-delivered notices", owner: "Dispatch team", tone: "danger" as StatusTone },
  { label: "Follow up on 214 email invitations", owner: "Communications", tone: "warning" as StatusTone },
];

/** Daily delivered counts for the reporting chart (fictional). */
export const sampleDeliveryTrend = [120, 210, 340, 420, 380, 460, 354];
export const sampleDeliveryTrendLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const sampleUsers = [
  { name: "Ayesha K.", email: "ayesha@sample.example", area: "Administration", status: "Active" },
  { name: "Omar T.", email: "omar@sample.example", area: "Shareholder data", status: "Active" },
  { name: "Sara L.", email: "sara@sample.example", area: "Dispatch", status: "Active" },
  { name: "Daniel P.", email: "daniel@sample.example", area: "Reporting", status: "Invited" },
];

export function percent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

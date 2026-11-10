import { CalendarCheck, ChartColumn, Mail, Settings2, Truck, Users, type LucideIcon } from "lucide-react";
import type { CapabilityId } from "@/types/content";

export const capabilityIcons: Record<CapabilityId, LucideIcon> = {
  "shareholder-data": Users,
  "agm-operations": CalendarCheck,
  communications: Mail,
  dispatch: Truck,
  reporting: ChartColumn,
  administration: Settings2,
};

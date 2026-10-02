import {
  LayersIcon,
  MonitorIcon,
  PhoneIcon,
  ZapIcon,
  type IconComponent,
} from "@/components/ui/icons";
import type { SolutionSlug } from "@/types";

export const solutionIcons: Record<SolutionSlug, IconComponent> = {
  websites: MonitorIcon,
  "ai-calling": PhoneIcon,
  automation: ZapIcon,
  "business-systems": LayersIcon,
};

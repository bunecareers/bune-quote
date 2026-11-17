import { z } from "zod";
import { locales } from "@/i18n/config";

export const sizes = ["s", "m", "l", "xl"] as const;
export const volumes = ["unknown", "lt50", "50-200", "200-1000", "gt1000"] as const;

export const leadSchema = z.object({
  kind: z.literal("rfq"),
  lang: z.enum(locales),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  company: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(40).optional(),
  size: z.enum(sizes).optional(),
  volume: z.enum(volumes).optional(),
  systems: z.string().trim().max(500).optional(),
  message: z.string().trim().max(4000).optional(),
  consent: z.literal(true),
});

export type Lead = z.infer<typeof leadSchema>;

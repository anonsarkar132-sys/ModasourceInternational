import { z } from "zod";

export const navbarValidationSchema = z.object({
  items: z.array(z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    subItems: z.array(z.object({ label: z.string(), href: z.string() })).optional()
  }))
});
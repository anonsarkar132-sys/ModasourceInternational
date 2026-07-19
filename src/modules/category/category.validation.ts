import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().optional().default(""),
  parent: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

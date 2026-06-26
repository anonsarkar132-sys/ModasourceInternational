import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  slug: z.string({ required_error: "Slug is required" }),
  image: z.string().optional().default(""),
  parent: z.string().nullable().optional(), // Ekdom strict definition
});
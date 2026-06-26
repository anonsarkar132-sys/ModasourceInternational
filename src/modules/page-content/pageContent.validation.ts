import { z } from "zod";

export const pageContentValidationSchema = z.object({
  pageSlug: z.string().min(1),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});
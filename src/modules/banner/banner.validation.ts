import { z } from "zod";

export const bannerValidationSchema = z.object({
  title:     z.string().optional(),
  subtitle:  z.string().optional(),
  // ✅ mediaUrl — upload হলে controller থেকে আসবে
  mediaUrl:  z.string().min(1, "Media URL is required"),
  mediaType: z.enum(["image", "video"]).default("image"),
  isActive:  z.boolean().optional().default(true),
});
import { z } from "zod";

export const contactValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  status: z.enum(["pending", "reviewed", "replied"]).optional(),
});
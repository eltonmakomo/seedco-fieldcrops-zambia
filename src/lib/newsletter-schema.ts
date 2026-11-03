import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().max(255).email("Please enter a valid email address.").transform((email) => email.toLowerCase()),
  website: z.string().max(0).optional().default(""),
});
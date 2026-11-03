import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  phone: z.string().trim().max(30).regex(/^[+\d\s().-]*$/, "Enter a valid phone number."),
  subject: z.string().trim().min(1, "Enter a subject.").max(150),
  message: z.string().trim().min(1, "Enter your message.").max(2000),
  website: z.string().max(0),
});
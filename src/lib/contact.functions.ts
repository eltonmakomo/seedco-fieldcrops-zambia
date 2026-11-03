import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "@/lib/contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Public intake permits only validated inserts; no visitor can read enquiries.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { name, email, phone, subject, message } = data;
    const { error } = await supabaseAdmin.from("contact_submissions").insert({ name, email, phone, subject, message });
    if (error) throw new Error("Your enquiry could not be saved. Please try again.");
    return { success: true };
  });
import { createServerFn } from "@tanstack/react-start";
import { newsletterSchema } from "@/lib/newsletter-schema";

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => newsletterSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("newsletter_subscriptions").upsert({ email: data.email }, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw new Error("Subscription could not be saved. Please try again.");
    return { success: true };
  });
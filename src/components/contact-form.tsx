import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/contact-schema";
import { submitContact } from "@/lib/contact.functions";

export function ContactForm() {
  const send = useServerFn(submitContact);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }
    setPending(true); setError("");
    try { await send({ data: parsed.data }); setSuccess(true); form.reset(); }
    catch { setError("Your enquiry could not be saved. Please try again."); }
    finally { setPending(false); }
  }
  return <section className="mt-10 border-t border-border pt-8" aria-label="Contact form">
    <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Send us a message</h2>
    {success ? <div role="status" className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-6"><CircleCheck className="size-6 shrink-0 text-primary" /><p>Your enquiry has been saved. Thank you for contacting Seed Co Zambia.</p><Button variant="outline" onClick={() => setSuccess(false)}>New message</Button></div> : <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2"><Label htmlFor="contact-name">Full name</Label><Input id="contact-name" name="name" required maxLength={100} autoComplete="name" className="h-12 bg-card" /></div>
      <div className="space-y-2"><Label htmlFor="contact-email">Email address</Label><Input id="contact-email" name="email" type="email" required maxLength={255} autoComplete="email" className="h-12 bg-card" /></div>
      <div className="space-y-2"><Label htmlFor="contact-phone">Phone number (optional)</Label><Input id="contact-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className="h-12 bg-card" /></div>
      <div className="space-y-2"><Label htmlFor="contact-subject">Subject</Label><Input id="contact-subject" name="subject" required maxLength={150} className="h-12 bg-card" /></div>
      <div className="space-y-2 sm:col-span-2"><Label htmlFor="contact-message">Message</Label><Textarea id="contact-message" name="message" required maxLength={2000} rows={6} className="bg-card" /></div>
      <div hidden aria-hidden="true"><Input name="website" tabIndex={-1} autoComplete="off" /></div>
      {error && <p role="alert" className="text-destructive sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2"><Button type="submit" size="lg" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : <Send />} {pending ? "Sending…" : "Send message"}</Button></div>
    </form>}
  </section>;
}
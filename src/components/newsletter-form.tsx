import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/newsletter-schema";
import { subscribeNewsletter } from "@/lib/newsletter.functions";
import cropImage from "@/assets/banner-agronomy.jpg";

export function NewsletterForm() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const parsed = newsletterSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError("Please enter a valid email address."); return; }
    setPending(true); setError("");
    try { await subscribe({ data: parsed.data }); setSuccess(true); form.reset(); }
    catch { setError("Subscription could not be saved. Please try again."); }
    finally { setPending(false); }
  }
  return <section className="footer-newsletter" aria-labelledby="newsletter-title">
    <img src={cropImage} alt="" loading="lazy" width={1920} height={720} className="footer-newsletter-photo" />
    <div className="footer-newsletter-inner"><h3 id="newsletter-title">Become part of our mailing list</h3>
      {success ? <p role="status">Thank you. Your mailing-list signup has been saved.</p> : <form onSubmit={submit} className="grid gap-4">
        <Input type="email" name="email" required maxLength={255} autoComplete="email" aria-label="Your email address" placeholder="Your email address" className="newsletter-input" />
        <div hidden aria-hidden="true"><Input name="website" tabIndex={-1} autoComplete="off" /></div>
        <Button type="submit" disabled={pending} className="newsletter-subscribe">{pending && <LoaderCircle className="animate-spin" />}{pending ? "Subscribing…" : "Subscribe"}</Button>
        {error && <p role="alert">{error}</p>}
      </form>}
    </div>
  </section>;
}
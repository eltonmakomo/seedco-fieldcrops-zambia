import { ArrowUpRight, Mail, MapPin, Phone, Sprout } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { LiveContent, type LivePageData } from "@/components/live-page";

export function ContactPage({ page }: { page: LivePageData }) {
  const heading = page.blocks.find((block) => block.t === "h3");
  const paragraphs = page.blocks.filter((block) => block.t === "p");
  const address = paragraphs[0]?.text ?? "";
  const details = paragraphs[1]?.text ?? "";
  const phone = details.match(/Telephone:\s*(.*?)\s*Email:/)?.[1];
  const email = details.match(/Email:\s*(\S+@\S+)/)?.[1];
  const sales = details.match(/Sales Email\s*:\s*(\S+@\S+)/)?.[1];
  const maps = page.blocks.filter((block) => block.t === "video");
  const remainder = page.blocks.filter((block) => block !== heading && !paragraphs.slice(0, 2).includes(block as typeof paragraphs[number]) && block.t !== "video");
  return <div className="contact-page">
    <div className="contact-main">
      <section className="contact-details" aria-labelledby="contact-office-title">
        <span className="contact-brand-mark"><Sprout aria-hidden="true" /></span>
        <h2 id="contact-office-title">{heading && "text" in heading ? heading.text : page.title}</h2>
        <div className="contact-detail-row"><span className="contact-detail-icon"><MapPin aria-hidden="true" /></span><div><h3>Address</h3><p>{address}</p></div></div>
        {phone && <div className="contact-detail-row"><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><div><h3>Telephone</h3><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}<ArrowUpRight aria-hidden="true" /></a></div></div>}
        {email && <div className="contact-detail-row"><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><div><h3>Email</h3><a href={`mailto:${email}`}>{email}<ArrowUpRight aria-hidden="true" /></a></div></div>}
        {sales && <div className="contact-detail-row"><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><div><h3>Sales Email</h3><a href={`mailto:${sales}`}>{sales}<ArrowUpRight aria-hidden="true" /></a></div></div>}
        {!phone && !email && !sales && <p>{details}</p>}
      </section>
      <ContactForm />
    </div>
    {maps.length > 0 && <section className="contact-location" aria-labelledby="contact-map-title"><div className="contact-location-heading"><MapPin aria-hidden="true" /><h2 id="contact-map-title">Seed Co Business Complex</h2><span>Mumbwa Road</span></div><LiveContent page={{ title: page.title, blocks: maps }} path="contact-us" /></section>}
    {remainder.length > 0 && <LiveContent page={{ title: page.title, blocks: remainder }} path="contact-us" />}
  </div>;
}
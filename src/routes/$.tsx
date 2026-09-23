import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calculator, Mail, MapPin, Phone, Sprout } from "lucide-react";
import { PageShell } from "@/components/seedco-site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { crops, faqs, getPage, productsByCrop } from "@/lib/seedco-content";
import farmersImage from "@/assets/seedco-farmers.jpg";
import cropsImage from "@/assets/seedco-crops.jpg";

export const Route = createFileRoute("/$")({
  head: ({ params }) => { const page = getPage(params._splat ?? ""); return { meta: [
    { title: `${page.title} | Seed Co Zambia` }, { name: "description", content: page.intro },
    { property: "og:title", content: `${page.title} | Seed Co Zambia` }, { property: "og:description", content: page.intro },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}; }, component: ContentPage,
});

function Products({ path }: { path: string }) {
  const category = path.startsWith("product_category/") ? path.split("/").pop() ?? "" : "";
  if (!category) return <div className="content-grid">{crops.map((crop)=><a href={`/product_category/${crop.slug}`} className="content-card" key={crop.slug}><span className="card-icon"><Sprout /></span><h2>{crop.name}</h2><p>{crop.note}</p><span className="card-link">Explore varieties <ArrowRight /></span></a>)}</div>;
  const products = productsByCrop[category] ?? [];
  return <div><div className="mb-8 flex flex-wrap gap-2">{crops.map((crop)=><a href={`/product_category/${crop.slug}`} key={crop.slug} className={`crop-filter ${crop.slug===category?"crop-filter-active":""}`}>{crop.name}</a>)}</div><div className="content-grid">{products.map((name)=><a href={`/sc-products/${name.toLowerCase().replaceAll(" ", "-")}`} className="product-card" key={name}><div className="product-pack"><span>SEED CO</span><strong>{name}</strong><small>Certified Seed</small></div><div><p className="eyebrow">Certified variety</p><h2>{name}</h2><p>Field-tested genetics for reliable crop performance.</p><span className="card-link">Product details <ArrowRight /></span></div></a>)}</div></div>;
}

function ContactBlock() { return <div className="contact-grid"><div><MapPin /><h2>Head office</h2><p>Seed Co Business Complex<br/>P.O. Box 35310<br/>Farm No. 683B, Mumbwa Road</p></div><div><Phone /><h2>Call us</h2><a href="tel:+260211426400">+260 211 426 400</a></div><div><Mail /><h2>Email</h2><a href="mailto:Zambia.seedco@seedcogroup.com">Zambia.seedco@seedcogroup.com</a><a href="mailto:Zambia.sales@seedcogroup.com">Zambia.sales@seedcogroup.com</a></div></div> }

function ContentPage() {
  const path = Route.useParams()._splat ?? "";
  const page = getPage(path);
  return <PageShell><section className="inner-hero"><img src={path.includes("product") ? cropsImage : farmersImage} width={1200} height={912} alt="Seed Co Zambia field crops" className="absolute inset-0 h-full w-full object-cover"/><div className="inner-shade absolute inset-0"/><div className="relative mx-auto flex min-h-[430px] max-w-screen-2xl items-end px-6 pb-14 pt-24"><div className="max-w-4xl text-primary-foreground"><p className="eyebrow text-accent">{page.eyebrow}</p><h1 className="mt-3 font-display text-5xl font-extrabold leading-tight sm:text-6xl">{page.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/80">{page.intro}</p></div></div></section>
  <section className="py-16 lg:py-24"><div className="mx-auto max-w-screen-2xl px-6">
    {page.kind === "products" ? <Products path={path} /> : page.kind === "faq" ? <div className="mx-auto max-w-4xl"><Accordion type="single" collapsible>{faqs.map(([q,a],i)=><AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="font-display text-lg text-primary sm:text-xl">{q}</AccordionTrigger><AccordionContent className="text-base leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion><div className="mt-10 rounded-lg bg-secondary p-7"><h2 className="font-display text-2xl font-bold text-primary">Still need help?</h2><p className="mt-2 text-muted-foreground">Call +260 211 426 400–9 or email our Zambia team.</p><Button asChild className="mt-5"><a href="/contact-us">Contact us <ArrowRight /></a></Button></div></div> : page.kind === "contact" ? <ContactBlock /> : page.kind === "calculator" ? <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]"><div className="content-grid">{page.sections.map(s=><article className="content-card" key={s.title}><span className="card-icon"><Calculator /></span><h2>{s.title}</h2><p>{s.body}</p></article>)}</div><div className="rounded-lg bg-primary p-8 text-primary-foreground"><p className="eyebrow text-accent">Calculator update</p><h2 className="mt-3 font-display text-3xl font-bold">A new calculator is coming soon.</h2><p className="mt-4 leading-7 text-primary-foreground/70">Until then, contact an agronomist for help estimating yield from a representative field sample.</p><Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"><a href="/contact-us">Ask an agronomist</a></Button></div></div> : <div className={`content-grid ${page.kind==="team"?"team-grid":""}`}>{page.sections.map((s,i)=><article className="content-card" key={`${s.title}-${i}`}><span className="card-index">{String(i+1).padStart(2,"0")}</span><h2>{s.title}</h2><p>{s.body}</p>{page.kind==="media"&&<a className="card-link" href={path==="blog"&&i===0?"/preparing-africas-farmers-for-the-2026-27-el-nino-season":"/contact-us"}>Find out more <ArrowRight /></a>}</article>)}</div>}
  </div></section><section className="bg-secondary"><div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center"><div><p className="eyebrow">Need local guidance?</p><h2 className="mt-2 font-display text-3xl font-bold text-primary">Our team is ready to help.</h2></div><Button asChild size="lg"><a href="/contact-us">Contact Seed Co <ArrowRight /></a></Button></div></section></PageShell>;
}

import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CloudSun, Download, MapPin, Play, ShieldCheck, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, SectionHeading } from "@/components/seedco-site";
import { crops } from "@/lib/seedco-content";
import heroImage from "@/assets/seedco-zambia-hero.jpg";
import maizeImage from "@/assets/seedco-maize.jpg";
import farmersImage from "@/assets/seedco-farmers.jpg";
import cropsImage from "@/assets/seedco-crops.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Seed Co Zambia Field Crops | The Home of Bumper Harvests" },
    { name: "description", content: "Explore certified maize, wheat, soya bean, sugar bean and rice seed, plus practical agronomy support from Seed Co Zambia." },
    { property: "og:title", content: "Seed Co Zambia Field Crops" },
    { property: "og:description", content: "It starts with the right seed. Explore locally adapted field crop varieties and farmer support." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

function HomePage() {
  return <PageShell>
    <section className="hero-panel">
      <img src={heroImage} width={1920} height={1200} alt="Zambian farmer walking through a maize field at sunrise" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-shade absolute inset-0" />
      <div className="relative mx-auto flex min-h-[680px] max-w-screen-2xl items-end px-6 pb-16 pt-28 lg:min-h-[760px] lg:pb-24">
        <div className="max-w-3xl text-primary-foreground">
          <p className="eyebrow text-accent">Climate-smart seed. Bred for Zambia.</p>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-8xl">It starts with<br />the right seed.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/85">Certified field crop varieties developed for African conditions, backed by practical support from planting to harvest.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><a href="/products">Find your seed <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"><a href="https://www.seedcoonlineshop.com/zm/" target="_blank" rel="noreferrer">Buy seeds online</a></Button></div>
        </div>
      </div>
      <div className="hero-stats"><div><strong>86+</strong><span>Years of plant breeding</span></div><div><strong>6</strong><span>Field crop portfolios</span></div><div><strong>7</strong><span>Depots across Zambia</span></div></div>
    </section>

    <section className="bg-background py-20 lg:py-28"><div className="mx-auto max-w-screen-2xl px-6">
      <SectionHeading eyebrow="The home of bumper harvests" title="Seed for every field" action={<a href="/products" className="hidden items-center gap-2 font-condensed font-bold text-primary sm:flex">View all products <ArrowRight className="size-4" /></a>} />
      <div className="crop-grid">{crops.map((crop, index)=><a key={crop.slug} href={`/product_category/${crop.slug}`} className={`crop-card crop-${index+1}`}><div className="flex items-start justify-between gap-4"><span className="crop-number">0{index+1}</span><ArrowRight className="size-5 transition-transform group-hover:translate-x-1" /></div><div><h3>{crop.name}</h3><p>{crop.note}</p></div></a>)}</div>
    </div></section>

    <section className="bg-secondary py-20 lg:py-28"><div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-6 lg:grid-cols-2">
      <div className="relative"><img src={farmersImage} width={1200} height={912} loading="lazy" alt="Seed Co agronomist advising a Zambian farmer in a soya field" className="aspect-[4/3] w-full rounded-lg object-cover" /><div className="image-note"><Sprout className="size-5" /><span>Advice rooted in local conditions</span></div></div>
      <div><p className="eyebrow">Farmers' Hub</p><h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-primary sm:text-5xl">Better decisions, from planting to harvest.</h2><p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">Choose a crop and follow practical guidance for the conditions you farm in. Seed Co varieties combine high yield with drought and disease tolerance, standability and stability across seasons.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2"><a className="resource-link" href="/farming-regions"><MapPin />Maize farming regions<ArrowRight /></a><a className="resource-link" href="/calculators"><CloudSun />Yield calculator<ArrowRight /></a><a className="resource-link" href="/learn-with-seed-co"><Sprout />Learn with Seed Co<ArrowRight /></a><a className="resource-link" href="/media/faqs"><ShieldCheck />Farmer FAQs<ArrowRight /></a></div></div>
    </div></section>

    <section className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-screen-2xl lg:grid-cols-2"><div className="min-h-[480px]"><img src={maizeImage} width={1200} height={912} loading="lazy" alt="Farmer inspecting a mature Seed Co white maize cob" className="h-full w-full object-cover" /></div><div className="flex items-center px-6 py-16 lg:px-16"><div><p className="eyebrow text-accent">Tip of the day</p><blockquote className="mt-5 font-display text-3xl font-bold leading-snug sm:text-4xl">“The right variety is the first step toward a crop that can use every drop of rain.”</blockquote><p className="mt-6 max-w-xl leading-8 text-primary-foreground/70">Match the maturity series to your intended production area, plant at the right time, feed the crop well and keep it healthy through grain filling.</p><Button asChild variant="secondary" className="mt-8"><a href="/maize-2">Explore maize guidance <ArrowRight /></a></Button></div></div></div></section>

    <section className="py-20 lg:py-28"><div className="mx-auto max-w-screen-2xl px-6"><div className="innovation-layout"><div className="overflow-hidden rounded-lg"><img src={cropsImage} width={1200} height={912} loading="lazy" alt="Wheat, soya, white maize and rice crops" className="h-full min-h-[420px] w-full object-cover" /></div><div className="flex flex-col justify-center py-4"><p className="eyebrow">Research & innovation</p><h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-primary sm:text-5xl">Bred here. Ready for what comes next.</h2><p className="mt-5 leading-8 text-muted-foreground">From climate-smart varieties and disease tolerance to a new generation of digital services, Seed Co has maintained a strong market share through sustained investment in research and development.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="/product-innovations">Product innovations <ArrowRight /></a></Button><Button asChild variant="outline"><a href="/service-innovations">Service innovations</a></Button></div></div></div></div></section>

    <section className="app-band"><div className="mx-auto grid max-w-screen-2xl gap-10 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-primary">Seedney Agronomy App</p><h2 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight text-accent-foreground sm:text-5xl">Field knowledge, always within reach.</h2><p className="mt-4 max-w-2xl text-accent-foreground/70">Download Seedney for Seed Co product information and practical agronomy tools.</p></div><Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90"><a href="/seed-co-agronomy-app"><Download />Download app</a></Button></div></section>

    <section className="py-20 lg:py-28"><div className="mx-auto max-w-screen-2xl px-6"><SectionHeading eyebrow="From the field" title="Latest stories" action={<a href="/blog" className="hidden items-center gap-2 font-condensed font-bold text-primary sm:flex">Visit the blog <ArrowRight className="size-4" /></a>} /><div className="news-grid"><a href="/preparing-africas-farmers-for-the-2026-27-el-nino-season" className="news-feature"><img src="https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/07/elnino-banner.webp" alt="El Niño seasonal outlook" /><div><span>Climate outlook · July 14, 2026</span><h3>Preparing Africa’s Farmers for the 2026/27 El Niño Season</h3><p>Prepare with climate-smart varieties, planting windows and field management.</p></div></a><div className="grid gap-4"><a href="/beyond-the-fields-into-the-white-marbles-of-the-taj-mahal" className="news-row"><span>July 15, 2025</span><h3>Beyond the fields into the white marbles of the Taj Mahal</h3><ArrowRight /></a><a href="/successful-maize-crop-establishment-2" className="news-row"><span>March 2, 2023</span><h3>Successful Maize Crop Establishment</h3><ArrowRight /></a><a href="/testimonial" className="news-row"><span>Farmer voices</span><h3>Hear from Seed Co farmers across Zambia</h3><Play /></a></div></div></div></section>

    <section className="contact-band"><div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-7 px-6 py-14 md:flex-row md:items-center"><div><p className="eyebrow text-accent">Your next season starts here</p><h2 className="mt-2 font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">Talk to the Seed Co Zambia team.</h2></div><div className="flex flex-wrap gap-3"><Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><a href="/contact-us">Contact us <ArrowRight /></a></Button><Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="mailto:Zambia.sales@seedcogroup.com">Email sales</a></Button></div></div></section>
  </PageShell>;
}

import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CloudSun, Download, MapPin, Play, ShieldCheck, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/seedco-site";
import { crops } from "@/lib/seedco-content";
import heroImage from "@/assets/seedco-editorial-hero.jpg";
import maizeImage from "@/assets/seedco-maize.jpg";
import farmersImage from "@/assets/seedco-farmers.jpg";
import cropsImage from "@/assets/seedco-crops.jpg";
import whiteMaizeImage from "@/assets/crop-white-maize.jpg";
import yellowMaizeImage from "@/assets/crop-yellow-maize.jpg";
import soyabeansImage from "@/assets/crop-soyabeans.jpg";
import wheatImage from "@/assets/crop-wheat.jpg";
import sugarBeansImage from "@/assets/crop-sugar-beans.jpg";
import riceImage from "@/assets/crop-rice.jpg";

const cropImages = [whiteMaizeImage, yellowMaizeImage, soyabeansImage, wheatImage, sugarBeansImage, riceImage];

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
    <section className="organic-hero">
      <div className="organic-hero-grid mx-auto max-w-screen-2xl px-6">
        <div className="organic-hero-copy">
          <p className="eyebrow">Climate-smart seed · Bred for Zambia</p>
          <h1>Growing Zambia,<br /><em>together.</em></h1>
          <p className="organic-hero-lede">High-yield seed technology engineered for local seasons, backed by practical support from planting to harvest.</p>
          <a className="organic-primary-link" href="/products"><span>Explore the portfolio</span><ArrowRight /></a>
          <div className="organic-crop-index" aria-label="Crop portfolio shortcuts">
            {crops.slice(0, 4).map((crop, index) => <a href={`/product_category/${crop.slug}`} key={crop.slug}><b>0{index + 1}</b>{crop.name}</a>)}
          </div>
        </div>
        <div className="organic-hero-visual">
          <div className="organic-hero-image"><img src={heroImage} width={1600} height={1200} alt="A mature maize cob and farmer in a Zambian field at sunrise" /></div>
          <div className="organic-stamp organic-stamp-years"><strong>86+</strong><span>Years of plant breeding</span></div>
          <a className="organic-stamp organic-stamp-depots" href="/contact-us"><MapPin /><strong>7</strong><span>Depots across Zambia</span></a>
          <span className="organic-image-note">Zambia · Field crops · 2026</span>
        </div>
      </div>
    </section>

    <section className="organic-catalogue"><div className="mx-auto max-w-screen-2xl px-6">
      <div className="organic-section-head"><div><p className="eyebrow">Crop discovery / 01—06</p><h2>Seed for<br /><em>every field.</em></h2></div><div><p>Explore locally adapted varieties bred for yield, resilience and the realities of Zambian farming.</p><a href="/products">Browse all varieties <ArrowRight /></a></div></div>
      <div className="organic-crop-grid">{crops.map((crop, index)=><a key={crop.slug} href={`/product_category/${crop.slug}`} className={`organic-crop organic-crop-${index + 1}`}><div><img src={cropImages[index]} width={912} height={1200} loading="lazy" alt={`${crop.name} growing in a Zambian field`} /><span>0{index+1}</span></div><h3>{crop.name}</h3><p>{crop.note}</p><ArrowRight /></a>)}</div>
    </div></section>

    <section className="organic-journey"><div className="mx-auto grid max-w-screen-2xl px-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="organic-journey-copy"><p className="eyebrow">Farmers' Hub / Knowledge in motion</p><h2>Make the next<br />field decision<br /><em>count.</em></h2><p>Choose a crop and follow practical guidance for the conditions you farm in—from planting through grain filling.</p>
      <div className="organic-resource-list"><a href="/farming-regions"><MapPin /><span><b>01</b>Maize farming regions</span><ArrowRight /></a><a href="/calculators"><CloudSun /><span><b>02</b>Yield calculator</span><ArrowRight /></a><a href="/learn-with-seed-co"><Sprout /><span><b>03</b>Learn with Seed Co</span><ArrowRight /></a><a href="/media/faqs"><ShieldCheck /><span><b>04</b>Farmer FAQs</span><ArrowRight /></a></div></div>
      <div className="organic-journey-visual"><img src={farmersImage} width={1200} height={912} loading="lazy" alt="Seed Co agronomist advising a Zambian farmer in a soya field" /><span>Advice rooted<br />in local conditions</span></div>
    </div></section>

    <section className="organic-field-note"><div className="organic-note-image"><img src={maizeImage} width={1200} height={912} loading="lazy" alt="Farmer inspecting a mature Seed Co white maize cob" /></div><div className="organic-note-copy"><span>Field note / 01</span><p className="eyebrow text-accent">Tip of the day</p><blockquote>“The right variety is the first step toward a crop that can use every drop of rain.”</blockquote><p>Match the maturity series to your production area, plant at the right time, feed the crop well and keep it healthy through grain filling.</p><a href="/maize-2">Explore maize guidance <ArrowRight /></a></div></section>

    <section className="organic-innovation"><div className="mx-auto max-w-screen-2xl px-6"><div className="organic-innovation-grid"><div className="organic-innovation-copy"><p className="eyebrow">Research & innovation / 03</p><h2>Bred here.<br /><em>Ready for next.</em></h2><p>From climate-smart varieties and disease tolerance to a new generation of digital services, Seed Co invests continuously in what tomorrow's field needs.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="/product-innovations">Product innovations <ArrowRight /></a></Button><Button asChild variant="outline"><a href="/service-innovations">Service innovations</a></Button></div></div><div className="organic-innovation-image"><img src={cropsImage} width={1200} height={912} loading="lazy" alt="Wheat, soya, white maize and rice crops" /><span>Research<br />to harvest</span></div></div></div></section>

    <section className="app-band"><div className="mx-auto grid max-w-screen-2xl gap-10 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-primary">Seedney Agronomy App</p><h2 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight text-accent-foreground sm:text-5xl">Field knowledge, always within reach.</h2><p className="mt-4 max-w-2xl text-accent-foreground/70">Download Seedney for Seed Co product information and practical agronomy tools.</p></div><Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90"><a href="/seed-co-agronomy-app"><Download />Download app</a></Button></div></section>

    <section className="organic-stories"><div className="mx-auto max-w-screen-2xl px-6"><div className="organic-section-head"><div><p className="eyebrow">From the field / 04</p><h2>Stories with<br /><em>soil on them.</em></h2></div><a href="/blog">Visit the blog <ArrowRight /></a></div><div className="organic-story-grid"><a href="/preparing-africas-farmers-for-the-2026-27-el-nino-season" className="organic-story-feature"><img src="https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2026/07/elnino-banner.webp" alt="El Niño seasonal outlook" /><div><span>Climate outlook · July 14, 2026</span><h3>Preparing Africa’s Farmers for the 2026/27 El Niño Season</h3></div></a><div className="organic-story-list"><a href="/beyond-the-fields-into-the-white-marbles-of-the-taj-mahal"><span>July 15, 2025</span><h3>Beyond the fields into the white marbles of the Taj Mahal</h3><ArrowRight /></a><a href="/successful-maize-crop-establishment-2"><span>March 2, 2023</span><h3>Successful Maize Crop Establishment</h3><ArrowRight /></a><a href="/testimonial"><span>Farmer voices</span><h3>Hear from Seed Co farmers across Zambia</h3><Play /></a></div></div></div></section>

    <section className="contact-band"><div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-7 px-6 py-14 md:flex-row md:items-center"><div><p className="eyebrow text-accent">Your next season starts here</p><h2 className="mt-2 font-display text-3xl font-extrabold text-primary-foreground sm:text-4xl">Talk to the Seed Co Zambia team.</h2></div><div className="flex flex-wrap gap-3"><Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><a href="/contact-us">Contact us <ArrowRight /></a></Button><Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="mailto:Zambia.sales@seedcogroup.com">Email sales</a></Button></div></div></section>
  </PageShell>;
}

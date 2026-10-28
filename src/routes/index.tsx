import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bean, Download, Leaf, ShoppingBag, Sprout, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/seedco-site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/seedco-editorial-hero.jpg";

const U = "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads";
const shop = "https://www.seedcoonlineshop.com/zm/";

const categories = [
  { name: "White Maize", Icon: Sprout, href: "/product_category/maize", img: `${U}/2021/11/white-3.jpg` },
  { name: "Sugar beans", Icon: Bean, href: "/product_category/sugar-beans", img: `${U}/2024/04/beans.jpg.webp` },
  { name: "Soya beans", Icon: Leaf, href: "/product_category/soyabeans", img: `${U}/2024/04/soya_beans.jpg.webp` },
  { name: "Wheat", Icon: Wheat, href: "/product_category/wheat", img: `${U}/2021/12/wheat_image.jpg` },
  { name: "Yellow Maize", Icon: Sprout, href: "/product_category/yellow-maize", img: `${U}/2021/10/yellow.jpg` },
  { name: "Rice", Icon: Wheat, href: "/product_category/rice", img: `${U}/2024/04/rice-plant.webp` },
];

const testimonials = [
  ["0FTan-mW4QI", "Seed Co Farmer Testimonial Petauke"],
  ["iKrZJIIJj7g", "Seed Co Farmer Testimonial Kasama"],
  ["EltACOVd3AA", "Seed Co Zambia Chikankata Testimonial"],
  ["hCHSd0oGqyE", "Seed Co Zambia Testimonial Solwezi Farmer"],
];

const homeFaqs = [
  ["Where is Seed Co found and how can we access the Seed Co seed?", "Seed Co’s Head office is 23km away from Lusaka City Centre, on Mumbwa Road. Seed Co services its customers through depots dotted around the country. There are depots in Lusaka ( sales@seedco.co.zm ), Choma ( choma@seedco.co.zm ), Chipata ( chipata@seedco.co.zm ), Mkushi ( mkushi@seedco.co.zm ), Kasama ( mpika@seedco.co.zm ), Kitwe ( kitwe@seedco.co.zm ), and Mpika ( mpika@seedco.co.zm ). SeedCo has also Sales Agents in Western, North Western and Luapula. Call our Head Office on 0211-846367-70 or visit our website www.seedco.co.zm for more information."],
  ["Does Seed Co sell yellow maize?", "Yes! Seed Co has three yellow maize varieties, namely SC 506 with a potential of 6 metric tonnes (120x 50kg bags) per hectare yield and SC602 and SC608 with potential of 13 metric tonnes (260 x 50 kg bags) and 14 metric tonnes per hectare respectively. Yellow maize varieties produce sweet green mealies and are suitable for livestock feed. If one would like to grow it to full maturity, it takes 130-136 days."],
  ["How can we effectively attain the recommended yield potentials?", "There is no substitute to the right variety, and that’s why Seed Co always emphasizes on maturity series relative to intended area of production because the water resource is a highly dependent factor. Plant at the right time to optimise water use, provide right fertiliser at the right time and keep the crop weed free and healthy. Once the crop is healthy and well fed to help it achieve its required grain filling, you will get potential yields."],
  ["Is it safe to use herbicides on Seed Co varieties?", "Commercial farmers use herbicides on Seed Co soybean varieties and have succeeded."],
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Seed Co Zambia | Field Crops" },
    { name: "description", content: "Welcome to the Home of bumper harvest. Seed Co develops and markets certified crop seeds mainly hybrid maize seed, wheat, soya bean and more." },
    { property: "og:title", content: "Seed Co Zambia | Field Crops" },
    { property: "og:description", content: "It Starts With The Right Seed. The Home of Bumper Harvests." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

function HomePage() {
  return <PageShell>
    <section className="organic-hero">
      <div className="organic-hero-grid mx-auto max-w-screen-2xl px-6">
        <div className="organic-hero-copy">
          <p className="eyebrow">The Home of Bumper Harvests</p>
          <h1>It Starts With<br /><em>The Right Seed</em></h1>
          <p className="organic-hero-lede">The right seed is now available online</p>
          <a className="organic-primary-link" href={shop} target="_blank" rel="noreferrer"><span>Online Shop</span><ArrowRight /></a>
          <div className="organic-crop-index" aria-label="Quick links">
            <a href="/notice-to-suppliers-and-contractors"><b>01</b>What's New?</a>
            <a href="/news"><b>02</b>Latest News</a>
            <a href="/promotions"><b>03</b>Promotions</a>
            <a href="https://seedcogroup.com/zm/vegetables/" target="_blank" rel="noreferrer"><b>04</b>Vegetables</a>
          </div>
        </div>
        <div className="organic-hero-visual">
          <div className="organic-hero-image"><img src={heroImage} width={1600} height={1200} alt="Mature maize cob in a Zambian field" /></div>
          <a className="organic-stamp organic-stamp-years" href="/seed-co-agronomy-app"><strong>App</strong><span>Download Seedney</span></a>
        </div>
      </div>
    </section>

    <section className="organic-journey"><div className="mx-auto grid max-w-screen-2xl px-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="organic-journey-copy"><p className="eyebrow">About Seed Co Zambia</p><h2>Welcome</h2>
        <p>Welcome to the Home of bumper harvest, Seed Co develops and markets certified crop seeds mainly hybrid maize seed, wheat, soya bean, Vegetables, barley, sorghum and ground nut seed.</p>
        <p>Most of our hybrid and non-hybrid cereal and oil crop seed varieties are proprietary, having been developed and bred at our research stations through market-oriented research and breeding programmes.</p>
        <p>We pride ourselves on having been the first Pan African seed house to breed hybrid maize variety in Africa.</p>
        <Button asChild className="mt-6"><a href="/about-us/overview">More About Us <ArrowRight /></a></Button>
      </div>
      <div className="organic-journey-visual"><div className="live-media live-media-video"><iframe src="https://www.youtube.com/embed/2OfwmYaqnu4" title="Seed Co Zambia" loading="lazy" allowFullScreen /></div></div>
    </div></section>

    <section className="organic-catalogue"><div className="mx-auto max-w-screen-2xl px-6">
      <div className="organic-section-head"><div><p className="eyebrow">Our Products</p><h2>Products</h2></div><div><a href="/products">View all products <ArrowRight /></a></div></div>
      <div className="pcat-grid">{categories.map(({ Icon, ...c }) => <a key={c.href} href={c.href} className="pcat"><div className="pcat-media"><img src={c.img} loading="lazy" alt={c.name} /></div><div className="pcat-body"><span className="pcat-icon"><Icon strokeWidth={1.7} /></span><h3>{c.name}</h3><span className="pcat-arrow"><ArrowRight /></span></div></a>)}</div>
    </div></section>

    <section className="organic-field-note"><div className="organic-note-image"><img src={`${U}/2021/09/tips2.jpg`} loading="lazy" alt="Tip of the Day" /></div><div className="organic-note-copy"><p className="eyebrow text-accent">Tip of the Day</p><blockquote>Seed Co varieties combine high yielding ability and good agronomic traits such as drought and disease tolerance, good “standability”, stability across seasons and regions.</blockquote>
      <h3 className="mt-8 font-display text-2xl font-bold">Quick Links</h3>
      <div className="organic-resource-list"><a href={shop} target="_blank" rel="noreferrer"><ShoppingBag /><span><b>1.</b>Buy Seeds Online</span><ArrowRight /></a><a href="/learn-with-seed-co"><span><b>2.</b>Learn With Seed Co</span><ArrowRight /></a><a href="/news"><span><b>3.</b>News</span><ArrowRight /></a><a href="/contact-us"><span><b>4.</b>Contact Us</span><ArrowRight /></a></div>
    </div></section>

    <section className="organic-stories"><div className="mx-auto max-w-screen-2xl px-6"><div className="organic-section-head"><div><p className="eyebrow">Farmer voices</p><h2>Testimonials</h2></div><a href="/testimonial">View all testimonials <ArrowRight /></a></div>
      <div className="live-cards">{testimonials.map(([id, t]) => <article className="live-card" key={id}><div className="live-media live-media-video"><iframe src={`https://www.youtube.com/embed/${id}`} title={t} loading="lazy" allowFullScreen /></div><div className="live-card-copy"><p>{t}</p></div></article>)}</div>
    </div></section>

    <section className="organic-stories"><div className="mx-auto max-w-screen-2xl px-6"><div className="organic-section-head"><div><p className="eyebrow">Media</p><h2>Latest News</h2></div><a href="/news">Latest News <ArrowRight /></a></div><div className="organic-story-grid"><a href="/preparing-africas-farmers-for-the-2026-27-el-nino-season" className="organic-story-feature"><img src={`${U}/2026/07/elnino-banner.webp`} alt="El Niño" /><div><span>July 14, 2026</span><h3>Preparing Africa’s Farmers for the 2026/27 El Niño Season</h3></div></a><div className="organic-story-list"><a href="/beyond-the-fields-into-the-white-marbles-of-the-taj-mahal"><span>July 15, 2025</span><h3>Beyond the fields into the white marbles of the Taj Mahal</h3><ArrowRight /></a><a href="/successful-maize-crop-establishment-2"><span>March 2, 2023</span><h3>Successful Maize Crop Establishment</h3><ArrowRight /></a></div></div></div></section>

    <section className="py-16 lg:py-24"><div className="mx-auto max-w-4xl px-6"><p className="eyebrow">FAQs</p><h2 className="mt-2 font-display text-4xl font-extrabold text-primary">Frequently Asked Questions</h2><p className="mt-3 text-muted-foreground">Can't find the answer you are looking for? We have shared some of our frequently asked questions to help you out.</p>
      <Accordion type="single" collapsible className="mt-8">{homeFaqs.map(([q, a], i) => <AccordionItem key={q} value={`f${i}`}><AccordionTrigger className="text-left font-display text-lg text-primary">{q}</AccordionTrigger><AccordionContent className="text-base leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion>
      <Button asChild variant="outline" className="mt-8"><a href="/media/faqs">View all FAQs <ArrowRight /></a></Button>
    </div></section>

    <section className="app-band"><div className="mx-auto grid max-w-screen-2xl gap-10 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-primary">Seedney</p><h2 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight text-accent-foreground sm:text-5xl">Download Seedney, the new Seed Co Agronomy App</h2></div><Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90"><a href="/seed-co-agronomy-app"><Download />Download App</a></Button></div></section>
  </PageShell>;
}

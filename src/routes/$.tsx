import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/seedco-site";
import { Button } from "@/components/ui/button";
import { LiveContent, firstText, getLivePage } from "@/components/live-page";
import farmersImage from "@/assets/seedco-farmers.jpg";

const sectionLabel = (path: string) => {
  const s = path.split("/")[0] ?? "";
  const map: Record<string, string> = {
    "about-us": "About Us", agronomists: "Agronomists", "sc-products": "Products", product_category: "Products",
    maize_subcategory: "White Maize", products: "Products", media: "Media", careers: "Careers", directors: "Board of Directors",
    management: "Management Team", sales_team: "Sales Team", research_team: "Research Team", "farming-regions": "Farmers' Hub",
    news: "Media", blog: "Media", testimonial: "Media", events: "Events", "contact-us": "Contact Us",
  };
  return map[s] ?? "Seed Co Zambia";
};

export const Route = createFileRoute("/$")({
  loader: ({ params }) => {
    const page = getLivePage(params._splat ?? "");
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.title ?? "Seed Co Zambia"} | Seed Co Zambia Field Crops`;
    const description = loaderData ? firstText(loaderData).slice(0, 160) : "Seed Co Zambia Field Crops";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ContentPage,
  notFoundComponent: () => (
    <PageShell><section className="mx-auto max-w-3xl px-6 py-32 text-center"><p className="eyebrow">404</p><h1 className="mt-3 font-display text-4xl font-extrabold text-primary">Page not found</h1><Button asChild className="mt-8"><a href="/">Back to home</a></Button></section></PageShell>
  ),
});

function ContentPage() {
  const page = Route.useLoaderData();
  const path = Route.useParams()._splat ?? "";
  return <PageShell>
    <section className="inner-hero"><img src={farmersImage} width={1200} height={912} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="inner-shade absolute inset-0" />
      <div className="relative mx-auto flex min-h-[340px] max-w-screen-2xl items-end px-6 pb-12 pt-24"><div className="max-w-4xl text-primary-foreground"><p className="eyebrow text-accent">{sectionLabel(path)}</p><h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-6xl">{page.title}</h1></div></div>
    </section>
    <section className="py-14 lg:py-20"><div className="mx-auto max-w-screen-xl px-6"><LiveContent page={page} />{path === "farming-regions" && <ZambiaRegionsMap />}</div></section>
    <section className="bg-secondary"><div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center"><div><p className="eyebrow">Need local guidance?</p><h2 className="mt-2 font-display text-3xl font-bold text-primary">Our team is ready to help.</h2></div><Button asChild size="lg"><a href="/contact-us">Contact Us <ArrowRight /></a></Button></div></section>
  </PageShell>;
}

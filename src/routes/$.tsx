import { enhancedImage } from "@/lib/enhanced-images";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/seedco-site";
import { Button } from "@/components/ui/button";
import { LiveContent, firstImage, firstText, getLivePage } from "@/components/live-page";
import { InnovationsContent } from "@/components/innovations-page";
import { ProductInnovationsContent } from "@/components/product-innovations-page";
import { ZoneList, parseZones } from "@/components/zone-list";
import { CareersList, isCareersList } from "@/components/careers-list";
import { CalculatorsContent } from "@/components/calculators-page";
import { VarietySections, parseVarieties } from "@/components/variety-sections";
import { ZambiaRegionsMap } from "@/components/zambia-regions-map";
import { bannerFor } from "@/lib/banner-images";
import { SectionMenu } from "@/components/section-menu";
import { FaqsContent } from "@/components/faqs-page";
import { ContactPage } from "@/components/contact-page";
import { PhotoGallery } from "@/components/photo-gallery";
import photoAlbums from "@/lib/photo-albums.json";
import { CareerDetail, CareerDetailHeader, isCareerDetail } from "@/components/career-detail";
import { responsibilityStory, ResponsibilityStory, ResponsibilityStoryHeader } from "@/components/responsibility-story";
import { blogArticle, BlogArticle, BlogArticleHeader } from "@/components/blog-article";
import { isProductDetail, ProductDetail, ProductDetailHeader } from "@/components/product-detail";

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
  head: ({ loaderData, params }) => {
    const title = `${loaderData?.title ?? "Seed Co Zambia"} | Seed Co Zambia Field Crops`;
    const description = loaderData ? firstText(loaderData).slice(0, 160) : "Seed Co Zambia Field Crops";
    const cover = loaderData && isProductDetail(params._splat ?? "") ? firstImage(loaderData) : undefined;
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      ...(cover?.startsWith("https://") ? [{ property: "og:image", content: cover }, { name: "twitter:image", content: cover }] : []),
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
  const zones = parseZones(page);
  const story = responsibilityStory(path);
  const career = isCareerDetail(path);
  const blog = blogArticle(path);
  const product = isProductDetail(path);
  return <PageShell>
    {product ? <ProductDetailHeader page={page} /> : blog ? <BlogArticleHeader page={page} date={blog.date} /> : story ? <ResponsibilityStoryHeader page={page} date={story.date} /> : career ? <CareerDetailHeader page={page} /> : <section className="inner-hero editorial-hero"><img src={enhancedImage(bannerFor(path))} width={1920} height={720} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="inner-shade absolute inset-0" />
      <div className="editorial-hero-inner mx-auto max-w-screen-2xl px-6"><div className="editorial-hero-copy"><nav className="editorial-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ArrowRight aria-hidden="true" /><span>{sectionLabel(path)}</span></nav><h1>{page.title}</h1><span className="editorial-title-rule" /></div></div>
    </section>}
    <section className="editorial-section"><div className="editorial-layout mx-auto max-w-screen-2xl px-6"><SectionMenu path={product ? "products" : blog ? "blog" : story ? "about-us/corporate-social-responsibility" : career ? "about-us/careers" : path} /><div className="editorial-content">{product ? <ProductDetail page={page} path={path} /> : blog ? <BlogArticle page={page} path={path} /> : story ? <ResponsibilityStory page={page} path={path} /> : career ? <CareerDetail page={page} path={path} /> : path === "contact-us" ? <ContactPage page={page} /> : path === "media/photo-gallery" ? <PhotoGallery page={page} albums={photoAlbums} /> : path === "media/faqs" ? <FaqsContent page={page} /> : path === "innovations" ? <InnovationsContent page={page} /> : path === "product-innovations" ? <ProductInnovationsContent page={page} /> : path === "calculators" ? <CalculatorsContent page={page} /> : isCareersList(path) ? <CareersList page={page} path={path} /> : zones ? <ZoneList zones={zones} /> : parseVarieties(page) ? <VarietySections page={page} path={path} /> : <LiveContent page={page} path={path} footprint={path === "about-us/our-story"} team={["about-us/board-of-directors", "about-us/management-team", "about-us/sales-team", "about-us/research-team"].includes(path)} />}{path === "farming-regions" && <ZambiaRegionsMap />}</div></div></section>
    {path !== "contact-us" && <section className="bg-secondary"><div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center"><div><p className="eyebrow">Need local guidance?</p><h2 className="mt-2 font-display text-3xl font-bold text-primary">Our team is ready to help.</h2></div><Button asChild size="lg"><a href="/contact-us">Contact Us <ArrowRight /></a></Button></div></section>}
  </PageShell>;
}

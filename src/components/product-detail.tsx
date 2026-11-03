import { ArrowLeft, ArrowRight, Check, ShoppingBag, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";
import { VideoPreview } from "@/components/video-preview";
import { resolveLiveHref } from "@/lib/live-links";

export const isProductDetail = (path: string) => /^sc-products\/[^/]+\/?$/.test(path);

function productSections(page: LivePageData) {
  const sections: { title: string; blocks: LiveBlock[] }[] = [];
  const media: LiveBlock[] = [];
  for (const block of page.blocks) {
    if (/^h[1-5]$/.test(block.t) && "text" in block) sections.push({ title: block.text, blocks: [] });
    else {
      const section = sections[sections.length - 1];
      if (section) section.blocks.push(block);
      else media.push(block);
    }
  }
  return { media, sections };
}

export function ProductDetailHeader({ page }: { page: LivePageData }) {
  return <header className="product-detail-header"><div className="mx-auto max-w-screen-2xl px-6">
    <Button asChild variant="link" className="h-auto px-0"><a href="/products"><ArrowLeft />Products</a></Button>
    <div className="product-detail-title"><h1>{page.title}</h1><Sprout aria-hidden="true" /></div>
  </div></header>;
}

function ProductSection({ title, blocks, page, path }: { title: string; blocks: LiveBlock[]; page: LivePageData; path: string }) {
  return <section className="product-detail-section" aria-label={title}><h2>{title}</h2>
    <div className="product-detail-facts">{blocks.map((block, index) => block.t === "li" ? <div className="product-detail-fact" key={index}><Check aria-hidden="true" /><p>{block.text}</p></div> : <LiveContent key={index} page={{ title: page.title, blocks: [block] }} path={path} />)}</div>
  </section>;
}

export function ProductDetail({ page, path }: { page: LivePageData; path: string }) {
  const { media, sections } = productSections(page);
  const first = sections[0];
  const visuals = media.filter((block) => block.t === "img" || block.t === "video");
  const actions = media.filter((block) => block.t !== "img" && block.t !== "video");
  return <article className="product-detail" aria-label={page.title}>
    <div className="product-detail-overview">
      <div className="product-detail-media">{visuals.map((block, index) => block.t === "img" ? <figure key={index} className={index === 0 ? "product-detail-photo" : "product-detail-symbol"}><img src={block.src} alt={block.alt || page.title} loading={index === 0 ? "eager" : "lazy"} /></figure> : block.t === "video" ? <VideoPreview key={index} src={block.src} title={page.title} /> : null)}</div>
      <div className="product-detail-summary">{first && <ProductSection {...first} page={page} path={path} />}
        {actions.length > 0 && <div className="product-detail-actions">{actions.map((block, index) => block.t === "link" && /^buy\s+now$/i.test(block.text) ? <Button key={index} asChild size="lg"><a href={resolveLiveHref(block.href)} target="_blank" rel="noreferrer"><ShoppingBag />{block.text}<ArrowRight /></a></Button> : <LiveContent key={index} page={{ title: page.title, blocks: [block] }} path={path} />)}</div>}
      </div>
    </div>
    {sections.slice(1).map((section, index) => <ProductSection key={index} {...section} page={page} path={path} />)}
  </article>;
}
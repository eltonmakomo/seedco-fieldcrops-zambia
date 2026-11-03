import { ArrowLeft, ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLivePage, LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";
import liveContent from "@/lib/live-content.json";
import { resolveLiveHref } from "@/lib/live-links";
import { enhancedImage } from "@/lib/enhanced-images";

const listings = Object.entries(liveContent).filter(([path]) => /^(?:category\/)?news(?:\/page\/\d+)?$/.test(path));
const datePattern = /^(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;

export function newsArticle(path: string): { date?: string | undefined } | undefined {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  if (normalized.startsWith("category/") || /^news(?:\/page\/\d+)?$/.test(normalized)) return undefined;
  for (const [, listing] of listings) {
    const blocks = listing.blocks as LiveBlock[];
    const index = blocks.findIndex((block) => block.t === "link" && resolveLiveHref(block.href) === `/${normalized}` && !/^read more$/i.test(block.text));
    if (index < 0) continue;
    const next = blocks[index + 1];
    return { date: next?.t === "p" && datePattern.test(next.text.trim()) ? next.text : undefined };
  }
  return getLivePage(normalized)?.blocks.some((block) => block.t === "link" && /^\/category\/news\/?$/.test(resolveLiveHref(block.href))) ? {} : undefined;
}

export function NewsArticleHeader({ page, date }: { page: LivePageData; date?: string | undefined }) {
  return <header className="news-article-header"><div className="mx-auto max-w-screen-2xl px-6">
    <Button asChild variant="link" className="h-auto px-0"><a href="/news"><ArrowLeft />All news</a></Button>
    <div className="news-article-label"><Newspaper aria-hidden="true" /><span>News</span></div>
    <h1>{page.title}</h1>
    <div className="blog-article-meta"><span><Newspaper aria-hidden="true" />Seed Co Zambia</span>{date && <span><CalendarDays aria-hidden="true" />{date}</span>}</div>
    <div className="mt-4 flex flex-wrap gap-3">{page.blocks.map((block, index) => block.t === "link" && /^\/category\//.test(resolveLiveHref(block.href)) ? <span key={index} className="card-category">{block.text}</span> : null)}</div>
  </div></header>;
}

export function NewsArticle({ page, path }: { page: LivePageData; path: string }) {
  const groups: LiveBlock[][] = [];
  for (const block of page.blocks) {
    if (block.t === "link" && /^\/category\//.test(resolveLiveHref(block.href))) continue;
    if (/^h[1-5]$/.test(block.t) && "text" in block && block.text === page.title) continue;
    const last = groups[groups.length - 1];
    if (block.t === "img" && last?.every((item) => item.t === "img")) last.push(block);
    else groups.push([block]);
  }
  let leadPlaced = false;
  return <article className="blog-article news-article" aria-label={page.title}>
    {groups.map((blocks, index) => {
      if (blocks.every((block) => block.t === "img")) return <div className={`blog-article-photos${blocks.length > 1 ? " blog-article-photos-grid" : ""}`} key={index}>{blocks.map((block, photoIndex) => block.t === "img" ? <figure key={photoIndex}><img src={enhancedImage(block.src)} alt={block.alt} loading={index === 0 ? "eager" : "lazy"} /></figure> : null)}</div>;
      const lead = !leadPlaced && blocks[0]?.t === "p";
      if (lead) leadPlaced = true;
      const quote = blocks[0]?.t === "p" && /^[“"]/.test(blocks[0].text);
      return <div key={index} className={lead ? "blog-article-lead" : quote ? "blog-article-quote" : "blog-article-copy"}><LiveContent page={{ title: page.title, blocks }} path={path} /></div>;
    })}
    <footer className="blog-article-end"><Newspaper aria-hidden="true" /><Button asChild variant="outline"><a href="/news">All news<ArrowRight /></a></Button></footer>
  </article>;
}
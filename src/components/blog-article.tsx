import { ArrowLeft, ArrowRight, CalendarDays, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLivePage, LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";
import liveContent from "@/lib/live-content.json";
import { resolveLiveHref } from "@/lib/live-links";

const listings = Object.entries(liveContent).filter(([path]) => /^blog(?:\/page\/\d+)?$/.test(path));

export function blogArticle(path: string): { date?: string | undefined } | undefined {
  const href = `/${path.replace(/^\/+|\/+$/g, "")}`;
  for (const [, listing] of listings) {
    const blocks = listing.blocks as LiveBlock[];
    const index = blocks.findIndex((block) => block.t === "link" && resolveLiveHref(block.href) === href && block.text !== "Read More");
    if (index < 0) continue;
    const next = blocks[index + 1];
    return { date: next?.t === "p" ? next.text : undefined };
  }
  const page = getLivePage(path);
  return page?.blocks.some((block) => block.t === "link" && /^\/category\/blog\/?$/.test(resolveLiveHref(block.href))) ? {} : undefined;
}

export function BlogArticleHeader({ page, date }: { page: LivePageData; date?: string | undefined }) {
  return <header className="blog-article-header"><div className="mx-auto max-w-screen-2xl px-6">
    <Button asChild variant="link" className="h-auto px-0"><a href="/blog"><ArrowLeft />All blogs</a></Button>
    <h1>{page.title}</h1>
    <div className="blog-article-meta"><span><BookOpen aria-hidden="true" />Seed Co Zambia</span>{date && <span><CalendarDays aria-hidden="true" />{date}</span>}</div>
  </div></header>;
}

export function BlogArticle({ page, path }: { page: LivePageData; path: string }) {
  const groups: LiveBlock[][] = [];
  for (const block of page.blocks) {
    if (block.t === "link" && /^\/category\/blog\/?$/.test(resolveLiveHref(block.href))) continue;
    if ((block.t === "h1" || block.t === "h2") && block.text === page.title) continue;
    const last = groups[groups.length - 1];
    if (block.t === "img" && last?.every((item) => item.t === "img")) last.push(block);
    else groups.push([block]);
  }
  let leadPlaced = false;
  return <article className="blog-article" aria-label={page.title}>
    {groups.map((blocks, index) => {
      if (blocks.every((block) => block.t === "img")) return <div key={index} className={`blog-article-photos${blocks.length > 1 ? " blog-article-photos-grid" : ""}`}>{blocks.map((block, photoIndex) => block.t === "img" ? <figure key={photoIndex}><img src={block.src} alt={block.alt} loading={index === 0 ? "eager" : "lazy"} /></figure> : null)}</div>;
      const lead = !leadPlaced && blocks[0]?.t === "p";
      if (lead) leadPlaced = true;
      const quote = blocks[0]?.t === "p" && /^[“"]/.test(blocks[0].text);
      return <div key={index} className={lead ? "blog-article-lead" : quote ? "blog-article-quote" : "blog-article-copy"}><LiveContent page={{ title: page.title, blocks }} path={path} /></div>;
    })}
    <footer className="blog-article-end"><BookOpen aria-hidden="true" /><Button asChild variant="outline"><a href="/blog">All blogs<ArrowRight /></a></Button></footer>
  </article>;
}
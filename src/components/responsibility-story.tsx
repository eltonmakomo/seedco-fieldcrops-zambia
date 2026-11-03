import { ArrowLeft, ArrowRight, CalendarDays, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLivePage, LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";
import restoredPhotos from "@/lib/responsibility-photos.json";

const listingPath = "about-us/corporate-social-responsibility";
const photoSources: Record<string, string> = restoredPhotos;

export function responsibilityStory(path: string) {
  const listing = getLivePage(listingPath);
  if (!listing) return undefined;
  const index = listing.blocks.findIndex((block) => block.t === "link" && block.href === `/${path}` && block.text !== "Read More");
  if (index < 0) return undefined;
  const next = listing.blocks[index + 1];
  return { date: next?.t === "p" ? next.text : undefined };
}

export function ResponsibilityStoryHeader({ page, date }: { page: LivePageData; date?: string | undefined }) {
  return <header className="responsibility-header"><div className="mx-auto max-w-screen-2xl px-6">
    <Button asChild variant="link" className="h-auto px-0"><a href={`/${listingPath}`}><ArrowLeft />Corporate Social Responsibility</a></Button>
    <h1>{page.title}</h1>
    <div className="responsibility-meta"><span><HeartHandshake aria-hidden="true" />Seed Co Zambia</span>{date && <span><CalendarDays aria-hidden="true" />{date}</span>}</div>
  </div></header>;
}

export function ResponsibilityStory({ page, path }: { page: LivePageData; path: string }) {
  const content = page.blocks.filter((block) => !(block.t === "link" && block.href.startsWith("/category/")));
  const groups: LiveBlock[][] = [];
  for (const block of content) {
    const last = groups[groups.length - 1];
    if (block.t === "img" && last?.every((item) => item.t === "img")) last.push(block);
    else groups.push([block]);
  }
  let firstParagraph = true;
  return <article className="responsibility-story" aria-label={page.title}>
    {groups.map((blocks, index) => {
      if (blocks.every((block) => block.t === "img")) return <div className={`responsibility-photos ${blocks.length > 1 ? "responsibility-photos-grid" : ""}`} key={index}>{blocks.map((block, imageIndex) => block.t === "img" ? <figure key={imageIndex}><img src={photoSources[block.src] ?? block.src} alt={block.alt} loading="lazy" /></figure> : null)}</div>;
      const isLead = firstParagraph && blocks[0]?.t === "p";
      if (isLead) firstParagraph = false;
      const quote = blocks[0]?.t === "p" && /^[“"]/.test(blocks[0].text);
      return <div key={index} className={isLead ? "responsibility-lead" : quote ? "responsibility-quote" : "responsibility-copy"}><LiveContent page={{ title: page.title, blocks }} path={path} /></div>;
    })}
    <footer className="responsibility-end"><HeartHandshake aria-hidden="true" /><Button asChild variant="outline"><a href={`/${listingPath}`}>Corporate Social Responsibility<ArrowRight /></a></Button></footer>
  </article>;
}
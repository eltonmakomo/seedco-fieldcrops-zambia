import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLivePage, LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";
import { enhancedImage } from "@/lib/enhanced-images";
import { resolveLiveHref } from "@/lib/live-links";
import { VideoPreview, youtubeVideoId } from "@/components/video-preview";

export function serviceInnovation(path: string) {
  const blocks = getLivePage("service-innovations")?.blocks ?? [];
  const index = blocks.findIndex((block) => block.t === "link" && !/^read more$/i.test(block.text) && resolveLiveHref(block.href) === `/${path.replace(/^\/+|\/+$/g, "")}`);
  if (index < 0) return undefined;
  const image = blocks[index - 1];
  const date = blocks[index + 1];
  return { image: image?.t === "img" ? image : undefined, date: date?.t === "p" ? date.text : undefined };
}

export function ServiceInnovationHeader({ page, date }: { page: LivePageData; date?: string | undefined }) {
  return <header className="news-article-header service-innovation-header"><div className="mx-auto max-w-screen-2xl px-6">
    <Button asChild variant="link" className="h-auto px-0"><a href="/service-innovations"><ArrowLeft />Service Innovations</a></Button>
    <h1>{page.title}</h1>
    <div className="blog-article-meta"><span><Sprout aria-hidden="true" />Seed Co Zambia</span>{date && <span><CalendarDays aria-hidden="true" />{date}</span>}</div>
  </div></header>;
}

export function ServiceInnovationDetail({ page, path }: { page: LivePageData; path: string }) {
  const source = serviceInnovation(path);
  const content: LiveBlock[] = [];
  const downloads: Array<{ image?: Extract<LiveBlock, { t: "img" }> | undefined; link: Extract<LiveBlock, { t: "link" }> }> = [];
  for (let index = 0; index < page.blocks.length; index++) {
    const block = page.blocks[index];
    if (!block || (block.t === "link" && /^\/category\//.test(resolveLiveHref(block.href)))) continue;
    const next = page.blocks[index + 1];
    if (block.t === "img" && next?.t === "link" && /^https:\/\/(play\.google\.com|apps\.apple\.com)\//.test(next.href)) {
      downloads.push({ image: block, link: next });
      index++;
    } else content.push(block);
  }
  const app = downloads.length > 0;
  const downloadLabel = app ? content.pop() : undefined;
  return <article className="service-innovation-detail" aria-label={page.title}>
    <div className={app ? "service-app-layout" : "service-story-layout"}>
      <div className="service-innovation-copy blog-article">
        {content.map((block, index) => {
          if (block.t === "img" && youtubeVideoId(block.src)) return <div className="service-innovation-video" key={index}><VideoPreview src={block.src} title={page.title} /></div>;
          if (block.t === "img") return <figure className="service-innovation-photo" key={index}><img src={enhancedImage(block.src)} alt={block.alt} loading={index === 0 ? "eager" : "lazy"} /></figure>;
          return <div key={index} className={index === 0 && block.t === "p" ? "blog-article-lead" : "blog-article-copy"}><LiveContent page={{ title: page.title, blocks: [block] }} path={path} /></div>;
        })}
        {app && <section className="service-downloads" aria-label="Seedney downloads">
          {downloadLabel && <LiveContent page={{ title: page.title, blocks: [downloadLabel] }} path={path} />}
          <div className="service-download-grid">{downloads.map(({ image, link }) => <Button key={link.href} asChild variant="outline" className="service-download"><a href={link.href} target="_blank" rel="noopener noreferrer">
            {image && <img src={enhancedImage(image.src)} alt="" />}<span>{link.text}</span><ExternalLink aria-hidden="true" />
          </a></Button>)}</div>
        </section>}
      </div>
      {app && source?.image && <figure className="service-app-photo"><img src={enhancedImage(source.image.src)} alt={source.image.alt} /></figure>}
    </div>
    <footer className="blog-article-end"><Sprout aria-hidden="true" /><Button asChild variant="outline"><a href="/service-innovations">Service Innovations<ArrowRight /></a></Button></footer>
  </article>;
}
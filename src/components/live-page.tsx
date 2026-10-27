import { ArrowRight } from "lucide-react";
import liveContent from "@/lib/live-content.json";

export type LiveBlock =
  | { t: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "li"; text: string }
  | { t: "img"; src: string; alt: string }
  | { t: "video"; src: string }
  | { t: "link"; text: string; href: string };
export type LivePageData = { title: string; blocks: LiveBlock[] };

const live = liveContent as unknown as Record<string, LivePageData>;

export function getLivePage(path: string): LivePageData | undefined {
  return live[path.replace(/^\/+|\/+$/g, "")];
}

function ytId(src: string) {
  return src.match(/i\.ytimg\.com\/vi\/([^/]+)\//)?.[1];
}

const isExternal = (href: string) => /^https?:/.test(href);

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return isExternal(href) ? <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a> : <a href={href} className={className}>{children}</a>;
}

type Card = { img?: string; alt: string; video?: string; items: LiveBlock[] };
type Segment = { kind: "cards"; cards: Card[] } | { kind: "list"; items: string[] } | { kind: "block"; block: LiveBlock };

const CTA = /^(buy\s+now|read\s+more|find\s+out\s+more|apply|learn\s+more|download|view|more)/i;

const isContact = (b: LiveBlock | undefined) => b?.t === "link" && /^(mailto|tel):/.test(b.href);
const isTitleLink = (b: LiveBlock | undefined) => b?.t === "link" && !CTA.test(b.text.trim()) && !isContact(b);

function isShort(b: LiveBlock | undefined, next: LiveBlock | undefined) {
  if (!b) return false;
  if ((b.t === "h3" || b.t === "h4" || b.t === "h5") && next?.t === "li") return false;
  return b.t === "link" || b.t === "h3" || b.t === "h4" || b.t === "h5" || (b.t === "p" && b.text.length < 220);
}

function segment(blocks: LiveBlock[]): Segment[] {
  const segs: Segment[] = [];
  const at = (n: number): LiveBlock | undefined => blocks[n];
  let i = 0;
  while (i < blocks.length) {
    const b = at(i);
    if (!b) break;
    if (b.t === "li") {
      const items: string[] = [];
      for (let x = at(i); x && x.t === "li"; x = at(++i)) items.push(x.text);
      segs.push({ kind: "list", items });
      continue;
    }
    const linkThenImg = isTitleLink(b) && at(i + 1)?.t === "img";
    if (b.t === "img" || linkThenImg) {
      const cards: Card[] = [];
      while (i < blocks.length) {
        const pre: LiveBlock[] = [];
        const first = at(i);
        if (isTitleLink(first) && at(i + 1)?.t === "img") { pre.push(first); i++; }
        const cur = at(i);
        if (!cur || cur.t !== "img") { i -= pre.length; break; }
        i++;
        const items = [...pre];
        while (items.length < 5 && isShort(at(i), at(i + 1)) && !(isTitleLink(at(i)) && at(i + 1)?.t === "img" && items.length > 0)) { const x = at(i); if (x) items.push(x); i++; }
        const id = ytId(cur.src);
        cards.push(id ? { video: id, alt: cur.alt, items } : { img: cur.src, alt: cur.alt, items });
      }
      const only = cards.length === 1 ? cards[0] : undefined;
      if (only && only.items.length === 0) {
        segs.push({ kind: "block", block: only.video ? { t: "video", src: `https://www.youtube.com/embed/${only.video}` } : { t: "img", src: only.img ?? "", alt: only.alt } });
      } else segs.push({ kind: "cards", cards });
      continue;
    }
    segs.push({ kind: "block", block: b });
    i++;
  }
  return segs;
}

function CardView({ card }: { card: Card }) {
  const links = card.items.filter((x): x is Extract<LiveBlock, { t: "link" }> => x.t === "link" && !isContact(x));
  const main = links[0];
  const caption = card.items.find((x) => x.t === "p");
  const videoTitle = caption && caption.t === "p" ? caption.text : "Seed Co video";
  const body = (
    <>
      {card.video ? (
        <div className="live-media live-media-video"><iframe src={`https://www.youtube.com/embed/${card.video}`} title={videoTitle} loading="lazy" allowFullScreen /></div>
      ) : card.img ? (
        <div className="live-media"><img src={card.img} alt={card.alt || main?.text || ""} loading="lazy" /></div>
      ) : null}
      <div className="live-card-copy">
        {card.items.map((x, k) => {
          if (x.t === "link" && isContact(x)) return <a key={k} href={x.href} className="card-contact">{x.text}</a>;
          if (x.t === "link") return !card.video && !CTA.test(x.text.trim()) ? <h3 key={k}>{x.text}</h3> : <span key={k} className="card-link">{x.text} <ArrowRight /></span>;
          if (x.t === "p") return <p key={k}>{x.text}</p>;
          if (x.t === "img" || x.t === "video") return null;
          return <h3 key={k}>{x.text}</h3>;
        })}
      </div>
    </>
  );
  return main && !card.video ? <SmartLink href={main.href} className="live-card live-card-link">{body}</SmartLink> : <article className="live-card">{body}</article>;
}

function BlockView({ block }: { block: LiveBlock }) {
  switch (block.t) {
    case "h1": case "h2": return <h2 className="live-h2">{block.text}</h2>;
    case "h3": case "h4": return <h3 className="live-h3">{block.text}</h3>;
    case "h5": return <h4 className="live-h4">{block.text}</h4>;
    case "p": return <p className="live-p">{block.text}</p>;
    case "img": return <figure className="live-figure"><img src={block.src} alt={block.alt} loading="lazy" /></figure>;
    case "video": return <div className="live-media live-media-video live-embed"><iframe src={block.src} title="Embedded content" loading="lazy" allowFullScreen /></div>;
    case "link": return <SmartLink href={block.href} className="live-button">{block.text} <ArrowRight /></SmartLink>;
    default: return null;
  }
}

export function LiveContent({ page }: { page: LivePageData }) {
  return (
    <div className="live-content">
      {segment(page.blocks).map((s, i) =>
        s.kind === "list" ? <ul key={i} className="live-list">{s.items.map((t, k) => <li key={k}>{t}</li>)}</ul>
        : s.kind === "cards" ? <div key={i} className="live-cards">{s.cards.map((c, k) => <CardView key={k} card={c} />)}</div>
        : <BlockView key={i} block={s.block} />,
      )}
    </div>
  );
}

export function firstImage(page: LivePageData) {
  const b = page.blocks.find((x) => x.t === "img" && !ytId(x.src));
  return b && b.t === "img" ? b.src : undefined;
}

export function firstText(page: LivePageData) {
  const b = page.blocks.find((x) => x.t === "p" && x.text.length > 40);
  return b && b.t === "p" ? b.text : `${page.title} — Seed Co Zambia Field Crops.`;
}

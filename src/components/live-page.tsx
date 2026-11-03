import { ArrowRight, Eye, Sprout, Wheat, HeartHandshake, Users, Handshake, CircleCheck, Award, ShieldCheck, Lightbulb } from "lucide-react";
import liveContent from "@/lib/live-content.json";
import { isExtendedTeamPhoto, teamPhoto } from "@/lib/team-photos";
import { AfricaFootprintMap } from "@/components/africa-footprint-map";
import { VideoPreview } from "@/components/video-preview";
import { resolveLiveHref } from "@/lib/live-links";

export type LiveBlock =
  | { t: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "li"; text: string }
  | { t: "img"; src: string; alt: string }
  | { t: "video"; src: string }
  | { t: "table"; headers: string[]; rows: string[][] }
  | { t: "link"; text: string; href: string };
export type LivePageData = { title: string; blocks: LiveBlock[] };

const live = liveContent as unknown as Record<string, LivePageData>;

/** Countries listed verbatim on the live "Our Story" page ("Our proud African footprint"). */
const FOOTPRINT_COUNTRIES = ["Zambia", "South Africa", "Tanzania", "Nigeria", "Botswana", "Rwanda", "Malawi", "Congo", "Mozambique", "Kenya", "Ghana", "Zimbabwe"];
const FOOTPRINT_MARKER = "\u2063africa-footprint-map\u2063";

/** Scraped numeric pagination links ("1", "2", …) become a centered page-pill row. */
type Pagination = { base: string; current: number; max: number };
const PAGE_HREF = /\/page\/(\d+)\/?$/;
const digitLink = (b: LiveBlock | undefined): { n: number; href: string } | undefined =>
  b?.t === "link" && /^\d+$/.test(b.text.trim()) ? { n: Number(b.text), href: b.href } : undefined;

export function getLivePage(path: string): LivePageData | undefined {
  return live[path.replace(/^\/+|\/+$/g, "")];
}

function ytId(src: string) {
  return src.match(/i\.ytimg\.com\/vi\/([^/]+)\//)?.[1];
}

const isExternal = (href: string) => /^https?:/.test(href);

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  href = resolveLiveHref(href);
  return isExternal(href) ? <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a> : <a href={href} className={className}>{children}</a>;
}

type Card = { img?: string; alt: string; video?: string; items: LiveBlock[] };
type Statement = { title: string; items: string[] };
type Segment = { kind: "cards"; cards: Card[] } | { kind: "statements"; statements: Statement[] } | { kind: "values"; title: string; items: string[] } | { kind: "list"; items: string[] } | { kind: "block"; block: LiveBlock } | { kind: "pagination"; p: Pagination };

const statementIcons = [Eye, Sprout, Wheat];
const valueIcons = [HeartHandshake, Users, Handshake, CircleCheck, Award, ShieldCheck, Lightbulb];

function StatementCards({ statements }: { statements: Statement[] }) {
  return <div className="company-statement-grid">{statements.map((statement, index) => {
    const Icon = statementIcons[index % statementIcons.length] ?? Sprout;
    return <article className="company-statement-card" key={statement.title}>
      <div className="company-card-top"><span className="company-card-icon"><Icon aria-hidden="true" /></span><span className="company-card-index" aria-hidden="true">0{index + 1}</span></div>
      <h3>{statement.title}</h3>{statement.items.map((text, i) => <p key={i}>{text}</p>)}
    </article>;
  })}</div>;
}

function ValueCards({ title, items }: { title: string; items: string[] }) {
  return <section className="company-values" aria-label={title}><h3 className="company-values-title">{title}</h3><div className="company-value-grid">{items.map((text, index) => {
    const Icon = valueIcons[index % valueIcons.length] ?? Sprout;
    const separator = text.indexOf(":");
    return <article className="company-value-card" key={text}><span className="company-card-icon"><Icon aria-hidden="true" /></span><div>{separator < 0 ? <p>{text}</p> : <><h4>{text.slice(0, separator)}:</h4><p>{text.slice(separator + 1)}</p></>}</div></article>;
  })}</div></section>;
}

const CTA = /^(buy\s+now|read\s+more|find\s+out\s+more|apply|learn\s+more|download|view|more)/i;

const isContact = (b: LiveBlock | undefined) => b?.t === "link" && /^(mailto|tel):/.test(b.href);
const isTitleLink = (b: LiveBlock | undefined) => b?.t === "link" && !CTA.test(b.text.trim()) && !isContact(b);

function isShort(b: LiveBlock | undefined, next: LiveBlock | undefined) {
  if (!b) return false;
  if ((b.t === "h3" || b.t === "h4" || b.t === "h5") && next?.t === "li") return false;
  return b.t === "link" || b.t === "h3" || b.t === "h4" || b.t === "h5" || (b.t === "p" && b.text.length < 220);
}

function segment(blocks: LiveBlock[], path?: string): Segment[] {
  const segs: Segment[] = [];
  const at = (n: number): LiveBlock | undefined => blocks[n];
  let i = 0;
  const pageMatch = path ? PAGE_HREF.exec("/" + path.replace(/^\/+|\/+$/g, "")) : null;
  const current = pageMatch ? Number(pageMatch[1]) : 1;
  while (i < blocks.length) {
    const b = at(i);
    if (!b) break;
    // Numeric pagination links scraped from the live site ("1", "2", …) become one centered page row.
    if (digitLink(b)) {
      const links: { n: number; href: string }[] = [];
      for (let x = i; digitLink(at(x)); x++) links.push(digitLink(at(x))!);
      const withPage = links.filter((l) => PAGE_HREF.test(l.href));
      const loneStart = links.length === 1 && links[0]!.n === 1 && !PAGE_HREF.test(links[0]!.href);
      if (withPage.length || loneStart) {
        const base = withPage.length ? withPage[0]!.href.replace(PAGE_HREF, "") : links[0]!.href;
        let max = withPage.reduce((m, l) => Math.max(m, Number(PAGE_HREF.exec(l.href)![1])), 1);
        max = Math.max(max, current);
        segs.push({ kind: "pagination", p: { base, current, max } });
        i += links.length;
        continue;
      }
    }
    if (b.t === "h4" && ["Our Vision", "Our Mission", "Our Brands"].includes(b.text)) {
      const statements: Statement[] = [];
      while (i < blocks.length) {
        const heading = at(i);
        if (heading?.t !== "h4" || !["Our Vision", "Our Mission", "Our Brands"].includes(heading.text)) break;
        i++;
        const items: string[] = [];
        while (at(i)?.t === "p") { const paragraph = at(i); if (paragraph?.t === "p") items.push(paragraph.text); i++; }
        statements.push({ title: heading.text, items });
      }
      segs.push({ kind: "statements", statements });
      continue;
    }
    if (b.t === "h4" && b.text === "Seed Co Values") {
      i++;
      const items: string[] = [];
      while (at(i)?.t === "li") { const item = at(i); if (item?.t === "li") items.push(item.text); i++; }
      segs.push({ kind: "values", title: b.text, items });
      continue;
    }
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
        if (first && isTitleLink(first) && at(i + 1)?.t === "img") { pre.push(first); i++; }
        const cur = at(i);
        if (!cur || cur.t !== "img") { i -= pre.length; break; }
        i++;
        const items = [...pre];
        while (items.length < 5 && !digitLink(at(i)) && isShort(at(i), at(i + 1)) && !(isTitleLink(at(i)) && at(i + 1)?.t === "img" && items.length > 0)) { const x = at(i); if (x) items.push(x); i++; }
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

function CardView({ card, team = false }: { card: Card; team?: boolean }) {
  const links = card.items.filter((x): x is Extract<LiveBlock, { t: "link" }> => x.t === "link" && !isContact(x) && !/^\/category\//.test(resolveLiveHref(x.href)));
  const main = links[0];
  const caption = card.items.find((x) => x.t === "p");
  const linkedPage = main ? getLivePage(resolveLiveHref(main.href)) : undefined;
  const isArticle = card.items.some((x) => x.t === "link" && !isContact(x) && CTA.test(x.text.trim()))
    || Boolean(linkedPage?.blocks.some((x) => x.t === "link" && /^\/category\/(blog|news)(?:\/|$)/.test(x.href)))
    || card.items.some((x) => x.t === "link" && /^\/category\//.test(resolveLiveHref(x.href)));
  const isPortrait = Boolean(card.img && (team || isExtendedTeamPhoto(card.img)));
  const cardClass = isArticle ? "live-card live-card-photo" : isPortrait ? "live-card live-card-portrait" : "live-card";
  const videoTitle = caption && caption.t === "p" ? caption.text : "Seed Co video";
  const body = (
    <>
      {card.video ? (
        <VideoPreview src={`https://www.youtube.com/embed/${card.video}`} title={videoTitle} />
      ) : card.img ? (
        <div className={`live-media${isExtendedTeamPhoto(card.img) ? " live-media-extended-portrait" : ""}`}><img src={teamPhoto(card.img)} alt={card.alt || main?.text || ""} loading="lazy" /></div>
      ) : null}
      <div className="live-card-copy">
        {card.items.map((x, k) => {
          if (x.t === "link" && isContact(x)) return <a key={k} href={x.href} className="card-contact">{x.text}</a>;
          if (x.t === "link") return !card.video && !CTA.test(x.text.trim()) ? <h3 key={k}>{x.text}</h3> : <span key={k} className="card-link">{x.text} <ArrowRight /></span>;
          if (x.t === "p") return <p key={k}>{x.text}</p>;
          if (x.t === "img" || x.t === "video") return null;
          return "text" in x ? <h3 key={k}>{x.text}</h3> : null;
        })}
      </div>
    </>
  );
  return main && !card.video ? <SmartLink href={main.href} className={`${cardClass} live-card-link`}>{body}</SmartLink> : <article className={cardClass}>{body}</article>;
}

function BlockView({ block }: { block: LiveBlock }) {
  switch (block.t) {
    case "h1": case "h2": return <h2 className="live-h2">{block.text}</h2>;
    case "h3": case "h4": return <h3 className="live-h3">{block.text}</h3>;
    case "h5": return <h4 className="live-h4">{block.text}</h4>;
    case "p": return <p className="live-p">{block.text}</p>;
    case "img": return <figure className="live-figure"><img src={block.src} alt={block.alt} loading="lazy" /></figure>;
    case "video": return <VideoPreview src={block.src} title="Seed Co Zambia video" />;
     case "table": return <div className="live-directory"><table aria-label={block.headers.includes("Contact") ? "Agronomists" : "Events Calendar"}><thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows.map((row, i) => <tr key={i}>{block.headers.map((header, k) => <td key={header} data-label={header}>{header === "Contact" && row[k] ? <a href={`tel:+${row[k].replace(/\D/g, "")}`}>{row[k]}</a> : row[k]}</td>)}</tr>)}</tbody></table></div>;
    case "link": return <SmartLink href={block.href} className="live-button">{block.text} <ArrowRight /></SmartLink>;
    default: return null;
  }
}

function PaginationRow({ p }: { p: Pagination }) {
  return (
    <nav className="live-pagination" aria-label="Pages">
      {Array.from({ length: p.max }, (_, k) => k + 1).map((n) =>
        n === p.current
          ? <span key={n} className="live-page live-page-current" aria-current="page">{n}</span>
           : <a key={n} className="live-page" href={resolveLiveHref(n === 1 ? p.base : `${p.base}/page/${n}`)}>{n}</a>,
      )}
    </nav>
  );
}

export function LiveContent({ page, footprint = false, team = false, path }: { page: LivePageData; footprint?: boolean; team?: boolean; path?: string }) {
  // On the Our Story page the plain country list becomes the interactive
  // Africa footprint map; the same country names render as the map's side list.
  const blocks: LiveBlock[] = [];
  let placed = false;
  for (const b of page.blocks) {
    if (footprint && b.t === "li" && FOOTPRINT_COUNTRIES.includes(b.text)) {
      if (!placed) { blocks.push({ t: "p", text: FOOTPRINT_MARKER }); placed = true; }
      continue;
    }
    blocks.push(b);
  }
  return (
    <div className="live-content">
      {segment(blocks, path).map((s, i) =>
        s.kind === "statements" ? <StatementCards key={i} statements={s.statements} />
        : s.kind === "values" ? <ValueCards key={i} title={s.title} items={s.items} />
        : s.kind === "pagination" ? <PaginationRow key={i} p={s.p} />
        : s.kind === "block" && s.block.t === "p" && s.block.text === FOOTPRINT_MARKER ? <AfricaFootprintMap key={i} />
        : s.kind === "list" ? <ul key={i} className="live-list">{s.items.map((t, k) => <li key={k}>{t}</li>)}</ul>
        : s.kind === "cards" ? <div key={i} className={s.cards.every((c) => c.video) ? "tvid-grid" : "live-cards"}>{s.cards.map((c, k) => <CardView key={k} card={c} team={team} />)}</div>
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

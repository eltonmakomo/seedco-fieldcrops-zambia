import { Link } from "@tanstack/react-router";
import { ArrowRight, CloudRain, Droplets, MapPin, Sun } from "lucide-react";
import type { LivePageData } from "@/components/live-page";
import { resolveLiveHref } from "@/lib/live-links";

type Zone = { title: string; text?: string; href: string };

/** Detects "heading + optional summary + Read More" listing pages (e.g. farming zones). */
export function parseZones(page: LivePageData): Zone[] | null {
  const zones: Zone[] = [];
  let cur: Partial<Zone> | null = null;
  for (const b of page.blocks as { t: string; text: string; href?: string }[]) {
    if (b.t === "h5") cur = { title: b.text };
    else if (b.t === "p" && cur) cur.text = cur.text ? `${cur.text} ${b.text}` : b.text;
    else if (b.t === "link" && cur && b.href) { zones.push({ ...cur, href: b.href } as Zone); cur = null; }
    else return null;
  }
  return zones.length >= 2 ? zones : null;
}

function split(text?: string) {
  if (!text) return null;
  const m = text.match(/^(.*?)\s*Irrigated:\s*(.*?)\s*Dry Land:\s*(.*)$/i);
  if (!m) return { summary: text };
  const list = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
  return { summary: m[1], irrigated: list(m[2]), dry: list(m[3]) };
}

export function ZoneList({ zones }: { zones: Zone[] }) {
  return (
    <div className="zone-grid">
      {zones.map((z, i) => {
        const [name, crop] = z.title.split(":").map((s) => s.trim());
        const d = split(z.text);
        const href = resolveLiveHref(z.href);
        const external = /^https?:/.test(href);
        const cta = <>Read More <ArrowRight aria-hidden="true" /></>;
        return (
          <article className="zone-card" key={z.title + i}>
            <header className="zone-head">
              <span className="zone-pin"><MapPin aria-hidden="true" /></span>
              <div>
                <h3 className="zone-name">{name}</h3>
                {crop && <p className="zone-crop">{crop}</p>}
              </div>
            </header>
            {d?.summary && <p className="zone-summary"><CloudRain aria-hidden="true" />{d.summary}</p>}
            {d?.irrigated && (
              <div className="zone-vars">
                <p className="zone-label"><Droplets aria-hidden="true" />Irrigated</p>
                <ul>{d.irrigated.map((v) => <li key={v}>{v}</li>)}</ul>
                <p className="zone-label"><Sun aria-hidden="true" />Dry Land</p>
                <ul>{d.dry!.map((v) => <li key={v}>{v}</li>)}</ul>
              </div>
            )}
            {external ? <a className="zone-cta" href={href}>{cta}</a> : <Link className="zone-cta" to={href}>{cta}</Link>}
          </article>
        );
      })}
    </div>
  );
}

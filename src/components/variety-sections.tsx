import { Check, Droplets, Sprout, Sun } from "lucide-react";
import { LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";

type Variety = { name: string; tag?: string | undefined; facts: string[] };
type Section = { title: string; names: string[]; varieties: Variety[] };

const txt = (b: LiveBlock) => ("text" in b ? String(b.text ?? "") : "");

/** Splits a page into intro blocks, "Varieties for ..." sections and trailing blocks. */
export function parseVarieties(page: LivePageData) {
  const blocks = page.blocks;
  const start = blocks.findIndex((b) => b.t === "h3" && txt(b).startsWith("Varieties for"));
  if (start < 0) return null;
  const sections: Section[] = [];
  let i = start;
  for (; i < blocks.length; i++) {
    const b = blocks[i]!;
    if (b.t === "h3" && txt(b).startsWith("Varieties for")) { sections.push({ title: txt(b), names: [], varieties: [] }); continue; }
    const s = sections[sections.length - 1]!;
    const cur = s.varieties[s.varieties.length - 1];
    const prev = blocks[i - 1];
    if (b.t === "p") {
      if (cur && prev?.t === "p" && !cur.tag) cur.tag = txt(b);
      else {
        const m = txt(b).match(/^(SC\s?\d+\w*(?:\s\(NEW\))?)\s+([A-Z][A-Z\s-]+)$/);
        s.varieties.push(m ? { name: m[1]!, tag: m[2], facts: [] } : { name: txt(b), facts: [] });
      }
    } else if (b.t === "li") {
      if (cur) cur.facts.push(txt(b)); else s.names.push(txt(b));
    } else break;
  }
  return { intro: blocks.slice(0, start), sections, rest: blocks.slice(i) };
}

export function VarietySections({ page, path }: { page: LivePageData; path: string }) {
  const parsed = parseVarieties(page)!;
  return (
    <>
      {parsed.intro.length > 0 && <LiveContent page={{ ...page, blocks: parsed.intro }} path={path} />}
      <div className="vsec-wrap">
        {parsed.sections.map((s) => {
          const Icon = /irrigated/i.test(s.title) ? Droplets : Sun;
          const count = s.names.length + s.varieties.length;
          return (
            <section className="vsec" key={s.title}>
              <header className="vsec-head">
                <span className="vsec-icon"><Icon aria-hidden="true" /></span>
                <h3 className="vsec-title">{s.title}</h3>
                {count > 0 && <span className="vsec-count">{count}</span>}
              </header>
              {s.names.length > 0 && (
                <ul className="vsec-chips">
                  {s.names.map((n) => <li key={n}><Sprout aria-hidden="true" />{n}</li>)}
                </ul>
              )}
              {s.varieties.length > 0 && (
                <div className="vsec-grid">
                  {s.varieties.map((v, k) => (
                    <article className="vcard" key={v.name + k}>
                      <div className="vcard-head">
                        <h4 className="vcard-name">{v.name}</h4>
                        {v.tag && <p className="vcard-tag">{v.tag}</p>}
                      </div>
                      {v.facts.length > 0 && (
                        <ul className="vcard-facts">
                          {v.facts.map((f, j) => <li key={j}><Check aria-hidden="true" />{f}</li>)}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
      {parsed.rest.length > 0 && <LiveContent page={{ ...page, blocks: parsed.rest }} path={path} />}
    </>
  );
}

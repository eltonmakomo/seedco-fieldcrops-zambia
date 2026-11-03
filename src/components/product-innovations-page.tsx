import { Bean, CloudSun, Dna, ShieldCheck, Sprout, TrendingUp, Wheat } from "lucide-react";
import type { LivePageData } from "@/components/live-page";

const sectionIcons = [CloudSun, ShieldCheck, Dna, TrendingUp];
const cropIcon = (label: string) => (/wheat/i.test(label) ? Wheat : /soya|bean/i.test(label) ? Bean : Sprout);

type Sub = { label: string; paras: string[] };
type Section = { title: string; intro: string[]; subs: Sub[] };

/** Groups the live Product Innovations copy (h3 sections, short-label sub-topics) into designed chapters — no text is invented. */
export function ProductInnovationsContent({ page }: { page: LivePageData }) {
  const sections: Section[] = [];
  for (const b of page.blocks) {
    if (b.t === "h3") { sections.push({ title: b.text, intro: [], subs: [] }); continue; }
    if (b.t !== "p" || !sections.length) continue;
    const s = sections[sections.length - 1]!;
    if (b.text.length < 40) s.subs.push({ label: b.text, paras: [] });
    else if (s.subs.length) s.subs[s.subs.length - 1]!.paras.push(b.text);
    else s.intro.push(b.text);
  }

  return (
    <div className="pinv">
      <nav className="pinv-toc" aria-label="On this page">
        {sections.map((s, i) => {
          const Icon = sectionIcons[i % sectionIcons.length]!;
          return (
            <a key={s.title} href={`#pinv-${i}`} className="pinv-toc-item">
              <Icon aria-hidden="true" /><span>0{i + 1}</span>{s.title}
            </a>
          );
        })}
      </nav>
      {sections.map((s, i) => {
        const Icon = sectionIcons[i % sectionIcons.length]!;
        const [lead, ...rest] = s.intro;
        return (
          <section key={s.title} id={`pinv-${i}`} className="pinv-section">
            <header className="pinv-head">
              <span className="pinv-icon"><Icon aria-hidden="true" /></span>
              <div>
                <p className="eyebrow">Chapter 0{i + 1}</p>
                <h2>{s.title}</h2>
              </div>
            </header>
            {lead && <p className="pinv-lead">{lead}</p>}
            {rest.map((t) => <p key={t} className="pinv-text">{t}</p>)}
            {s.subs.length > 0 && (
              <div className="pinv-subs">
                {s.subs.map((sub) => {
                  const SubIcon = s.title === "Disease Tolerance" ? cropIcon(sub.label) : Sprout;
                  return (
                    <article key={sub.label} className="pinv-sub">
                      <h3><span className="innov-card-icon"><SubIcon aria-hidden="true" /></span>{sub.label}</h3>
                      {sub.paras.map((t) => <p key={t}>{t}</p>)}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

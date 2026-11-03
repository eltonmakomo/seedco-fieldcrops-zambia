import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, CalendarClock, MapPin } from "lucide-react";
import { LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";
import { resolveLiveHref } from "@/lib/live-links";

type Job = { title: string; closing?: string; text: string[]; href: string };
const txt = (b: LiveBlock) => ("text" in b ? String(b.text ?? "") : "");

/** Careers listing: job cards from h5 + paragraphs + Read More; remaining blocks (pagination) render as usual. */
export function CareersList({ page, path }: { page: LivePageData; path: string }) {
  const jobs: Job[] = [];
  let cur: Job | null = null;
  let i = 0;
  for (; i < page.blocks.length; i++) {
    const b = page.blocks[i]!;
    if (b.t === "h5") cur = { title: txt(b), text: [], href: "" };
    else if (b.t === "p" && cur) {
      const t = txt(b);
      if (/^Closing Date:/i.test(t)) cur.closing = t.replace(/^Closing Date:\s*/i, "");
      else cur.text.push(t);
    } else if (b.t === "link" && cur && b.t === "link") { jobs.push({ ...cur, href: (b as { href: string }).href }); cur = null; }
    else break;
  }
  const rest = page.blocks.slice(i);
  return (
    <>
      <div className="job-grid">
        {jobs.map((j) => {
          const href = resolveLiveHref(j.href);
          const loc0 = j.text.join(" ").match(/based in ([^.,]+(?:, Zambia)?)/i)?.[1];
          const loc = loc0 && loc0.length < 30 ? loc0 : undefined;
          return (
            <article className="job-card" key={j.href}>
              <div className="job-top">
                <span className="job-icon"><Briefcase aria-hidden="true" /></span>
                {j.closing && <span className="job-date"><CalendarClock aria-hidden="true" />Closing: {j.closing}</span>}
              </div>
              <h3 className="job-title">{j.title}</h3>
              {loc && <p className="job-loc"><MapPin aria-hidden="true" />{loc}</p>}
              {j.text.map((t, k) => <p className="job-text" key={k}>{t}</p>)}
              <Link className="zone-cta" to={href}>Read More <ArrowRight aria-hidden="true" /></Link>
            </article>
          );
        })}
      </div>
      {rest.length > 0 && <LiveContent page={{ ...page, blocks: rest }} path={path} />}
    </>
  );
}

export const isCareersList = (path: string) => /^about-us\/careers(\/page\/\d+)?$/.test(path);

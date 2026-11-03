import { ArrowLeft, BriefcaseBusiness, CalendarClock, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";

export const isCareerDetail = (path: string) => /^careers\/(?!page\/)[^/]+\/?$/.test(path);

export function CareerDetailHeader({ page }: { page: LivePageData }) {
  const closing = page.blocks.find((b) => "text" in b && /^Closing Date:/i.test(b.text));
  return <header className="responsibility-header"><div className="mx-auto max-w-screen-2xl px-6"><Button asChild variant="link" className="h-auto px-0"><a href="/about-us/careers"><ArrowLeft />Careers</a></Button><h1>{page.title}</h1><div className="responsibility-meta"><span><BriefcaseBusiness aria-hidden="true" />Seed Co Zambia</span>{closing && "text" in closing && <span><CalendarClock aria-hidden="true" />{closing.text}</span>}</div></div></header>;
}

function ApplicationText({ text }: { text: string }) {
  return <p>{text.split(/([\w.+-]+@[\w.-]+\.[a-zA-Z]{2,})/g).map((part, index) => /^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(part) ? <a href={`mailto:${part}`} key={index}>{part}</a> : part)}</p>;
}

export function CareerDetail({ page, path }: { page: LivePageData; path: string }) {
  const blocks = page.blocks.filter((b) => !("text" in b && /^Closing Date:/i.test(b.text)) && !(b.t === "h2" && b.text.toLowerCase() === page.title.toLowerCase()));
  const applicationIndex = blocks.findIndex((b) => b.t === "p" && /^(Interested (candidates|members)|Application Mode)/i.test(b.text));
  const body = applicationIndex < 0 ? blocks : blocks.slice(0, applicationIndex);
  const application = applicationIndex < 0 ? [] : blocks.slice(applicationIndex);
  const groups: { title?: string; blocks: LiveBlock[] }[] = [{ blocks: [] }];
  body.forEach((block, index) => {
    const isHeading = block.t === "h3" || block.t === "h4" || (block.t === "p" && block.text.length < 140 && body[index + 1]?.t === "li");
    if (isHeading && "text" in block) groups.push({ title: block.text, blocks: [] });
    else groups[groups.length - 1]?.blocks.push(block);
  });
  return <article className="career-detail" aria-label={page.title}>
    {groups.map((group, index) => <section className={group.title ? "career-detail-section" : "career-detail-intro"} key={index}>
      {group.title && <h2><BriefcaseBusiness aria-hidden="true" />{group.title}</h2>}
      {group.blocks.map((block, i) => block.t === "li" ? <div className="career-detail-point" key={i}><Check aria-hidden="true" /><p>{block.text}</p></div> : <LiveContent key={i} page={{ title: page.title, blocks: [block] }} path={path} />)}
    </section>)}
    {application.length > 0 && <section className="career-application" aria-label="Application details"><h2><Mail aria-hidden="true" />Application details</h2>{application.map((block, index) => block.t === "p" ? <ApplicationText text={block.text} key={index} /> : <LiveContent key={index} page={{ title: page.title, blocks: [block] }} path={path} />)}</section>}
    <Button asChild variant="outline" className="justify-self-start"><a href="/about-us/careers"><ArrowLeft />All careers</a></Button>
  </article>;
}
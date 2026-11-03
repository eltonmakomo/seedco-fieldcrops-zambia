import { CircleHelp, Headset, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LiveContent, type LiveBlock, type LivePageData } from "@/components/live-page";

export function FaqsContent({ page }: { page: LivePageData }) {
  const questions: { title: string; blocks: LiveBlock[] }[] = [];
  const support: LiveBlock[] = [];
  let inSupport = false;
  for (const block of page.blocks) {
    if (block.t === "h2" && block.text === "Support") inSupport = true;
    if (inSupport) { support.push(block); continue; }
    if (block.t === "h3") questions.push({ title: block.text, blocks: [] });
    else if (block.t !== "h2") questions.at(-1)?.blocks.push(block);
  }

  return <div className="min-w-0">
    <div className="mb-6 flex items-center gap-4 border-b border-border pb-6">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><CircleHelp className="size-6" aria-hidden="true" /></span>
      <h2 className="font-display text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
    </div>
    <Accordion type="multiple" defaultValue={["question-0"]} className="space-y-3">
      {questions.map((question, index) => <AccordionItem key={question.title} value={`question-${index}`} className="overflow-hidden rounded-lg border border-border bg-card transition-colors data-[state=open]:border-primary">
        <AccordionTrigger className="gap-4 px-5 py-5 text-base font-semibold text-foreground hover:bg-secondary/50 hover:no-underline sm:px-6 [&[data-state=open]]:text-primary">
          <span className="flex min-w-0 items-start gap-4"><span className="mt-0.5 shrink-0 font-condensed text-sm text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 break-words leading-relaxed">{question.title}</span></span>
        </AccordionTrigger>
        <AccordionContent className="border-t border-border px-5 pt-5 pb-6 sm:px-6">
          <LiveContent page={{ title: question.title, blocks: question.blocks }} />
        </AccordionContent>
      </AccordionItem>)}
    </Accordion>
    <section className="mt-10 border-t border-border pt-8" aria-label="Support">
      <div className="mb-5 flex items-center gap-3"><Headset className="size-6 text-primary" aria-hidden="true" /><h2 className="font-display text-2xl font-bold">Support</h2></div>
      <div className="grid gap-5 sm:grid-cols-2">
        {support.filter(block => block.t === "p").map((block, index) => {
          if (block.t !== "p") return null;
          const email = block.text.match(/Email:\s*(\S+)/)?.[1];
          const phone = /^(Tel|Hotline):/.test(block.text);
          if (email || phone) return <a key={index} href={email ? `mailto:${email}` : "tel:+260211426400"} className="flex min-w-0 items-center gap-3 border-b border-border py-3 text-sm font-semibold text-foreground transition-colors hover:text-primary">{email ? <Mail className="size-5 shrink-0 text-primary" /> : <Phone className="size-5 shrink-0 text-primary" />}<span className="break-words [overflow-wrap:anywhere]">{block.text}</span></a>;
          return <p key={index} className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">{block.text}</p>;
        })}
      </div>
      <Button asChild className="mt-5"><a href="/contact-us">Contact Us <ArrowUpRight aria-hidden="true" /></a></Button>
    </section>
  </div>;
}
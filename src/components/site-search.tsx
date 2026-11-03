import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchSite } from "@/lib/site-search";

export function SiteSearch({ overlay = false }: { overlay?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = searchSite(query);
  return <Dialog.Root open={open} onOpenChange={(value) => { setOpen(value); if (!value) setQuery(""); }}>
    <Dialog.Trigger asChild><Button variant="ghost" size="icon" aria-label="Search" title="Search" className={overlay ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" : ""}><Search /></Button></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="video-overlay" />
      <Dialog.Content aria-describedby={undefined} className="fixed left-1/2 top-[10vh] z-[100] flex max-h-[80dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 flex-col gap-5 overflow-hidden rounded-lg border border-border bg-card p-5 text-foreground shadow-xl sm:p-6">
        <div className="flex items-center justify-between gap-4"><Dialog.Title className="font-display text-xl font-bold">Search Seed Co Zambia</Dialog.Title><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close search"><X /></Button></Dialog.Close></div>
        <div className="relative"><Search className="absolute left-3 top-3 size-5 text-primary" aria-hidden="true" /><Input type="search" aria-label="Search the site" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 pl-10" /></div>
        <div className="min-h-0 overflow-y-auto" aria-live="polite">
          {query.trim() && <p className="mb-3 text-sm text-muted-foreground">{results.length ? `${results.length} results` : "No results found"}</p>}
          {results.map((result) => <Button asChild key={result.href} variant="ghost" className="h-auto w-full justify-between gap-4 rounded-none border-b border-border px-2 py-4 text-left whitespace-normal"><a href={result.href} onClick={() => setOpen(false)}><span className="min-w-0"><span className="block font-semibold text-foreground">{result.title}</span>{result.excerpt && <span className="mt-1 line-clamp-2 block text-sm font-normal text-muted-foreground">{result.excerpt}</span>}</span><ArrowRight className="shrink-0 text-primary" /></a></Button>)}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
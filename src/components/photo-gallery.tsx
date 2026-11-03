import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LivePageData } from "@/components/live-page";

export function PhotoGallery({ page }: { page: LivePageData }) {
  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{page.blocks.filter(block => block.t === "img").map((photo) => photo.t === "img" ? <Dialog.Root key={photo.src}>
    <figure className="overflow-hidden rounded-lg border border-border bg-card">
      <Dialog.Trigger asChild><Button variant="ghost" className="group relative block h-auto w-full overflow-hidden rounded-none p-0" aria-label={`View photo: ${photo.alt}`}>
        <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform motion-safe:group-hover:scale-105" />
        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-primary backdrop-blur-sm"><Expand className="size-4" /></span>
      </Button></Dialog.Trigger>
      <figcaption className="p-4 text-sm leading-relaxed font-semibold text-foreground">{photo.alt}</figcaption>
    </figure>
    <Dialog.Portal><Dialog.Overlay className="video-overlay" /><Dialog.Content className="fixed top-1/2 left-1/2 z-[101] w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-3 shadow-xl" aria-describedby={undefined}>
      <img src={photo.src} alt={photo.alt} className="max-h-[75vh] w-full object-contain" />
      <Dialog.Title className="px-2 pt-3 pb-1 text-sm font-semibold">{photo.alt}</Dialog.Title>
      <Dialog.Close asChild><Button size="icon" className="absolute top-3 right-3" aria-label="Close photo"><X /></Button></Dialog.Close>
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root> : null)}</div>;
}
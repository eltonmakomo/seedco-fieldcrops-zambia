import { enhancedImage } from "@/lib/enhanced-images";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LivePageData } from "@/components/live-page";

export type PhotoAlbum = { title: string; photos: { src: string; alt: string }[] };

export function PhotoGallery({ page, albums }: { page: LivePageData; albums: PhotoAlbum[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const album = selected === null ? undefined : albums[selected];
  const photo = photoIndex === null ? undefined : album?.photos[photoIndex];
  const navigatePhoto = (step: number) => {
    if (!album || photoIndex === null) return;
    setPhotoIndex((photoIndex + step + album.photos.length) % album.photos.length);
  };
  const back = () => { setSelected(null); setPhotoIndex(null); };
  return <div className="space-y-6">
    {album && <div className="flex flex-wrap items-center gap-4 border-b border-border pb-5"><Button variant="outline" onClick={back}><ArrowLeft />All albums</Button><h2 className="min-w-0 flex-1 font-display text-xl font-bold break-words">{album.title}</h2><span className="text-sm text-muted-foreground">{album.photos.length} photos</span></div>}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label={album?.title ?? page.title}>
      {album ? album.photos.map((item, index) => <figure key={`${item.src}-${index}`} className="overflow-hidden rounded-lg border border-border bg-card"><Button variant="ghost" className="group relative block h-auto w-full overflow-hidden rounded-none p-0" aria-label={`View photo ${index + 1}: ${album.title}`} onClick={() => setPhotoIndex(index)}><img src={enhancedImage(item.src)} alt={item.alt || album.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform motion-safe:group-hover:scale-105" /><span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-primary backdrop-blur-sm"><Expand /></span></Button><figcaption className="flex justify-between gap-3 p-4 text-sm font-semibold"><span className="min-w-0 break-words">{item.alt || album.title}</span><span className="shrink-0 text-muted-foreground">{index + 1} / {album.photos.length}</span></figcaption></figure>) : albums.map((item, index) => <figure key={item.title} className="overflow-hidden rounded-lg border border-border bg-card"><Button variant="ghost" className="group relative block h-auto w-full overflow-hidden rounded-none p-0" aria-label={`Open album: ${item.title}`} onClick={() => setSelected(index)}><img src={enhancedImage(item.photos[0]?.src ?? "")} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform motion-safe:group-hover:scale-105" /><span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-md bg-card/90 px-3 py-2 text-sm text-foreground backdrop-blur-sm"><Images className="text-primary" />{item.photos.length} photos</span></Button><figcaption className="p-4 text-sm leading-relaxed font-semibold text-foreground">{item.title}</figcaption></figure>)}
    </div>
    <Dialog.Root open={Boolean(photo)} onOpenChange={(open) => { if (!open) setPhotoIndex(null); }}><Dialog.Portal><Dialog.Overlay className="video-overlay" /><Dialog.Content className="fixed top-1/2 left-1/2 z-[101] w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-card p-3 shadow-xl" aria-describedby={undefined} onKeyDown={(event) => { if (event.key === "ArrowLeft") navigatePhoto(-1); if (event.key === "ArrowRight") navigatePhoto(1); }}>
      {photo && <img src={enhancedImage(photo.src)} alt={photo.alt || album?.title} className="max-h-[70vh] w-full object-contain" />}
      <div className="flex items-center gap-3 px-1 pt-3"><Dialog.Title className="min-w-0 flex-1 text-sm font-semibold break-words">{album?.title}</Dialog.Title><span className="shrink-0 text-sm text-muted-foreground">{(photoIndex ?? 0) + 1} / {album?.photos.length}</span><Button size="icon" variant="outline" onClick={() => navigatePhoto(-1)} aria-label="Previous photo"><ChevronLeft /></Button><Button size="icon" variant="outline" onClick={() => navigatePhoto(1)} aria-label="Next photo"><ChevronRight /></Button></div>
      <Dialog.Close asChild><Button size="icon" className="absolute top-3 right-3" aria-label="Close photo"><X /></Button></Dialog.Close>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}
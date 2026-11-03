import { videoThumbnail } from "@/lib/video-thumbnails";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Only actual video providers belong here; map embeds keep their original rendering. */
export function youtubeVideoId(src: string) {
  return src.match(/(?:i\.ytimg\.com\/vi\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/)?.[1];
}

export function VideoPreview({ src, title }: { src: string; title: string }) {
  const id = youtubeVideoId(src);
  const [open, setOpen] = useState(false);
  const fallback = (img: HTMLImageElement) => {
    if (!id || img.naturalWidth >= 200) return;
    const sizes = ["sddefault", "hqdefault", "mqdefault", "0"];
    const next = Number(img.dataset["fallback"] ?? "0");
    const size = sizes[next];
    if (!size) return;
    img.dataset["fallback"] = String(next + 1);
    img.src = `https://i.ytimg.com/vi/${id}/${size}.jpg`;
  };
  if (!id) return <div className="live-media live-media-video live-embed"><iframe src={src} title={title} loading="lazy" allowFullScreen /></div>;
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <Button variant="ghost" className="tvid-media" aria-label={`Play video: ${title}`}>
        <img className="tvid-thumb" src={videoThumbnail(id) ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy"
          ref={(img) => { if (img?.complete) fallback(img); }}
          onLoad={(event) => fallback(event.currentTarget)}
          onError={(event) => fallback(event.currentTarget)} />
        <span className="tvid-play"><Play fill="currentColor" aria-hidden="true" /></span>
      </Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="video-overlay" />
      <Dialog.Content className="video-dialog" aria-describedby={undefined}>
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <Dialog.Close asChild><Button variant="ghost" size="icon" className="video-close" aria-label="Close video"><X /></Button></Dialog.Close>
        {open && <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
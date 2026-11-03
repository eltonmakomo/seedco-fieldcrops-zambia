import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enhancedImage } from "@/lib/enhanced-images";

export type AppDownload = { image?: { src: string } | undefined; link: { href: string; text: string } };

export function AppStoreLinks({ downloads }: { downloads: AppDownload[] }) {
  return <div className="service-download-grid">{downloads.map(({ image, link }) => <Button key={link.href} asChild variant="outline" className="service-download"><a href={link.href} target="_blank" rel="noopener noreferrer">
    {image && <img src={enhancedImage(image.src)} alt="" />}<span>{link.text}</span><ExternalLink aria-hidden="true" />
  </a></Button>)}</div>;
}
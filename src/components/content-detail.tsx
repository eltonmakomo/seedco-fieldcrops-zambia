import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveContent, type LivePageData } from "@/components/live-page";
import { enhancedImage } from "@/lib/enhanced-images";
import { isExtendedTeamPhoto, teamPhoto } from "@/lib/team-photos";
import { detailParent } from "@/lib/detail-content";

export function ContentDetailHeader({ page, path }: { page: LivePageData; path: string }) {
  const parent = detailParent(path);
  return <header className="news-article-header"><div className="mx-auto max-w-screen-2xl px-6">
    <Button asChild variant="link" className="h-auto px-0"><a href={parent ? `/${parent}` : "/"}><ArrowLeft />{parent ? "Back to overview" : "Home"}</a></Button>
    <h1>{page.title}</h1>
  </div></header>;
}

export function ContentDetail({ page, path }: { page: LivePageData; path: string }) {
  const profile = /^(directors|management|sales_team|research_team)\//.test(path);
  const firstPhoto = profile ? page.blocks.find((block) => block.t === "img") : undefined;
  const blocks = firstPhoto ? page.blocks.filter((block) => block !== firstPhoto) : page.blocks;
  const parent = detailParent(path);
  return <article className={`content-detail${profile ? " content-detail-profile" : ""}`} aria-label={page.title}>
    {firstPhoto?.t === "img" && <figure className={`content-detail-portrait${isExtendedTeamPhoto(firstPhoto.src) ? " content-detail-portrait-extended" : ""}`}><img src={enhancedImage(teamPhoto(firstPhoto.src))} alt={firstPhoto.alt || page.title} /></figure>}
    <div className="content-detail-body"><LiveContent page={{ ...page, blocks }} path={path} /></div>
    <footer className="blog-article-end"><FileText aria-hidden="true" /><Button asChild variant="outline"><a href={parent ? `/${parent}` : "/"}>{parent ? "Back to overview" : "Home"}<ArrowRight /></a></Button></footer>
  </article>;
}
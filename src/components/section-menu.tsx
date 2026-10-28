import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navGroups } from "@/lib/seedco-content";

export function SectionMenu({ path }: { path: string }) {
  const href = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const group = navGroups.find((item) => item.children.some((child) => child.href === href))
    ?? (path.startsWith("about-us/") ? navGroups.find((item) => item.label === "About Us") : undefined);
  if (!group) return null;
  return <aside className="section-menu" aria-label={`${group.label} pages`}>
    <div className="section-menu-title"><Layers aria-hidden="true" /><span>{group.label}</span></div>
    <nav className="section-menu-links" aria-label={`${group.label} section navigation`}>
      {group.children.map((item) => <Button key={item.href} asChild variant="ghost" className={`section-menu-link ${item.href === href ? "is-current" : ""}`}>
        <a href={item.href} aria-current={item.href === href ? "page" : undefined}>{item.label}<ArrowRight aria-hidden="true" /></a>
      </Button>)}
    </nav>
  </aside>;
}
import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ExternalLink, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navGroups } from "@/lib/seedco-content";
import logo from "@/assets/seedco-logo.svg";
import logoWhite from "@/assets/seedco-logo-white.svg";

const onlineShop = "https://www.seedcoonlineshop.com/zm/";

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="Seed Co Zambia home">
      <img src={inverted ? logoWhite : logo} alt="Seed Co Logo" width={72} height={72} className="h-16 w-16 object-contain" />
    </Link>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={overlay ? "site-header site-header-overlay" : "site-header"}>
      <div className={`hidden lg:block ${overlay ? "header-utility-overlay" : "bg-primary text-primary-foreground"}`}>
        <div className="mx-auto flex h-8 max-w-screen-2xl items-center justify-end gap-6 px-6 font-condensed text-xs font-semibold uppercase tracking-[0.12em]">
          <a href="https://seedcogroup.com/" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">Seed Co Group</a>
          <span className="inline-flex items-center gap-2"><span className="flag-zm" /> Zambia</span>
        </div>
      </div>
      <div className="mx-auto grid h-24 max-w-screen-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:flex lg:justify-between">
        <Brand inverted={overlay} />
        <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Main navigation">
          {navGroups.map((group) => (
            <div className="nav-group flex items-center" key={group.label}>
               <Button variant="ghost" className={`h-full rounded-none px-3 font-condensed text-[15px] font-semibold ${overlay ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent" : "text-foreground hover:text-primary"}`}>
                {group.label}<ChevronDown className="size-3" />
               </Button>
              <div className="nav-panel">
                <p className="mb-3 font-condensed text-xs font-bold uppercase tracking-[0.16em] text-accent">Explore {group.label}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  {group.children.map((item) => <a key={item.href} href={item.href} className="rounded px-2 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted hover:text-primary">{item.label}</a>)}
                </div>
              </div>
            </div>
          ))}
          <a href="/contact-us" className={`flex items-center px-3 font-condensed text-[15px] font-semibold transition-colors ${overlay ? "text-primary-foreground hover:text-accent" : "text-foreground hover:text-primary"}`}>Contact Us</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="ghost" size="icon" className={`hidden sm:inline-flex ${overlay ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" : ""}`} aria-label="Search"><a href="/products"><Search /></a></Button>
          <Button asChild className={`hidden sm:inline-flex ${overlay ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : ""}`}><a href={onlineShop} target="_blank" rel="noreferrer"><ShoppingBag />Buy seeds</a></Button>
          <Button variant="ghost" size="icon" className={`lg:hidden ${overlay ? "border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-background px-4 py-4 lg:hidden">
          {navGroups.map((group) => <details key={group.label} className="border-b border-border py-1"><summary className="cursor-pointer py-3 font-condensed text-lg font-semibold">{group.label}</summary><div className="grid gap-1 pb-3">{group.children.map((item)=><a key={item.href} href={item.href} className="py-2 pl-3 text-sm text-muted-foreground">{item.label}</a>)}</div></details>)}
          <a href="/contact-us" className="block py-4 font-condensed text-lg font-semibold">Contact Us</a>
          <Button asChild className="mt-2 w-full"><a href={onlineShop} target="_blank" rel="noreferrer"><ShoppingBag />Buy seeds online</a></Button>
        </div>
      )}
    </header>
  );
}

const socials = [
  ["Facebook", "https://www.facebook.com/seedcozambia"], ["Twitter", "https://twitter.com/SeedCoZambia"],
  ["YouTube", "https://www.youtube.com/channel/UCrlVuj5uYRjTRXJWSmkozjQ"], ["LinkedIn", "https://www.linkedin.com/company/seedco-zambia-international-zambia-limited/"],
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto max-w-screen-2xl px-6 pb-8 pt-20">
        <div className="grid gap-10 border-b border-primary-foreground/15 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div><Brand inverted /><h3 className="footer-title mt-6">Find us on:</h3>{socials.map(([n, h]) => <a key={n} className="footer-link" href={h} target="_blank" rel="noreferrer">{n} <ExternalLink className="inline size-3" /></a>)}</div>
          <div><h3 className="footer-title">Quick Links</h3><a className="footer-link" href={onlineShop} target="_blank" rel="noreferrer">Buy Seeds Online</a><a className="footer-link" href="/farming-regions">Learn With Seed Co</a><a className="footer-link" href="/news">News</a><a className="footer-link" href="/contact-us">Contact Us</a></div>
          <div><h3 className="footer-title">Innovations</h3><a className="footer-link" href="/service-innovations">Service Innovations</a><a className="footer-link" href="/product-innovations">Product Innovations</a></div>
          <div><h3 className="footer-title">Become part of our mailing list</h3><a href="mailto:Zambia.seedco@seedcogroup.com" className="mt-2 inline-flex items-center gap-2 font-condensed font-semibold text-accent">Zambia.seedco@seedcogroup.com <ArrowRight className="size-4" /></a></div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between"><p>Copyright © 2026 Seed Co Zambia. All Rights Reserved.</p><a href="/privacy-policy" className="hover:text-primary-foreground">Privacy policy</a></div>
      </div>
    </footer>
  );
}

export function PageShell({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  return <div className="flex min-h-screen flex-col bg-background"><SiteHeader overlay={overlayHeader} /><main className="flex-1">{children}</main><SiteFooter /></div>;
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5"><div className="min-w-0"><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">{title}</h2></div>{action}</div>;
}

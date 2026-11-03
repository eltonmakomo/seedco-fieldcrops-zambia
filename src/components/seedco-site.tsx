import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Facebook, Linkedin, Mail, Menu, ShoppingBag, Twitter, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navGroups } from "@/lib/seedco-content";
import logo from "@/assets/seedco-logo.svg";
import logoWhite from "@/assets/seedco-logo-white.svg";
import { CountrySelector } from "@/components/country-selector";
import { SiteSearch } from "@/components/site-search";

const onlineShop = "https://www.seedcoonlineshop.com/zm/";

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Seed Co Zambia Field Crops home">
      <img src={inverted ? logoWhite : logo} alt="Seed Co Logo" width={80} height={80} className="h-20 w-20 object-contain" />
      <span className={`flex flex-col border-l pl-3 ${inverted ? "border-primary-foreground/30" : "border-border"}`}>
        <span className={`whitespace-nowrap font-display text-base font-bold uppercase leading-tight sm:text-lg ${inverted ? "text-primary-foreground" : "text-foreground"}`}>Field Crops</span>
        <span className={`mt-1 font-display text-xs font-bold uppercase leading-tight ${inverted ? "text-primary-foreground" : "text-primary"}`}>Zambia</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={overlay ? "site-header site-header-overlay" : "site-header"}>
      <div className={overlay ? "header-utility-overlay" : "bg-primary text-primary-foreground"}>
        <div className="mx-auto flex h-8 max-w-screen-2xl items-center justify-end gap-6 px-6 font-condensed text-xs font-semibold uppercase tracking-[0.12em]">
          <CountrySelector />
        </div>
      </div>
      <div className="mx-auto grid h-24 max-w-screen-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:flex lg:justify-between">
        <Brand inverted={overlay} />
        <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Main navigation">
          {navGroups.map((group) => (
            <div className="nav-group flex items-center" key={group.label}>
               <Button variant="ghost" className={`h-full rounded-none bg-transparent px-3 font-condensed text-[15px] font-semibold hover:bg-transparent ${overlay ? "text-primary-foreground hover:text-accent" : "text-foreground hover:text-brand-red"}`}>
                {group.label}<ChevronDown className="size-3" />
               </Button>
              <div className="nav-panel">
                <p className="mb-3 font-condensed text-xs font-bold uppercase tracking-[0.16em] text-accent">Explore {group.label}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  {group.children.map((item) => <a key={item.href} href={item.href} className="dropdown-link">{item.label}<ArrowRight /></a>)}
                </div>
              </div>
            </div>
          ))}
          <a href="/contact-us" className={`flex items-center px-3 font-condensed text-[15px] font-semibold transition-colors ${overlay ? "text-primary-foreground hover:text-accent" : "text-foreground hover:text-brand-red"}`}>Contact Us</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <SiteSearch overlay={overlay} />
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
  { name: "Facebook", href: "https://www.facebook.com/seedcozambia", Icon: Facebook },
  { name: "Twitter", href: "https://twitter.com/SeedCoZambia", Icon: Twitter },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCrlVuj5uYRjTRXJWSmkozjQ", Icon: Youtube },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/seedco-zambia-international-zambia-limited/", Icon: Linkedin },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-screen-2xl px-6">
        <div className="footer-layout">
          <div className="footer-brand"><Brand /><h3 className="footer-title">Find us on:</h3><div className="footer-socials">{socials.map(({ name, href, Icon }) => <Button asChild variant="outline" size="icon" className="footer-social" key={name}><a href={href} target="_blank" rel="noreferrer" aria-label={name} title={name}><Icon aria-hidden="true" /></a></Button>)}</div></div>
          <div><h3 className="footer-title">Quick Links</h3><a className="footer-link" href={onlineShop} target="_blank" rel="noreferrer">Buy Seeds Online</a><a className="footer-link" href="/learn-with-seed-co">Learn With Seed Co</a><a className="footer-link" href="/news">News</a><a className="footer-link" href="/contact-us">Contact Us</a></div>
          <div><h3 className="footer-title">Innovations</h3><a className="footer-link" href="/service-innovations">Service Innovations</a><a className="footer-link" href="/product-innovations">Product Innovations</a></div>
          <div className="footer-contact"><Mail aria-hidden="true" className="footer-mail-icon" /><h3 className="footer-title">Become part of our mailing list</h3><a href="mailto:Zambia.seedco@seedcogroup.com" className="footer-email"><span>Zambia.seedco@seedcogroup.com</span><ArrowRight aria-hidden="true" /></a></div>
        </div>
      </div>
      <div className="footer-bottom"><div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-6 py-5 text-xs sm:flex-row sm:items-center sm:justify-between"><p>Copyright © 2026 Seed Co Zambia. All Rights Reserved.</p><a href="/privacy-policy">Privacy policy</a></div></div>
    </footer>
  );
}

export function PageShell({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  return <div className="flex min-h-screen flex-col bg-background"><SiteHeader overlay={overlayHeader} /><main className="flex-1">{children}</main><SiteFooter /></div>;
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5"><div className="min-w-0"><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">{title}</h2></div>{action}</div>;
}

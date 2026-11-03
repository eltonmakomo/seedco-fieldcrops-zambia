import { ArrowUpRight, Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { countrySites } from "@/lib/country-sites";

export function CountrySelector() {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="country-trigger" aria-label="Change country, current country Zambia">
        <span className="flag-zm" aria-hidden="true" />Zambia<ChevronDown aria-hidden="true" className="size-3" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sideOffset={0} className="country-menu">
      {countrySites.map((site) => <div key={site.name}>
        <DropdownMenuItem asChild className="country-menu-item">
          <a href={site.href} aria-current={"current" in site ? "location" : undefined}>
            {"group" in site ? <Globe aria-hidden="true" /> : null}
            <span>{site.name}</span>
            {"current" in site ? <Check className="ml-auto text-primary" aria-label="Current country" /> : <ArrowUpRight className="ml-auto text-brand-red" aria-hidden="true" />}
          </a>
        </DropdownMenuItem>
        {"group" in site && <DropdownMenuSeparator />}
      </div>)}
    </DropdownMenuContent>
  </DropdownMenu>;
}
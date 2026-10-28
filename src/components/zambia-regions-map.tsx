import { useState, type MouseEvent, type KeyboardEvent } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapSvg from "@/assets/zambia-regions.svg?raw";

const regions = [
  { name: "Zone 1", href: "/sc-farmers-hub/maize" },
  { name: "Zone 2a", href: "/sc-farmers-hub/region-2a" },
  { name: "Zone 2b", href: "/sc-farmers-hub/zone-2b" },
  { name: "Zone 3", href: "/sc-farmers-hub/maize-2" },
];

/**
 * Interactive Zambia farming-regions map, recreated from the live Field Crops
 * site. The SVG keeps its own hover styles and clickable zones; each zone links
 * to the matching variety page on this site.
 */
export function ZambiaRegionsMap() {
  const [selected, setSelected] = useState(regions[0]);
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? selected?.href;
  const svg = regions.reduce((markup, region) => markup.replace(
    `<a href="${region.href}">`,
    `<a href="${region.href}" role="button" tabindex="0" aria-label="Select ${region.name}" aria-pressed="${selected?.href === region.href}" data-active="${highlighted === region.href}">`,
  ), mapSvg.replace("viewbox=", "viewBox="));
  function mapRegion(target: EventTarget | null) {
    if (!(target instanceof Element)) return undefined;
    const href = target.closest("a")?.getAttribute("href");
    return regions.find((region) => region.href === href);
  }
  function selectMapRegion(event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) {
    const region = mapRegion(event.target);
    if (!region) return;
    event.preventDefault();
    setSelected(region);
    setHovered(null);
  }
  return (
    <figure className="zambia-regions-map" aria-label="Zambia maize farming regions map and region list">
      <div className="regions-map-canvas" onClick={selectMapRegion}
        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") selectMapRegion(event); }}
        onMouseOver={(event) => setHovered(mapRegion(event.target)?.href ?? null)}
        onMouseLeave={() => setHovered(null)}
        dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption className="regions-map-list">
        <p className="eyebrow">Zambia</p>
        <h2 className="regions-map-title">Maize Farming Regions</h2>
        <div className="regions-map-options" aria-label="Farming regions">
          {regions.map((region, index) => <Button key={region.href} variant="ghost"
            className={`regions-map-option ${highlighted === region.href ? "is-active" : ""}`}
            aria-pressed={selected?.href === region.href}
            onClick={() => { setSelected(region); setHovered(null); }}
            onMouseEnter={() => setHovered(region.href)} onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(region.href)} onBlur={() => setHovered(null)}>
            <span className="regions-map-number">0{index + 1}</span><span>{region.name}</span><MapPin aria-hidden="true" />
          </Button>)}
        </div>
        {selected && <Button asChild className="regions-map-link"><a href={selected.href}>{selected.name} : Maize <ArrowRight aria-hidden="true" /></a></Button>}
      </figcaption>
    </figure>
  );
}

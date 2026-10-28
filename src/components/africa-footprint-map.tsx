import { useState, type MouseEvent } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import africaSvg from "@/assets/africa-footprint.svg?raw";

const countries = [
  { name: "Zambia", code: "ZM" }, { name: "South Africa", code: "ZA" }, { name: "Tanzania", code: "TZ" },
  { name: "Nigeria", code: "NG" }, { name: "Botswana", code: "BW" }, { name: "Rwanda", code: "RW" },
  { name: "Malawi", code: "MW" }, { name: "Congo", code: "CD" }, { name: "Mozambique", code: "MZ" },
  { name: "Kenya", code: "KE" }, { name: "Ghana", code: "GH" }, { name: "Zimbabwe", code: "ZW" },
];

/**
 * Interactive "Our proud African footprint" map for the Our Story page. The
 * country list comes verbatim from the live Field Crops site; selecting a
 * country in the list or on the map highlights it in both places.
 */
export function AfricaFootprintMap() {
  const [selected, setSelected] = useState(countries[0].name);
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? selected;
  const svg = countries.reduce((markup, c) => markup.replace(
    `<path id="${c.code}"`,
    `<path id="${c.code}" class="fp" data-country="${c.name}" data-active="${highlighted === c.name}"`,
  ), africaSvg);
  function mapCountry(target: EventTarget | null) {
    if (!(target instanceof Element)) return null;
    return target.closest("[data-country]")?.getAttribute("data-country") ?? null;
  }
  function selectCountry(event: MouseEvent<HTMLDivElement>) {
    const name = mapCountry(event.target);
    if (!name) return;
    setSelected(name);
    setHovered(null);
  }
  return (
    <figure className="africa-footprint-map" aria-label="Map of the African countries where Seed Co operates">
      <div className="regions-map-canvas" onClick={selectCountry}
        onMouseOver={(event) => setHovered(mapCountry(event.target))}
        onMouseLeave={() => setHovered(null)}
        dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption className="regions-map-list">
        <p className="eyebrow">Seed Co Group</p>
        <h2 className="regions-map-title">Our African Footprint</h2>
        <div className="regions-map-options" aria-label="Countries">
          {countries.map((c, index) => <Button key={c.code} variant="ghost"
            className={`regions-map-option ${highlighted === c.name ? "is-active" : ""}`}
            aria-pressed={selected === c.name}
            onClick={() => { setSelected(c.name); setHovered(null); }}
            onMouseEnter={() => setHovered(c.name)} onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(c.name)} onBlur={() => setHovered(null)}>
            <span className="regions-map-number">0{index + 1}</span><span>{c.name}</span><MapPin aria-hidden="true" />
          </Button>)}
        </div>
      </figcaption>
    </figure>
  );
}

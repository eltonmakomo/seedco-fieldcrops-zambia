import mapSvg from "@/assets/zambia-regions.svg?raw";

/**
 * Interactive Zambia farming-regions map, recreated from the live Field Crops
 * site. The SVG keeps its own hover styles and clickable zones; each zone links
 * to the matching variety page on this site.
 */
export function ZambiaRegionsMap() {
  return (
    <figure className="zambia-regions-map" aria-label="Zambia maize farming regions map">
      <div dangerouslySetInnerHTML={{ __html: mapSvg }} />
    </figure>
  );
}

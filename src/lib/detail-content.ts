import liveContent from "@/lib/live-content.json";
import type { LiveBlock, LivePageData } from "@/components/live-page";

const pages = liveContent as unknown as Record<string, LivePageData>;
const normalized = (text: string) => text.toLowerCase().replace(/\b(mr|mrs|ms|dr)\.?\s*/g, "").replace(/[^a-z0-9]/g, "");
const detailParents: Array<[RegExp, string]> = [
  [/^directors\//, "about-us/board-of-directors"],
  [/^management\//, "about-us/management-team"],
  [/^sales_team\//, "about-us/sales-team"],
  [/^research_team\//, "about-us/research-team"],
  [/^agronomists\//, "agronomists"],
  [/^events\//, "media/events-calendar"],
  [/^videos\//, "media/video-gallery"],
  [/^testimonials\//, "testimonial"],
  [/^(learn-with-seedco|discussion)\//, "learn-with-seed-co"],
  [/^sc-farmers-hub\//, "farming-regions"],
  [/^(climate-fast-varieties|disease-tolerance|hybridization|yield-thrust)$/, "product-innovations"],
];

export function detailParent(path: string) {
  return detailParents.find(([pattern]) => pattern.test(path))?.[1];
}

/** Empty WordPress custom-post records reuse only facts already present in their source listing. */
export function detailContent(page: LivePageData, path: string): LivePageData {
  if (page.blocks.length) return page;
  const parent = detailParent(path);
  if (!parent) return page;
  const sourcePages = Object.entries(pages).filter(([key]) => key === parent || key.startsWith(`${parent}/page/`));
  for (const [, source] of sourcePages) {
    for (const block of source.blocks) {
      if (block.t !== "table") continue;
      const row = block.rows.find((entry) => normalized(entry[0] ?? "") === normalized(page.title));
      if (row) return { ...page, blocks: [{ t: "table", headers: block.headers, rows: [row] }] };
    }
    const index = source.blocks.findIndex((block) => "text" in block && normalized(block.text) === normalized(page.title));
    if (index < 0) continue;
    const blocks: LiveBlock[] = [];
    const image = source.blocks[index - 1];
    if (image?.t === "img" || image?.t === "video") blocks.push(image);
    for (let next = index + 1; next < source.blocks.length; next++) {
      const block = source.blocks[next];
      if (!block || block.t === "img" || block.t === "video" || /^h[1-5]$/.test(block.t)) break;
      if (block.t === "link" && !/^(mailto|tel):/.test(block.href)) break;
      blocks.push(block);
    }
    if (blocks.length) return { ...page, blocks };
  }
  return page;
}

export function isGenericDetail(path: string, page: LivePageData) {
  if (["contact-us", "innovations", "product-innovations", "calculators"].includes(path)) return false;
  if (detailParent(path)) return true;
  if (!page.blocks.length) return true;
  // Repeated destination cards, directories, and paginated sections remain listings.
  if (/^(?:category|product_category|maize_subcategory|yellow_maize_subcategory)\//.test(path) || /\/page\/\d+$/.test(path)) return false;
  if (page.blocks.some((block) => block.t === "table")) return false;
  if (page.blocks.filter((block) => block.t === "link" && /^read more$/i.test(block.text)).length > 1) return false;
  if (/^(about-us(?:\/|$)|products$|media$|media\/|learn-with-seed-co$|testimonial$|promotions$|farming-regions$|service-innovations$|agronomists$)/.test(path)) return false;
  return true;
}
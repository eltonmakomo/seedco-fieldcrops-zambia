import liveContent from "@/lib/live-content.json";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const entries = Object.entries(liveContent).map(([path, page]) => {
  const text = page.blocks.map((block) => "text" in block ? block.text : "rows" in block ? block.rows.flat().join(" ") : "").join(" ");
  return { path, title: page.title, text, searchable: normalize(`${page.title} ${text}`) };
});

export function searchSite(query: string) {
  const words = normalize(query).split(" ").filter(Boolean);
  if (!words.length) return [];
  return entries.filter((entry) => words.every((word) => entry.searchable.includes(word)))
    .sort((a, b) => {
      const score = (title: string) => words.reduce((total, word) => total + (normalize(title).includes(word) ? 1 : 0), 0);
      return score(b.title) - score(a.title) || a.title.localeCompare(b.title);
    }).map(({ path, title, text }) => ({ href: path ? `/${path}` : "/", title, excerpt: text.slice(0, 160) }));
}
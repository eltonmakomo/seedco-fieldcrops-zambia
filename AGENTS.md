<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Inner pages render verbatim live-site content from `src/lib/live-content.json` (scraped blocks keyed by path) via `src/components/live-page.tsx`; unknown paths 404. Why: the site must mirror the live Field Crops content exactly; swap the JSON to adapt to another country.
- Inner-page sibling navigation is derived from shared navGroups and sticks below the header; use a horizontal strip on smaller screens. Why: country navigation remains reusable without duplicating links.
- The farming-regions map and side list share one selection state and reuse the live site's SVG boundaries and zone destinations. Why: geographic highlighting must match the existing region information without inventing data.
- The Our Story "proud African footprint" country list renders as the interactive Africa map (`src/components/africa-footprint-map.tsx`) instead of a plain list; map and list share one selection state and no country is invented. Why: the map highlights exactly the countries the live page names.
- Identify team portraits through the team-page context and shared photo mapping; crop extended portraits in their media frame without modifying source images. Why: consistent team framing leaves other page photography unchanged and remains reversible.
- Render company statement and value cards by grouping their original live-content blocks, never duplicating their copy. Why: the presentation stays reusable and preserves the source content.

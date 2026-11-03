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
- Inner pages render verbatim live-site content from `src/lib/live-content.json` (scraped blocks keyed by path, including table headers and rows) via `src/components/live-page.tsx`; unknown paths 404. Why: the site must mirror the live Field Crops content exactly without losing tabular directories; swap the JSON to adapt to another country.
- Inner-page sibling navigation is derived from shared navGroups and sticks below the header; use a horizontal strip on smaller screens. Why: country navigation remains reusable without duplicating links.
- The farming-regions map and side list share one selection state and reuse the live site's SVG boundaries and zone destinations. Why: geographic highlighting must match the existing region information without inventing data.
- The Our Story "proud African footprint" country list renders as the interactive Africa map (`src/components/africa-footprint-map.tsx`) instead of a plain list; map and list share one selection state and no country is invented. Why: the map highlights exactly the countries the live page names.
- Identify team portraits through the team-page context and shared photo mapping; crop extended portraits in their media frame without modifying source images. Why: consistent team framing leaves other page photography unchanged and remains reversible.
- Render company statement and value cards by grouping their original live-content blocks, never duplicating their copy. Why: the presentation stays reusable and preserves the source content.
- Render all actual videos with the shared VideoPreview and grouped-video grid; leave map embeds unchanged. Why: consistent previews and accessible dialog playback stay reusable without mistaking maps for videos.
- Keep official country destinations in a shared data module and render the top-bar selector with the accessible dropdown primitive. Why: the country template reuses verified destinations and keyboard navigation.
- Normalize scraped sibling-site, document and careers-pagination destinations through the shared live-link resolver. Why: source-relative links must not become nonexistent local pages.
- Group FAQ headings and their original answer blocks into accessible expandable items, with support contacts rendered separately. Why: questions stay scannable without duplicating or rewriting live-site answers.
- Public contact enquiries use shared validation and an insert-only server function into a service-role-only table; visitors cannot read submissions. Why: enquiries are durably stored without exposing customer details.
- The contact page groups original live address, phone and email blocks beside the shared enquiry form and preserves the original map below. Why: contact details remain source-driven while the presentation can evolve independently of submission logic.
- Photo Gallery renders original gallery blocks in a three-column grid with accessible enlargement dialogs and CDN-backed photos. Why: live content remains reusable and photographs can be inspected without leaving the page.

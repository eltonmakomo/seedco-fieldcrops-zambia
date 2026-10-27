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

import { Bean, FlaskConical, Sprout, Wheat } from "lucide-react";
import type { LivePageData } from "@/components/live-page";

const cropIcons = [Sprout, Wheat, Bean];

/**
 * The live Innovations page is a flat "label + paragraph" list
 * (Overview, Maize, Wheat, Soya). This renders the same copy as a
 * designed intro panel plus crop research cards — no text is invented.
 */
export function InnovationsContent({ page }: { page: LivePageData }) {
  const pairs: { title: string; text: string }[] = [];
  for (let i = 0; i < page.blocks.length - 1; i++) {
    const a = page.blocks[i];
    const b = page.blocks[i + 1];
    if (a?.t === "p" && b?.t === "p" && a.text.length < 40 && b.text.length >= 40) {
      pairs.push({ title: a.text, text: b.text });
      i++;
    }
  }
  const overview = pairs.find((p) => p.title.toLowerCase() === "overview");
  const crops = pairs.filter((p) => p !== overview);

  return (
    <div className="innov">
      {overview && (
        <section className="innov-overview">
          <div className="innov-overview-icon"><FlaskConical aria-hidden="true" /></div>
          <div className="innov-overview-copy">
            <p className="eyebrow">{overview.title}</p>
            <p className="innov-overview-text">{overview.text}</p>
          </div>
        </section>
      )}
      <div className="innov-grid">
        {crops.map((crop, index) => {
          const Icon = cropIcons[index % cropIcons.length] ?? Sprout;
          return (
            <article className="innov-card" key={crop.title}>
              <span className="innov-card-index" aria-hidden="true">0{index + 1}</span>
              <span className="innov-card-icon"><Icon aria-hidden="true" /></span>
              <h3>{crop.title}</h3>
              <p>{crop.text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

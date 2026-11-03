import { Calculator, Clock } from "lucide-react";
import type { LiveBlock, LivePageData } from "@/components/live-page";

const txt = (b: LiveBlock) => ("text" in b ? String(b.text ?? "") : "");

/** Calculators page: live copy shown as an intro panel, numbered steps and a coming-soon card. */
export function CalculatorsContent({ page }: { page: LivePageData }) {
  const b = page.blocks;
  const label = b.find((x) => x.t === "h5");
  const intro = b.find((x) => x.t === "p");
  const steps = b.filter((x) => x.t === "li").map(txt);
  const soon = b.find((x) => x.t === "h2");
  return (
    <div className="calc">
      <section className="calc-intro">
        <span className="calc-icon"><Calculator aria-hidden="true" /></span>
        <div className="min-w-0">
          {label && <p className="eyebrow">{txt(label)}</p>}
          {intro && <p className="calc-intro-text">{txt(intro)}</p>}
        </div>
      </section>
      <ol className="calc-steps">
        {steps.map((s, i) => (
          <li key={i} className="calc-step">
            <span className="calc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p>{s}</p>
          </li>
        ))}
      </ol>
      {soon && (
        <section className="calc-soon">
          <Clock aria-hidden="true" />
          <h2>{txt(soon)}</h2>
        </section>
      )}
    </div>
  );
}

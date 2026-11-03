import { useState } from "react";
import { Calculator, Clock, Sprout, Wheat } from "lucide-react";
import { populationDensity, yieldForecast } from "@/lib/calculators";
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
      <div className="calc-tools">
        <YieldTool />
        <DensityTool />
      </div>
      {soon && (
        <section className="calc-soon">
          <Clock aria-hidden="true" />
          <h2>{txt(soon)}</h2>
        </section>
      )}
    </div>
  );
}

function Field({ label, hint, value, onChange }: { label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="calc-field">
      <span className="calc-label">{label}</span>
      <input type="number" inputMode="decimal" min="0" step="any" value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="calc-hint">{hint}</span>}
    </label>
  );
}

function YieldTool() {
  const [mass, setMass] = useState("");
  const [moist, setMoist] = useState("");
  const r = yieldForecast(Number(mass), Number(moist));
  return (
    <section className="calc-tool">
      <header className="calc-tool-head"><span className="calc-icon"><Wheat aria-hidden="true" /></span><h3>Yield Forecasting Calculator</h3></header>
      <p className="calc-note">NB* Enter correct value for Mass Grain and Moisture Content to see result</p>
      <Field label="Shelled Grain Weight/Mass (T/ha.)*" value={mass} onChange={setMass} />
      <Field label="Moisture Content" hint="percentage should be in decimals(e.g 0.20)" value={moist} onChange={setMoist} />
      <div className="calc-result" aria-live="polite">
        <span className="calc-label">Yield Forecast</span>
        <strong>{r.toFixed(2)} T/ha</strong>
        <span className="calc-hint">in tons per hectare, with moisture corrected to 12.5%</span>
      </div>
    </section>
  );
}

function DensityTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const r = populationDensity(Number(a), Number(b));
  return (
    <section className="calc-tool">
      <header className="calc-tool-head"><span className="calc-icon"><Sprout aria-hidden="true" /></span><h3>Population Density Calculator</h3></header>
      <p className="calc-note">Enter the values for the interrow and inrow spacings to get the population density per Ha</p>
      <Field label="Interrow Spacing (m)*" value={a} onChange={setA} />
      <Field label="Inrow Spacing (m)*" value={b} onChange={setB} />
      <div className="calc-result" aria-live="polite">
        <span className="calc-label">Population Density</span>
        <strong>{r ? Math.round(r).toLocaleString("en-US") : "0"} plants/Ha</strong>
      </div>
    </section>
  );
}

/** Yield (t/ha) corrected to 12.5% moisture; moisture given as a decimal (e.g. 0.20). */
export function yieldForecast(mass: number, moisture: number): number {
  if (!(mass > 0) || !(moisture >= 0) || moisture >= 1) return 0;
  return (mass * (1 - moisture)) / (1 - 0.125);
}

/** Plants per hectare from interrow and inrow spacing in metres. */
export function populationDensity(interrow: number, inrow: number): number {
  if (!(interrow > 0) || !(inrow > 0)) return 0;
  return 10000 / (interrow * inrow);
}

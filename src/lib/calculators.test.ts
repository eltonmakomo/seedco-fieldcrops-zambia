import { test } from "node:test";
import assert from "node:assert";
import { populationDensity, yieldForecast } from "./calculators";

test("yield is corrected to 12.5% moisture", () => {
  assert.strictEqual(yieldForecast(10, 0.125), 10);
  assert.ok(Math.abs(yieldForecast(10, 0.2) - 9.142857) < 1e-5);
});

test("invalid yield input gives 0", () => {
  assert.strictEqual(yieldForecast(0, 0.2), 0);
  assert.strictEqual(yieldForecast(10, 1), 0);
});

test("population density is 10,000 m² over spacing area", () => {
  assert.strictEqual(populationDensity(0.9, 0.25), 44444.444444444445);
  assert.strictEqual(populationDensity(0, 0.25), 0);
});

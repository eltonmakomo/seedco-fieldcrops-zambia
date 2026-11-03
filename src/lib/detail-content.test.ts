import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { detailContent, isGenericDetail } from "./detail-content";

describe("source-derived detail content", () => {
  test("profiles reuse the exact original role", () => {
    const result = detailContent({ title: "Fred Banda", blocks: [] }, "directors/fred-banda");
    assert.deepEqual(result.blocks.find((block) => block.t === "p"), { t: "p", text: "Non-Executive Director & Audit Committee Chairman" });
  });
  test("event dates come from the original calendar", () => {
    const result = detailContent({ title: "Agritech Expo", blocks: [] }, "events/agritech-expo");
    assert.deepEqual(result.blocks, [{ t: "table", headers: ["Name of Event", "Date", "Location", "Activities"], rows: [["Agritech Expo", "20th – 22nd April", "GART Chisamba", "Expo"]] }]);
  });
  test("unmatched records receive no invented details", () => {
    assert.deepEqual(detailContent({ title: "Unknown person", blocks: [] }, "directors/unknown-person").blocks, []);
  });
  test("contact keeps its dedicated presentation", () => {
    assert.equal(isGenericDetail("contact-us", { title: "Contact Us", blocks: [] }), false);
  });
});
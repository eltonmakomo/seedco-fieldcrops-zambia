import { describe, expect, test } from "bun:test";
import { detailContent, isGenericDetail } from "./detail-content";

describe("source-derived detail content", () => {
  test("profiles reuse the exact original role", () => {
    const result = detailContent({ title: "Fred Banda", blocks: [] }, "directors/fred-banda");
    expect(result.blocks).toContainEqual({ t: "p", text: "Non-Executive Director & Audit Committee Chairman" });
  });
  test("event dates come from the original calendar", () => {
    const result = detailContent({ title: "Agritech Expo", blocks: [] }, "events/agritech-expo");
    expect(result.blocks).toContainEqual({ t: "table", headers: ["Name of Event", "Date", "Location", "Activities"], rows: [["Agritech Expo", "20th – 22nd April", "GART Chisamba", "Expo"]] });
  });
  test("unmatched records receive no invented details", () => {
    expect(detailContent({ title: "Unknown person", blocks: [] }, "directors/unknown-person").blocks).toEqual([]);
  });
  test("contact keeps its dedicated presentation", () => {
    expect(isGenericDetail("contact-us", { title: "Contact Us", blocks: [] })).toBe(false);
  });
});
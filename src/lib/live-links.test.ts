import { describe, expect, test } from "bun:test";
import { resolveLiveHref } from "./live-links";

describe("live-site destinations", () => {
  test("download documents stay on the official site", () => {
    expect(resolveLiveHref("/zm/fieldcrops/wp-content/uploads/2021/10/THEINF_1.pdf")).toBe("https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2021/10/THEINF_1.pdf");
  });
  test("vegetables opens the official sister site", () => {
    expect(resolveLiveHref("/zm/vegetables")).toBe("https://seedcogroup.com/zm/vegetables");
  });
  test("careers pagination uses the existing content page", () => {
    expect(resolveLiveHref("/careers/page/2")).toBe("/about-us/careers/page/2");
  });
});
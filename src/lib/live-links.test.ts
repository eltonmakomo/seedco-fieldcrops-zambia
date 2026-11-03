import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { resolveLiveHref } from "./live-links";

describe("live-site destinations", () => {
  test("download documents stay on the official site", () => {
    assert.equal(resolveLiveHref("/zm/fieldcrops/wp-content/uploads/2021/10/THEINF_1.pdf"), "https://seedcogroup.com/zm/fieldcrops/wp-content/uploads/2021/10/THEINF_1.pdf");
  });
  test("vegetables opens the official sister site", () => {
    assert.equal(resolveLiveHref("/zm/vegetables"), "https://seedcogroup.com/zm/vegetables");
  });
  test("careers pagination uses the existing content page", () => {
    assert.equal(resolveLiveHref("/careers/page/2"), "/about-us/careers/page/2");
  });
});
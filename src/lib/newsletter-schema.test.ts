import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { newsletterSchema } from "./newsletter-schema";

describe("newsletter validation", () => {
  it("normalizes subscription emails", () => assert.equal(newsletterSchema.parse({ email: " Farmer@Example.com " }).email, "farmer@example.com"));
  it("rejects invalid emails", () => assert.equal(newsletterSchema.safeParse({ email: "invalid" }).success, false));
  it("rejects filled spam fields", () => assert.equal(newsletterSchema.safeParse({ email: "farmer@example.com", website: "spam" }).success, false));
});
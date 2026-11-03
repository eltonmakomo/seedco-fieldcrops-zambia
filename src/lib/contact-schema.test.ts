import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "./contact-schema";

const enquiry = { name: "Farmer", email: "farmer@example.com", phone: "+260 211 426 400", subject: "Seed enquiry", message: "Where can I buy seed?", website: "" };
describe("contact enquiry validation", () => {
  it("accepts complete enquiries", () => assert.equal(contactSchema.safeParse(enquiry).success, true));
  it("rejects invalid email addresses", () => assert.equal(contactSchema.safeParse({ ...enquiry, email: "not-an-email" }).success, false));
  it("rejects empty messages", () => assert.equal(contactSchema.safeParse({ ...enquiry, message: "   " }).success, false));
  it("rejects filled spam fields", () => assert.equal(contactSchema.safeParse({ ...enquiry, website: "spam" }).success, false));
});
import { describe, expect, it } from "bun:test";
import { contactSchema } from "./contact-schema";

const enquiry = { name: "Farmer", email: "farmer@example.com", phone: "+260 211 426 400", subject: "Seed enquiry", message: "Where can I buy seed?", website: "" };
describe("contact enquiry validation", () => {
  it("accepts complete enquiries", () => expect(contactSchema.safeParse(enquiry).success).toBe(true));
  it("rejects invalid email addresses", () => expect(contactSchema.safeParse({ ...enquiry, email: "not-an-email" }).success).toBe(false));
  it("rejects empty messages", () => expect(contactSchema.safeParse({ ...enquiry, message: "   " }).success).toBe(false));
  it("rejects filled spam fields", () => expect(contactSchema.safeParse({ ...enquiry, website: "spam" }).success).toBe(false));
});
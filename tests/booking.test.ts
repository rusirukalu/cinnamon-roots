import { describe, it, expect } from "vitest";
import {
  validateBookingForm,
  formatDisplayDate,
  generateEnquiryMessage,
  generateWhatsAppUrl,
} from "@/lib/booking";
import type { BookingFormData } from "@/lib/types";

describe("validateBookingForm", () => {
  const baseValidData: BookingFormData = {
    experience: "the-together",
    date: "2026-12-01",
    guests: "2",
    name: "John Doe",
    email: "john@example.com",
    notes: "No special requirements.",
  };

  it("should return no errors for valid booking data", () => {
    const errors = validateBookingForm(baseValidData, "2026-11-09");
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("should accept valid booking data with empty notes", () => {
    const data: BookingFormData = { ...baseValidData, notes: "" };
    const errors = validateBookingForm(data, "2026-11-09");
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("should accept flexible guest counts", () => {
    expect(
      Object.keys(validateBookingForm({ ...baseValidData, guests: "1" }, "2026-11-09"))
    ).toHaveLength(0);
    expect(
      Object.keys(validateBookingForm({ ...baseValidData, guests: "30" }, "2026-11-09"))
    ).toHaveLength(0);
  });

  it("should fail when experience is empty", () => {
    const errors = validateBookingForm({ ...baseValidData, experience: "" }, "2026-11-09");
    expect(errors.experience).toBe("Please select an experience package.");
  });

  it("should fail when date is malformed or invalid", () => {
    const errors = validateBookingForm({ ...baseValidData, date: "not-a-date" }, "2026-11-09");
    expect(errors.date).toBe("Please choose a valid preferred date.");
  });

  it("should fail when date is in the past relative to minDate", () => {
    const errors = validateBookingForm({ ...baseValidData, date: "2026-11-01" }, "2026-11-09");
    expect(errors.date).toBe("Please choose today or a future date in Sri Lanka.");
  });

  it("should fail when guest count is below 1", () => {
    const errorsUnder = validateBookingForm({ ...baseValidData, guests: "0" }, "2026-11-09");
    expect(errorsUnder.guests).toBe("Please enter at least 1 guest.");
  });

  it("should fail when name is shorter than 2 characters", () => {
    const errors = validateBookingForm({ ...baseValidData, name: " A " }, "2026-11-09");
    expect(errors.name).toBe("Please enter your name (at least 2 characters).");
  });

  it("should fail when email is invalid", () => {
    const errors = validateBookingForm({ ...baseValidData, email: "invalid-email" }, "2026-11-09");
    expect(errors.email).toBe("Please enter a valid email address.");
  });

  it("should fail when notes exceed 1200 characters", () => {
    const longNotes = "a".repeat(1201);
    const errors = validateBookingForm({ ...baseValidData, notes: longNotes }, "2026-11-09");
    expect(errors.notes).toBe("Please keep your message under 1,200 characters.");
  });
});

describe("formatDisplayDate", () => {
  it("should format valid ISO dates to British English format", () => {
    const formatted = formatDisplayDate("2026-11-20");
    expect(formatted).toBe("20 November 2026");
  });

  it("should fallback gracefully if an invalid date string is provided", () => {
    const formatted = formatDisplayDate("invalid-date");
    expect(formatted).toBe("invalid-date");
  });
});

describe("generateEnquiryMessage & WhatsApp Link", () => {
  it("should generate formatted enquiry with host and location reference", () => {
    const data: BookingFormData = {
      experience: "the-together",
      date: "2026-12-15",
      guests: "2",
      name: "Alice Smith",
      email: "alice@example.com",
      notes: "Cinnamon allergy in party",
    };

    const message = generateEnquiryMessage(data);
    expect(message).toContain("Hello Deshan & Ceylon Cinnamon Roots");
    expect(message).toContain("Package: The Together (For 2 guests · LKR 16,700 TOTAL)");
    expect(message).toContain("Preferred Date: 15 December 2026");
    expect(message).toContain("Guests: 2");
    expect(message).toContain("No. 53, Palassa, Thiththagalla, Ahangama, Galle");
    expect(message).toContain("Notes / Requests: Cinnamon allergy in party");

    const waUrl = generateWhatsAppUrl(data);
    expect(waUrl).toContain("https://wa.me/94751458653?text=");
  });

  it("should omit notes section when notes are empty", () => {
    const data: BookingFormData = {
      experience: "the-collective",
      date: "2026-12-15",
      guests: "10",
      name: "Bob Jones",
      email: "bob@example.com",
      notes: "   ",
    };

    const message = generateEnquiryMessage(data);
    expect(message).not.toContain("Notes / Requests:");
  });
});

import { describe, it, expect } from "vitest";
import {
  validateBookingForm,
  formatDisplayDate,
  generateEnquiryMessage,
} from "@/lib/booking";
import type { BookingFormData } from "@/lib/types";

describe("validateBookingForm", () => {
  const baseValidData: BookingFormData = {
    experience: "plantation-to-quill",
    date: "2026-12-01",
    guests: "4",
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

  it("should accept guest count boundary values 1 and 10", () => {
    expect(
      Object.keys(validateBookingForm({ ...baseValidData, guests: "1" }, "2026-11-09"))
    ).toHaveLength(0);
    expect(
      Object.keys(validateBookingForm({ ...baseValidData, guests: "10" }, "2026-11-09"))
    ).toHaveLength(0);
  });

  it("should fail when experience is empty", () => {
    const errors = validateBookingForm({ ...baseValidData, experience: "" }, "2026-11-09");
    expect(errors.experience).toBe("Please select the experience.");
  });

  it("should fail when date is malformed or invalid", () => {
    const errors = validateBookingForm({ ...baseValidData, date: "not-a-date" }, "2026-11-09");
    expect(errors.date).toBe("Please choose a valid preferred date.");
  });

  it("should fail when date is in the past relative to minDate", () => {
    const errors = validateBookingForm({ ...baseValidData, date: "2026-11-01" }, "2026-11-09");
    expect(errors.date).toBe("Please choose today or a future date in Sri Lanka.");
  });

  it("should fail when guest count is below 1 or above 10", () => {
    const errorsUnder = validateBookingForm({ ...baseValidData, guests: "0" }, "2026-11-09");
    expect(errorsUnder.guests).toBe("Please choose between 1 and 10 guests.");

    const errorsOver = validateBookingForm({ ...baseValidData, guests: "11" }, "2026-11-09");
    expect(errorsOver.guests).toBe("Please choose between 1 and 10 guests.");
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

describe("generateEnquiryMessage", () => {
  it("should generate formatted enquiry with notes", () => {
    const data: BookingFormData = {
      experience: "plantation-to-quill",
      date: "2026-12-15",
      guests: "3",
      name: "Alice Smith",
      email: "alice@example.com",
      notes: "Cinnamon allergy in party",
    };

    const message = generateEnquiryMessage(data);
    expect(message).toContain("Experience: Plantation to Quill (approximately 120 minutes)");
    expect(message).toContain("Preferred date: 15 December 2026 (Sri Lanka local date)");
    expect(message).toContain("Guests: 3");
    expect(message).toContain("Name: Alice Smith");
    expect(message).toContain("Email: alice@example.com");
    expect(message).toContain("Notes: Cinnamon allergy in party");
  });

  it("should omit notes section when notes are empty", () => {
    const data: BookingFormData = {
      experience: "plantation-to-quill",
      date: "2026-12-15",
      guests: "2",
      name: "Bob Jones",
      email: "bob@example.com",
      notes: "   ",
    };

    const message = generateEnquiryMessage(data);
    expect(message).not.toContain("Notes:");
  });
});

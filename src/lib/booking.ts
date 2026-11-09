import { PACKAGES, SITE_METADATA } from "./data";
import type { BookingFormData, BookingFormErrors } from "./types";

/**
 * Returns today's date formatted as YYYY-MM-DD in the Asia/Colombo timezone.
 */
export function getTodayInSriLanka(): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Colombo" }).format(new Date());
}

/**
 * Formats an ISO YYYY-MM-DD date into a readable string in British English ("15 November 2026").
 */
export function formatDisplayDate(dateString: string): string {
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Resolves a package title from its id.
 */
export function getPackageName(packageId: string): string {
  const found = PACKAGES.find((p) => p.id === packageId);
  return found ? `${found.name} (${found.guestLabel} · ${found.priceDisplay})` : packageId;
}

/**
 * Validates the booking enquiry form fields.
 * Returns an object with field-specific errors, or an empty object if valid.
 */
export function validateBookingForm(
  data: BookingFormData,
  minDate = getTodayInSriLanka()
): BookingFormErrors {
  const errors: BookingFormErrors = {};

  // Package validation
  if (!data.experience || data.experience.trim() === "") {
    errors.experience = "Please select an experience package.";
  }

  // Date validation (must be valid YYYY-MM-DD and on or after today in Sri Lanka)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(new Date(`${data.date}T12:00:00`).getTime())) {
    errors.date = "Please choose a valid preferred date.";
  } else if (data.date < minDate) {
    errors.date = "Please choose today or a future date in Sri Lanka.";
  }

  // Guest count validation (integer of at least 1)
  const guestCount = Number(data.guests);
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    errors.guests = "Please enter at least 1 guest.";
  }

  // Name validation (min 2 characters after trimming)
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  // Email validation (standard email pattern)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // Notes validation (max 1200 characters)
  if (data.notes && data.notes.length > 1200) {
    errors.notes = "Please keep your message under 1,200 characters.";
  }

  return errors;
}

/**
 * Constructs the text payload for the enquiry summary.
 */
export function generateEnquiryMessage(data: BookingFormData): string {
  const formattedDate = formatDisplayDate(data.date);
  const packageLabel = getPackageName(data.experience);
  const notesLine = data.notes.trim() ? `\nNotes / Requests: ${data.notes.trim()}` : "";

  return `Hello Deshan & Ceylon Cinnamon Roots,

I would like to enquire about visiting your plantation in Palassa, Thiththagalla, Ahangama.

Package: ${packageLabel}
Preferred Date: ${formattedDate} (Sri Lanka local date)
Guests: ${data.guests}
Name: ${data.name.trim()}
Email: ${data.email.trim()}${notesLine}

Location reference: No. 53, Palassa, Thiththagalla, Ahangama, Galle.
Please confirm availability and booking arrangements.

Thank you!`;
}

/**
 * Creates a direct WhatsApp deep link pre-filled with the booking message.
 */
export function generateWhatsAppUrl(data: BookingFormData): string {
  const message = generateEnquiryMessage(data);
  return `https://wa.me/94751458653?text=${encodeURIComponent(message)}`;
}

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingForm } from "@/components/BookingForm";

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

describe("BookingForm Component", () => {
  it("renders the booking form with initial elements", () => {
    render(<BookingForm />);

    expect(screen.getByText("Plan your visit")).toBeInTheDocument();
    expect(screen.getByLabelText(/Your experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Prepare booking enquiry/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", () => {
    render(<BookingForm />);

    const submitBtn = screen.getByRole("button", {
      name: /Prepare booking enquiry/i,
    });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText("Please select the experience.")
    ).toBeInTheDocument();
  });

  it("increments and decrements guest count using controls", () => {
    render(<BookingForm />);

    const guestInput = screen.getByLabelText(/Guests/i) as HTMLInputElement;
    expect(guestInput.value).toBe("2");

    const addBtn = screen.getByLabelText("Add one guest");
    fireEvent.click(addBtn);
    expect(guestInput.value).toBe("3");

    const removeBtn = screen.getByLabelText("Remove one guest");
    fireEvent.click(removeBtn);
    expect(guestInput.value).toBe("2");
  });

  it("generates an enquiry summary on valid submission", () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/Your experience/i), {
      target: { value: "plantation-to-quill" },
    });
    fireEvent.change(screen.getByLabelText(/Preferred date/i), {
      target: { value: "2099-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/Your name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "jane@example.com" },
    });

    const submitBtn = screen.getByRole("button", {
      name: /Prepare booking enquiry/i,
    });
    fireEvent.click(submitBtn);

    expect(screen.getByText("Ready to share · Not yet sent")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Copy enquiry/i })
    ).toBeInTheDocument();
  });
});

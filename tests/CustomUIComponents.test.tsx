import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { CustomNumberStepper } from "@/components/ui/CustomNumberStepper";
import { CustomInput } from "@/components/ui/CustomInput";
import { CustomTextarea } from "@/components/ui/CustomTextarea";
import { User } from "lucide-react";

describe("Custom UI Components", () => {
  describe("CustomSelect", () => {
    const options = [
      {
        value: "the-together",
        label: "The Together",
        guestLabel: "For 2 guests",
        priceDisplay: "LKR 16,700 TOTAL",
        description: "A shared experience for couples.",
      },
      {
        value: "the-collective",
        label: "The Collective",
        guestLabel: "For 10 guests",
        priceDisplay: "LKR 57,500 TOTAL",
        description: "A group experience for families.",
      },
    ];

    it("renders with selected option and opens custom dropdown on click", () => {
      const handleChange = vi.fn();
      render(
        <CustomSelect
          id="test-select"
          name="experience"
          value="the-together"
          onChange={handleChange}
          options={options}
        />
      );

      // Trigger button
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      // Open dropdown
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Click option
      const collectiveOption = screen.getByText("The Collective");
      fireEvent.click(collectiveOption);

      expect(handleChange).toHaveBeenCalledWith("the-collective");
    });

    it("displays error state styling when error prop is provided", () => {
      render(
        <CustomSelect
          id="test-select"
          name="experience"
          value="the-together"
          onChange={vi.fn()}
          options={options}
          error="Please choose a package"
        />
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger.className).toContain("border-[var(--cinnamon,#713B2F)]");
    });
  });

  describe("CustomDatePicker", () => {
    it("renders formatted date and opens bespoke calendar popover", () => {
      const handleChange = vi.fn();
      render(
        <CustomDatePicker
          id="test-date"
          name="date"
          value="2026-11-20"
          onChange={handleChange}
          minDate="2026-11-01"
        />
      );

      // Human readable formatted date
      expect(screen.getByText(/Nov 2026/i)).toBeInTheDocument();

      // Open calendar
      const trigger = screen.getByRole("button", { name: /Choose visit date/i });
      fireEvent.click(trigger);

      // Verify calendar is displayed with month header
      expect(screen.getByText(/November 2026/i)).toBeInTheDocument();

      // Click day 25
      const day25 = screen.getByRole("button", { name: "25" });
      fireEvent.click(day25);

      expect(handleChange).toHaveBeenCalledWith("2026-11-25");
    });

    it("disables past dates before minDate", () => {
      render(
        <CustomDatePicker
          id="test-date"
          name="date"
          value="2026-11-10"
          onChange={vi.fn()}
          minDate="2026-11-15"
        />
      );

      const trigger = screen.getByRole("button", { name: /Choose visit date/i });
      fireEvent.click(trigger);

      // Day 10 should be disabled since minDate is 2026-11-15
      const day10 = screen.getByRole("button", { name: "10" });
      expect(day10).toBeDisabled();

      // Day 16 should be enabled
      const day16 = screen.getByRole("button", { name: "16" });
      expect(day16).not.toBeDisabled();
    });
  });

  describe("CustomNumberStepper", () => {
    it("increments and decrements guest count", () => {
      const handleChange = vi.fn();
      render(
        <CustomNumberStepper
          id="test-guests"
          name="guests"
          value="3"
          min={1}
          max={10}
          onChange={handleChange}
        />
      );

      const minusBtn = screen.getByRole("button", { name: /Remove one guest/i });
      const plusBtn = screen.getByRole("button", { name: /Add one guest/i });

      fireEvent.click(minusBtn);
      expect(handleChange).toHaveBeenCalledWith("2");

      fireEvent.click(plusBtn);
      expect(handleChange).toHaveBeenCalledWith("4");
    });

    it("disables minus button when at minimum", () => {
      render(
        <CustomNumberStepper
          id="test-guests"
          name="guests"
          value="1"
          min={1}
          max={10}
          onChange={vi.fn()}
        />
      );

      const minusBtn = screen.getByRole("button", { name: /Remove one guest/i });
      expect(minusBtn).toBeDisabled();
    });
  });

  describe("CustomInput & CustomTextarea", () => {
    it("renders CustomInput with icon and handles change", () => {
      const handleChange = vi.fn();
      render(
        <CustomInput
          id="test-input"
          name="name"
          placeholder="Enter name"
          icon={<User data-testid="user-icon" />}
          onChange={handleChange}
        />
      );

      expect(screen.getByTestId("user-icon")).toBeInTheDocument();
      const input = screen.getByPlaceholderText("Enter name");
      fireEvent.change(input, { target: { value: "Deshan" } });
      expect(handleChange).toHaveBeenCalled();
    });

    it("renders CustomTextarea with character count", () => {
      render(
        <CustomTextarea
          id="test-notes"
          name="notes"
          value="Vegetarian tea request"
          maxLength={100}
          onChange={vi.fn()}
        />
      );

      expect(screen.getByText("22 / 100")).toBeInTheDocument();
    });
  });
});

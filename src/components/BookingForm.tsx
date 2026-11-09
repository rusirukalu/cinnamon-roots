"use client";

import { useState, useRef, FormEvent } from "react";
import { Check, Copy, Download, MessageCircle, User, Mail, MessageSquare } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./ArrowIcon";
import { CustomSelect } from "./ui/CustomSelect";
import { CustomDatePicker } from "./ui/CustomDatePicker";
import { CustomNumberStepper } from "./ui/CustomNumberStepper";
import { CustomInput } from "./ui/CustomInput";
import { CustomTextarea } from "./ui/CustomTextarea";
import { SITE_METADATA, PACKAGES } from "@/lib/data";
import { BookingFormData, BookingFormErrors } from "@/lib/types";
import {
  getTodayInSriLanka,
  validateBookingForm,
  generateEnquiryMessage,
  generateWhatsAppUrl,
} from "@/lib/booking";

const INITIAL_FORM_DATA: BookingFormData = {
  experience: "the-together",
  date: "",
  guests: "2",
  name: "",
  email: "",
  notes: "",
};

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [enquirySummary, setEnquirySummary] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [useFallbackSelect, setUseFallbackSelect] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const minDate = getTodayInSriLanka();

  const handleFieldChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Convenience auto-adjust for package guest defaults
      if (field === "experience") {
        if (value === "the-together") next.guests = "2";
        else if (value === "the-collective") next.guests = "10";
        else if (value === "the-collective-plus" && Number(prev.guests) < 11) next.guests = "11";
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(formData, minDate);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstErrorField}"]`
      );
      element?.focus();
      return;
    }

    const message = generateEnquiryMessage(formData);
    setEnquirySummary(message);
    setIsCopied(false);
    setUseFallbackSelect(false);

    requestAnimationFrame(() => {
      resultRef.current?.focus();
      resultRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(enquirySummary);
      setIsCopied(true);
      setUseFallbackSelect(false);
    } catch {
      setUseFallbackSelect(true);
      const textarea = resultRef.current?.querySelector<HTMLTextAreaElement>("textarea");
      textarea?.select();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([enquirySummary], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "ceylon-cinnamon-roots-enquiry.txt";
    link.click();
    URL.revokeObjectURL(blobUrl);
  };

  const getAriaProps = (field: keyof BookingFormData) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <section id="booking" className="booking">
      <div className="booking-story">
        <Eyebrow number="08">Official Packages & Booking</Eyebrow>
        <Reveal>
          <h2>
            Your journey
            <br />
            begins <em>here.</em>
          </h2>
          <p>
            Hosted locally by Deshan Chathuranga in Palassa, Thiththagalla,
            Ahangama, Galle.
          </p>
        </Reveal>

        <dl className="booking-facts">
          <div>
            <dt>Experience Duration</dt>
            <dd>
              1 to 1.5 <span>hours</span>
            </dd>
          </div>
          <div>
            <dt>Excursion Hubs</dt>
            <dd>
              Galle · Ahangama <span>Koggala · Weligama</span>
            </dd>
          </div>
        </dl>

        <div className="booking-includes">
          <span className="eyebrow">All Inclusions</span>
          <p>
            Plantation stroll · Harvesting & peeling demos · Hands-on participation ·
            Grower conversation · Warm cinnamon tea · Local cinnamon snack · Take-home gift · Brochure
          </p>
        </div>

        <p className="booking-quote">
          Flexible group sizes.
          <br />
          Partner & net rates <em>available for operators.</em>
        </p>
      </div>

      <div className="booking-form-side">
        {enquirySummary ? (
          <div ref={resultRef} className="enquiry-result" tabIndex={-1}>
            <div className="result-label">
              <Check size={18} />
              <span className="eyebrow">Ready to Send to Host</span>
            </div>
            <h3>
              Your story
              <br />
              starts with <em>hello.</em>
            </h3>
            <p>
              Your enquiry has been prepared. You can send it directly to host
              Deshan via WhatsApp for the fastest response, or copy/download it.
            </p>

            <div style={{ marginBottom: "1.25rem" }}>
              <a
                className="booking-submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  background: "var(--forest, #243D2E)",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "1rem 1.5rem",
                  fontWeight: 600,
                  width: "100%",
                }}
                href={generateWhatsAppUrl(formData)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> Send via WhatsApp to Deshan (+94 75 145 8653)
              </a>
            </div>

            <label className="eyebrow summary-label" htmlFor="enquiry-summary">
              Your prepared enquiry
            </label>
            <textarea
              id="enquiry-summary"
              readOnly
              value={enquirySummary}
              rows={12}
            />

            <div className="result-actions">
              <button
                className="booking-submit"
                type="button"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <>
                    <Check size={16} /> Enquiry copied
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy enquiry
                  </>
                )}
              </button>
              <button
                className="download-enquiry"
                type="button"
                onClick={handleDownload}
                aria-label="Download enquiry as a text file"
              >
                <Download size={18} />
              </button>
            </div>

            <p className="copy-status" role="status" aria-live="polite">
              {isCopied
                ? "Copied to clipboard. Paste into your message to the host."
                : useFallbackSelect
                ? "The text is selected. Please copy it using your device’s copy command."
                : ""}
            </p>

            <a
              className="contact-handoff"
              href={SITE_METADATA.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Location on Google Maps <ArrowIcon diagonal />
            </a>
            <p className="handoff-note">
              No. 53, Palassa, Thiththagalla, Ahangama, Galle, Sri Lanka.
              Partner and net rates available for tour operators and chauffeur guides.
            </p>

            <button
              className="edit-enquiry"
              type="button"
              onClick={() => {
                setEnquirySummary("");
                requestAnimationFrame(() => {
                  formRef.current?.querySelector<HTMLSelectElement>("select")?.focus();
                });
              }}
            >
              ← Edit your details
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <span className="eyebrow">Plan your visit</span>
            <h3>Choose your package.</h3>
            <p className="form-intro">
              Select an official experience package and preferred date. Directly
              hosted in Palassa, Thiththagalla, Ahangama.
            </p>

            <div className="form-field">
              <label htmlFor="experience-package">
                Experience Package <span>*</span>
              </label>
              <CustomSelect
                id="experience-package"
                name="experience"
                value={formData.experience}
                onChange={(val) => handleFieldChange("experience", val)}
                options={PACKAGES.map((pkg) => ({
                  value: pkg.id,
                  label: pkg.name,
                  guestLabel: pkg.guestLabel,
                  priceDisplay: pkg.priceDisplay,
                  description: pkg.description,
                }))}
                error={errors.experience}
                required
                {...getAriaProps("experience")}
              />
              {errors.experience && (
                <span className="field-error" id="experience-error">
                  {errors.experience}
                </span>
              )}
              <span className="field-help">
                {PACKAGES.find((p) => p.id === formData.experience)?.description}
              </span>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="preferred-date">
                  Preferred date <span>*</span>
                </label>
                <CustomDatePicker
                  id="preferred-date"
                  name="date"
                  minDate={minDate}
                  value={formData.date}
                  onChange={(val) => handleFieldChange("date", val)}
                  error={errors.date}
                  required
                  {...getAriaProps("date")}
                />
                {errors.date && (
                  <span className="field-error" id="date-error">
                    {errors.date}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="guest-count">
                  Guests <span>*</span>
                </label>
                <CustomNumberStepper
                  id="guest-count"
                  name="guests"
                  min={1}
                  max={100}
                  value={formData.guests}
                  onChange={(val) => handleFieldChange("guests", val)}
                  error={errors.guests}
                  required
                  {...getAriaProps("guests")}
                />
                {errors.guests && (
                  <span className="field-error" id="guests-error">
                    {errors.guests}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="guest-name">
                  Your name <span>*</span>
                </label>
                <CustomInput
                  id="guest-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name or Tour Agency"
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  icon={<User size={15} />}
                  error={errors.name}
                  required
                  {...getAriaProps("name")}
                />
                {errors.name && (
                  <span className="field-error" id="name-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="guest-email">
                  Email address <span>*</span>
                </label>
                <CustomInput
                  id="guest-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  icon={<Mail size={15} />}
                  error={errors.email}
                  required
                  {...getAriaProps("email")}
                />
                {errors.email && (
                  <span className="field-error" id="email-error">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="guest-notes">
                Anything we should know?{" "}
                <span className="optional">Optional</span>
              </label>
              <CustomTextarea
                id="guest-notes"
                name="notes"
                rows={3}
                maxLength={1200}
                placeholder="Dietary requirements, pickup location (Galle/Ahangama/Weligama), or agency partnership enquiry…"
                value={formData.notes}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
                icon={<MessageSquare size={15} />}
                error={errors.notes}
                {...getAriaProps("notes")}
              />
              {errors.notes && (
                <span className="field-error" id="notes-error">
                  {errors.notes}
                </span>
              )}
            </div>

            <button className="booking-submit" type="submit">
              Prepare Booking Enquiry <ArrowIcon diagonal size={20} />
            </button>
            <p className="form-notice">
              Host contact: Deshan Chathuranga · WhatsApp: +94 75 145 8653.
              Flexible timing and group arrangements available.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

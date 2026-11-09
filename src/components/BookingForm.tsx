"use client";

import { useState, useRef, FormEvent } from "react";
import { Check, Copy, Download, Minus, Plus } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./ArrowIcon";
import { SITE_METADATA } from "@/lib/data";
import {
  BookingFormData,
  BookingFormErrors,
} from "@/lib/types";
import {
  getTodayInSriLanka,
  validateBookingForm,
  generateEnquiryMessage,
} from "@/lib/booking";

const INITIAL_FORM_DATA: BookingFormData = {
  experience: "",
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
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        <Eyebrow number="08">Make it your story</Eyebrow>
        <Reveal>
          <h2>
            Your journey
            <br />
            begins <em>here.</em>
          </h2>
          <p>
            Leave with more than memories.
            <br />
            Leave with a connection.
          </p>
        </Reveal>
        <dl className="booking-facts">
          <div>
            <dt>Time to discover</dt>
            <dd>
              120 <span>minutes</span>
            </dd>
          </div>
          <div>
            <dt>Room for connection</dt>
            <dd>
              1–10 <span>guests</span>
            </dd>
          </div>
        </dl>
        <div className="booking-includes">
          <span className="eyebrow">All part of the experience</span>
          <p>
            Plantation exploration · Traditional demonstrations · Hands-on
            participation · Cinnamon refreshments · Souvenirs
          </p>
        </div>
        <p className="booking-quote">
          A little time.
          <br />
          A whole new <em>perspective.</em>
        </p>
      </div>

      <div className="booking-form-side">
        {enquirySummary ? (
          <div ref={resultRef} className="enquiry-result" tabIndex={-1}>
            <div className="result-label">
              <Check size={18} />
              <span className="eyebrow">Ready to share · Not yet sent</span>
            </div>
            <h3>
              Your story
              <br />
              starts with <em>hello.</em>
            </h3>
            <p>
              Your enquiry is ready. Copy or download it, then share it with
              Ceylon Cinnamon Roots through a verified contact channel.
            </p>
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
                ? "Copied. Paste your enquiry into your message to the business."
                : useFallbackSelect
                ? "The text is selected. Please copy it using your device’s copy command."
                : ""}
            </p>

            <a
              className="contact-handoff"
              href={SITE_METADATA.website}
              target="_blank"
              rel="noreferrer"
            >
              Open the official business website <ArrowIcon diagonal />
            </a>
            <p className="handoff-note">
              A direct business contact has not been verified for this preview.
              Opening the official website does not automatically send this
              enquiry. Availability and contact access must be confirmed with
              the owner.
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
            <h3>Let’s start with you.</h3>
            <p className="form-intro">
              Choose a preferred date and tell us who’s coming. Rates and
              arrangements are confirmed directly by the team.
            </p>

            <div className="form-field">
              <label htmlFor="experience-package">
                Your experience <span>*</span>
              </label>
              <div className="select-wrap">
                <select
                  id="experience-package"
                  name="experience"
                  value={formData.experience}
                  onChange={(e) => handleFieldChange("experience", e.target.value)}
                  required
                  {...getAriaProps("experience")}
                >
                  <option value="" disabled>
                    Select your experience
                  </option>
                  <option value="plantation-to-quill">
                    Plantation to Quill · 120 minutes
                  </option>
                </select>
              </div>
              {errors.experience && (
                <span className="field-error" id="experience-error">
                  {errors.experience}
                </span>
              )}
              <span className="field-help">
                The guided experience described on this page. Package options
                and prices on enquiry.
              </span>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="preferred-date">
                  Preferred date <span>*</span>
                </label>
                <input
                  id="preferred-date"
                  name="date"
                  type="date"
                  min={minDate}
                  value={formData.date}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
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
                <div className="guest-control">
                  <button
                    type="button"
                    onClick={() =>
                      handleFieldChange(
                        "guests",
                        String(Math.max(1, Number(formData.guests || 1) - 1))
                      )
                    }
                    aria-label="Remove one guest"
                    disabled={Number(formData.guests) <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    id="guest-count"
                    name="guests"
                    type="number"
                    min="1"
                    max="10"
                    step="1"
                    inputMode="numeric"
                    value={formData.guests}
                    onChange={(e) => handleFieldChange("guests", e.target.value)}
                    required
                    {...getAriaProps("guests")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleFieldChange(
                        "guests",
                        String(Math.min(10, Number(formData.guests || 1) + 1))
                      )
                    }
                    aria-label="Add one guest"
                    disabled={Number(formData.guests) >= 10}
                  >
                    <Plus size={14} />
                  </button>
                </div>
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
                <input
                  id="guest-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
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
                <input
                  id="guest-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
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
              <textarea
                id="guest-notes"
                name="notes"
                rows={2}
                maxLength={1200}
                placeholder="Dietary needs, practical questions or a special occasion…"
                value={formData.notes}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
                {...getAriaProps("notes")}
              />
              {errors.notes && (
                <span className="field-error" id="notes-error">
                  {errors.notes}
                </span>
              )}
            </div>

            <button className="booking-submit" type="submit">
              Prepare booking enquiry <ArrowIcon diagonal size={20} />
            </button>
            <p className="form-notice">
              No payment. No instant confirmation. This form prepares a request
              to share with the business; it does not send your details or
              reserve a date.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

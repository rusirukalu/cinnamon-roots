"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { Wordmark } from "./Wordmark";
import { PhotoCredit } from "./PhotoCredit";
import { ArrowIcon } from "./ArrowIcon";
import { SITE_METADATA, PHOTOS, NAV_LINKS } from "@/lib/data";

export function Footer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogView, setDialogView] = useState<"privacy" | "credits">("privacy");

  const openDialog = (view: "privacy" | "credits") => {
    setDialogView(view);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <footer className="footer">
      <div className="footer-invitation">
        <Eyebrow>The story doesn’t end here</Eyebrow>
        <Reveal>
          <h2>
            Come closer to
            <br />
            the roots of <em>Ceylon.</em>
          </h2>
        </Reveal>
        <div className="footer-invitation-bottom">
          <p>
            Discover the people, traditions and craftsmanship
            <br />
            behind authentic Ceylon cinnamon.
          </p>
          <Link href="#booking" className="footer-cta">
            Book your experience{" "}
            <span className="arrow-disc">
              <ArrowIcon diagonal size={23} />
            </span>
          </Link>
        </div>
      </div>

      <div className="footer-main">
        <Wordmark footer />
        <div className="footer-nav">
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <span className="eyebrow">{SITE_METADATA.address}</span>
          <a href={SITE_METADATA.whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp: {SITE_METADATA.whatsappNumber} <ArrowIcon diagonal size={13} />
          </a>
          <a href={SITE_METADATA.googleMapsUrl} target="_blank" rel="noreferrer">
            View on Google Maps <ArrowIcon diagonal size={13} />
          </a>
          <Link href="#booking">
            Host: {SITE_METADATA.host} <ArrowIcon diagonal size={13} />
          </Link>
        </div>
        <Link className="back-to-top" href="#top" aria-label="Back to the roots">
          <span>Back to the roots</span>
          <span className="up-arrow">
            <ArrowIcon size={20} />
          </span>
        </Link>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ceylon Cinnamon Roots</span>
        <span>Rooted in Sri Lankan heritage.</span>
        <div>
          <button type="button" onClick={() => openDialog("privacy")}>
            Privacy & enquiry information
          </button>
          <button type="button" onClick={() => openDialog("credits")}>
            Photography credits
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="info-dialog"
        aria-labelledby="info-dialog-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeDialog();
          }
        }}
      >
        <div className="info-dialog-inner">
          <button
            className="info-close"
            aria-label="Close information"
            type="button"
            onClick={closeDialog}
          >
            <X size={22} />
          </button>
          <p className="eyebrow">Ceylon Cinnamon Roots</p>
          <h2 id="info-dialog-title">
            {dialogView === "privacy"
              ? "A note on your enquiry."
              : "Through another lens."}
          </h2>

          {dialogView === "privacy" ? (
            <div className="information-copy">
              <p>
                This preview prepares a booking enquiry in your browser. Form
                details are held only in the current page’s memory and are not
                sent to a server, saved in browser storage or used to reserve a
                date.
              </p>
              <p>
                Copying writes your enquiry to your clipboard. Downloading saves
                it to your device. If a verified email or WhatsApp contact is
                configured, using that handoff shares the content with your
                chosen external application. You must review and send it
                yourself.
              </p>
              <p>
                Fonts and optimized Unsplash photographs are served with this
                website. No analytics or advertising scripts are installed.
                Opening an external website or photographer credit takes you to a
                provider with its own privacy practices.
              </p>
              <p>
                Prices, availability, location, practical arrangements and
                cancellation terms must be confirmed directly with the business.
                A prepared enquiry is not an accepted booking or a payment. This
                information describes this preview’s behaviour and is not an
                owner-approved legal privacy policy.
              </p>
            </div>
          ) : (
            <div className="information-copy">
              <p>
                Real photography, sourced from Unsplash. These editorial images
                illustrate cinnamon, tropical landscapes and refreshments. They
                do not depict the actual Ceylon Cinnamon Roots premises, team,
                guests or menu.
              </p>
              <div className="credits-list">
                {Object.values(PHOTOS).map((photo) => (
                  <div key={photo.id}>
                    <span>{photo.caption}</span>
                    <PhotoCredit photo={photo} />
                  </div>
                ))}
                <div>
                  <span>Cinnamon still life</span>
                  <a
                    href="https://unsplash.com/photos/brown-wooden-sticks-on-white-table-UGUy1i6_-GQ"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Diana Polekhina / Unsplash ↗
                  </a>
                </div>
                <div>
                  <span>Cinnamon textures</span>
                  <a
                    href="https://unsplash.com/photos/cinnamon-sticks-in-brown-pile-Yfs8M0ofXgg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Thibaud Constantin / Unsplash ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </footer>
  );
}

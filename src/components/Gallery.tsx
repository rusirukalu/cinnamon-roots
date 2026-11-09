"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { ArrowIcon } from "./ArrowIcon";
import { GALLERY_PHOTOS } from "@/lib/data";

export function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  // Sync dialog visibility with state
  useEffect(() => {
    if (activePhotoIndex === null) return;

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
            : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex]);

  const closeLightbox = () => {
    dialogRef.current?.close();
    setActivePhotoIndex(null);
    triggerButtonRef.current?.focus();
  };

  return (
    <section id="gallery" className="section gallery">
      <div className="gallery-heading">
        <div>
          <Eyebrow number="07">A visual journal</Eyebrow>
          <Reveal>
            <h2>
              A little closer.
              <br />
              A little <em>slower.</em>
            </h2>
          </Reveal>
        </div>
        <p>
          Textures, landscapes and small rituals.
          <br />
          A few things worth taking the time to notice.
        </p>
      </div>

      <div className="gallery-layout">
        {GALLERY_PHOTOS.map((photo, index) => (
          <Reveal
            key={photo.id}
            className={`gallery-item gallery-item-${index}`}
          >
            <button
              className="gallery-open"
              aria-label={`Enlarge photograph: ${photo.caption}`}
              type="button"
              onClick={(e) => {
                triggerButtonRef.current = e.currentTarget;
                setActivePhotoIndex(index);
              }}
            >
              <ResponsiveImage
                photo={photo}
                sizes={
                  index === 0
                    ? "(max-width: 700px) 90vw, 55vw"
                    : "(max-width: 700px) 80vw, 35vw"
                }
              />
              <span className="gallery-enlarge">
                <ArrowIcon diagonal size={18} />
              </span>
            </button>
            <div className="gallery-caption">
              <span>
                <small>0{index + 1}</small>
                {photo.caption}
              </span>
              <PhotoCredit photo={photo} short />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="gallery-disclosure">
        <span className="eyebrow">An editorial collection</span>
        <p>
          All photographs are sourced from Unsplash. They illustrate the
          atmosphere and materials of the story, not the actual premises,
          artisans, guests or refreshments.
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          closeLightbox();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeLightbox();
          }
        }}
        aria-label="Photograph viewer"
      >
        {activePhotoIndex !== null && (
          <div className="lightbox-inner">
            <button
              className="lightbox-close"
              aria-label="Close photograph viewer"
              type="button"
              onClick={closeLightbox}
            >
              <X size={24} strokeWidth={1.4} />
            </button>
            <img
              className="lightbox-image"
              src={`/images/${GALLERY_PHOTOS[activePhotoIndex].id}-1440.webp`}
              alt={GALLERY_PHOTOS[activePhotoIndex].alt}
            />
            <div className="lightbox-meta">
              <div>
                <p>{GALLERY_PHOTOS[activePhotoIndex].caption}</p>
                <PhotoCredit photo={GALLERY_PHOTOS[activePhotoIndex]} />
              </div>
              <span>
                {activePhotoIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
              <div className="lightbox-controls">
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={() =>
                    setActivePhotoIndex(
                      (activePhotoIndex - 1 + GALLERY_PHOTOS.length) %
                        GALLERY_PHOTOS.length
                    )
                  }
                >
                  <span className="reverse-arrow">
                    <ArrowIcon size={22} />
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={() =>
                    setActivePhotoIndex(
                      (activePhotoIndex + 1) % GALLERY_PHOTOS.length
                    )
                  }
                >
                  <ArrowIcon size={22} />
                </button>
              </div>
            </div>
            <p className="lightbox-disclaimer">
              Supporting editorial photograph. Not an image of the business.
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}

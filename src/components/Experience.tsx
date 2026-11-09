"use client";

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { ArrowIcon } from "./ArrowIcon";
import { PHOTOS, ITINERARY } from "@/lib/data";

export function Experience() {
  const [activeIndex, setActiveIndex] = useState<number>(2);

  return (
    <section id="experience" className="section experience">
      <div className="section-heading">
        <Eyebrow number="02">The experience</Eyebrow>
        <span className="eyebrow quiet">Two hours. A different perspective.</span>
      </div>

      <Reveal>
        <div className="experience-heading">
          <h2>
            An experience
            <br />
            from plantation <em>to quill.</em>
          </h2>
          <p>
            This isn’t a story told from a distance.
            <br />
            It’s one you become part of.
          </p>
        </div>
      </Reveal>

      <div className="experience-grid">
        <Reveal className="experience-photo">
          <figure>
            <ResponsiveImage photo={PHOTOS.cinnamonOil} />
            <div className="image-note">
              <span className="eyebrow">The full experience</span>
              <span className="image-note-duration">
                1–1.5 <span>hours</span>
              </span>
            </div>
            <figcaption>
              <span>Pure Cinnamon Bark Oil & Quills</span>
              <PhotoCredit photo={PHOTOS.cinnamonOil} />
            </figcaption>
          </figure>
        </Reveal>

        <div className="itinerary" aria-label="Experience itinerary">
          {ITINERARY.map((item, index) => (
            <div
              key={item.title}
              className={`itinerary-item ${activeIndex === index ? "active" : ""}`}
            >
              <h3>
                <button
                  id={`itinerary-tab-${index}`}
                  aria-expanded={activeIndex === index}
                  aria-controls={`itinerary-panel-${index}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <span className="itinerary-index">0{index + 1}</span>
                  <span className="itinerary-title">
                    {item.title}
                    {item.featured && (
                      <span className="itinerary-featured">
                        The heart of your visit
                      </span>
                    )}
                  </span>
                  <span className="itinerary-time">
                    {item.minutes}
                    <small>MIN</small>
                  </span>
                  <span className="itinerary-symbol">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={`itinerary-panel-${index}`}
                role="region"
                aria-labelledby={`itinerary-tab-${index}`}
                hidden={activeIndex !== index}
                className="itinerary-panel"
              >
                <p>{item.text}</p>
                {item.featured && (
                  <Link href="#journey">
                    Follow the journey <ArrowIcon diagonal size={13} />
                  </Link>
                )}
              </div>
            </div>
          ))}

          <div className="itinerary-bottom">
            <span>Small groups. Personal discoveries.</span>
            <Link href="#booking">
              Plan your visit <ArrowIcon diagonal size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

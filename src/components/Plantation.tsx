import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { ArrowIcon } from "./ArrowIcon";
import { PHOTOS, SITE_METADATA } from "@/lib/data";

export function Plantation() {
  return (
    <section id="plantation" className="section plantation">
      <div className="plantation-title">
        <Eyebrow number="05">The plantation</Eyebrow>
        <Reveal>
          <h2>
            Step into the
            <br />
            world of <em>cinnamon.</em>
          </h2>
        </Reveal>
        <p>
          A living grove in Palassa, Thiththagalla, Ahangama. Discover where
          authentic Ceylon cinnamon is grown, harvested, and crafted by hand.
        </p>
      </div>

      <div className="plantation-composition">
        <Reveal className="plantation-wide">
          <figure>
            <ResponsiveImage
              photo={PHOTOS.landscape}
              sizes="(max-width: 700px) 100vw, 72vw"
            />
            <figcaption>
              <span>Landscape study / Southern Province</span>
              <PhotoCredit photo={PHOTOS.landscape} />
            </figcaption>
          </figure>
        </Reveal>

        <div className="plantation-side">
          <span className="plantation-note">
            Leave a little room
            <br />
            for <em>discovery.</em>
          </span>
          <span className="eyebrow">Walk. Notice. Connect.</span>
          <p>
            Explore our authentic plantation in Ahangama. Easy access for day
            excursions from Galle, Ahangama, Koggala, and Weligama.
          </p>
          <a
            className="location-note"
            href={SITE_METADATA.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              Palassa, Thiththagalla, Ahangama
              <br />
              <small>View on Google Maps (Directions)</small>
            </span>
            <ArrowIcon diagonal size={20} />
          </a>
        </div>
      </div>

      <p className="imagery-disclaimer">
        No. 53, Palassa, Thiththagalla, Ahangama, Galle, Sri Lanka · Host: Deshan Chathuranga
      </p>
    </section>
  );
}

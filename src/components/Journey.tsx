import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { PHOTOS, JOURNEY_STAGES } from "@/lib/data";

export function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="section-heading">
        <Eyebrow number="03">The cinnamon journey</Eyebrow>
        <span className="eyebrow">70 minutes / Guided by an artisan</span>
      </div>

      <div className="journey-grid">
        <div className="journey-sticky">
          <Reveal>
            <h2>
              From living tree
              <br />
              to delicate <em>quill.</em>
            </h2>
            <p className="journey-lede">
              A slow, skilful transformation.
              <br />
              An invitation to get hands-on.
            </p>
          </Reveal>
          <figure className="journey-photo">
            <ResponsiveImage photo={PHOTOS.bundle} />
            <figcaption>
              <span>Material study / Cinnamon</span>
              <PhotoCredit photo={PHOTOS.bundle} />
            </figcaption>
          </figure>
        </div>

        <div className="journey-stages">
          {JOURNEY_STAGES.map((stage, index) => (
            <Reveal key={stage.title} className="journey-stage">
              <span className="journey-stage-index">0{index + 1}</span>
              <div>
                <span className="eyebrow">{stage.tag}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </Reveal>
          ))}
          <p className="journey-endnote">
            Not a factory tour. A connection to the craft.
          </p>
        </div>
      </div>
    </section>
  );
}

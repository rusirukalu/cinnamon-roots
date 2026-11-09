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
        <span className="eyebrow">A visual journey from branch to quill</span>
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
            <ResponsiveImage photo={PHOTOS.cinnamonPeeling} />
            <figcaption>
              <span>Traditional Cinnamon Peeling · Palassa</span>
              <PhotoCredit photo={PHOTOS.cinnamonPeeling} />
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
                {stage.imageSrc && (
                  <div
                    style={{
                      marginTop: "1rem",
                      borderRadius: "4px",
                      overflow: "hidden",
                      maxHeight: "180px",
                      maxWidth: "280px",
                      border: "1px solid var(--rule, #CCC4B7)",
                    }}
                  >
                    <img
                      src={stage.imageSrc}
                      alt={stage.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
          <p className="journey-endnote">
            Not a factory tour. A genuine connection to the craft.
          </p>
        </div>
      </div>
    </section>
  );
}

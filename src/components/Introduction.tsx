import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { TextLink } from "./TextLink";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { PHOTOS } from "@/lib/data";

export function Introduction() {
  return (
    <>
      <div className="experience-strip">
        <span>Not just a visit. A connection.</span>
        <div>
          <span>1 to 1.5 hours of discovery</span>
          <i />
          <span>Flexible group sizes</span>
          <i />
          <span>Palassa, Ahangama · Galle</span>
        </div>
      </div>

      <section id="introduction" className="section introduction">
        <Eyebrow number="01">The roots of our story</Eyebrow>
        <div className="intro-grid">
          <div className="intro-text">
            <Reveal>
              <h2>
                More than a spice.
                <br />
                A story rooted
                <br />
                in <em>generations.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="intro-copy">
                <span className="editorial-dash" />
                <div>
                  <p>Some stories are best understood through your own hands.</p>
                  <p>
                    At Ceylon Cinnamon Roots, we invite you into the world behind
                    a familiar spice. Into the plantation, the traditions, and
                    the patient craft that brings authentic Ceylon cinnamon to
                    life.
                  </p>
                  <TextLink href="#heritage">Get to know our roots</TextLink>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="intro-photo" delay={150}>
            <figure>
              <ResponsiveImage photo={PHOTOS.quills} />
              <figcaption>
                <span>01 / A closer look</span>
                <PhotoCredit photo={PHOTOS.quills} />
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="intro-footnote">
          <span>Grown with nature.</span>
          <span>Shaped by tradition.</span>
          <span>Shared with you.</span>
        </div>
      </section>
    </>
  );
}

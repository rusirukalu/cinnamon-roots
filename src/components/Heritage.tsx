import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { TextLink } from "./TextLink";
import { PHOTOS } from "@/lib/data";

export function Heritage() {
  return (
    <section id="heritage" className="heritage">
      <div className="heritage-photo">
        <ResponsiveImage
          photo={PHOTOS.palms}
          sizes="(max-width: 700px) 100vw, 42vw"
        />
        <PhotoCredit photo={PHOTOS.palms} />
      </div>

      <div className="heritage-content">
        <Eyebrow number="04">Our heritage</Eyebrow>
        <Reveal>
          <h2>
            A heritage
            <br />
            worth <em>preserving.</em>
          </h2>
        </Reveal>
        <span className="heritage-line" />
        <Reveal>
          <p>
            The real value of cinnamon isn’t only in the spice.
            <br />
            It’s in the hands that know what to do with it.
          </p>
          <p className="heritage-copy">
            Ceylon cinnamon is part of Sri Lanka’s cultural and agricultural
            heritage. Behind every carefully prepared quill is traditional
            knowledge, patient work and the skill of an artisan.
          </p>
          <p className="heritage-copy">
            Here, that knowledge is shared through doing. Come closer, ask
            questions, and discover why the craft deserves to be experienced,
            not just explained.
          </p>
          <TextLink href="#booking" light>
            Experience the tradition
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}

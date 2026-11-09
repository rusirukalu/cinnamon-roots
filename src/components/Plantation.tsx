import Link from "next/link";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { ArrowIcon } from "./ArrowIcon";
import { PHOTOS } from "@/lib/data";

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
          A living landscape, not a production line. Discover the growing side
          of cinnamon and the craft that begins here.
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
              <span>Landscape study / Sri Lanka</span>
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
            Explore a real cinnamon plantation as part of your guided experience.
            Meet the tree, understand the harvest, and see the familiar from a
            new perspective.
          </p>
          <Link className="location-note" href="#booking">
            <span>
              Sri Lanka
              <br />
              <small>Request location & directions</small>
            </span>
            <ArrowIcon diagonal size={20} />
          </Link>
        </div>
      </div>

      <p className="imagery-disclaimer">
        The landscapes on this page are supporting Unsplash imagery of Sri Lanka
        and the tropics, not photographs of the Ceylon Cinnamon Roots premises.
      </p>
    </section>
  );
}

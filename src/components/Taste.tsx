import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { PHOTOS } from "@/lib/data";

export function Taste() {
  return (
    <section id="taste" className="section taste">
      <div className="taste-grid">
        <div className="taste-photo">
          <ResponsiveImage photo={PHOTOS.tea} />
          <PhotoCredit photo={PHOTOS.tea} />
        </div>

        <div className="taste-content">
          <Eyebrow number="06">Taste & discover</Eyebrow>
          <Reveal>
            <h2>
              A taste
              <br />
              of <em>Ceylon.</em>
            </h2>
            <p className="taste-lede">
              The best conversations
              <br />
              happen over something warm.
            </p>
          </Reveal>
          <p>
            After the hands-on journey, take a moment for cinnamon refreshments
            and conversation. A chance to ask, reflect, and discover the
            flavours of the spice you’ve come to know.
          </p>
          <ul className="taste-menu">
            <li>
              <span>Cinnamon tea & drinks</span>
              <span>01</span>
            </li>
            <li>
              <span>Cinnamon cake</span>
              <span>02</span>
            </li>
            <li>
              <span>Locally prepared cinnamon treats</span>
              <span>03</span>
            </li>
          </ul>
          <span className="taste-footer">27 minutes to savour, share & ask</span>
        </div>
      </div>

      <div className="taste-bottom-line">
        <span>Nothing rushed.</span>
        <span>
          Everything <em>remembered.</em>
        </span>
      </div>
    </section>
  );
}

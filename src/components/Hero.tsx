import Link from "next/link";
import { ResponsiveImage } from "./ResponsiveImage";
import { PhotoCredit } from "./PhotoCredit";
import { ArrowIcon } from "./ArrowIcon";
import { PHOTOS } from "@/lib/data";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-image">
        <ResponsiveImage photo={PHOTOS.forest} priority sizes="100vw" />
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">
          <span className="tiny-line" /> A hands-on cinnamon experience · Sri Lanka
        </p>
        <h1 id="hero-heading">
          <span>Discover the</span>
          <span>soul of Ceylon</span>
          <span className="hero-italic">cinnamon.</span>
        </h1>
        <div className="hero-bottom">
          <Link className="hero-cta" href="#experience">
            <span>Explore the experience</span>
            <span className="arrow-disc">
              <ArrowIcon diagonal size={23} />
            </span>
          </Link>
          <p className="hero-description">
            Walk the plantation. Meet the craft.
            <br />
            Discover a story that stays with you.
          </p>
          <Link
            className="scroll-link"
            href="#introduction"
            aria-label="Scroll to our story"
          >
            <span>Slow down. Discover more.</span>
            <ArrowIcon down size={20} />
          </Link>
        </div>
      </div>
      <div className="hero-side-note">ROOTED IN HERITAGE. MADE BY HAND.</div>
      <div className="hero-photo-caption">
        <span>Sri Lankan landscape / supporting imagery</span>
        <PhotoCredit photo={PHOTOS.forest} short />
      </div>
    </section>
  );
}

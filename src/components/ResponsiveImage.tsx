import type { PhotoItem } from "@/lib/types";

interface ResponsiveImageProps {
  photo: PhotoItem;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ResponsiveImage({
  photo,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: ResponsiveImageProps) {
  if (priority) {
    return (
      <picture>
        <source
          type="image/avif"
          media="(max-width: 700px)"
          srcSet="/images/hero-mobile-480.avif 480w, /images/hero-mobile-800.avif 800w"
          sizes="100vw"
        />
        <source
          type="image/avif"
          srcSet="/images/hero-960.avif 960w, /images/hero-1440.avif 1440w, /images/hero-1920.avif 1920w"
          sizes="100vw"
        />
        <source
          media="(max-width: 700px)"
          srcSet="/images/hero-mobile-480.webp 480w, /images/hero-mobile-800.webp 800w"
          sizes="100vw"
        />
        <img
          className={className}
          src="/images/hero-1440.webp"
          srcSet="/images/hero-960.webp 960w, /images/hero-1440.webp 1440w, /images/hero-1920.webp 1920w"
          sizes="100vw"
          width={1920}
          height={1280}
          alt={photo.alt}
          loading="eager"
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={[480, 960, 1440]
          .map((width) => `/images/${photo.id}-${width}.avif ${width}w`)
          .join(", ")}
        sizes={sizes}
      />
      <img
        className={className}
        src={`/images/${photo.id}-960.webp`}
        srcSet={[480, 960, 1440]
          .map((width) => `/images/${photo.id}-${width}.webp ${width}w`)
          .join(", ")}
        sizes={sizes}
        width={1200}
        height={1500}
        alt={photo.alt}
        style={{ objectPosition: photo.position }}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

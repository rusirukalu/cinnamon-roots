import type { PhotoItem } from "@/lib/types";
import { ArrowIcon } from "./ArrowIcon";

interface PhotoCreditProps {
  photo: PhotoItem;
  short?: boolean;
}

export function PhotoCredit({ photo, short = false }: PhotoCreditProps) {
  return (
    <a
      className="photo-credit"
      href={photo.page}
      target="_blank"
      rel="noreferrer"
    >
      {short ? "Photo" : photo.author} / Unsplash{" "}
      <ArrowIcon diagonal size={11} />
    </a>
  );
}

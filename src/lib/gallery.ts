import fs from "fs";
import path from "path";

export const GOOGLE_PHOTOS_ALBUM = "https://photos.app.goo.gl/hxtEsdghMZVyoAGW7";
export const GOOGLE_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1HIyn5HVKCDgsGQ2SuBT2DO18u2YfqRrm";

export interface GalleryImage {
  src: string;
  alt: string;
}

/**
 * Scans public/gallery/ at build time and returns images sorted newest to oldest.
 * WhatsApp photos (IMG-YYYYMMDD-WA*.jpg) are considered newest (burial day),
 * followed by numbered series in descending order.
 */
export function getGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  if (!fs.existsSync(galleryDir)) return [];

  const files = fs.readdirSync(galleryDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  // Separate WhatsApp photos from numbered photos
  const waPhotos = files
    .filter((f) => f.startsWith("IMG-"))
    .sort()
    .reverse();
  const numberedPhotos = files
    .filter((f) => !f.startsWith("IMG-"))
    .sort()
    .reverse();

  // WhatsApp (newest) first, then numbered descending
  const sorted = [...waPhotos, ...numberedPhotos];

  return sorted.map((file) => ({
    src: `/gallery/${file}`,
    alt: "Denis Letian Sekento memorial",
  }));
}

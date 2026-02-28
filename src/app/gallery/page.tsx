import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Card, CardContent } from "@/components/ui/card";
import PhotoGallery from "@/components/PhotoGallery";
import { getGalleryImages, GOOGLE_PHOTOS_ALBUM } from "@/lib/gallery";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const siteUrl = "https://denis-sekento-memorial.fly.dev";

export const metadata = {
  title: "Gallery | Denis Letian Sekento",
  description:
    "Photo gallery celebrating the life of Denis Letian Sekento. Browse 49+ memorial photos and memories.",
  openGraph: {
    title: "Photo Gallery | Denis Letian Sekento Memorial",
    description:
      "Browse photos and memories of Denis Letian Sekento (1985–2026). View the full album on Google Photos.",
    url: `${siteUrl}/gallery`,
    images: [
      { url: `${siteUrl}/dennis.png`, width: 600, height: 600, alt: "Denis Letian Sekento" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Denis Letian Sekento Memorial",
    images: [`${siteUrl}/dennis.png`],
  },
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
  other: {
    "google-photos-album": GOOGLE_PHOTOS_ALBUM,
  },
};

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <SectionLabel>Gallery</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-light text-foreground">
          Remembering Denis
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {images.length} photos celebrating the life of Denis Letian Sekento. More photos are being
          added.
        </p>
        <GoldDivider />
      </div>

      {/* Google Photos Album Card */}
      <a
        href={GOOGLE_PHOTOS_ALBUM}
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-lg mx-auto"
      >
        <Card className="group bg-card/50 backdrop-blur border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 overflow-hidden">
          <div className="relative h-40 sm:h-48 w-full">
            <Image
              src="/dennis.png"
              alt="Denis Letian Sekento — Google Photos Album"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              sizes="(max-width: 640px) 100vw, 512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/70">
                Google Photos Album
              </p>
              <p className="font-heading text-lg text-white">
                Denis Letian Sekento — Full Collection
              </p>
            </div>
          </div>
          <CardContent className="py-3 flex items-center justify-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-label uppercase tracking-widest text-gold group-hover:text-gold-light transition-colors">
              View Full Album on Google Photos
            </span>
          </CardContent>
        </Card>
      </a>

      <PhotoGallery images={images} />
    </div>
  );
}

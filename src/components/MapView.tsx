"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
  label?: string;
  className?: string;
  mapType?: "roadmap" | "satellite" | "hybrid" | "terrain";
  compact?: boolean;
  width?: number;
  height?: number;
}

/**
 * Google Maps Static image component with next/image optimization.
 * Falls back to a styled placeholder with "Open in Google Maps" link.
 */
export function MapView({
  lat,
  lng,
  zoom = 14,
  label,
  className,
  mapType = "roadmap",
  compact = false,
  width = 600,
  height = 300,
}: MapViewProps) {
  const [hasError, setHasError] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const staticMapUrl =
    apiKey && !hasError
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&scale=2&maptype=${mapType}&markers=color:red%7C${lat},${lng}&key=${apiKey}`
      : null;

  return (
    <div className={className}>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block relative overflow-hidden rounded-lg border border-gold/20 group cursor-pointer ${compact ? "rounded-md" : ""}`}
        aria-label={label ? `Map of ${label}` : "Map preview"}
      >
        {staticMapUrl ? (
          <>
            <Image
              src={staticMapUrl}
              alt={label ? `Map of ${label}` : "Map preview"}
              width={width}
              height={height}
              className="w-full h-auto object-cover transition-transform group-hover:scale-105"
              unoptimized
              onError={() => setHasError(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </>
        ) : (
          <div
            className={`flex items-center justify-center bg-card/50 backdrop-blur ${compact ? "h-[120px]" : "h-[200px]"}`}
          >
            <div className="text-center space-y-2">
              <MapPin className={`mx-auto text-gold/60 ${compact ? "h-6 w-6" : "h-10 w-10"}`} />
              {label && (
                <p className={`font-heading text-foreground ${compact ? "text-xs" : "text-sm"}`}>
                  {label}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </p>
              <p className="text-xs text-gold">Open in Google Maps</p>
            </div>
          </div>
        )}
        {staticMapUrl && label && !compact && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-1.5 text-white text-xs">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{label}</span>
            </div>
          </div>
        )}
      </a>
      {!compact && (
        <div className="flex gap-2 mt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-label uppercase tracking-wider text-gold hover:text-gold-light py-2 border border-gold/20 rounded-md hover:border-gold/40 transition-colors"
          >
            View on Map
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-label uppercase tracking-wider text-gold hover:text-gold-light py-2 border border-gold/20 rounded-md hover:border-gold/40 transition-colors"
          >
            Get Directions
          </a>
        </div>
      )}
    </div>
  );
}

import { memorial } from "@/lib/content";
import { getGalleryImages } from "@/lib/gallery";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { FadeIn, Stagger, StaggerItem } from "@/components/FadeIn";
import { NavCard, type NavCardItem } from "@/components/NavCard";
import { MapView } from "@/components/MapView";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BookOpen, Heart, Clock, Music, Camera, HandHeart } from "lucide-react";

// Kipeto, Kajiado coordinates
// Kipeto, Kajiado — near Umma University
const BURIAL_COORDS = { lat: -1.7768, lng: 36.8219 };

export default function HomePage() {
  const { person } = memorial;
  const galleryCount = getGalleryImages().length;

  const navCards: NavCardItem[] = [
    { href: "/biography", label: "Biography", icon: BookOpen, description: "His life story" },
    { href: "/tributes", label: "Tributes", icon: Heart, description: "Words of love" },
    { href: "/programme", label: "Programme", icon: Clock, description: "Burial service" },
    { href: "/hymns", label: "Hymns", icon: Music, description: "Songs of comfort" },
    {
      href: "/gallery",
      label: "Gallery",
      icon: Camera,
      description: `${galleryCount} photos & growing`,
    },
    {
      href: "/committee/contributions",
      label: "Contribute",
      icon: HandHeart,
      description: "Support the family",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--gold)_0%,_transparent_70%)] opacity-[0.04]" />

        <div className="relative max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <FadeIn delay={0}>
            <SectionLabel>In Loving Memory</SectionLabel>
          </FadeIn>

          {/* Photo */}
          <FadeIn delay={0.1} direction="none">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-2 border-gold/30 dark:border-gold-light/30 shadow-lg shadow-gold/10 dark:shadow-gold-light/5">
              <Image
                src="/dennis.png"
                alt="Denis Letian Sekento"
                fill
                className="object-cover scale-[1.5] translate-y-[12%]"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-light tracking-wide text-foreground">
              {person.fullName}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-label text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {new Date(person.birthDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" — "}
              {new Date(person.deathDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <GoldDivider />
          </FadeIn>

          <FadeIn delay={0.5}>
            <blockquote className="font-heading text-lg sm:text-xl md:text-2xl italic text-gold dark:text-gold-light leading-relaxed">
              &ldquo;{person.scripture.text}&rdquo;
            </blockquote>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground mt-2">
              &mdash; {person.scripture.reference}
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <GoldDivider />
          </FadeIn>

          <FadeIn delay={0.7}>
            <Card className="max-w-md mx-auto bg-card/50 backdrop-blur border-gold/20">
              <CardContent className="pt-6 text-center space-y-3">
                <SectionLabel>Burial Service — Kipeto, Kajiado</SectionLabel>
                <p className="font-heading text-xl sm:text-2xl text-foreground">
                  {person.burialDay},{" "}
                  {new Date(person.burialDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-muted-foreground">{person.burialLocation}</p>
                <div className="pt-4">
                  <CountdownTimer targetDate={person.burialDate} />
                </div>
                <MapView
                  lat={BURIAL_COORDS.lat}
                  lng={BURIAL_COORDS.lng}
                  zoom={13}
                  mapType="satellite"
                  label="Kipeto, Kajiado"
                  compact
                />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <Stagger className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {navCards.map((card) => (
            <StaggerItem key={card.href}>
              <NavCard item={card} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}

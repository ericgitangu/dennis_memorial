import { memorial } from "@/lib/content";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Heart, Clock, Music } from "lucide-react";

const navCards = [
  { href: "/biography", label: "Biography", icon: BookOpen, description: "His life story" },
  { href: "/tributes", label: "Tributes", icon: Heart, description: "Words of love" },
  { href: "/programme", label: "Programme", icon: Clock, description: "Burial service" },
  { href: "/hymns", label: "Hymns", icon: Music, description: "Songs of comfort" },
];

export default function HomePage() {
  const { person } = memorial;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--gold)_0%,_transparent_70%)] opacity-[0.04]" />

        <div className="relative max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <SectionLabel>In Loving Memory</SectionLabel>

          {/* Photo */}
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

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-light tracking-wide text-foreground dark:text-foreground">
            {person.fullName}
          </h1>

          <p className="font-label text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground dark:text-muted-foreground">
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

          <GoldDivider />

          <blockquote className="font-heading text-lg sm:text-xl md:text-2xl italic text-gold dark:text-gold-light leading-relaxed">
            &ldquo;{person.scripture.text}&rdquo;
          </blockquote>
          <p className="font-label text-xs uppercase tracking-widest text-muted-foreground dark:text-muted-foreground">
            &mdash; {person.scripture.reference}
          </p>

          <GoldDivider />

          <Card className="max-w-md mx-auto bg-card/50 backdrop-blur border-gold/20">
            <CardContent className="pt-6 text-center space-y-3">
              <SectionLabel>Burial Service</SectionLabel>
              <p className="font-heading text-xl sm:text-2xl text-foreground dark:text-foreground">
                {person.burialDay},{" "}
                {new Date(person.burialDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {person.burialLocation}
              </p>
              <div className="pt-4">
                <CountdownTimer targetDate={person.burialDate} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {navCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <Card className="group h-full bg-card/50 backdrop-blur border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
                <CardContent className="pt-6 text-center space-y-3">
                  <card.icon className="h-8 w-8 mx-auto text-gold group-hover:text-gold-light transition-colors" />
                  <h3 className="font-heading text-base sm:text-lg text-foreground dark:text-foreground">
                    {card.label}
                  </h3>
                  <p className="text-xs text-muted-foreground font-label uppercase tracking-wider">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

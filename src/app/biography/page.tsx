import { memorial } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Biography | Denis Letian Sekento",
};

export default function BiographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <SectionLabel>Biography</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-light text-foreground dark:text-foreground">
          The Life of {memorial.person.fullName}
        </h1>
        <GoldDivider />
      </div>

      <div className="space-y-8">
        {memorial.biography.chapters.map((chapter, index) => (
          <Card key={chapter.id} className="bg-card/50 backdrop-blur border-gold/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="font-label text-xs text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CardTitle className="font-heading text-lg sm:text-xl md:text-2xl font-light text-foreground dark:text-foreground">
                  {chapter.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/80 dark:text-foreground/75">
                {chapter.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <GoldDivider />
        <div className="text-center">
          <SectionLabel>{memorial.maaObituary.title}</SectionLabel>
        </div>
        <Card className="bg-gold/5 border-gold/20">
          <CardContent className="pt-6">
            <p className="font-heading text-base sm:text-lg italic leading-relaxed text-center text-foreground dark:text-foreground/90">
              {memorial.maaObituary.content}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Gallery | Denis Letian Sekento",
};

export default function GalleryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <SectionLabel>Gallery</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-light text-foreground dark:text-foreground">
          Photo Gallery
        </h1>
        <GoldDivider />
      </div>

      <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20 max-w-lg mx-auto">
        <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 text-center space-y-4 sm:space-y-6">
          <Lock className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gold/40 dark:text-gold-light/40" />
          <h2 className="font-heading text-xl sm:text-2xl font-light text-foreground dark:text-foreground">
            Coming Soon
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground max-w-sm mx-auto">
            The public gallery will open after the burial service on February 28, 2026. Committee
            members can access the planning gallery through the committee portal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

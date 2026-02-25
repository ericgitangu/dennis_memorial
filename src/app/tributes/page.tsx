import { memorial } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Tributes | Denis Letian Sekento",
};

export default function TributesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <SectionLabel>Tributes</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-light text-foreground dark:text-foreground">
          Words of Love
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground max-w-xl mx-auto">
          Heartfelt tributes from those who loved Denis most
        </p>
        <GoldDivider />
      </div>

      <Accordion type="single" collapsible defaultValue="wife" className="space-y-4">
        {memorial.tributes.map((tribute) => (
          <AccordionItem
            key={tribute.id}
            value={tribute.id}
            className="border border-gold/10 dark:border-gold/20 rounded-lg px-4 sm:px-6 bg-card/50 dark:bg-card/30 backdrop-blur"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-3 text-left">
                <div>
                  <h3 className="font-heading text-base sm:text-xl text-foreground dark:text-foreground">
                    {tribute.author}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-gold border-gold/30 font-label text-[10px] uppercase tracking-wider mt-1"
                  >
                    {tribute.role}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <blockquote className="font-heading text-sm sm:text-base md:text-lg italic leading-relaxed text-foreground/80 dark:text-foreground/75 border-l-2 border-gold/30 dark:border-gold-light/30 pl-4 sm:pl-6">
                {tribute.content}
              </blockquote>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

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
  title: "Hymns | Denis Letian Sekento",
};

export default function HymnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <SectionLabel>Hymns</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-light text-foreground dark:text-foreground">
          Songs of Comfort
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground max-w-xl mx-auto">
          Hymns selected for the burial service of {memorial.person.fullName}
        </p>
        <GoldDivider />
      </div>

      <Accordion type="single" collapsible defaultValue="it-is-well" className="space-y-4">
        {memorial.hymns.map((hymn) => (
          <AccordionItem
            key={hymn.id}
            value={hymn.id}
            className="border border-gold/10 dark:border-gold/20 rounded-lg px-4 sm:px-6 bg-card/50 dark:bg-card/30 backdrop-blur"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-3 text-left">
                <div>
                  <h3 className="font-heading text-base sm:text-xl text-foreground dark:text-foreground">
                    {hymn.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-gold border-gold/30 font-label text-[10px] uppercase tracking-wider mt-1"
                  >
                    {hymn.language}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <pre className="font-heading text-sm sm:text-base italic leading-relaxed text-foreground/80 dark:text-foreground/75 whitespace-pre-wrap">
                {hymn.lyrics}
              </pre>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

import { memorial } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";

export const metadata = {
  title: "Programme | Denis Letian Sekento",
};

export default function ProgrammePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <SectionLabel>Programme</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-light text-foreground dark:text-foreground">
          Burial Service
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground">
          {memorial.person.burialDay},{" "}
          {new Date(memorial.person.burialDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" — "}
          {memorial.person.burialLocation}
        </p>
        <GoldDivider />
      </div>

      <div className="relative">
        <div className="absolute left-[5.5rem] sm:left-[7.5rem] md:left-[9rem] top-0 bottom-0 w-px bg-gold/20 dark:bg-gold-light/15" />

        <div className="space-y-0">
          {memorial.programme.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 sm:gap-4 md:gap-6 group py-3 sm:py-4"
            >
              <div className="w-20 sm:w-24 md:w-32 text-right shrink-0">
                <span className="font-label text-[10px] sm:text-xs md:text-sm text-gold dark:text-gold-light tracking-wider">
                  {item.time}
                </span>
              </div>
              <div className="relative shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gold/40 dark:bg-gold-light/40 group-hover:bg-gold dark:group-hover:bg-gold-light transition-colors border-2 border-background" />
              </div>
              <div className="pb-2">
                <p className="font-heading text-sm sm:text-base md:text-lg text-foreground dark:text-foreground group-hover:text-gold dark:group-hover:text-gold-light transition-colors">
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
          Timings are approximate and subject to change
        </p>
      </div>
    </div>
  );
}

import { GoldDivider } from "@/components/GoldDivider";

export function Footer() {
  return (
    <>
      <GoldDivider />
      <footer className="py-12 px-4 text-center">
        <p className="font-heading text-base sm:text-lg italic text-gold dark:text-gold-light mb-2">
          &ldquo;He fought a good fight, finished the course, and kept the faith.&rdquo;
        </p>
        <p className="font-label text-xs uppercase tracking-widest text-muted-foreground dark:text-muted-foreground mb-6">
          &mdash; 2 Timothy 4:7
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
          Crafted with ❤️ by{" "}
          <a
            href="https://developer.ericgitangu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold dark:text-gold-light hover:text-gold-light dark:hover:text-gold transition-colors underline underline-offset-4"
          >
            Eric Gitangu
          </a>
        </p>
      </footer>
    </>
  );
}

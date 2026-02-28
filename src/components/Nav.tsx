"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { GoldDivider } from "@/components/GoldDivider";

const links = [
  { href: "/", label: "Home" },
  { href: "/biography", label: "Biography" },
  { href: "/tributes", label: "Tributes" },
  { href: "/programme", label: "Programme" },
  { href: "/hymns", label: "Hymns" },
  { href: "/gallery", label: "Gallery" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 dark:bg-background/90 border-b border-border dark:border-gold/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-base sm:text-xl font-light tracking-wide text-gold dark:text-gold-light"
          >
            Denis Letian Sekento
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-xs font-label uppercase tracking-widest transition-colors hover:text-gold ${
                  pathname === link.href ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/auth">
              <Button
                variant="outline"
                size="sm"
                className="ml-2 border-gold text-gold hover:bg-gold hover:text-primary-foreground font-label uppercase tracking-widest text-xs"
              >
                Committee Access
              </Button>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border w-72">
                <SheetTitle className="font-heading text-gold text-lg">Navigation</SheetTitle>
                <nav className="flex flex-col gap-2 mt-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-2 text-xs font-label uppercase tracking-widest transition-colors hover:text-gold ${
                        pathname === link.href ? "text-gold" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/auth" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-gold text-gold hover:bg-gold hover:text-primary-foreground font-label uppercase tracking-widest text-xs"
                    >
                      Committee Access
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <GoldDivider />
    </>
  );
}

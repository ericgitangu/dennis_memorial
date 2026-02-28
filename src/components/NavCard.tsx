import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export interface NavCardItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  external?: boolean;
}

export function NavCard({ item }: { item: NavCardItem }) {
  const Wrapper = item.external ? "a" : Link;
  const externalProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper href={item.href} {...externalProps}>
      <Card className="group h-full bg-card/50 backdrop-blur border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
        <CardContent className="pt-6 text-center space-y-3">
          <item.icon className="h-8 w-8 mx-auto text-gold group-hover:text-gold-light transition-colors" />
          <h3 className="font-heading text-base sm:text-lg text-foreground">{item.label}</h3>
          <p className="text-xs text-muted-foreground font-label uppercase tracking-wider">
            {item.description}
          </p>
        </CardContent>
      </Card>
    </Wrapper>
  );
}

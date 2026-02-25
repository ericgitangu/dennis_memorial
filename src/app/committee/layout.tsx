import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";

const committeeLinks = [
  { href: "/committee", label: "Dashboard" },
  { href: "/committee/gallery", label: "Gallery" },
  { href: "/committee/contributions", label: "Contributions" },
  { href: "/committee/logistics", label: "Logistics" },
];

export default async function CommitteeLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("committee_session");

  if (!session?.value) {
    redirect("/auth");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <SectionLabel>Committee Portal</SectionLabel>
      </div>
      <nav className="flex flex-wrap justify-center gap-2 mb-6">
        {committeeLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 text-xs font-label uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors border border-gold/10 rounded-md hover:border-gold/30"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <GoldDivider />
      <div className="mt-8">{children}</div>
    </div>
  );
}

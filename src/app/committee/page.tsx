import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { memorial } from "@/lib/content";
import { Camera, CreditCard, Truck, Users } from "lucide-react";

export const metadata = {
  title: "Committee Dashboard | Denis Sekento Memorial",
};

const sections = [
  { title: "Gallery", icon: Camera, status: "active", description: "Upload planning photos" },
  { title: "Contributions", icon: CreditCard, status: "active", description: "M-Pesa tracker" },
  { title: "Logistics", icon: Truck, status: "in-progress", description: "Transport & catering" },
  {
    title: "Committee",
    icon: Users,
    status: "confirmed",
    description: `${memorial.committee.members.length} members`,
  },
];

export default function CommitteeDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Card key={section.title} className="bg-card/50 backdrop-blur border-gold/10">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <section.icon className="h-5 w-5 text-gold" />
              <CardTitle className="font-heading text-lg font-light">{section.title}</CardTitle>
              <Badge
                variant="outline"
                className={`ml-auto font-label text-[10px] uppercase tracking-wider ${
                  section.status === "active"
                    ? "text-green-500 border-green-500/30"
                    : section.status === "confirmed"
                      ? "text-gold border-gold/30"
                      : "text-yellow-500 border-yellow-500/30"
                }`}
              >
                {section.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
                {section.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Committee Members */}
      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light">Committee Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {memorial.committee.members.map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30"
              >
                <span className="text-xs sm:text-sm text-foreground dark:text-foreground">
                  {member.name}
                </span>
                <Badge
                  variant="outline"
                  className="text-gold border-gold/30 font-label text-[10px] uppercase"
                >
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

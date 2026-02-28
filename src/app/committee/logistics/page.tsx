import { memorial } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapView } from "@/components/MapView";
import { Truck, ChefHat, MapPin, Building } from "lucide-react";

export const metadata = {
  title: "Logistics | Denis Sekento Memorial",
};

const items = [
  {
    title: "Transport",
    icon: Truck,
    detail: memorial.logistics.transport,
    status: "pending",
  },
  {
    title: "Catering",
    icon: ChefHat,
    detail: memorial.logistics.catering,
    status: "pending",
  },
  {
    title: "Burial Venue",
    icon: MapPin,
    detail: memorial.logistics.venue,
    status: "confirmed",
  },
  {
    title: "Funeral Home",
    icon: Building,
    detail: memorial.logistics.funeralHome,
    status: "confirmed",
  },
];

// Kipeto, Kajiado coordinates
const BURIAL_LOCATION = { lat: -1.7768, lng: 36.8219 };

export default function LogisticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Logistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.title} className="bg-card/50 backdrop-blur border-gold/10">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <item.icon className="h-5 w-5 text-gold" />
              <CardTitle className="font-heading text-lg font-light">{item.title}</CardTitle>
              <Badge
                variant="outline"
                className={`ml-auto font-label text-[10px] uppercase tracking-wider ${
                  item.status === "confirmed"
                    ? "text-green-500 border-green-500/30"
                    : "text-yellow-500 border-yellow-500/30"
                }`}
              >
                {item.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
                {item.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Burial Location Map */}
      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-light flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gold" />
            Burial Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MapView
            lat={BURIAL_LOCATION.lat}
            lng={BURIAL_LOCATION.lng}
            label="Kipeto, Kajiado — Burial Venue"
            zoom={13}
          />
        </CardContent>
      </Card>
    </div>
  );
}

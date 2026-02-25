import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Activity } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Denis Sekento Memorial",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Shield className="h-5 w-5 text-gold dark:text-gold-light" />
            <CardTitle className="font-heading text-base sm:text-lg font-light text-foreground dark:text-foreground">
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
              Manage committee phone whitelist and admin permissions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <FileText className="h-5 w-5 text-gold" />
            <CardTitle className="font-heading text-base sm:text-lg font-light text-foreground dark:text-foreground">
              Content Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
              Edit biography, tributes, programme timings, and hymn content.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Activity className="h-5 w-5 text-gold" />
            <CardTitle className="font-heading text-base sm:text-lg font-light text-foreground dark:text-foreground">
              Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
              View all actions taken by committee members and admins.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Users className="h-5 w-5 text-gold" />
            <CardTitle className="font-heading text-base sm:text-lg font-light text-foreground dark:text-foreground">
              Committee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
              View and manage committee member access and roles.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

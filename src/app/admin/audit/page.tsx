import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Audit Log | Denis Sekento Memorial",
};

export default function AuditPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Audit Log
      </h1>

      <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20 overflow-x-auto">
        <CardHeader>
          <CardTitle className="font-heading text-lg sm:text-xl font-light text-foreground dark:text-foreground">
            Activity History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-label text-xs uppercase tracking-wider">
                  Timestamp
                </TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">User</TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">
                  Action
                </TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">
                  Section
                </TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground py-8"
                >
                  No activity recorded yet. Actions will appear here as committee members and admins
                  interact with the system.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

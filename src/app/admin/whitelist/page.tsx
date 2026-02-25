"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Trash2 } from "lucide-react";

interface WhitelistEntry {
  phone: string;
  name: string;
  role: string;
}

export default function WhitelistPage() {
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);
  const [phone, setPhone] = useState("+254");
  const [name, setName] = useState("");
  const [role, setRole] = useState("family");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Add to Supabase committee_whitelist table
    setEntries([...entries, { phone, name, role }]);
    setPhone("+254");
    setName("");
  }

  function handleRemove(index: number) {
    // TODO: Remove from Supabase
    setEntries(entries.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Phone Whitelist
      </h1>

      {/* Add Entry */}
      <Card className="bg-card/50 backdrop-blur border-gold/10 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-gold" />
            Add Committee Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-label text-xs uppercase tracking-wider">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gold/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-label text-xs uppercase tracking-wider">Phone</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-gold/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-label text-xs uppercase tracking-wider">Role</Label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gold/20 dark:border-gold/30 bg-background dark:bg-background text-sm text-foreground dark:text-foreground"
              >
                <option value="family">Family</option>
                <option value="organizer">Organizer</option>
                <option value="friend">Friend</option>
              </select>
            </div>
            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-label uppercase tracking-wider text-xs"
            >
              Add to Whitelist
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Whitelist Table */}
      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light">Current Whitelist</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-label text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">Phone</TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">Role</TableHead>
                <TableHead className="font-label text-xs uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No entries yet. Add committee members above.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, i) => (
                  <TableRow key={i}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell className="font-label text-xs">{entry.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-gold border-gold/30 font-label text-[10px] uppercase"
                      >
                        {entry.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(i)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

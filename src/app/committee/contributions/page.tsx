"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Phone, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { memorial } from "@/lib/content";
import { createBrowserClient } from "@/lib/supabase";

interface MpesaContribution {
  id: string;
  phone: string;
  amount: number;
  mpesa_ref: string | null;
  contributor_name: string | null;
  status: string;
  created_at: string;
}

const { contributions: contribData } = memorial;

// Calculate totals from static records
const confirmedTotal = contribData.records
  .filter((r) => r.confirmed)
  .reduce((sum, r) => sum + r.amount, 0);
const allTotal = contribData.records.reduce((sum, r) => sum + r.amount, 0);

export default function ContributionsPage() {
  const [phone, setPhone] = useState("+254");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [mpesaContributions, setMpesaContributions] = useState<MpesaContribution[]>([]);

  const fetchContributions = useCallback(async () => {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from("contributions")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setMpesaContributions(data);
    } catch {
      // Supabase not configured yet
    }
  }, []);

  useEffect(() => {
    fetchContributions();
    try {
      const supabase = createBrowserClient();
      const channel = supabase
        .channel("contributions-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "contributions" }, () =>
          fetchContributions(),
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      // No realtime
    }
  }, [fetchContributions]);

  const mpesaTotal = mpesaContributions
    .filter((c) => c.status === "completed")
    .reduce((sum, c) => sum + c.amount, 0);

  async function handleSTKPush(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: Number(amount), name: name || undefined }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Check your phone for the M-Pesa prompt");
        setAmount("");
        setName("");
        setTimeout(fetchContributions, 2000);
      } else {
        toast.error(data.error || "Failed to initiate payment");
      }
    } catch {
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Contributions Towards Denis&apos; Sendoff
      </h1>

      {/* Collecting Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground font-label uppercase tracking-wider flex items-center justify-center gap-2">
          <Phone className="h-3 w-3" />
          Collecting: {contribData.collectingPhone} ({contribData.collectingName})
        </p>
      </div>

      {/* Running Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        <Card className="bg-gold/5 border-gold/20">
          <CardContent className="pt-6 text-center">
            <p className="font-label text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Confirmed
            </p>
            <p className="text-2xl sm:text-3xl font-heading text-gold dark:text-gold-light">
              KES {(confirmedTotal + mpesaTotal).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-gold/10">
          <CardContent className="pt-6 text-center">
            <p className="font-label text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Total Pledged
            </p>
            <p className="text-2xl sm:text-3xl font-heading text-foreground">
              KES {(allTotal + mpesaTotal).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Records Table */}
      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light">
            Contributions ({contribData.records.length} records)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-label text-xs uppercase tracking-wider w-8">
                    #
                  </TableHead>
                  <TableHead className="font-label text-xs uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="font-label text-xs uppercase tracking-wider text-right">
                    Amount (KES)
                  </TableHead>
                  <TableHead className="font-label text-xs uppercase tracking-wider text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contribData.records.map((record, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="text-sm">{record.name}</TableCell>
                    <TableCell className="text-sm font-label text-right">
                      {record.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {record.confirmed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* M-Pesa Online Contributions */}
      {mpesaContributions.length > 0 && (
        <Card className="bg-card/50 backdrop-blur border-gold/10">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-light">
              M-Pesa Online Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-label text-xs uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="font-label text-xs uppercase tracking-wider">
                    Amount
                  </TableHead>
                  <TableHead className="font-label text-xs uppercase tracking-wider">Ref</TableHead>
                  <TableHead className="font-label text-xs uppercase tracking-wider">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mpesaContributions.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="text-sm">
                      {c.contributor_name || c.phone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2")}
                    </TableCell>
                    <TableCell className="text-sm font-label">
                      KES {c.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {c.mpesa_ref || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-label text-[10px] uppercase tracking-wider ${
                          c.status === "completed"
                            ? "text-green-500 border-green-500/30"
                            : c.status === "pending"
                              ? "text-yellow-500 border-yellow-500/30"
                              : "text-red-500 border-red-500/30"
                        }`}
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* STK Push Form */}
      <Card className="bg-card/50 backdrop-blur border-gold/10 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gold" />
            Contribute via M-Pesa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSTKPush} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-label text-xs uppercase tracking-wider">Your Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Optional"
                className="border-gold/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-label text-xs uppercase tracking-wider">Phone Number</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-gold/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-label text-xs uppercase tracking-wider">Amount (KES)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                min="1"
                className="border-gold/20"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-label uppercase tracking-wider text-xs"
            >
              {loading ? "Processing..." : "Send M-Pesa Prompt"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { CreditCard } from "lucide-react";

export default function ContributionsPage() {
  const [phone, setPhone] = useState("+254");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSTKPush(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: Number(amount) }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Check your phone for the M-Pesa prompt");
      }
    } catch {
      alert("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Contributions
      </h1>

      {/* Running Total */}
      <Card className="bg-gold/5 border-gold/20 max-w-sm mx-auto">
        <CardContent className="pt-6 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Total Collected
          </p>
          <p className="text-3xl sm:text-4xl font-heading text-gold dark:text-gold-light">KES 0</p>
        </CardContent>
      </Card>

      {/* STK Push Form */}
      <Card className="bg-card/50 backdrop-blur border-gold/10 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gold" />
            M-Pesa Contribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSTKPush} className="space-y-4">
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

      {/* Contribution List */}
      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardHeader>
          <CardTitle className="font-heading text-xl font-light">Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-label text-xs uppercase tracking-wider">Name</TableHead>
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
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No contributions yet. Initiate an M-Pesa payment above.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

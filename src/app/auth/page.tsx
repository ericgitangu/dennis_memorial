"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Phone } from "lucide-react";

export default function AuthPage() {
  const [phone, setPhone] = useState("+254");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      router.push(`/auth/verify?phone=${encodeURIComponent(phone)}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <SectionLabel>Committee Access</SectionLabel>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-foreground dark:text-foreground">
          Verify Your Identity
        </h1>
        <p className="text-muted-foreground dark:text-muted-foreground text-xs sm:text-sm">
          Enter your phone number to receive a verification code. Only whitelisted committee members
          can access this area.
        </p>
        <GoldDivider />
      </div>

      <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
        <CardHeader>
          <CardTitle className="font-heading text-lg sm:text-xl font-light flex items-center gap-2 text-foreground dark:text-foreground">
            <Phone className="h-5 w-5 text-gold dark:text-gold-light" />
            Phone Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="font-label text-xs uppercase tracking-wider text-foreground dark:text-foreground/80"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className="border-gold/20 dark:border-gold/30 focus:border-gold bg-background dark:bg-background text-foreground dark:text-foreground"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-label uppercase tracking-wider text-xs"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

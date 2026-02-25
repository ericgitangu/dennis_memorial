"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Shield } from "lucide-react";

function VerifyForm() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code");
        return;
      }

      router.push("/committee");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
      <CardHeader>
        <CardTitle className="font-heading text-lg sm:text-xl font-light flex items-center gap-2 text-foreground dark:text-foreground">
          <Shield className="h-5 w-5 text-gold dark:text-gold-light" />
          Enter Verification Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
            A 6-digit code was sent to{" "}
            <strong className="text-gold dark:text-gold-light">{phone}</strong>
          </p>
          <div className="space-y-2">
            <Label htmlFor="otp" className="font-label text-xs uppercase tracking-wider">
              Verification Code
            </Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="border-gold/20 dark:border-gold/30 focus:border-gold bg-background dark:bg-background text-foreground dark:text-foreground text-center text-xl sm:text-2xl tracking-[0.5em] font-label"
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-label uppercase tracking-wider text-xs"
          >
            {loading ? "Verifying..." : "Verify & Enter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <SectionLabel>Verification</SectionLabel>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-foreground dark:text-foreground">
          Enter Your Code
        </h1>
        <GoldDivider />
      </div>
      <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}

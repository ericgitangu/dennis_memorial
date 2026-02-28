"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Phone, ShieldX } from "lucide-react";

function AccessDenied() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Countdown and redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <SectionLabel>Access Restricted</SectionLabel>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-foreground">
          Committee Members Only
        </h1>
        <GoldDivider />
      </div>

      <Card className="bg-card/50 backdrop-blur border-destructive/30 overflow-hidden relative">
        {/* Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="h-10 w-10 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-xl font-light text-foreground">Access Denied</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              This phone number is not authorized for committee access. Only whitelisted committee
              members can view this area.
            </p>
          </div>
          <div className="pt-2">
            <p className="text-xs text-muted-foreground font-label uppercase tracking-wider">
              Redirecting to homepage in{" "}
              <span className="text-gold font-heading text-lg">{countdown}</span> seconds
            </p>
            <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full bg-gold transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-gold/30 text-gold hover:bg-gold/10 font-label uppercase tracking-wider text-xs"
          >
            Go Home Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthPage() {
  const [phone, setPhone] = useState("+254");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [denied, setDenied] = useState(false);
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

      if (res.status === 403 && data.error === "ACCESS_DENIED") {
        setDenied(true);
        return;
      }

      if (!res.ok) {
        setError(data.message || data.error || "Failed to send OTP");
        return;
      }

      // If OTP returned directly (no SMS provider), pass it to verify page
      const params = new URLSearchParams({ phone });
      if (data.otp) params.set("code", data.otp);
      router.push(`/auth/verify?${params.toString()}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (denied) {
    return <AccessDenied />;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <SectionLabel>Committee Access</SectionLabel>
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-foreground">
          Verify Your Identity
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Enter your phone number to receive a verification code. Only whitelisted committee members
          can access this area.
        </p>
        <GoldDivider />
      </div>

      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardHeader>
          <CardTitle className="font-heading text-lg sm:text-xl font-light flex items-center gap-2 text-foreground">
            <Phone className="h-5 w-5 text-gold" />
            Phone Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-label text-xs uppercase tracking-wider">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className="border-gold/20 focus:border-gold"
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

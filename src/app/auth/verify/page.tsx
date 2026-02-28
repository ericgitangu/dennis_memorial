"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/SectionLabel";
import { GoldDivider } from "@/components/GoldDivider";
import { Shield, CheckCircle2, Sparkles } from "lucide-react";

function VerifyForm() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoVerifying, setAutoVerifying] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const codeFromUrl = searchParams.get("code") || "";

  async function verify(code: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid code");
        setAutoVerifying(false);
        return;
      }

      // Show welcome message before redirecting
      setWelcomeName(data.name || "Committee Member");
      setTimeout(() => router.push("/committee"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setAutoVerifying(false);
    } finally {
      setLoading(false);
    }
  }

  // Auto-verify when code is passed from URL (no SMS provider mode)
  useEffect(() => {
    if (codeFromUrl && codeFromUrl.length === 6) {
      setOtp(codeFromUrl);
      setAutoVerifying(true);
      verify(codeFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeFromUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await verify(otp);
  }

  // Welcome screen after successful verification
  if (welcomeName) {
    return (
      <Card className="bg-card/50 backdrop-blur border-gold/20 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
        <CardContent className="pt-10 pb-10 text-center space-y-5">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-gold" />
          </div>
          <div className="space-y-2">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Welcome back
            </p>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-foreground">
              Hello, {welcomeName}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Thank you for being part of Denis&apos; memorial committee. Redirecting you to the
            portal...
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full animate-pulse"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (autoVerifying) {
    return (
      <Card className="bg-card/50 backdrop-blur border-gold/10">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center animate-pulse">
            <CheckCircle2 className="h-8 w-8 text-gold" />
          </div>
          <p className="font-heading text-lg text-foreground">Verifying...</p>
          <p className="text-xs text-muted-foreground">Authenticating your identity</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-gold/10">
      <CardHeader>
        <CardTitle className="font-heading text-lg sm:text-xl font-light flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-gold" />
          Enter Verification Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {codeFromUrl ? (
              <>Your verification code is pre-filled below.</>
            ) : (
              <>
                A 6-digit code was sent to <strong className="text-gold">{phone}</strong>
              </>
            )}
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
              className="border-gold/20 focus:border-gold text-center text-xl sm:text-2xl tracking-[0.5em] font-label"
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
        <h1 className="text-2xl sm:text-3xl font-heading font-light text-foreground">
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

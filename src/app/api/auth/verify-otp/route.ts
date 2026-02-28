import { NextResponse } from "next/server";
import crypto from "crypto";
import { otpStore, sessionStore } from "@/lib/auth-store";
import { findMember } from "@/app/api/auth/send-otp/route";

function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function normalizePhone(phone: string): string {
  let p = phone.replace(/[\s\-()]/g, "");
  if (p.startsWith("07")) p = "+254" + p.slice(1);
  if (p.startsWith("254")) p = "+" + p;
  return p;
}

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp || otp.length !== 6) {
      return NextResponse.json({ error: "Invalid phone or OTP" }, { status: 400 });
    }

    const normalized = normalizePhone(phone);
    const otpHash = hashOtp(otp);

    // Look up stored OTP
    const stored = otpStore.get(normalized);

    if (!stored) {
      return NextResponse.json(
        { error: "No verification code found. Please request a new one." },
        { status: 401 },
      );
    }

    if (stored.expiresAt < Date.now()) {
      otpStore.delete(normalized);
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
        { status: 401 },
      );
    }

    if (stored.otpHash !== otpHash) {
      return NextResponse.json({ error: "Invalid verification code." }, { status: 401 });
    }

    if (stored.verified) {
      return NextResponse.json({ error: "This code has already been used." }, { status: 401 });
    }

    // Mark as verified and remove
    stored.verified = true;
    otpStore.delete(normalized);

    // Create session
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const member = findMember(normalized);
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    sessionStore.set(sessionToken, {
      phone: normalized,
      name: member?.name || "Unknown",
      role: member?.role || "family",
      expiresAt,
    });

    console.log(`[Auth] ${member?.name} (${normalized}) logged in successfully`);

    const response = NextResponse.json({
      success: true,
      name: member?.name,
      role: member?.role,
    });

    // Set committee session cookie (7 days)
    response.cookies.set("committee_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // If organizer, also grant admin access
    if (member?.role === "organizer") {
      response.cookies.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("[OTP Verify] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

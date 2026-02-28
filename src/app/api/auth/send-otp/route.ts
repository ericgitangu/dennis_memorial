import { NextResponse } from "next/server";
import crypto from "crypto";
import { otpStore, type CommitteeMember } from "@/lib/auth-store";

// Hardcoded committee whitelist
const COMMITTEE_WHITELIST: CommitteeMember[] = [
  { phone: "+254710526821", name: "Gideon Tipaya", role: "organizer" },
  { phone: "+254737492018", name: "Gideon Tipaya", role: "organizer" }, // alt number
  { phone: "+254716114924", name: "Mugo Cuzo", role: "family" },
  { phone: "+254796113193", name: "Mugo Cuzo", role: "family" }, // alt number
  { phone: "+254721355854", name: "Lelit Kiok", role: "family" },
  { phone: "+254717114868", name: "Serea Sekento", role: "family" },
  { phone: "+254727443333", name: "Jacqueline Monana", role: "organizer" },
  { phone: "+254708078997", name: "Eric Gitangu", role: "organizer" }, // also Edward Gitangu
  { phone: "+254728298076", name: "Kenneth Sekento", role: "family" },
  { phone: "+254720554505", name: "Eric Sekento", role: "organizer" },
];

function normalizePhone(phone: string): string {
  let p = phone.replace(/[\s\-()]/g, "");
  if (p.startsWith("07")) p = "+254" + p.slice(1);
  if (p.startsWith("254")) p = "+" + p;
  return p;
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

async function sendSms(phone: string, message: string): Promise<boolean> {
  const apiKey = process.env.AFRICAS_TALKING_API_KEY;
  const username = process.env.AFRICAS_TALKING_USERNAME || "sandbox";

  if (!apiKey) {
    console.log(`[OTP] SMS to ${phone}: ${message}`);
    return true;
  }

  const baseUrl =
    username === "sandbox"
      ? "https://api.sandbox.africastalking.com/version1/messaging"
      : "https://api.africastalking.com/version1/messaging";

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      apiKey,
    },
    body: new URLSearchParams({
      username,
      to: phone,
      message,
      from: "",
    }),
  });

  return res.ok;
}

export function findMember(phone: string): CommitteeMember | undefined {
  const normalized = normalizePhone(phone);
  return COMMITTEE_WHITELIST.find((m) => m.phone === normalized);
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const normalized = normalizePhone(phone);

    if (!normalized.startsWith("+254") || normalized.length !== 13) {
      return NextResponse.json(
        { error: "Invalid phone number. Must be a valid Kenyan number." },
        { status: 400 },
      );
    }

    // Check against whitelist
    const member = findMember(normalized);

    if (!member) {
      return NextResponse.json(
        {
          error: "ACCESS_DENIED",
          message: "This phone number is not authorized for committee access.",
        },
        { status: 403 },
      );
    }

    // Generate OTP and store
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(normalized, { otpHash, expiresAt, verified: false });

    // Send SMS
    const sent = await sendSms(
      normalized,
      `Your Denis Sekento Memorial verification code is: ${otp}. Valid for 10 minutes.`,
    );

    if (!sent) {
      return NextResponse.json({ error: "Failed to send SMS. Please try again." }, { status: 500 });
    }

    console.log(`[OTP] Sent to ${member.name} (${normalized})`);

    const smsConfigured = !!process.env.AFRICAS_TALKING_API_KEY;

    return NextResponse.json({
      success: true,
      message: smsConfigured ? "Verification code sent via SMS" : "Verification code generated",
      memberName: member.name,
      // When no SMS provider is configured, return OTP directly so members can still authenticate
      ...(!smsConfigured && { otp }),
    });
  } catch (err) {
    console.error("[OTP] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

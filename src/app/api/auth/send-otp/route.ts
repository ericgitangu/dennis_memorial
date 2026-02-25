import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone || !phone.startsWith("+254")) {
      return NextResponse.json(
        { error: "Invalid phone number. Must start with +254" },
        { status: 400 },
      );
    }

    // TODO: Check phone against committee_whitelist in Supabase
    // TODO: Generate OTP, hash it, store in otp_sessions table
    // TODO: Send OTP via Africa's Talking SMS API

    // For now, stub: accept any +254 number
    console.log(`[OTP] Would send OTP to ${phone}`);

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

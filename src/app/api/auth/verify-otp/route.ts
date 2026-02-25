import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp || otp.length !== 6) {
      return NextResponse.json({ error: "Invalid phone or OTP" }, { status: 400 });
    }

    // TODO: Verify OTP against otp_sessions table in Supabase
    // TODO: Create committee_session record
    // For now, accept any 6-digit code for development

    console.log(`[OTP] Verifying ${otp} for ${phone}`);

    const response = NextResponse.json({ success: true });

    // Set session cookie (7 days)
    response.cookies.set("committee_session", `session_${Date.now()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

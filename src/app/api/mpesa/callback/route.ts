import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Parse Daraja callback payload
    // 1. Extract ResultCode, MpesaReceiptNumber, Amount, PhoneNumber
    // 2. Update contributions table with status and mpesa_ref
    // 3. Trigger Supabase Realtime update

    console.log("[M-Pesa] Callback received:", JSON.stringify(body));

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
  }
}

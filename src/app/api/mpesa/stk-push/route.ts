import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, amount } = await request.json();

    if (!phone || !amount || amount < 1) {
      return NextResponse.json({ error: "Invalid phone or amount" }, { status: 400 });
    }

    // TODO: Implement actual Daraja API STK Push
    // 1. Get OAuth token from Safaricom
    // 2. Initiate STK Push with phone, amount, shortcode
    // 3. Store checkout_request_id in contributions table
    // 4. Return success/pending status

    console.log(`[M-Pesa] STK Push: ${phone} - KES ${amount}`);

    return NextResponse.json({
      success: true,
      message: "STK push initiated",
      checkoutRequestId: `stub_${Date.now()}`,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

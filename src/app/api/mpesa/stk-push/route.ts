import { NextResponse } from "next/server";
import { initiateStkPush } from "@/lib/mpesa";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { phone, amount, name } = await request.json();

    if (!phone || !amount || amount < 1) {
      return NextResponse.json({ error: "Invalid phone or amount" }, { status: 400 });
    }

    const supabase = createServerClient();

    // Initiate STK Push via Daraja API
    const result = await initiateStkPush(phone, amount);

    if (result.ResponseCode !== "0") {
      return NextResponse.json(
        { error: result.ResponseDescription || "STK Push failed" },
        { status: 502 },
      );
    }

    // Store pending contribution in Supabase
    await supabase.from("contributions").insert({
      phone,
      amount,
      checkout_request_id: result.CheckoutRequestID,
      contributor_name: name || null,
      status: "pending",
    });

    // Log to audit
    await supabase.from("audit_log").insert({
      user_identifier: phone,
      action: "stk_push_initiated",
      section: "contributions",
      details: {
        amount,
        checkoutRequestId: result.CheckoutRequestID,
        merchantRequestId: result.MerchantRequestID,
      },
    });

    return NextResponse.json({
      success: true,
      message: result.CustomerMessage || "Check your phone for the M-Pesa prompt",
      checkoutRequestId: result.CheckoutRequestID,
    });
  } catch (err) {
    console.error("[M-Pesa] STK Push error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}

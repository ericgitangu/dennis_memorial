import { NextResponse } from "next/server";
import { parseStkCallback } from "@/lib/mpesa";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("[M-Pesa] Callback received:", JSON.stringify(body));

    const data = parseStkCallback(body);
    const supabase = createServerClient();

    if (data.resultCode === 0) {
      // Payment successful — update contribution record
      await supabase
        .from("contributions")
        .update({
          status: "completed",
          mpesa_ref: data.mpesaReceiptNumber,
        })
        .eq("checkout_request_id", data.checkoutRequestId);

      // Log success to audit
      await supabase.from("audit_log").insert({
        user_identifier: data.phoneNumber || "system",
        action: "payment_completed",
        section: "contributions",
        details: {
          amount: data.amount,
          mpesaRef: data.mpesaReceiptNumber,
          checkoutRequestId: data.checkoutRequestId,
        },
      });
    } else {
      // Payment failed or cancelled
      await supabase
        .from("contributions")
        .update({ status: "failed" })
        .eq("checkout_request_id", data.checkoutRequestId);

      await supabase.from("audit_log").insert({
        user_identifier: data.phoneNumber || "system",
        action: "payment_failed",
        section: "contributions",
        details: {
          resultCode: data.resultCode,
          resultDesc: data.resultDesc,
          checkoutRequestId: data.checkoutRequestId,
        },
      });
    }

    // Always respond 200 to Safaricom
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("[M-Pesa] Callback error:", err);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}

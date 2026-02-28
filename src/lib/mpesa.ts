/**
 * M-Pesa Daraja API client for Lipa Na M-Pesa STK Push
 * Supports sandbox and production environments.
 */

const ENDPOINTS = {
  sandbox: {
    auth: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    stkPush: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    stkQuery: "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
  },
  production: {
    auth: "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    stkPush: "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    stkQuery: "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
  },
} as const;

type Env = "sandbox" | "production";

function getEnv(): Env {
  return (process.env.MPESA_ENV as Env) || "sandbox";
}

function getEndpoints() {
  return ENDPOINTS[getEnv()];
}

/** Get OAuth bearer token from Safaricom */
export async function getMpesaToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY!;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(getEndpoints().auth, {
    method: "GET",
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`M-Pesa auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

/** Generate Lipa Na M-Pesa password (base64 of shortcode + passkey + timestamp) */
function generatePassword(timestamp: string): string {
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}

/** Format timestamp as YYYYMMDDHHmmss */
function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

/** Normalize phone to 254XXXXXXXXX format */
function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-+]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "254" + cleaned.slice(1);
  } else if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

export interface StkPushResult {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

/** Initiate STK Push (Lipa Na M-Pesa Online) */
export async function initiateStkPush(
  phone: string,
  amount: number,
  accountReference: string = "DenisMemorial",
  description: string = "Memorial Contribution",
): Promise<StkPushResult> {
  const token = await getMpesaToken();
  const timestamp = getTimestamp();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const callbackUrl = `${process.env.APP_URL}/api/mpesa/callback`;

  const payload = {
    BusinessShortCode: shortcode,
    Password: generatePassword(timestamp),
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(amount),
    PartyA: normalizePhone(phone),
    PartyB: shortcode,
    PhoneNumber: normalizePhone(phone),
    CallBackURL: callbackUrl,
    AccountReference: accountReference,
    TransactionDesc: description,
  };

  const res = await fetch(getEndpoints().stkPush, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`STK Push failed: ${res.status} ${text}`);
  }

  return res.json();
}

export interface MpesaCallbackData {
  resultCode: number;
  resultDesc: string;
  merchantRequestId: string;
  checkoutRequestId: string;
  amount?: number;
  mpesaReceiptNumber?: string;
  transactionDate?: string;
  phoneNumber?: string;
}

/** Parse Daraja STK Push callback payload */
export function parseStkCallback(body: Record<string, unknown>): MpesaCallbackData {
  const stkCallback = (body.Body as Record<string, unknown>)?.stkCallback as Record<
    string,
    unknown
  >;

  const result: MpesaCallbackData = {
    resultCode: stkCallback.ResultCode as number,
    resultDesc: stkCallback.ResultDesc as string,
    merchantRequestId: stkCallback.MerchantRequestID as string,
    checkoutRequestId: stkCallback.CheckoutRequestID as string,
  };

  // Extract metadata items on success (ResultCode === 0)
  if (result.resultCode === 0 && stkCallback.CallbackMetadata) {
    const items = (stkCallback.CallbackMetadata as Record<string, unknown>).Item as Array<{
      Name: string;
      Value: string | number;
    }>;

    for (const item of items) {
      switch (item.Name) {
        case "Amount":
          result.amount = item.Value as number;
          break;
        case "MpesaReceiptNumber":
          result.mpesaReceiptNumber = item.Value as string;
          break;
        case "TransactionDate":
          result.transactionDate = String(item.Value);
          break;
        case "PhoneNumber":
          result.phoneNumber = String(item.Value);
          break;
      }
    }
  }

  return result;
}

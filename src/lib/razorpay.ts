import crypto from "crypto";
import Razorpay from "razorpay";

// Server-only helpers for Razorpay. Keys come from environment variables
// (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) and are never sent to the browser,
// except the Key ID, which Razorpay designs to be public.

let client: Razorpay | null = null;

export function getRazorpayKeyId(): string {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) throw new Error("RAZORPAY_KEY_ID is not set");
  return keyId;
}

function getKeySecret(): string {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET is not set");
  return secret;
}

export function getRazorpay(): Razorpay {
  if (!client) {
    client = new Razorpay({ key_id: getRazorpayKeyId(), key_secret: getKeySecret() });
  }
  return client;
}

function safeEqualHex(expected: string, received: string): boolean {
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(String(received || ""), "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Checkout signature: HMAC-SHA256 of "<order_id>|<payment_id>" with the Key Secret.
export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string): boolean {
  const expected = crypto
    .createHmac("sha256", getKeySecret())
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeEqualHex(expected, signature);
}

// Webhook signature: HMAC-SHA256 of the raw request body with the webhook secret
// you choose in the Razorpay Dashboard (RAZORPAY_WEBHOOK_SECRET).
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET is not set");
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}

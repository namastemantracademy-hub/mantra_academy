# Razorpay checkout — setup

## How it works

1. A student clicks **Pay & Enroll** on a course page and enters their name, email and phone.
2. `POST /api/payments/create-order` looks up the course **price in MongoDB** (never from the browser), creates a Razorpay order, and saves an `Enrollment` with status `created`.
3. Razorpay Checkout opens. After payment, the browser sends the result to `POST /api/payments/verify`, which checks the HMAC signature with `RAZORPAY_KEY_SECRET` and marks the enrollment `paid`.
4. Backup: Razorpay also calls `POST /api/payments/webhook` (signed with `RAZORPAY_WEBHOOK_SECRET`). Whichever arrives first marks it paid; the other does nothing, so nobody is recorded or emailed twice.
5. On the first confirmation, emails go to the student and to `ADMIN_NOTIFY_EMAIL` via Gmail.
6. The student lands on `/enroll/thank-you?order=…`, which shows the payment ID and next steps.

Each course has a **Fee type** (admin → Courses):

- **Registration fee (includes first month)** — default. Later months are collected outside this website.
- **Total fee (one-time)** — e.g. the Puja vidhi workshop.

The wording shown to students lives in `src/lib/fees.ts`.

## Environment variables

| Name | Where to get it |
| --- | --- |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Razorpay Dashboard → Account & Settings → API Keys (Test Mode first) |
| `RAZORPAY_WEBHOOK_SECRET` | A secret you choose when adding the webhook |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | Google Account → Security → 2-Step Verification → App passwords |
| `ADMIN_NOTIFY_EMAIL` | Optional; defaults to `GMAIL_USER` |
| `WHATSAPP_COMMUNITY_URL` | Optional; shows a "Join the WhatsApp community" button on the thank-you page |

Add them to `.env.local` for local runs and to Vercel → Settings → Environment Variables for the live site (mark the secrets as Sensitive).

## Webhook

Razorpay Dashboard → Settings → Webhooks → Add:

- URL: `https://www.mantracademy.in/api/payments/webhook`
- Secret: same value as `RAZORPAY_WEBHOOK_SECRET`
- Events: `payment.captured`, `order.paid`, `payment.failed`

Webhooks can't reach `localhost`; on your Mac the verify route alone confirms payments.

Keep **automatic capture** on (Account & Settings → Payment capture), otherwise payments stay "authorized" and are refunded after a few days.

## Test payment

Use Razorpay's test card or test UPI ID listed in Razorpay's docs ("Test Card Details"). No real money moves in Test Mode.

## Going live

Switch to Live Mode keys only after Razorpay has activated the account, update the three Razorpay variables in Vercel, add the webhook again in Live Mode, and redeploy.

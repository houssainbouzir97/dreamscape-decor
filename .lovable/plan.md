

# Functional Order System with Lovable Cloud

## Overview
Build a complete order capture pipeline: Checkout form submits to a Supabase edge function, which saves the order to a database table and sends an email notification via Resend. Plus a password-protected admin page to view/export orders.

**Important note**: This project is built with Vite + React (not Next.js), so there are no API routes. All backend logic will use Supabase Edge Functions via Lovable Cloud.

---

## Step 1: Enable Lovable Cloud + Create Database

- Enable Lovable Cloud (Supabase backend)
- Create an `orders` table via migration with columns:
  - `id` (uuid, primary key, default gen_random_uuid())
  - `created_at` (timestamptz, default now())
  - `name` (text, not null)
  - `phone` (text, not null)
  - `address` (text, not null)
  - `city` (text)
  - `product_code` (text)
  - `product_name` (text)
  - `size` (text)
  - `price` (text)
  - `quantity` (integer)
  - `notes` (text)
  - `source` (text, default 'website')
  - `delivery_fee` (numeric)
  - `total` (numeric)
- Enable RLS with a permissive insert policy (anyone can insert -- public storefront)
- Add a select policy restricted to service_role only (for admin edge function)

## Step 2: Set Up Secrets

Request the following secrets from you:
- **RESEND_API_KEY** -- for sending email notifications
- **NOTIFICATION_EMAIL** -- destination email (dreamscapedecor.art@gmail.com)
- **ADMIN_PASSWORD** -- password to access the admin orders page

## Step 3: Create Edge Function `submit-order`

A Supabase Edge Function at `supabase/functions/submit-order/index.ts`:
- Accepts POST JSON with order data
- Validates required fields (name, phone, address)
- Inserts row into `orders` table using service role client
- Sends email notification via Resend API to your email with all order details
- Returns success/error JSON response
- Proper CORS headers for browser requests

## Step 4: Create Edge Function `admin-orders`

A Supabase Edge Function at `supabase/functions/admin-orders/index.ts`:
- Accepts GET request with `Authorization: Bearer <ADMIN_PASSWORD>` header
- Validates password against the stored secret
- Fetches all orders from Supabase (latest first)
- Returns JSON array of orders
- Proper CORS headers

## Step 5: Update Checkout Page

Modify `src/pages/Checkout.tsx`:
- Add loading state (`isSubmitting`) and error state
- On submit: POST cart items + form data to the `submit-order` edge function
- Each cart item becomes a separate order row (or a single order with items summary)
- Disable button while submitting, show spinner
- On success: show "Commande envoyee -- Nous vous contactons rapidement." with checkmark
- On error: show error message via toast
- Clear form and cart on success

## Step 6: Create Admin Page

Create `src/pages/AdminOrders.tsx`:
- Simple password prompt (stored in sessionStorage after first entry)
- Calls `admin-orders` edge function with the password
- Displays orders in a clean table (date, name, phone, city, product, size, price, total)
- "Export CSV" button that generates and downloads a CSV file
- Add route `/admin/orders` in `App.tsx`

## Step 7: Set Up Supabase Client

Create `src/integrations/supabase/client.ts` with the Supabase JS client configured using the project's URL and anon key (provided by Lovable Cloud).

---

## Environment Variables Checklist

| Variable | Where Used | Purpose |
|----------|-----------|---------|
| RESEND_API_KEY | Edge function (secret) | Send email notifications |
| NOTIFICATION_EMAIL | Edge function (secret) | Recipient email address |
| ADMIN_PASSWORD | Edge function (secret) | Protect admin page |
| SUPABASE_URL | Auto-provided by Cloud | Database connection |
| SUPABASE_ANON_KEY | Auto-provided by Cloud | Public client key |
| SUPABASE_SERVICE_ROLE_KEY | Auto-provided in edge functions | Server-side DB access |


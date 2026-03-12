
-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  product_code TEXT,
  product_name TEXT,
  size TEXT,
  price TEXT,
  quantity INTEGER,
  notes TEXT,
  source TEXT DEFAULT 'website',
  delivery_fee NUMERIC,
  total NUMERIC
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public storefront)
CREATE POLICY "Anyone can insert orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Only service_role can select (admin edge function)
CREATE POLICY "Service role can select orders"
  ON public.orders
  FOR SELECT
  USING (false);

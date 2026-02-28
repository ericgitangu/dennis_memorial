import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Browser/client-side Supabase client (uses anon key, respects RLS) */
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/** Server-side Supabase client (uses service role key, bypasses RLS) */
export function createServerClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

/*
  Supabase schema (run in Supabase SQL editor):

  -- Committee whitelist
  CREATE TABLE IF NOT EXISTS committee_whitelist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('family', 'organizer', 'friend')),
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- OTP sessions
  CREATE TABLE IF NOT EXISTS otp_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT NOT NULL,
    otp_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Committee sessions
  CREATE TABLE IF NOT EXISTS committee_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Contributions
  CREATE TABLE IF NOT EXISTS contributions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    mpesa_ref TEXT,
    checkout_request_id TEXT,
    contributor_name TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Gallery images
  CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    storage_path TEXT NOT NULL,
    caption TEXT,
    category TEXT NOT NULL CHECK (category IN ('planning', 'funeral', 'family')),
    visibility TEXT NOT NULL DEFAULT 'committee' CHECK (visibility IN ('committee', 'public')),
    uploaded_by TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Audit log
  CREATE TABLE IF NOT EXISTS audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_identifier TEXT NOT NULL,
    action TEXT NOT NULL,
    section TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Enable realtime on contributions
  ALTER PUBLICATION supabase_realtime ADD TABLE contributions;
*/

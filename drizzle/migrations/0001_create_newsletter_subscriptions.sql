CREATE TABLE public.newsletter_subscriptions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL UNIQUE,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_subscriptions TO service_role;
REVOKE ALL ON public.newsletter_subscriptions FROM anon, authenticated;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
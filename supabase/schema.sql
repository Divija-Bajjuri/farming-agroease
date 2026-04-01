-- Create users table for storing farmer profiles
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  mobile TEXT NOT NULL,
  village TEXT DEFAULT '',
  district TEXT DEFAULT '',
  state TEXT DEFAULT 'Telangana',
  farm_size TEXT DEFAULT '',
  crop_types TEXT[] DEFAULT '{}',
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to insert (registration)
CREATE POLICY "Anyone can create user" ON public.users
  FOR INSERT WITH CHECK (true);

-- Create policy for users to read their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Create user_tokens table for session management
CREATE TABLE IF NOT EXISTS public.user_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;

-- Policy for managing tokens
CREATE POLICY "Anyone can manage tokens" ON public.user_tokens
  FOR ALL USING (true);

-- Create index on mobile for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_mobile ON public.users(mobile);

-- Create machines table for machinery rental
CREATE TABLE IF NOT EXISTS public.machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  description TEXT,
  price_per_hour NUMERIC(10,2) NOT NULL,
  price_per_day NUMERIC(10,2) NOT NULL,
  location TEXT NOT NULL,
  district TEXT,
  state TEXT DEFAULT 'Telangana',
  contact TEXT NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on machines
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;

-- Anyone can view available machines
CREATE POLICY "Anyone can view machines" ON public.machines
  FOR SELECT USING (available = true);

-- Users can insert their own machines
CREATE POLICY "Users can insert machines" ON public.machines
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Users can update their own machines
CREATE POLICY "Users can update machines" ON public.machines
  FOR UPDATE USING (owner_id = auth.uid());

-- Users can delete their own machines
CREATE POLICY "Users can delete machines" ON public.machines
  FOR DELETE USING (owner_id = auth.uid());

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID REFERENCES public.machines(id) ON DELETE CASCADE,
  farmer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  farmer_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  location TEXT NOT NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('hourly', 'daily')),
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  from_time TEXT,
  to_time TEXT,
  total_days INTEGER DEFAULT 0,
  total_hours INTEGER DEFAULT 0,
  total_price NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can view their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (farmer_id = auth.uid());

-- Machine owners can view bookings for their machines
CREATE POLICY "Owners can view machine bookings" ON public.bookings
  FOR SELECT USING (
    machine_id IN (SELECT id FROM public.machines WHERE owner_id = auth.uid())
  );

-- Users can create bookings
CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (farmer_id = auth.uid());

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings" ON public.bookings
  FOR UPDATE USING (farmer_id = auth.uid());

-- Machine owners can update booking status
CREATE POLICY "Owners can update booking status" ON public.bookings
  FOR UPDATE USING (
    machine_id IN (SELECT id FROM public.machines WHERE owner_id = auth.uid())
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_machines_owner ON public.machines(owner_id);
CREATE INDEX IF NOT EXISTS idx_machines_location ON public.machines(location);
CREATE INDEX IF NOT EXISTS idx_machines_type ON public.machines(type);
CREATE INDEX IF NOT EXISTS idx_machines_available ON public.machines(available);
CREATE INDEX IF NOT EXISTS idx_bookings_machine ON public.bookings(machine_id);
CREATE INDEX IF NOT EXISTS idx_bookings_farmer ON public.bookings(farmer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- =============================================
-- GOVERNMENT SCHEMES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_hi TEXT,
  name_te TEXT,
  description_en TEXT NOT NULL,
  description_hi TEXT,
  description_te TEXT,
  eligibility_en TEXT,
  eligibility_hi TEXT,
  eligibility_te TEXT,
  benefits_en TEXT,
  benefits_hi TEXT,
  benefits_te TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  provider TEXT NOT NULL,
  website TEXT,
  apply_mode TEXT DEFAULT 'online',
  state TEXT[] DEFAULT ARRAY['Telangana', 'Andhra Pradesh'],
  required_documents TEXT[],
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

-- Anyone can view active schemes
CREATE POLICY "Anyone can view schemes" ON public.schemes
  FOR SELECT USING (is_active = true);

-- =============================================
-- FAQ / CHATBOT DATA TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en TEXT NOT NULL,
  question_hi TEXT,
  question_te TEXT,
  answer_en TEXT NOT NULL,
  answer_hi TEXT,
  answer_te TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  keywords TEXT[],
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view faqs" ON public.faqs
  FOR SELECT USING (is_active = true);

-- =============================================
-- FERTILIZER RECOMMENDATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.fertilizers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_hi TEXT,
  name_te TEXT,
  type TEXT NOT NULL,
  npk_ratio TEXT,
  description_en TEXT,
  description_hi TEXT,
  description_te TEXT,
  usage_en TEXT,
  usage_hi TEXT,
  usage_te TEXT,
  crops TEXT[],
  stages TEXT[],
  dosage_per_acre TEXT,
  price_per_kg NUMERIC(10,2),
  image_url TEXT,
  is_organic BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.fertilizers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view fertilizers" ON public.fertilizers
  FOR SELECT USING (is_active = true);

-- =============================================
-- CROP DISEASE INFORMATION TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.diseases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_hi TEXT,
  name_te TEXT,
  crop TEXT NOT NULL,
  symptoms_en TEXT NOT NULL,
  symptoms_hi TEXT,
  symptoms_te TEXT,
  causes_en TEXT,
  causes_hi TEXT,
  causes_te TEXT,
  treatment_en TEXT,
  treatment_hi TEXT,
  treatment_te TEXT,
  prevention_en TEXT,
  prevention_hi TEXT,
  prevention_te TEXT,
  severity TEXT DEFAULT 'medium',
  image_urls TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view diseases" ON public.diseases
  FOR SELECT USING (is_active = true);

-- =============================================
-- USER FAVORITES / BOOKMARKS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('scheme', 'machine', 'fertilizer', 'disease')),
  item_id UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites" ON public.user_favorites
  FOR ALL USING (user_id IN (SELECT id FROM public.users WHERE id = auth.uid()));

-- =============================================
-- USER ACTIVITY LOG TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes(category);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_fertilizers_type ON public.fertilizers(type);
CREATE INDEX IF NOT EXISTS idx_fertilizers_crops ON public.fertilizers USING GIN(crops);
CREATE INDEX IF NOT EXISTS idx_diseases_crop ON public.diseases(crop);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at);

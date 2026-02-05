-- ============================================================
-- FitBoost Database Setup for X Gym
-- ============================================================
-- This script sets up X Gym and Haram Branch in Supabase
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query
-- ============================================================

-- ============================================================
-- 1. CREATE TABLES (if not exist)
-- ============================================================

-- Gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  logo_url TEXT,
  cover_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Branches table
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT,
  address_en TEXT,
  address_ar TEXT,
  phone TEXT,
  email TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  working_hours JSONB,
  amenities JSONB,
  images JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(gym_id, slug)
);

-- Branch Data table (for coaches, classes, PT packages, memberships, offers)
CREATE TABLE IF NOT EXISTS branch_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL CHECK (data_type IN ('coach', 'class', 'pt_package', 'membership', 'offer')),
  title_en TEXT NOT NULL,
  title_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  duration TEXT,
  schedule JSONB,
  metadata JSONB,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gym Owners table (links users to gyms/branches)
CREATE TABLE IF NOT EXISTS gym_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  role TEXT DEFAULT 'gym_owner' CHECK (role IN ('gym_owner', 'branch_manager', 'staff')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, gym_id)
);

-- ============================================================
-- 2. CREATE INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_gyms_slug ON gyms(slug);
CREATE INDEX IF NOT EXISTS idx_gyms_is_active ON gyms(is_active);
CREATE INDEX IF NOT EXISTS idx_branches_gym_id ON branches(gym_id);
CREATE INDEX IF NOT EXISTS idx_branches_slug ON branches(slug);
CREATE INDEX IF NOT EXISTS idx_branches_is_active ON branches(is_active);
CREATE INDEX IF NOT EXISTS idx_branch_data_branch_id ON branch_data(branch_id);
CREATE INDEX IF NOT EXISTS idx_branch_data_type ON branch_data(data_type);
CREATE INDEX IF NOT EXISTS idx_branch_data_is_active ON branch_data(is_active);
CREATE INDEX IF NOT EXISTS idx_gym_owners_user_id ON gym_owners(user_id);
CREATE INDEX IF NOT EXISTS idx_gym_owners_gym_id ON gym_owners(gym_id);

-- ============================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE branch_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_owners ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. CREATE RLS POLICIES
-- ============================================================

-- Gyms: Public read, authenticated write
DROP POLICY IF EXISTS "Public can view active gyms" ON gyms;
CREATE POLICY "Public can view active gyms" ON gyms
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Gym owners can manage their gyms" ON gyms;
CREATE POLICY "Gym owners can manage their gyms" ON gyms
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM gym_owners WHERE gym_id = gyms.id AND is_active = true
    )
  );

-- Branches: Public read, authenticated write
DROP POLICY IF EXISTS "Public can view active branches" ON branches;
CREATE POLICY "Public can view active branches" ON branches
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Gym owners can manage their branches" ON branches;
CREATE POLICY "Gym owners can manage their branches" ON branches
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM gym_owners WHERE gym_id = branches.gym_id AND is_active = true
    )
  );

-- Branch Data: Public read, authenticated write
DROP POLICY IF EXISTS "Public can view active branch data" ON branch_data;
CREATE POLICY "Public can view active branch data" ON branch_data
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Gym owners can manage their branch data" ON branch_data;
CREATE POLICY "Gym owners can manage their branch data" ON branch_data
  FOR ALL USING (
    auth.uid() IN (
      SELECT go.user_id
      FROM gym_owners go
      JOIN branches b ON b.gym_id = go.gym_id
      WHERE b.id = branch_data.branch_id AND go.is_active = true
    )
  );

-- Gym Owners: Only owners can view and manage
DROP POLICY IF EXISTS "Users can view their gym ownership" ON gym_owners;
CREATE POLICY "Users can view their gym ownership" ON gym_owners
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 5. INSERT X GYM DATA
-- ============================================================

-- Insert X Gym
INSERT INTO gyms (slug, name_en, name_ar, description_en, description_ar, is_active)
VALUES (
  'x-gym',
  'X Gym',
  'إكس جيم',
  'Premium fitness center in Giza, Egypt. State-of-the-art equipment, expert trainers, and comprehensive fitness programs.',
  'مركز لياقة بدنية متميز في الجيزة، مصر. معدات حديثة، مدربين محترفين، وبرامج لياقة شاملة.',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ar = EXCLUDED.name_ar,
  description_en = EXCLUDED.description_en,
  description_ar = EXCLUDED.description_ar,
  updated_at = NOW();

-- Insert Haram Branch
INSERT INTO branches (
  gym_id,
  slug,
  name_en,
  name_ar,
  address_en,
  address_ar,
  phone,
  email,
  latitude,
  longitude,
  working_hours,
  amenities,
  is_active
)
SELECT
  gyms.id,
  'haram',
  'Haram Branch',
  'فرع الهرم',
  'Haram, Giza, Egypt',
  'الهرم، الجيزة، مصر',
  '+201143564657',
  'haram@xgym.com',
  29.9870,
  31.1690,
  '{"saturday": "6:00 AM - 12:00 AM", "sunday": "6:00 AM - 12:00 AM", "monday": "6:00 AM - 12:00 AM", "tuesday": "6:00 AM - 12:00 AM", "wednesday": "6:00 AM - 12:00 AM", "thursday": "6:00 AM - 12:00 AM", "friday": "6:00 AM - 12:00 AM"}'::jsonb,
  '["Free Parking", "Locker Rooms", "Showers", "WiFi", "Air Conditioning", "Water Stations", "Personal Training", "Group Classes", "Cardio Zone", "Weight Training Area", "Ladies Section"]'::jsonb,
  true
FROM gyms
WHERE gyms.slug = 'x-gym'
ON CONFLICT (gym_id, slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ar = EXCLUDED.name_ar,
  address_en = EXCLUDED.address_en,
  address_ar = EXCLUDED.address_ar,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  working_hours = EXCLUDED.working_hours,
  amenities = EXCLUDED.amenities,
  updated_at = NOW();

-- ============================================================
-- 6. LINK ADMIN USER (Update email if needed)
-- ============================================================

-- Link admin user to X Gym
-- Replace 'admin@fitboostamranterf.com' with your actual admin email
INSERT INTO gym_owners (user_id, gym_id, branch_id, role, is_active)
SELECT
  (SELECT id FROM auth.users WHERE email = 'admin@fitboostamranterf.com' LIMIT 1),
  gyms.id,
  branches.id,
  'gym_owner',
  true
FROM gyms
JOIN branches ON branches.gym_id = gyms.id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'
ON CONFLICT (user_id, gym_id) DO UPDATE SET
  branch_id = EXCLUDED.branch_id,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================
-- 7. SAMPLE DATA (Optional - uncomment to add sample data)
-- ============================================================

-- Sample Coach
-- INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, metadata, display_order, is_active)
-- SELECT
--   branches.id,
--   'coach',
--   'Ahmed Hassan',
--   'أحمد حسن',
--   'Certified personal trainer with 5+ years experience in strength training and nutrition.',
--   150.00,
--   '{"specialization": ["Strength Training", "Nutrition", "Weight Loss"], "certifications": ["ISSA CPT", "Nutrition Specialist"]}'::jsonb,
--   1,
--   true
-- FROM branches
-- JOIN gyms ON gyms.id = branches.gym_id
-- WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Sample Class
-- INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, schedule, display_order, is_active)
-- SELECT
--   branches.id,
--   'class',
--   'HIIT Training',
--   'تدريب عالي الكثافة',
--   'High-intensity interval training for maximum calorie burn.',
--   '{"days": ["Monday", "Wednesday", "Friday"], "time": "6:00 PM"}'::jsonb,
--   1,
--   true
-- FROM branches
-- JOIN gyms ON gyms.id = branches.gym_id
-- WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Sample PT Package
-- INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, duration, display_order, is_active)
-- SELECT
--   branches.id,
--   'pt_package',
--   'Basic PT Package',
--   'باقة التدريب الأساسية',
--   '8 personal training sessions',
--   800.00,
--   '1 month',
--   1,
--   true
-- FROM branches
-- JOIN gyms ON gyms.id = branches.gym_id
-- WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Sample Membership
-- INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, duration, display_order, is_active)
-- SELECT
--   branches.id,
--   'membership',
--   'Monthly Membership',
--   'اشتراك شهري',
--   'Full access to all gym facilities',
--   300.00,
--   '1 month',
--   1,
--   true
-- FROM branches
-- JOIN gyms ON gyms.id = branches.gym_id
-- WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Sample Offer
-- INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, metadata, display_order, is_active)
-- SELECT
--   branches.id,
--   'offer',
--   'New Year Special',
--   'عرض العام الجديد',
--   '3 months membership + 1 free month',
--   800.00,
--   '{"original_price": 1200, "discount": 400, "valid_until": "2024-01-31"}'::jsonb,
--   1,
--   true
-- FROM branches
-- JOIN gyms ON gyms.id = branches.gym_id
-- WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- ============================================================
-- 8. VERIFICATION QUERIES
-- ============================================================

-- Verify gym was created
SELECT * FROM gyms WHERE slug = 'x-gym';

-- Verify branch was created
SELECT b.*, g.name_en as gym_name
FROM branches b
JOIN gyms g ON g.id = b.gym_id
WHERE g.slug = 'x-gym' AND b.slug = 'haram';

-- Verify admin link
SELECT go.*, g.name_en as gym_name, b.name_en as branch_name, u.email
FROM gym_owners go
JOIN gyms g ON g.id = go.gym_id
JOIN branches b ON b.id = go.branch_id
JOIN auth.users u ON u.id = go.user_id
WHERE g.slug = 'x-gym';

-- Count branch data
SELECT data_type, COUNT(*)
FROM branch_data bd
JOIN branches b ON b.id = bd.branch_id
JOIN gyms g ON g.id = b.gym_id
WHERE g.slug = 'x-gym' AND b.slug = 'haram'
GROUP BY data_type;

-- ============================================================
-- DONE! ✅
-- ============================================================
-- Next steps:
-- 1. Run this script in Supabase SQL Editor
-- 2. Verify data using the queries above
-- 3. Test connection in your app: npm run dev
-- 4. Navigate to your app and check console for "DataService initialized"
-- ============================================================

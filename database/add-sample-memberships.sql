-- ============================================================
-- Add Sample Memberships to X Gym - Haram Branch
-- ============================================================
-- Run this in Supabase SQL Editor
-- ============================================================

-- Delete existing memberships (optional - uncomment if you want to start fresh)
-- DELETE FROM branch_data WHERE data_type = 'membership';

-- Add Sample Memberships
INSERT INTO branch_data (
  branch_id,
  data_type,
  title_en,
  title_ar,
  description_en,
  description_ar,
  price,
  duration,
  metadata,
  display_order,
  is_active
)
SELECT
  branches.id,
  'membership',
  '1 Month',
  'شهر واحد',
  'Full gym access with PT sessions and InBody scans',
  'دخول كامل للجيم مع جلسات تدريب وفحوصات InBody',
  500.00,
  '1 Month',
  jsonb_build_object('private', 2, 'inbody', 1, 'invite', 0),
  1,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'membership',
  '3 Months',
  '3 شهور',
  'Full gym access with PT sessions and InBody scans',
  'دخول كامل للجيم مع جلسات تدريب وفحوصات InBody',
  1350.00,
  '3 Months',
  jsonb_build_object('private', 6, 'inbody', 3, 'invite', 0),
  2,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'membership',
  '6 Months',
  '6 شهور',
  'Full gym access with PT sessions and InBody scans',
  'دخول كامل للجيم مع جلسات تدريب وفحوصات InBody',
  2550.00,
  '6 Months',
  jsonb_build_object('private', 12, 'inbody', 6, 'invite', 0),
  3,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'membership',
  '12 Months',
  'سنة',
  'Full gym access with PT sessions and InBody scans',
  'دخول كامل للجيم مع جلسات تدريب وفحوصات InBody',
  4800.00,
  '12 Months',
  jsonb_build_object('private', 24, 'inbody', 12, 'invite', 0),
  4,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Verify results
SELECT
  title_en,
  duration,
  price,
  metadata->>'private' as pt_sessions,
  metadata->>'inbody' as inbody_scans,
  is_active
FROM branch_data
WHERE data_type = 'membership'
ORDER BY display_order;

-- ============================================================
-- DONE! ✅
-- You should see 4 membership plans
-- ============================================================

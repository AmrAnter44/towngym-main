-- ============================================================
-- Add Sample Offers to Supabase
-- ============================================================
-- Run this in Supabase SQL Editor
-- ============================================================

-- Add offers for X Gym - Haram Branch
INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, metadata, display_order, is_active)
SELECT
  branches.id,
  'offer',
  '1 Month + PT',
  'عرض الشتاء',
  'Get 1 month membership plus personal training',
  jsonb_build_object(
    'price', 2500,
    'duration', '1 month',
    'includes', jsonb_build_array('Membership', 'Personal Training')
  ),
  1,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'offer',
  'Membership + Boxing',
  'عرض شهري',
  'Monthly combo with boxing sessions',
  jsonb_build_object(
    'price', 1000,
    'duration', '1 month',
    'includes', jsonb_build_array('Membership', 'Boxing')
  ),
  2,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Verify the offers were added
SELECT
  title_en,
  title_ar,
  description_en,
  metadata->>'price' as price,
  metadata->>'duration' as duration,
  display_order,
  is_active
FROM branch_data
WHERE data_type = 'offer'
ORDER BY display_order;

-- ============================================================
-- DONE! ✅ Sample offers added successfully
-- ============================================================

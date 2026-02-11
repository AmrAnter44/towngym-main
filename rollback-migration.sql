-- ROLLBACK: Restore old column structure
-- ⚠️ Use this ONLY if you need to revert the migration

-- Re-add old columns
ALTER TABLE branch_data
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS title_ar TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS description_ar TEXT,
  ADD COLUMN IF NOT EXISTS schedule JSONB,
  ADD COLUMN IF NOT EXISTS features JSONB;

-- Restore data to old columns
UPDATE branch_data SET
  title_en = name,
  description_ar = description
WHERE data_type IN ('class', 'coach', 'membership', 'pt_package', 'offer');

-- Classes specific
UPDATE branch_data SET
  description_en = coach_name,
  title_ar = time,
  schedule = jsonb_build_object(
    'day', day_of_week,
    'time', time,
    'coach', coach_name
  ),
  features = CASE
    WHEN class_type = 'Ladies Only' THEN '["Ladies Only"]'::jsonb
    WHEN class_type = 'Mixed' THEN '["Mixed Class"]'::jsonb
    ELSE '[]'::jsonb
  END
WHERE data_type = 'class';

-- Drop new columns
ALTER TABLE branch_data
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS coach_name,
  DROP COLUMN IF EXISTS day_of_week,
  DROP COLUMN IF EXISTS time,
  DROP COLUMN IF EXISTS class_type,
  DROP COLUMN IF EXISTS booking_required,
  DROP COLUMN IF EXISTS duration_minutes,
  DROP COLUMN IF EXISTS max_participants,
  DROP COLUMN IF EXISTS level,
  DROP COLUMN IF EXISTS room_location,
  DROP COLUMN IF EXISTS role,
  DROP COLUMN IF EXISTS specialization,
  DROP COLUMN IF EXISTS years_experience,
  DROP COLUMN IF EXISTS certifications,
  DROP COLUMN IF EXISTS phone_number,
  DROP COLUMN IF EXISTS email,
  DROP COLUMN IF EXISTS bio,
  DROP COLUMN IF EXISTS rating,
  DROP COLUMN IF EXISTS duration_days,
  DROP COLUMN IF EXISTS freeze_weeks,
  DROP COLUMN IF EXISTS guest_invites,
  DROP COLUMN IF EXISTS pt_sessions_included,
  DROP COLUMN IF EXISTS inbody_scans,
  DROP COLUMN IF EXISTS spa_access,
  DROP COLUMN IF EXISTS pool_access,
  DROP COLUMN IF EXISTS sauna_access,
  DROP COLUMN IF EXISTS group_classes_included,
  DROP COLUMN IF EXISTS sessions_count,
  DROP COLUMN IF EXISTS validity_days,
  DROP COLUMN IF EXISTS per_session_price,
  DROP COLUMN IF EXISTS transferable,
  DROP COLUMN IF EXISTS includes_nutrition_plan,
  DROP COLUMN IF EXISTS discount_percentage,
  DROP COLUMN IF EXISTS discount_amount,
  DROP COLUMN IF EXISTS valid_from,
  DROP COLUMN IF EXISTS valid_until,
  DROP COLUMN IF EXISTS applicable_to,
  DROP COLUMN IF EXISTS terms_conditions,
  DROP COLUMN IF EXISTS promo_code,
  DROP COLUMN IF EXISTS usage_limit,
  DROP COLUMN IF EXISTS times_used,
  DROP COLUMN IF EXISTS metadata;

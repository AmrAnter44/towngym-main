-- ============================================================
-- SAFE DATABASE MIGRATION (Idempotent)
-- Can run multiple times safely
-- ============================================================

DO $$
DECLARE
  old_columns_exist BOOLEAN;
BEGIN
  -- Check if old columns still exist
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'branch_data' AND column_name = 'title_en'
  ) INTO old_columns_exist;

  IF NOT old_columns_exist THEN
    RAISE NOTICE '✅ Migration already completed - old columns do not exist';
    RETURN;
  END IF;

  RAISE NOTICE '🔄 Starting migration...';

  -- Add new columns
  ALTER TABLE branch_data
    ADD COLUMN IF NOT EXISTS name TEXT,
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS coach_name TEXT,
    ADD COLUMN IF NOT EXISTS day_of_week TEXT,
    ADD COLUMN IF NOT EXISTS time TEXT,
    ADD COLUMN IF NOT EXISTS duration_minutes INTEGER,
    ADD COLUMN IF NOT EXISTS level TEXT,
    ADD COLUMN IF NOT EXISTS room_location TEXT,
    ADD COLUMN IF NOT EXISTS max_participants INTEGER,
    ADD COLUMN IF NOT EXISTS booking_required BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS class_type TEXT,
    ADD COLUMN IF NOT EXISTS role TEXT,
    ADD COLUMN IF NOT EXISTS specialization TEXT[],
    ADD COLUMN IF NOT EXISTS years_experience INTEGER,
    ADD COLUMN IF NOT EXISTS certifications TEXT[],
    ADD COLUMN IF NOT EXISTS phone_number TEXT,
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS bio TEXT,
    ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 2),
    ADD COLUMN IF NOT EXISTS duration_days INTEGER,
    ADD COLUMN IF NOT EXISTS freeze_weeks INTEGER,
    ADD COLUMN IF NOT EXISTS guest_invites INTEGER,
    ADD COLUMN IF NOT EXISTS pt_sessions_included INTEGER,
    ADD COLUMN IF NOT EXISTS inbody_scans INTEGER,
    ADD COLUMN IF NOT EXISTS spa_access BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS pool_access BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS sauna_access BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS group_classes_included BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS sessions_count INTEGER,
    ADD COLUMN IF NOT EXISTS validity_days INTEGER,
    ADD COLUMN IF NOT EXISTS per_session_price DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS transferable BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS includes_nutrition_plan BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS discount_percentage DECIMAL(5, 2),
    ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS valid_from DATE,
    ADD COLUMN IF NOT EXISTS valid_until DATE,
    ADD COLUMN IF NOT EXISTS applicable_to TEXT[],
    ADD COLUMN IF NOT EXISTS terms_conditions TEXT,
    ADD COLUMN IF NOT EXISTS promo_code TEXT,
    ADD COLUMN IF NOT EXISTS usage_limit INTEGER,
    ADD COLUMN IF NOT EXISTS times_used INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

  -- Migrate CLASSES
  UPDATE branch_data SET
    name = title_en,
    description = COALESCE(description_ar, ''),
    coach_name = COALESCE((schedule::jsonb->>'coach'), description_en),
    day_of_week = COALESCE((schedule::jsonb->>'day'),
      CASE
        WHEN id = '159a6070-9168-4ab9-b01c-8630d031d05c' THEN 'Sunday'
        WHEN id = '34b5fc96-8441-458f-afd3-9a6aa873d2b7' THEN 'Saturday'
      END),
    time = COALESCE((schedule::jsonb->>'time'), title_ar),
    class_type = CASE
      WHEN features::jsonb ? 'Ladies Only' THEN 'Ladies Only'
      WHEN features::jsonb ? 'Mixed Class' THEN 'Mixed'
      ELSE 'Mixed'
    END,
    booking_required = features::jsonb ? 'Members Only',
    duration_minutes = 60,
    max_participants = 20
  WHERE data_type = 'class';

  -- Migrate COACHES
  UPDATE branch_data SET
    name = title_en,
    description = COALESCE(description_ar, ''),
    bio = description_ar,
    role = 'Coach',
    specialization = CASE
      WHEN jsonb_typeof(features) = 'array' THEN ARRAY(SELECT jsonb_array_elements_text(features))
      ELSE NULL
    END
  WHERE data_type = 'coach';

  -- Migrate MEMBERSHIPS
  UPDATE branch_data SET
    name = title_en,
    description = COALESCE(description_ar, ''),
    price = CASE WHEN title_ar ~ '^[0-9]+$' THEN title_ar::decimal ELSE NULL END,
    duration_days = CASE
      WHEN title_en ILIKE '%year%' OR title_en ILIKE '%annual%' THEN 365
      WHEN title_en ILIKE '%6 months%' THEN 180
      WHEN title_en ILIKE '%3 months%' OR title_en ILIKE '%quarter%' THEN 90
      ELSE 30
    END,
    freeze_weeks = 2,
    group_classes_included = true,
    spa_access = features::jsonb ? 'Spa Access',
    pt_sessions_included = CASE WHEN features::jsonb ? 'PT Sessions' THEN 4 ELSE 0 END
  WHERE data_type = 'membership';

  -- Migrate PT PACKAGES
  UPDATE branch_data SET
    name = title_en,
    description = COALESCE(description_ar, ''),
    price = CASE WHEN title_ar ~ '^[0-9]+$' THEN title_ar::decimal ELSE NULL END,
    sessions_count = CASE
      WHEN title_en ~ '([0-9]+)\s*(session|sessions)' THEN substring(title_en from '([0-9]+)\s*(session|sessions)')::integer
      ELSE 8
    END,
    validity_days = 90,
    per_session_price = CASE
      WHEN title_ar ~ '^[0-9]+$' AND title_en ~ '([0-9]+)\s*(session|sessions)'
      THEN (title_ar::decimal / substring(title_en from '([0-9]+)\s*(session|sessions)')::integer)
      ELSE NULL
    END,
    includes_nutrition_plan = features::jsonb ? 'Nutrition Plan'
  WHERE data_type = 'pt_package';

  -- Migrate OFFERS
  UPDATE branch_data SET
    name = title_en,
    description = COALESCE(description_ar, ''),
    discount_percentage = CASE WHEN title_ar ~ '^[0-9]+$' THEN title_ar::decimal ELSE NULL END,
    valid_from = CURRENT_DATE,
    valid_until = CURRENT_DATE + INTERVAL '30 days',
    applicable_to = ARRAY['membership', 'pt_package'],
    terms_conditions = description_ar
  WHERE data_type = 'offer';

  -- Create indexes
  CREATE INDEX IF NOT EXISTS idx_branch_data_name ON branch_data(name);
  CREATE INDEX IF NOT EXISTS idx_branch_data_day_of_week ON branch_data(day_of_week);
  CREATE INDEX IF NOT EXISTS idx_branch_data_coach_name ON branch_data(coach_name);
  CREATE INDEX IF NOT EXISTS idx_branch_data_price ON branch_data(price);
  CREATE INDEX IF NOT EXISTS idx_branch_data_metadata ON branch_data USING gin(metadata);

  -- Drop old columns
  ALTER TABLE branch_data
    DROP COLUMN IF EXISTS title_en,
    DROP COLUMN IF EXISTS title_ar,
    DROP COLUMN IF EXISTS description_en,
    DROP COLUMN IF EXISTS description_ar,
    DROP COLUMN IF EXISTS schedule,
    DROP COLUMN IF EXISTS features;

  RAISE NOTICE '✅ Migration completed successfully';
END $$;

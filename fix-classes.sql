-- Fix Yoga class schedule
UPDATE branch_data
SET
  schedule = '{"day": "Sunday", "time": "8:00 AM", "coach": "Huda"}',
  features = '[]',
  description_ar = 'Relaxing yoga session',
  updated_at = NOW()
WHERE id = '159a6070-9168-4ab9-b01c-8630d031d05c';

-- Fix Hit Cardio class schedule
UPDATE branch_data
SET
  schedule = '{"day": "Saturday", "time": "8:00 AM", "coach": "Sama"}',
  features = '[]',
  description_ar = 'High intensity cardio workout',
  updated_at = NOW()
WHERE id = '34b5fc96-8441-458f-afd3-9a6aa873d2b7';

-- Verify the changes
SELECT
  title_en,
  title_ar as time,
  schedule,
  features,
  description_ar
FROM branch_data
WHERE data_type = 'class'
  AND branch_id = '10000000-0000-0000-0000-000000000011'
ORDER BY display_order;

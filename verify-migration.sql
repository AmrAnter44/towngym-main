-- Check if migration already completed
SELECT
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Migration already completed - new columns exist'
    ELSE '❌ Migration not done - new columns missing'
  END as status
FROM information_schema.columns
WHERE table_name = 'branch_data'
  AND column_name = 'name';

-- Check current data
SELECT
  data_type,
  COUNT(*) as total_records,
  COUNT(name) as records_with_name,
  COUNT(coach_name) as records_with_coach_name,
  COUNT(day_of_week) as records_with_day
FROM branch_data
GROUP BY data_type
ORDER BY data_type;

-- Sample data
SELECT
  id,
  data_type,
  name,
  coach_name,
  day_of_week,
  time,
  price,
  sessions_count
FROM branch_data
LIMIT 10;

-- ============================================================
-- Add Sample Coaches to X Gym - Haram Branch
-- ============================================================
-- Run this in Supabase SQL Editor
-- ============================================================

-- Delete existing coaches (optional - uncomment if needed)
-- DELETE FROM branch_data WHERE data_type = 'coach';

-- Add Sample Coaches
INSERT INTO branch_data (
  branch_id,
  data_type,
  title_en,
  title_ar,
  description_en,
  description_ar,
  image_url,
  metadata,
  display_order,
  is_active
)
SELECT
  branches.id,
  'coach',
  'Ahmed Hassan',
  'أحمد حسن',
  'Certified Personal Trainer',
  'مدرب شخصي معتمد',
  '/assets/coach1.jpg',
  jsonb_build_object(
    'specialization', ARRAY['Strength Training', 'Weight Loss'],
    'certifications', ARRAY['ISSA CPT', 'Nutrition Specialist'],
    'experience_years', 5
  ),
  1,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'coach',
  'Mohamed Ali',
  'محمد علي',
  'Bodybuilding Expert',
  'خبير كمال أجسام',
  '/assets/coach2.jpg',
  jsonb_build_object(
    'specialization', ARRAY['Bodybuilding', 'Muscle Gain'],
    'certifications', ARRAY['NASM CPT', 'Bodybuilding Coach'],
    'experience_years', 8
  ),
  2,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'coach',
  'Sara Ahmed',
  'سارة أحمد',
  'Yoga & Fitness Instructor',
  'مدربة يوغا ولياقة',
  '/assets/coach3.jpg',
  jsonb_build_object(
    'specialization', ARRAY['Yoga', 'Pilates', 'Flexibility'],
    'certifications', ARRAY['Yoga Alliance RYT 200', 'Pilates Instructor'],
    'experience_years', 4
  ),
  3,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'

UNION ALL

SELECT
  branches.id,
  'coach',
  'Khaled Ibrahim',
  'خالد إبراهيم',
  'CrossFit & HIIT Trainer',
  'مدرب كروس فيت وتدريب عالي الكثافة',
  '/assets/coach4.jpg',
  jsonb_build_object(
    'specialization', ARRAY['CrossFit', 'HIIT', 'Functional Training'],
    'certifications', ARRAY['CrossFit Level 2', 'HIIT Certified'],
    'experience_years', 6
  ),
  4,
  true
FROM branches
JOIN gyms ON gyms.id = branches.gym_id
WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram';

-- Verify results
SELECT
  title_en as name,
  description_en as title,
  image_url,
  is_active
FROM branch_data
WHERE data_type = 'coach'
ORDER BY display_order;

-- ============================================================
-- DONE! ✅
-- You should see 4 coaches
-- ============================================================

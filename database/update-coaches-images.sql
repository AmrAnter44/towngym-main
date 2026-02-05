-- ============================================================
-- Update Coach Images with Real URLs
-- ============================================================
-- Run this in Supabase SQL Editor to fix coach images
-- ============================================================

-- Update existing coaches with real image URLs
UPDATE branch_data
SET image_url = CASE title_en
  WHEN 'Ahmed Hassan' THEN 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'
  WHEN 'Mohamed Ali' THEN 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop'
  WHEN 'Sara Ahmed' THEN 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop'
  WHEN 'Khaled Ibrahim' THEN 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop'
  ELSE image_url
END
WHERE data_type = 'coach'
AND branch_id IN (
  SELECT branches.id
  FROM branches
  JOIN gyms ON gyms.id = branches.gym_id
  WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'
);

-- Verify the update
SELECT
  title_en as name,
  description_en as title,
  image_url,
  is_active
FROM branch_data
WHERE data_type = 'coach'
ORDER BY display_order;

-- ============================================================
-- DONE! ✅ Coach images updated with real Unsplash URLs
-- ============================================================

-- ============================================================
-- Update Coach Images with Placeholder Avatars
-- ============================================================
-- Uses UI Avatars service - generates avatars from names
-- ============================================================

UPDATE branch_data
SET image_url = CASE title_en
  WHEN 'Ahmed Hassan' THEN 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=400&background=3b82f6&color=fff&bold=true'
  WHEN 'Mohamed Ali' THEN 'https://ui-avatars.com/api/?name=Mohamed+Ali&size=400&background=2563eb&color=fff&bold=true'
  WHEN 'Sara Ahmed' THEN 'https://ui-avatars.com/api/?name=Sara+Ahmed&size=400&background=1d4ed8&color=fff&bold=true'
  WHEN 'Khaled Ibrahim' THEN 'https://ui-avatars.com/api/?name=Khaled+Ibrahim&size=400&background=1e40af&color=fff&bold=true'
  ELSE image_url
END
WHERE data_type = 'coach'
AND branch_id IN (
  SELECT branches.id
  FROM branches
  JOIN gyms ON gyms.id = branches.gym_id
  WHERE gyms.slug = 'x-gym' AND branches.slug = 'haram'
);

-- Verify
SELECT
  title_en as name,
  description_en as title,
  image_url,
  is_active
FROM branch_data
WHERE data_type = 'coach'
ORDER BY display_order;

-- ============================================================
-- DONE! ✅ Coach images updated with placeholder avatars
-- ============================================================

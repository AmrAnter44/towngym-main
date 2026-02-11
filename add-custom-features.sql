-- ============================================================
-- Add Custom Features to Memberships
-- ============================================================

-- STEP 1: List all memberships to find the one you want to update
-- Copy the 'id' value from the results
SELECT 
  id,
  name,
  price,
  pt_sessions_included,
  guest_invites,
  freeze_weeks
FROM branch_data
WHERE data_type = 'membership'
  AND is_active = true
ORDER BY name;

-- ============================================================
-- STEP 2: Update the membership with custom features
-- Replace 'PASTE-UUID-HERE' with the actual UUID from Step 1
-- ============================================================

-- Example for X Gym Annual Membership:
UPDATE branch_data
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{features}',
  '[
    "12 Months Full Access",
    "4 Private PT Sessions with Expert Coaches",
    "2 Guest Invitations per Month",
    "2 Weeks Freezing Period",
    "Unlimited Group Classes (Yoga, Zumba, Spinning)",
    "VIP Locker Room Access",
    "Monthly InBody Analysis",
    "Free Nutrition Consultation",
    "24/7 Gym Access",
    "Premium Supplement Discount"
  ]'::jsonb
)
WHERE id = 'PASTE-UUID-HERE';

-- ============================================================
-- STEP 3: Verify the update
-- ============================================================
SELECT 
  name,
  metadata->'features' as features
FROM branch_data
WHERE id = 'PASTE-UUID-HERE';

-- ============================================================
-- Quick Templates for Different Memberships
-- ============================================================

-- Basic Membership Template:
/*
UPDATE branch_data
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{features}',
  '[
    "1 Month Full Access",
    "Unlimited Group Classes",
    "Locker Room Access",
    "Free Initial Consultation"
  ]'::jsonb
)
WHERE id = 'PASTE-UUID-HERE';
*/

-- Premium Membership Template:
/*
UPDATE branch_data
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{features}',
  '[
    "6 Months Full Access",
    "8 Private PT Sessions",
    "4 Guest Invitations",
    "4 Weeks Freezing",
    "Unlimited Group Classes",
    "Spa & Sauna Access",
    "Monthly InBody Scan",
    "Nutrition Plan Included"
  ]'::jsonb
)
WHERE id = 'PASTE-UUID-HERE';
*/

-- VIP Membership Template:
/*
UPDATE branch_data
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{features}',
  '[
    "12 Months Full Access",
    "12 Private PT Sessions with Top Coaches",
    "Unlimited Guest Invitations",
    "8 Weeks Freezing Period",
    "All Group Classes (Premium & Regular)",
    "VIP Locker Room with Towel Service",
    "Weekly InBody Analysis",
    "Personal Nutrition & Diet Plan",
    "24/7 Premium Access",
    "Exclusive VIP Events Access",
    "Free Massage Sessions (Monthly)",
    "Complimentary Supplements Package"
  ]'::jsonb
)
WHERE id = 'PASTE-UUID-HERE';
*/

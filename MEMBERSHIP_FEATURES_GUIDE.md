# Membership Features Guide

## How to Add Custom Features to Memberships

Each gym can have **custom features** for their memberships. Features are displayed as bullet points on the membership cards.

---

## Method 1: Using Metadata (Recommended) ✅

Add custom features using the `metadata` field in **Fitboost Admin**.

### Steps:

1. Go to **Fitboost Admin** → Select Branch → Edit Membership
2. In the database, set the `metadata` column to:

```json
{
  "features": [
    "4 PT Sessions",
    "2 InBody Scans",
    "2 Guest Invites",
    "2 Weeks Freezing",
    "Unlimited Group Classes",
    "Spa Access",
    "Pool Access"
  ]
}
```

### Benefits:
- ✅ **Fully customizable** - Add any text you want
- ✅ **Gym-specific** - Each gym can have different features
- ✅ **No code changes** - Update via database only

---

## Method 2: Auto-Generated Features (Fallback)

If you **don't** add `metadata.features`, the system will automatically generate features from the membership fields:

- `pt_sessions_included` → "4 PT Sessions"
- `inbody_scans` → "2 InBody Scans"
- `guest_invites` → "2 Guest Invites"
- `freeze_weeks` → "2 Weeks Freezing"
- Always shows: "Unlimited Group Classes"

---

## Example: X Gym Membership

### With Custom Features (metadata):
```json
{
  "name": "Annual Membership",
  "price": 12000,
  "original_price": 15000,
  "pt_sessions_included": 4,
  "guest_invites": 2,
  "freeze_weeks": 2,
  "metadata": {
    "features": [
      "12 Months Full Access",
      "4 Private PT Sessions",
      "2 Guest Invitations",
      "2 Weeks Freezing Period",
      "Unlimited Group Classes",
      "VIP Locker Room Access",
      "Monthly InBody Analysis",
      "Nutrition Consultation"
    ]
  }
}
```

**Displays:**
- 12 Months Full Access
- 4 Private PT Sessions
- 2 Guest Invitations
- 2 Weeks Freezing Period
- Unlimited Group Classes
- VIP Locker Room Access
- Monthly InBody Analysis
- Nutrition Consultation

### Without Custom Features (auto-generated):
```json
{
  "name": "Annual Membership",
  "price": 12000,
  "pt_sessions_included": 4,
  "guest_invites": 2,
  "freeze_weeks": 2
}
```

**Displays:**
- 4 PT Sessions
- 2 Guest Invites
- 2 Weeks Freezing
- Unlimited Group Classes

---

## How It Works

1. **Frontend checks** if `membership.metadata.features` exists
2. If **YES**: Display custom features from metadata
3. If **NO**: Auto-generate from fields (pt_sessions, invites, etc.)

This allows:
- **X Gym** to have "VIP Locker Room Access"
- **Eagle Gym** to have "Sauna & Steam Room"
- **Any gym** to have unique features without code changes

---

## Updating Features

### Via Fitboost Admin (Future Enhancement):
*Coming soon: UI to add/remove features in the admin panel*

### Via SQL (Current Method):

**Step 1: Find the membership ID**
```sql
-- List all memberships to find the ID
SELECT id, name, price, branch_id
FROM branch_data
WHERE data_type = 'membership'
ORDER BY name;
```

**Step 2: Update the features**
```sql
-- Replace 'PASTE-THE-UUID-HERE' with the actual ID from Step 1
UPDATE branch_data
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{features}',
  '["Feature 1", "Feature 2", "Feature 3"]'::jsonb
)
WHERE id = 'PASTE-THE-UUID-HERE';
```

**Example:**
```sql
-- Step 1: Find ID
SELECT id, name FROM branch_data WHERE data_type = 'membership';
-- Result: id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479', name = 'Annual Membership'

-- Step 2: Update features for that specific membership
UPDATE branch_data
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{features}',
  '[
    "12 Months Full Access",
    "4 Private PT Sessions",
    "2 Guest Invitations",
    "VIP Locker Room",
    "Unlimited Group Classes"
  ]'::jsonb
)
WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
```

---

## Notes

- Features are **specific to each gym branch**
- Use clear, customer-friendly language
- Keep features concise (1-5 words each)
- Recommended: 5-8 features per membership
- Icon: Automatically uses checkmark (✓)

---

**Pro Tip**: Use `metadata.features` for maximum flexibility! 🎯

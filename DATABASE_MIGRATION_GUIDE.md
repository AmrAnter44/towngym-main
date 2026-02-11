# Database Migration Guide
## Restructuring branch_data Table with Meaningful Column Names

This guide explains how to migrate from confusing column names to meaningful, scalable column names across all gym projects (X Gym, Eagle Gym, Fitboost).

---

## 📋 Overview

### Current Problem
The `branch_data` table uses confusing column names:
- `title_en` / `title_ar` - Used for different purposes (name, price, time)
- `description_en` / `description_ar` - Sometimes contains coach names
- `schedule` - JSON object, inconsistent structure
- `features` - Array, used for different purposes

### Solution
Add **50+ meaningful columns** organized by data type:
- **Common**: `name`, `description`, `price`, `original_price`
- **Classes**: `coach_name`, `day_of_week`, `time`, `duration_minutes`, `level`, `room_location`, `max_participants`, `booking_required`, `class_type`
- **Coaches**: `role`, `specialization`, `years_experience`, `certifications`, `phone_number`, `email`, `bio`, `rating`
- **Memberships**: `duration_days`, `freeze_weeks`, `guest_invites`, `pt_sessions_included`, `inbody_scans`, `spa_access`, `pool_access`, `sauna_access`
- **PT Packages**: `sessions_count`, `validity_days`, `per_session_price`, `transferable`, `includes_nutrition_plan`
- **Offers**: `discount_percentage`, `discount_amount`, `valid_from`, `valid_until`, `applicable_to`, `terms_conditions`, `promo_code`
- **Future Flexibility**: `metadata` (JSONB) for custom attributes without schema changes

---

## 🚀 Migration Steps

### Step 1: Backup Your Database
**CRITICAL**: Always backup before running migrations!

```bash
# Using Supabase CLI
supabase db dump -f backup-$(date +%Y%m%d-%H%M%S).sql

# Or from Supabase Dashboard:
# Project Settings → Database → Backups → Download
```

### Step 2: Review the Migration Script
Open and review `database-migration.sql`:
- Step 1: Adds all new columns
- Step 2: Migrates existing data to new structure
- Step 3: Creates performance indexes
- Step 4: Verification queries
- Step 5: (Optional) Drop old columns after verification

### Step 3: Execute the Migration

**Option A: Using Supabase SQL Editor**
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Create new query
4. Copy content from `database-migration.sql`
5. Execute the script
6. Review verification query results

**Option B: Using Supabase CLI**
```bash
supabase db execute -f database-migration.sql
```

### Step 4: Verify Data Migration

Run verification queries from the migration script:

```sql
-- Verify CLASSES
SELECT
  id, name, coach_name, day_of_week, time,
  class_type, duration_minutes, max_participants
FROM branch_data
WHERE data_type = 'class'
ORDER BY display_order;

-- Verify COACHES
SELECT
  id, name, role, specialization, bio, rating
FROM branch_data
WHERE data_type = 'coach'
ORDER BY display_order;

-- Verify MEMBERSHIPS
SELECT
  id, name, description, price, duration_days,
  freeze_weeks, pt_sessions_included, spa_access
FROM branch_data
WHERE data_type = 'membership'
ORDER BY display_order;

-- Verify PT PACKAGES
SELECT
  id, name, price, sessions_count,
  validity_days, per_session_price
FROM branch_data
WHERE data_type = 'pt_package'
ORDER BY display_order;
```

### Step 5: Test the Application

**Updated Components:**
- ✅ `src/comp/Classes.jsx` - Uses `name`, `day_of_week`, `coach_name`, `time`, `class_type`, `booking_required`
- ✅ `src/comp/Coaches.jsx` - Uses `name`, `role`
- ✅ `src/comp/Home.jsx` - Uses meaningful columns for memberships and PT packages

**Test Checklist:**
- [ ] Classes page displays correctly (name, day, coach, time)
- [ ] Coaches carousel shows names and roles
- [ ] Home page memberships show duration, price, features
- [ ] Home page PT packages show sessions count, pricing
- [ ] All data is accurate (no N/A values)
- [ ] Images load correctly

### Step 6: (Optional) Drop Old Columns

**⚠️ ONLY after thorough testing and verification!**

Uncomment Step 5 in `database-migration.sql`:

```sql
ALTER TABLE branch_data
  DROP COLUMN IF EXISTS title_en,
  DROP COLUMN IF EXISTS title_ar,
  DROP COLUMN IF EXISTS description_en,
  DROP COLUMN IF EXISTS description_ar,
  DROP COLUMN IF EXISTS schedule,
  DROP COLUMN IF EXISTS features;
```

---

## 📊 New Column Structure

### Common Columns (All Data Types)
| Column | Type | Description |
|--------|------|-------------|
| `name` | TEXT | Primary name (class name, coach name, membership name) |
| `description` | TEXT | Detailed description |
| `price` | DECIMAL(10,2) | Current price in EGP |
| `original_price` | DECIMAL(10,2) | Original price (for discounts) |
| `image_url` | TEXT | Image path in Supabase Storage |

### Class-Specific Columns
| Column | Type | Description |
|--------|------|-------------|
| `coach_name` | TEXT | Name of the coach |
| `day_of_week` | TEXT | Day (Sunday, Monday, etc.) |
| `time` | TEXT | Time (8:00 AM, 6:00 PM) |
| `duration_minutes` | INTEGER | Class duration (60, 90) |
| `level` | TEXT | Beginner, Intermediate, Advanced, All Levels |
| `room_location` | TEXT | Studio A, Main Hall, etc. |
| `max_participants` | INTEGER | Maximum capacity |
| `booking_required` | BOOLEAN | Requires pre-booking |
| `class_type` | TEXT | Mixed, Ladies Only, etc. |

### Coach-Specific Columns
| Column | Type | Description |
|--------|------|-------------|
| `role` | TEXT | Personal Trainer, Group Instructor, etc. |
| `specialization` | TEXT[] | Array: ['Yoga', 'Cardio', 'Strength'] |
| `years_experience` | INTEGER | Years of experience |
| `certifications` | TEXT[] | Array of certifications |
| `phone_number` | TEXT | Contact phone |
| `email` | TEXT | Contact email |
| `bio` | TEXT | Biography/description |
| `rating` | DECIMAL(3,2) | Rating 0-5 |

### Membership-Specific Columns
| Column | Type | Description |
|--------|------|-------------|
| `duration_days` | INTEGER | 30, 90, 180, 365 |
| `freeze_weeks` | INTEGER | Allowed freeze weeks |
| `guest_invites` | INTEGER | Guest passes included |
| `pt_sessions_included` | INTEGER | Personal training sessions |
| `inbody_scans` | INTEGER | InBody scans included |
| `spa_access` | BOOLEAN | Spa access included |
| `pool_access` | BOOLEAN | Pool access included |
| `sauna_access` | BOOLEAN | Sauna access included |
| `group_classes_included` | BOOLEAN | Group classes included |

### PT Package-Specific Columns
| Column | Type | Description |
|--------|------|-------------|
| `sessions_count` | INTEGER | Number of sessions (8, 12, 16) |
| `validity_days` | INTEGER | Valid for X days (90, 180) |
| `per_session_price` | DECIMAL(10,2) | Price per session |
| `transferable` | BOOLEAN | Can transfer to another person |
| `includes_nutrition_plan` | BOOLEAN | Includes nutrition planning |

### Offer-Specific Columns
| Column | Type | Description |
|--------|------|-------------|
| `discount_percentage` | DECIMAL(5,2) | Discount % (20.00, 33.00) |
| `discount_amount` | DECIMAL(10,2) | Fixed discount amount |
| `valid_from` | DATE | Offer start date |
| `valid_until` | DATE | Offer end date |
| `applicable_to` | TEXT[] | ['membership', 'pt_package', 'class'] |
| `terms_conditions` | TEXT | Terms and conditions |
| `promo_code` | TEXT | Promo code (SUMMER2024) |
| `usage_limit` | INTEGER | Max number of uses |
| `times_used` | INTEGER | Current usage count |

### Metadata Column (Future Flexibility)
| Column | Type | Description |
|--------|------|-------------|
| `metadata` | JSONB | Flexible JSON for custom attributes |

**Example metadata usage:**
```sql
-- Add custom attribute
UPDATE branch_data
SET metadata = metadata || '{"custom_field": "value"}'::jsonb
WHERE id = 'some-id';

-- Query by metadata
SELECT * FROM branch_data
WHERE metadata->>'custom_field' = 'value';
```

---

## 🔄 Migration Logic

### Classes Migration
```sql
name = title_en
description = description_ar
coach_name = description_en (for Yoga/HIT Cardio) OR schedule->>'coach'
day_of_week = hardcoded for broken classes OR schedule->>'day'
time = title_ar (for Yoga/HIT Cardio) OR schedule->>'time'
class_type = 'Ladies Only' if in features, else 'Mixed'
booking_required = true if 'Members Only' in features
```

### Coaches Migration
```sql
name = title_en
description = description_ar
bio = description_ar
role = 'Coach'
specialization = features array
```

### Memberships Migration
```sql
name = title_en
description = description_ar
price = title_ar (if numeric)
duration_days = parsed from title_en (Month=30, 3 months=90, Year=365)
pt_sessions_included = 4 if 'PT Sessions' in features, else 0
spa_access = true if 'Spa Access' in features
```

### PT Packages Migration
```sql
name = title_en
description = description_ar
price = title_ar (if numeric)
sessions_count = parsed from title_en regex
per_session_price = price / sessions_count
includes_nutrition_plan = true if 'Nutrition Plan' in features
```

---

## 🎯 Benefits

### 1. **Clarity**
- Column names describe their purpose
- No confusion about what `title_ar` or `description_en` contain

### 2. **Scalability**
- Easy to add new gyms without confusion
- Clear structure for onboarding new developers

### 3. **Type Safety**
- Proper data types (INTEGER, BOOLEAN, DATE) instead of TEXT everywhere
- Database constraints ensure data quality

### 4. **Query Performance**
- Indexed columns (name, day_of_week, coach_name, price)
- Faster queries without parsing JSON

### 5. **Future Flexibility**
- `metadata` JSONB column for one-off attributes
- No schema changes needed for minor additions

---

## 🛠️ Future Additions

### Adding New Columns
```sql
ALTER TABLE branch_data
ADD COLUMN IF NOT EXISTS new_column_name TEXT;
```

### Using Metadata for One-Off Attributes
Instead of adding columns for single-gym features:
```sql
UPDATE branch_data
SET metadata = metadata || '{"kids_area": true}'::jsonb
WHERE branch_id = 'specific-branch-id';
```

### Querying Metadata
```sql
-- Find all items with kids_area
SELECT * FROM branch_data
WHERE metadata->>'kids_area' = 'true';

-- Check if metadata key exists
SELECT * FROM branch_data
WHERE metadata ? 'kids_area';
```

---

## 📝 Rollback Plan

If anything goes wrong, restore from backup:

```bash
# Using backup file
psql -h [your-db-host] -U postgres -d postgres -f backup-20240210-120000.sql

# Or from Supabase Dashboard:
# Project Settings → Database → Backups → Restore
```

---

## ✅ Checklist

Before migration:
- [ ] Backup database
- [ ] Review migration script
- [ ] Test on development environment first
- [ ] Inform team about downtime (if needed)

After migration:
- [ ] Verify data with verification queries
- [ ] Test all pages in application
- [ ] Check for any N/A or missing values
- [ ] Monitor for errors in production
- [ ] Update documentation

After 1 week of testing:
- [ ] Consider dropping old columns (Step 5)
- [ ] Update any remaining hardcoded queries
- [ ] Celebrate successful migration! 🎉

---

## 📞 Support

If you encounter issues:
1. Check verification queries for data accuracy
2. Review browser console for JavaScript errors
3. Check Supabase logs for database errors
4. Restore from backup if critical issues occur

---

## 📚 Related Files

- `database-migration.sql` - Main migration script
- `src/comp/Classes.jsx` - Updated to use new columns
- `src/comp/Coaches.jsx` - Updated to use new columns
- `src/comp/Home.jsx` - Updated for memberships & PT packages
- `src/data/dataService.js` - Data fetching service (no changes needed)

---

**Migration Date**: To be scheduled
**Estimated Downtime**: 5-10 minutes
**Rollback Time**: < 5 minutes
**Risk Level**: Low (with proper backup)

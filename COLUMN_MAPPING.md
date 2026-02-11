# Column Mapping Reference
## Old Structure → New Structure

Quick reference guide for migrating from confusing to meaningful column names.

---

## 🎯 Classes Data Type

| Old Column | Old Usage | New Column | Type |
|------------|-----------|------------|------|
| `title_en` | Class name | `name` | TEXT |
| `title_ar` | **TIME** (broken!) | `time` | TEXT |
| `description_en` | **COACH NAME** (broken!) | `coach_name` | TEXT |
| `description_ar` | Description | `description` | TEXT |
| `schedule.day` | Day of week | `day_of_week` | TEXT |
| `schedule.time` | Time | `time` | TEXT |
| `schedule.coach` | Coach name | `coach_name` | TEXT |
| `features` → "Ladies Only" | Class type | `class_type` | TEXT |
| `features` → "Members Only" | Booking required | `booking_required` | BOOLEAN |
| ❌ Missing | Duration | `duration_minutes` | INTEGER |
| ❌ Missing | Skill level | `level` | TEXT |
| ❌ Missing | Room | `room_location` | TEXT |
| ❌ Missing | Capacity | `max_participants` | INTEGER |

**Example Old Data:**
```json
{
  "title_en": "Yoga",
  "title_ar": "8:00 AM",           // ❌ Should be time!
  "description_en": "Huda",         // ❌ Should be coach!
  "description_ar": "Relaxing yoga",
  "schedule": {},                   // ❌ Empty!
  "features": ["Ladies Only"]
}
```

**Example New Data:**
```json
{
  "name": "Yoga",
  "time": "8:00 AM",                // ✅ Clear purpose
  "coach_name": "Huda",             // ✅ Clear purpose
  "description": "Relaxing yoga",
  "day_of_week": "Sunday",
  "class_type": "Ladies Only",
  "duration_minutes": 60,
  "level": "All Levels",
  "booking_required": false
}
```

---

## 👨‍🏫 Coaches Data Type

| Old Column | Old Usage | New Column | Type |
|------------|-----------|------------|------|
| `title_en` | Coach name | `name` | TEXT |
| `description_en` | Role/title | `role` | TEXT |
| `description_ar` | Bio (Arabic) | `bio` | TEXT |
| `features` | Specializations | `specialization` | TEXT[] |
| ❌ Missing | Experience years | `years_experience` | INTEGER |
| ❌ Missing | Certifications | `certifications` | TEXT[] |
| ❌ Missing | Phone | `phone_number` | TEXT |
| ❌ Missing | Email | `email` | TEXT |
| ❌ Missing | Rating | `rating` | DECIMAL(3,2) |

**Code Changes:**
```javascript
// OLD (Coaches.jsx)
name: coach.title_en || coach.name || 'Coach'
title: coach.description_en || coach.title || 'Fitness Trainer'

// NEW (Coaches.jsx)
name: coach.name || 'Coach'
title: coach.role || 'Fitness Trainer'
```

---

## 🎫 Memberships Data Type

| Old Column | Old Usage | New Column | Type |
|------------|-----------|------------|------|
| `title_en` | Duration name | `name` | TEXT |
| `title_ar` | **PRICE** (broken!) | `price` | DECIMAL(10,2) |
| `description_ar` | Description | `description` | TEXT |
| `metadata.price_new` | Original price | `original_price` | DECIMAL(10,2) |
| `metadata.private` | PT sessions | `pt_sessions_included` | INTEGER |
| `metadata.inbody` | InBody scans | `inbody_scans` | INTEGER |
| `metadata.invite` | Guest passes | `guest_invites` | INTEGER |
| `features` → "Spa Access" | Spa access | `spa_access` | BOOLEAN |
| ❌ Missing | Duration in days | `duration_days` | INTEGER |
| ❌ Missing | Freeze weeks | `freeze_weeks` | INTEGER |
| ❌ Missing | Pool access | `pool_access` | BOOLEAN |
| ❌ Missing | Sauna access | `sauna_access` | BOOLEAN |
| ❌ Missing | Classes included | `group_classes_included` | BOOLEAN |

**Code Changes:**
```javascript
// OLD (Home.jsx)
duration: membership.title_en || membership.duration || 'N/A'
private: membership.private || metadata.private || 0
inbody: membership.inbody || metadata.inbody || 0
invite: membership.invite || metadata.invite || 0
price_new: membership.price_new || metadata.price_new || membership.original_price || null

// NEW (Home.jsx)
duration: membership.name || 'N/A'
private: membership.pt_sessions_included || 0
inbody: membership.inbody_scans || 0
invite: membership.guest_invites || 0
price_new: membership.original_price || null
```

---

## 💪 PT Packages Data Type

| Old Column | Old Usage | New Column | Type |
|------------|-----------|------------|------|
| `title_en` | Sessions count text | `name` | TEXT |
| `title_ar` | **PRICE** (broken!) | `price` | DECIMAL(10,2) |
| `description_ar` | Description | `description` | TEXT |
| Parse from `title_en` | Session count | `sessions_count` | INTEGER |
| `metadata.price_discount` | Original price | `original_price` | DECIMAL(10,2) |
| Calculated | Per session price | `per_session_price` | DECIMAL(10,2) |
| `features` → "Nutrition Plan" | Includes nutrition | `includes_nutrition_plan` | BOOLEAN |
| ❌ Missing | Validity period | `validity_days` | INTEGER |
| ❌ Missing | Transferable | `transferable` | BOOLEAN |

**Code Changes:**
```javascript
// OLD (Home.jsx)
sessions: pkg.metadata?.sessions || parseInt(pkg.title_en) || 0
price_discount: pkg.metadata?.price_discount || null

// NEW (Home.jsx)
sessions: pkg.sessions_count || 0
price_discount: pkg.original_price || null
```

---

## 🎁 Offers Data Type

| Old Column | Old Usage | New Column | Type |
|------------|-----------|------------|------|
| `title_en` | Offer name | `name` | TEXT |
| `title_ar` | **DISCOUNT %** (broken!) | `discount_percentage` | DECIMAL(5,2) |
| `description_ar` | Terms/description | `terms_conditions` | TEXT |
| ❌ Missing | Fixed discount | `discount_amount` | DECIMAL(10,2) |
| ❌ Missing | Start date | `valid_from` | DATE |
| ❌ Missing | End date | `valid_until` | DATE |
| ❌ Missing | Applicable items | `applicable_to` | TEXT[] |
| ❌ Missing | Promo code | `promo_code` | TEXT |
| ❌ Missing | Usage limit | `usage_limit` | INTEGER |
| ❌ Missing | Times used | `times_used` | INTEGER |

---

## 🔄 Component Updates Summary

### Classes.jsx
```javascript
// ❌ OLD (Lines 30-58)
classname: classItem.title_en || classItem.classname || 'Class'
day: schedule.day || classItem.day || classItem.day_of_week || 'N/A'
coachname: schedule.coach || classItem.coach_name || classItem.coachname || 'Coach'
time1: schedule.time || classItem.title_ar || classItem.time1 || 'N/A'
mix: features.includes('Ladies Only') ? 'Ladies' : ...

// ✅ NEW (Simplified)
classname: classItem.name || 'Class'
day: classItem.day_of_week || 'N/A'
coachname: classItem.coach_name || 'Coach'
time1: classItem.time || 'N/A'
mix: classItem.class_type || ''
mem: classItem.booking_required || false
```

### Coaches.jsx
```javascript
// ❌ OLD (Lines 37-47)
name: coach.title_en || coach.name || 'Coach'
title: coach.description_en || coach.title || 'Fitness Trainer'

// ✅ NEW (Direct access)
name: coach.name || 'Coach'
title: coach.role || 'Fitness Trainer'
```

### Home.jsx - Memberships
```javascript
// ❌ OLD (Lines 27-39)
duration: membership.title_en || membership.duration || 'N/A'
private: membership.private || metadata.private || 0
inbody: membership.inbody || metadata.inbody || 0
invite: membership.invite || metadata.invite || 0
price_new: membership.price_new || metadata.price_new || membership.original_price || null

// ✅ NEW (Direct access)
duration: membership.name || 'N/A'
private: membership.pt_sessions_included || 0
inbody: membership.inbody_scans || 0
invite: membership.guest_invites || 0
price_new: membership.original_price || null
```

### Home.jsx - PT Packages
```javascript
// ❌ OLD (Lines 54-59)
sessions: pkg.metadata?.sessions || parseInt(pkg.title_en) || 0
price_discount: pkg.metadata?.price_discount || null

// ✅ NEW (Direct access)
sessions: pkg.sessions_count || 0
price_discount: pkg.original_price || null
```

---

## 📊 Benefits Comparison

| Aspect | Old Structure | New Structure |
|--------|---------------|---------------|
| **Clarity** | `title_ar` could be price, time, or title | `price`, `time`, `name` are clear |
| **Type Safety** | Everything TEXT | INTEGER, BOOLEAN, DATE, DECIMAL |
| **Parsing** | Regex to extract session count | Direct `sessions_count` column |
| **Nested Data** | `metadata.price_new` | `original_price` |
| **JSON Parsing** | `schedule.coach` every query | Indexed `coach_name` column |
| **Default Values** | Complex fallback chains | Single source of truth |
| **Query Performance** | JSON extraction in queries | Direct column access, indexed |
| **Maintainability** | Need to remember what columns mean | Self-documenting column names |

---

## 🎯 Migration Impact

### Files Changed
- ✅ `database-migration.sql` - Migration script (new)
- ✅ `DATABASE_MIGRATION_GUIDE.md` - Documentation (new)
- ✅ `COLUMN_MAPPING.md` - This file (new)
- ✅ `src/comp/Classes.jsx` - Updated to use new columns
- ✅ `src/comp/Coaches.jsx` - Updated to use new columns
- ✅ `src/comp/Home.jsx` - Updated for memberships & PT packages
- ⚠️ `src/data/dataService.js` - No changes needed (just fetches data)

### Files NOT Changed
- ✅ `src/lib/supabase.js` - No changes needed
- ✅ All other components - Don't use branch_data directly

---

## 🚀 Quick Start

1. **Backup database** (critical!)
2. **Run migration**: Execute `database-migration.sql` in Supabase SQL Editor
3. **Verify data**: Run verification queries from the script
4. **Test application**: Check Classes, Coaches, Home pages
5. **Monitor**: Watch for any errors in production
6. **(Optional) Drop old columns**: After 1 week of successful testing

---

## 📞 Quick Reference

Need to find data in code?

```javascript
// Classes
classItem.name          // Class name
classItem.coach_name    // Coach name
classItem.day_of_week   // Day
classItem.time          // Time
classItem.class_type    // "Mixed", "Ladies Only"

// Coaches
coach.name              // Coach name
coach.role              // "Personal Trainer", "Coach"
coach.specialization    // Array of specializations

// Memberships
membership.name         // "1 Month", "3 Months"
membership.price        // Current price
membership.original_price  // Original price (if discounted)
membership.duration_days   // 30, 90, 180, 365

// PT Packages
pkg.name                // Package name
pkg.sessions_count      // 8, 12, 16
pkg.price               // Total price
pkg.per_session_price   // Price per session
```

---

**Last Updated**: 2026-02-10
**Migration Status**: Ready for execution
**Risk Level**: Low (with proper backup)

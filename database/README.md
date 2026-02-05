# Supabase Integration for X Gym

This directory contains all the files needed to set up Supabase for X Gym.

## 📁 Files

- **setup-x-gym.sql**: Complete database setup script
- **test-connection.js**: Test script to verify Supabase connection
- **README.md**: This file

## 🚀 Quick Start

### Step 1: Run SQL Script

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the entire content of `setup-x-gym.sql`
6. Paste it into the SQL Editor
7. Click **Run** (or press Ctrl/Cmd + Enter)

### Step 2: Install Dependencies (if testing locally)

```bash
npm install dotenv
```

### Step 3: Test Connection

```bash
node database/test-connection.js
```

You should see:
```
✅ Connection successful!
✅ X Gym found: X Gym
✅ Haram Branch found: Haram Branch
✅ ALL TESTS PASSED!
```

### Step 4: Run Your App

```bash
npm run dev
```

Open http://localhost:5173 and check the browser console. You should see:
```
✅ DataService initialized: { gymId: '...', branchId: '...' }
```

## 📊 Database Schema

### Tables Created

1. **gyms** - Gym information
   - id, slug, name_en, name_ar, description_en, description_ar, logo_url, is_active

2. **branches** - Branch information
   - id, gym_id, slug, name_en, name_ar, address_en, phone, email, latitude, longitude, working_hours, amenities, is_active

3. **branch_data** - All branch content (coaches, classes, PT packages, memberships, offers)
   - id, branch_id, data_type, title_en, title_ar, description_en, price, duration, schedule, metadata, display_order, is_active

4. **gym_owners** - Links users to gyms/branches
   - id, user_id, gym_id, branch_id, role, is_active

### Data Types in branch_data

- `coach` - Personal trainers
- `class` - Group classes
- `pt_package` - Personal training packages
- `membership` - Membership plans
- `offer` - Special offers and promotions

## 🔐 Security (RLS Policies)

All tables have Row Level Security (RLS) enabled:

- **Public can READ** all active data (is_active = true)
- **Gym owners can WRITE** their own gym/branch data
- Users can only see their own ownership records

## 📝 Adding Sample Data

The SQL script includes commented sample data at the bottom. To add sample data:

1. Open `setup-x-gym.sql`
2. Find section "7. SAMPLE DATA"
3. Uncomment the INSERT statements you want
4. Run the script again in Supabase SQL Editor

## 🔧 Troubleshooting

### Error: "Missing Supabase environment variables"

Make sure `.env.local` exists in the root directory with:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Error: "Gym 'x-gym' not found"

The SQL script hasn't been run yet. Go to Supabase Dashboard and run `setup-x-gym.sql`.

### Error: "No admin user linked"

Update the admin email in `setup-x-gym.sql` (section 6) with your actual admin email from Supabase Auth.

### Error: "relation does not exist"

Tables haven't been created. Run the complete `setup-x-gym.sql` script in Supabase SQL Editor.

## 📱 Using DataService in Your App

```javascript
import { dataService } from './data/dataService';

// Get gym info
const { data: gym, error } = await dataService.getGym();

// Get branch info
const { data: branch, error } = await dataService.getBranch();

// Get coaches
const { data: coaches, error } = await dataService.getCoaches();

// Get classes
const { data: classes, error } = await dataService.getClasses();

// Get PT packages
const { data: packages, error } = await dataService.getPtPackages();

// Get memberships
const { data: memberships, error } = await dataService.getMemberships();

// Get offers
const { data: offers, error } = await dataService.getOffers();
```

## 🌍 Changing Gym/Branch

To connect to a different gym or branch, update the constants in [src/data/dataService.js](../src/data/dataService.js:4-5):

```javascript
const GYM_SLUG = 'your-gym-slug';
const BRANCH_SLUG = 'your-branch-slug';
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ Verification Queries

Run these in Supabase SQL Editor to verify your setup:

```sql
-- Check gym
SELECT * FROM gyms WHERE slug = 'x-gym';

-- Check branch
SELECT b.*, g.name_en as gym_name
FROM branches b
JOIN gyms g ON g.id = b.gym_id
WHERE g.slug = 'x-gym' AND b.slug = 'haram';

-- Check branch data counts
SELECT data_type, COUNT(*)
FROM branch_data bd
JOIN branches b ON b.id = bd.branch_id
JOIN gyms g ON g.id = b.gym_id
WHERE g.slug = 'x-gym' AND b.slug = 'haram'
GROUP BY data_type;

-- Check admin users
SELECT go.*, u.email
FROM gym_owners go
JOIN gyms g ON g.id = go.gym_id
JOIN auth.users u ON u.id = go.user_id
WHERE g.slug = 'x-gym';
```

## 🎉 Done!

Your app is now connected to Supabase! All data will be loaded from your Supabase database instead of JSON files.

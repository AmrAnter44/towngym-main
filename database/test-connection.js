// Test Supabase Connection
// Run: node database/test-connection.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Get credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Make sure .env.local contains:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Create client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔍 Testing Supabase connection...\n');

async function testConnection() {
  try {
    // Test 1: Connection
    console.log('1️⃣ Testing basic connection...');
    const { data: testData, error: testError } = await supabase
      .from('gyms')
      .select('count')
      .limit(1);

    if (testError) throw testError;
    console.log('✅ Connection successful!\n');

    // Test 2: Get X Gym
    console.log('2️⃣ Fetching X Gym...');
    const { data: gym, error: gymError } = await supabase
      .from('gyms')
      .select('*')
      .eq('slug', 'x-gym')
      .single();

    if (gymError) throw gymError;
    if (!gym) {
      console.log('⚠️  X Gym not found! Run setup-x-gym.sql first.');
      return;
    }

    console.log('✅ X Gym found:', gym.name_en);
    console.log('   ID:', gym.id);
    console.log('   Slug:', gym.slug);
    console.log('   Active:', gym.is_active, '\n');

    // Test 3: Get Haram Branch
    console.log('3️⃣ Fetching Haram Branch...');
    const { data: branch, error: branchError } = await supabase
      .from('branches')
      .select('*')
      .eq('gym_id', gym.id)
      .eq('slug', 'haram')
      .single();

    if (branchError) throw branchError;
    if (!branch) {
      console.log('⚠️  Haram Branch not found! Run setup-x-gym.sql first.');
      return;
    }

    console.log('✅ Haram Branch found:', branch.name_en);
    console.log('   ID:', branch.id);
    console.log('   Slug:', branch.slug);
    console.log('   Phone:', branch.phone);
    console.log('   Email:', branch.email);
    console.log('   Active:', branch.is_active, '\n');

    // Test 4: Get Branch Data
    console.log('4️⃣ Fetching branch data...');
    const { data: branchData, error: dataError } = await supabase
      .from('branch_data')
      .select('*')
      .eq('branch_id', branch.id);

    if (dataError) throw dataError;

    console.log('✅ Branch data found:');
    const dataTypes = ['coach', 'class', 'pt_package', 'membership', 'offer'];
    dataTypes.forEach(type => {
      const count = branchData.filter(d => d.data_type === type).length;
      console.log(`   - ${type}: ${count} items`);
    });
    console.log();

    // Test 5: Check admin user
    console.log('5️⃣ Checking admin user link...');
    const { data: owners, error: ownersError } = await supabase
      .from('gym_owners')
      .select('*')
      .eq('gym_id', gym.id);

    if (ownersError) throw ownersError;

    if (owners.length === 0) {
      console.log('⚠️  No admin user linked! Update setup-x-gym.sql with correct email.');
    } else {
      console.log(`✅ ${owners.length} owner(s) linked to gym`);
      owners.forEach(owner => {
        console.log(`   - Role: ${owner.role}, Active: ${owner.is_active}`);
      });
    }
    console.log();

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ ALL TESTS PASSED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nNext steps:');
    console.log('1. npm run dev');
    console.log('2. Open http://localhost:5173');
    console.log('3. Check browser console for "DataService initialized"');
    console.log('4. Start using your app! 🎉\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.hint) console.error('Hint:', error.hint);
    if (error.details) console.error('Details:', error.details);
    process.exit(1);
  }
}

testConnection();

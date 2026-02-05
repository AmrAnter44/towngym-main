import { supabase } from '../lib/supabase.js';

// Configuration
const GYM_SLUG = 'x-gym';
const BRANCH_SLUG = 'haram';

class DataService {
  constructor() {
    this.gymId = null;
    this.branchId = null;
    this.initialized = false;
  }

  // Initialize gym and branch IDs
  async initialize() {
    if (this.initialized) return;

    try {
      // Get gym by slug
      const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', GYM_SLUG)
        .eq('is_active', true)
        .single();

      if (gymError) throw gymError;
      if (!gym) throw new Error(`Gym '${GYM_SLUG}' not found`);

      this.gymId = gym.id;

      // Get branch by slug
      const { data: branch, error: branchError } = await supabase
        .from('branches')
        .select('id')
        .eq('gym_id', this.gymId)
        .eq('slug', BRANCH_SLUG)
        .eq('is_active', true)
        .single();

      if (branchError) throw branchError;
      if (!branch) throw new Error(`Branch '${BRANCH_SLUG}' not found`);

      this.branchId = branch.id;
      this.initialized = true;

      console.log('✅ DataService initialized:', { gymId: this.gymId, branchId: this.branchId });
    } catch (error) {
      console.error('❌ DataService initialization failed:', error);
      throw error;
    }
  }

  // Helper to get branch data by type
  async getBranchData(dataType) {
    try {
      await this.initialize();

      const { data, error } = await supabase
        .from('branch_data')
        .select('*')
        .eq('branch_id', this.branchId)
        .eq('data_type', dataType)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      return {
        data: data || [],
        error: null
      };
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
      return {
        data: [],
        error: error.message
      };
    }
  }

  // ==================== GYMS ====================
  async getGym() {
    try {
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .eq('slug', GYM_SLUG)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return {
        data: data || null,
        error: null
      };
    } catch (error) {
      console.error('Error fetching gym:', error);
      return {
        data: null,
        error: error.message
      };
    }
  }

  // ==================== BRANCHES ====================
  async getBranch() {
    try {
      await this.initialize();

      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .eq('id', this.branchId)
        .single();

      if (error) throw error;

      return {
        data: data || null,
        error: null
      };
    } catch (error) {
      console.error('Error fetching branch:', error);
      return {
        data: null,
        error: error.message
      };
    }
  }

  // ==================== OFFERS ====================
  async getOffers() {
    return this.getBranchData('offer');
  }

  // ==================== PT PACKAGES ====================
  async getPtPackages() {
    return this.getBranchData('pt_package');
  }

  // ==================== COACHES ====================
  async getCoaches() {
    return this.getBranchData('coach');
  }

  // ==================== CLASSES ====================
  async getClasses() {
    return this.getBranchData('class');
  }

  // ==================== MEMBERSHIPS ====================
  async getMemberships() {
    return this.getBranchData('membership');
  }
}

// Create singleton instance
export const dataService = new DataService();

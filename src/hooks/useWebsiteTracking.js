// src/hooks/useWebsiteTracking.js
import { useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const gymSlug = import.meta.env.VITE_GYM_SLUG;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Track homepage visit only once per session
 * Tracks at GYM level (all branches aggregated)
 * Privacy-friendly: No PII stored, only session tracking
 */
export function useWebsiteTracking() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track homepage (path === '/')
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      return;
    }

    // Track only once per page load
    if (!hasTracked.current && gymSlug) {
      trackVisit();
      hasTracked.current = true;
    }
  }, []);

  /**
   * Generate a unique session ID (UUID v4)
   */
  function generateSessionId() {
    const stored = sessionStorage.getItem('visitor_session_id');
    if (stored) return stored;

    const newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    sessionStorage.setItem('visitor_session_id', newId);
    return newId;
  }

  /**
   * Track page visit (with throttling to prevent spam)
   */
  async function trackVisit() {
    try {
      // Throttle: skip if tracked in last 5 seconds
      const lastTrack = sessionStorage.getItem('last_track_time');
      const now = Date.now();

      if (lastTrack && (now - parseInt(lastTrack)) < 5000) {
        return;
      }

      // Get gym ID from gym slug
      const { data: gymId, error: gymError } = await supabase
        .rpc('get_gym_id_by_slug', {
          p_gym_slug: gymSlug
        });

      if (gymError || !gymId) {
        console.warn('Could not find gym for slug:', gymSlug);
        return;
      }

      const visitData = {
        gym_id: gymId,
        session_id: generateSessionId(),
        visited_at: new Date().toISOString()
      };

      // Fire-and-forget (don't wait for response)
      supabase
        .from('website_visits')
        .insert(visitData)
        .then(({ error }) => {
          if (error) console.warn('Tracking error:', error.message);
        });

      sessionStorage.setItem('last_track_time', now.toString());

    } catch (error) {
      // Silent fail - tracking shouldn't break the app
      console.warn('Tracking failed:', error);
    }
  }
}

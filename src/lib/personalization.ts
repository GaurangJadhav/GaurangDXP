/**
 * Contentstack Personalization Helper
 * 
 * This module provides utilities for implementing personalization
 * using Contentstack Personalization features.
 */

// User attributes for personalization
export interface UserAttributes {
  favorite_team?: string;
  user_location?: string;
  visit_count?: number;
  matches_viewed?: number;
  last_visit?: string;
}

// Personalization segments
export type Segment = 
  | 'new_visitors'
  | 'regular_visitors'
  | 'super_fans'
  | 'flame_chargers_fans'
  | 'storm_surfers_fans'
  | 'windstorm_warriors_fans'
  | 'earth_titans_fans'
  | 'thunder_strikers_fans'
  | 'glacier_gladiators_fans'
  | 'vasai_residents'
  | 'virar_residents'
  | 'nalasopara_residents'
  | 'palghar_residents';

// Team mapping
const TEAM_MAP: Record<string, string> = {
  'FC': 'flame_chargers_fans',
  'SS': 'storm_surfers_fans',
  'WW': 'windstorm_warriors_fans',
  'ET': 'earth_titans_fans',
  'TS': 'thunder_strikers_fans',
  'GG': 'glacier_gladiators_fans',
};

/**
 * Get user attributes from localStorage
 */
export function getUserAttributes(): UserAttributes {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('ocpl_user_attributes');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save user attributes to localStorage
 */
export function setUserAttributes(attributes: Partial<UserAttributes>): void {
  if (typeof window === 'undefined') return;
  
  const current = getUserAttributes();
  const updated = { ...current, ...attributes };
  localStorage.setItem('ocpl_user_attributes', JSON.stringify(updated));
}

/**
 * Track page view and update visit count
 */
export function trackPageView(): void {
  const attrs = getUserAttributes();
  const visitCount = (attrs.visit_count || 0) + 1;
  setUserAttributes({
    visit_count: visitCount,
    last_visit: new Date().toISOString(),
  });
}

/**
 * Track match page view
 */
export function trackMatchView(): void {
  const attrs = getUserAttributes();
  const matchesViewed = (attrs.matches_viewed || 0) + 1;
  setUserAttributes({ matches_viewed: matchesViewed });
}

/**
 * Set user's favorite team
 */
export function setFavoriteTeam(teamShortName: string): void {
  setUserAttributes({ favorite_team: teamShortName });
}

/**
 * Get user's favorite team
 */
export function getFavoriteTeam(): string | undefined {
  return getUserAttributes().favorite_team;
}

/**
 * Determine user segments based on attributes
 */
export function getUserSegments(): Segment[] {
  const attrs = getUserAttributes();
  const segments: Segment[] = [];
  
  // Engagement-based segments
  if (!attrs.visit_count || attrs.visit_count === 1) {
    segments.push('new_visitors');
  } else if (attrs.visit_count >= 10 && (attrs.matches_viewed || 0) >= 5) {
    segments.push('super_fans');
  } else if (attrs.visit_count >= 3) {
    segments.push('regular_visitors');
  }
  
  // Team-based segments
  if (attrs.favorite_team && TEAM_MAP[attrs.favorite_team]) {
    segments.push(TEAM_MAP[attrs.favorite_team] as Segment);
  }
  
  // Location-based segments
  if (attrs.user_location) {
    const location = attrs.user_location.toLowerCase();
    if (location.includes('vasai')) segments.push('vasai_residents');
    if (location.includes('virar')) segments.push('virar_residents');
    if (location.includes('nalasopara')) segments.push('nalasopara_residents');
    if (location.includes('palghar')) segments.push('palghar_residents');
  }
  
  return segments;
}

/**
 * Check if user belongs to a specific segment
 */
export function isInSegment(segment: Segment): boolean {
  return getUserSegments().includes(segment);
}

/**
 * Get personalized content based on user segments
 */
export function getPersonalizedContent<T>(
  variants: Array<{ segment: Segment | 'all'; content: T }>
): T | null {
  const userSegments = getUserSegments();
  
  // Find matching variant
  for (const variant of variants) {
    if (variant.segment === 'all' || userSegments.includes(variant.segment)) {
      return variant.content;
    }
  }
  
  // Return first variant as fallback
  return variants[0]?.content || null;
}

/**
 * Personalized welcome message based on engagement
 */
export function getWelcomeMessage(): { message: string; cta: string } {
  const segments = getUserSegments();
  
  if (segments.includes('super_fans')) {
    return {
      message: "Hey Super Fan! Your team needs you at the ground!",
      cta: "Get Tickets"
    };
  }
  
  if (segments.includes('regular_visitors')) {
    return {
      message: "Welcome back! Check out the latest match updates.",
      cta: "View Schedule"
    };
  }
  
  return {
    message: "Welcome to OCPL! Discover Vasai's biggest cricket tournament.",
    cta: "Explore Teams"
  };
}

/**
 * Get team-specific hero content
 */
export function getTeamHeroContent(): { headline: string; subheadline: string } {
  const favoriteTeam = getFavoriteTeam();
  
  const teamContent: Record<string, { headline: string; subheadline: string }> = {
    'FC': { headline: "IGNITE THE FIRE!", subheadline: "Support your defending champions" },
    'SS': { headline: "RIDE THE STORM!", subheadline: "The Surfers are on a winning streak" },
    'WW': { headline: "SWIFT AS WIND!", subheadline: "Power through every match" },
    'ET': { headline: "SOLID AS EARTH!", subheadline: "The Titans are ready to dominate" },
    'TS': { headline: "STRIKE LIKE THUNDER!", subheadline: "Lightning fast on the field" },
    'GG': { headline: "COOL UNDER PRESSURE!", subheadline: "Ice-cool in every situation" },
  };
  
  return teamContent[favoriteTeam || ''] || {
    headline: "OCPL 2025",
    subheadline: "Vasai's Premier Cricket League"
  };
}

/**
 * Analytics event tracking
 */
export function trackEvent(
  eventName: string,
  attributes: Record<string, string | number>
): void {
  // In production, this would send to Contentstack Analytics or your analytics service
  console.log('Track Event:', eventName, attributes);
  
  // Example: Send to analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify({ event: eventName, attributes, timestamp: Date.now() })
  // });
}


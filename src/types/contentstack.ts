// Contentstack Content Type Definitions for OCPL

export interface ContentstackImage {
  uid: string;
  url: string;
  title: string;
  filename: string;
  content_type: string;
}

export interface ContentstackLink {
  title: string;
  href: string;
}

// Team Content Type
export interface Team {
  uid: string;
  title: string;
  team_name: string;
  short_name: string; // e.g., "VW" for Vasai Warriors
  team_logo: ContentstackImage;
  team_banner: ContentstackImage;
  primary_color: string;
  secondary_color: string;
  captain: Player[];
  owner_name: string;
  home_ground: string;
  established_year: number;
  team_motto: string;
  description: string;
  social_links: SocialLink[];
  stats: TeamStats;
}

export interface TeamStats {
  matches_played: number;
  wins: number;
  losses: number;
  ties: number;
  no_results: number;
  titles_won: number;
  titles?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

// Player Content Type
export interface Player {
  uid: string;
  title: string;
  player_name: string;
  jersey_number: number;
  profile_image: ContentstackImage;
  role: "Batsman" | "Bowler" | "All-Rounder" | "Wicket-Keeper";
  batting_style: "Right-Handed" | "Left-Handed";
  bowling_style: string;
  team: Team[];
  age: number;
  locality: string; // Area in Vasai
  occupation: string;
  bio: string;
  stats: PlayerStats;
  is_captain: boolean;
  is_overseas: boolean;
}

export interface PlayerStats {
  matches: number;
  runs: number;
  highest_score: number;
  batting_average: number;
  strike_rate: number;
  fifties: number;
  hundreds: number;
  wickets: number;
  best_bowling: string;
  bowling_average: number;
  economy: number;
  catches: number;
  stumpings: number;
}

// Match Content Type
export interface Match {
  uid: string;
  title: string;
  match_number: number;
  match_date: string;
  match_time: string;
  venue: Venue[];
  team_1: Team[];
  team_2: Team[];
  toss_winner: string;
  toss_decision: string;
  match_status: "Upcoming" | "Live" | "Completed" | "Abandoned";
  result: string;
  result_summary?: string;
  man_of_the_match: string;
  scorecard?: Scorecard;
  // Score fields (separate runs, wickets, overs as numbers)
  team_1_runs?: number;
  team_1_wickets?: number;
  team_1_overs?: number;
  team_2_runs?: number;
  team_2_wickets?: number;
  team_2_overs?: number;
  // Legacy string fields for backwards compatibility
  team_1_score?: string;
  team_2_score?: string;
  highlights_video?: string;
  match_report?: string;
}

export interface Scorecard {
  team_1_score: InningsScore;
  team_2_score: InningsScore;
}

export interface InningsScore {
  runs: number;
  wickets: number;
  overs: number;
  run_rate: number;
}

// Venue Content Type
export interface Venue {
  uid: string;
  title: string;
  venue_name: string;
  location: string;
  city: string;
  capacity: number;
  venue_image: ContentstackImage;
  facilities: string[];
  description: string;
}

// Season Content Type
export interface Season {
  uid: string;
  title: string;
  season_name: string;
  year: number;
  start_date: string;
  end_date: string;
  season_logo: ContentstackImage;
  champion_team: Team[];
  runner_up: Team[];
  orange_cap: Player[];
  purple_cap: Player[];
  mvp: Player[];
  total_matches: number;
  total_runs: number;
  total_wickets: number;
  highest_score: string;
  best_bowling: string;
}

// Points Table Entry
export interface PointsTableEntry {
  uid: string;
  team: Team[];
  season: Season[];
  matches_played: number;
  wins: number;
  losses: number;
  ties: number;
  no_results: number;
  points: number;
  net_run_rate: number;
  position: number;
  recent_form?: string[];
}

// News/Article Content Type
export interface Article {
  uid: string;
  title: string;
  slug: string;
  featured_image: ContentstackImage;
  excerpt: string;
  content: string;
  author: string;
  publish_date: string;
  category: "Match Report" | "News" | "Interview" | "Feature" | "Announcement";
  tags: string[];
  related_team: Team[];
  related_players: Player[];
  related_match: Match[];
}

// Homepage Content Type
export interface Homepage {
  uid: string;
  title: string;
  hero_section: HeroSection;
  featured_matches: Match[];
  featured_teams: Team[];
  featured_players: Player[];
  latest_news: Article[];
  sponsors: Sponsor[];
  announcements: Announcement[];
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  background_image: ContentstackImage;
  cta_button: ContentstackLink;
  countdown_date: string;
}

export interface Sponsor {
  name: string;
  logo: ContentstackImage;
  tier: "Title" | "Associate" | "Official";
  website: string;
}

export interface Announcement {
  title: string;
  message: string;
  type: "Info" | "Warning" | "Success";
  link: ContentstackLink;
  is_active: boolean;
}

// Gallery Content Type
export interface Gallery {
  uid: string;
  title: string;
  description: string;
  images: GalleryImage[];
  match: Match[];
  season: Season[];
  date: string;
}

export interface GalleryImage {
  image: ContentstackImage;
  caption: string;
  photographer: string;
}

// Personalization Variant
export interface PersonalizationVariant {
  variant_id: string;
  variant_name: string;
  audience: string;
  content: unknown;
}

// Navigation
export interface Navigation {
  uid: string;
  title: string;
  nav_items: NavItem[];
}

export interface NavItem {
  label: string;
  url: string;
  icon?: string;
  children?: NavItem[];
}


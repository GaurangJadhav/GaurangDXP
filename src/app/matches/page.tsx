import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Trophy, Play } from "lucide-react";
import { TEAM_LOGOS } from "@/lib/team-logos";
import { getAllMatches } from "@/lib/contentstack";
import MatchFilters from "@/components/MatchFilters";

// Match interface for this page
interface MatchData {
  id: number;
  matchNumber: number;
  date: string;
  time: string;
  venue: string;
  team1: {
    name: string;
    shortName: string;
    color: string;
    logoUrl: string;
    score?: string;
    overs?: string;
  };
  team2: {
    name: string;
    shortName: string;
    color: string;
    logoUrl: string;
    score?: string;
    overs?: string;
  };
  status: string;
  result?: string;
  motm?: string;
}

// Fallback mock data
const fallbackMatches: MatchData[] = [
  {
    id: 1,
    matchNumber: 1,
    date: "Dec 1, 2025",
    time: "4:00 PM",
    venue: "Vasai Sports Ground",
    team1: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl, score: "185/6", overs: "20" },
    team2: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl, score: "160/8", overs: "20" },
    status: "Completed",
    result: "Flame Chargers won by 25 runs",
    motm: "Rahul Patil",
  },
  {
    id: 2,
    matchNumber: 2,
    date: "Dec 2, 2025",
    time: "4:00 PM",
    venue: "Virar Stadium",
    team1: { name: "Windstorm Warriors", shortName: "WW", color: "#22c55e", logoUrl: TEAM_LOGOS.WW.logoUrl, score: "145/9", overs: "20" },
    team2: { name: "Earth Titans", shortName: "ET", color: "#a855f7", logoUrl: TEAM_LOGOS.ET.logoUrl, score: "148/5", overs: "18.2" },
    status: "Completed",
    result: "Windstorm Warriors won by 5 wickets",
    motm: "Vikram Desai",
  },
  {
    id: 3,
    matchNumber: 3,
    date: "Dec 3, 2025",
    time: "4:00 PM",
    venue: "Vasai Sports Ground",
    team1: { name: "Thunder Strikers", shortName: "TS", color: "#facc15", logoUrl: TEAM_LOGOS.TS.logoUrl, score: "192/4", overs: "20" },
    team2: { name: "Glacier Gladiators", shortName: "GG", color: "#06b6d4", logoUrl: TEAM_LOGOS.GG.logoUrl, score: "150/10", overs: "18.4" },
    status: "Completed",
    result: "Thunder Strikers won by 42 runs",
    motm: "Mahesh Patil",
  },
  {
    id: 4,
    matchNumber: 4,
    date: "Dec 5, 2025",
    time: "4:00 PM",
    venue: "Nalasopara Cricket Ground",
    team1: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl, score: "175/7", overs: "20" },
    team2: { name: "Windstorm Warriors", shortName: "WW", color: "#22c55e", logoUrl: TEAM_LOGOS.WW.logoUrl, score: "172/9", overs: "20" },
    status: "Completed",
    result: "Storm Surfers won by 3 runs",
    motm: "Suresh Kumar",
  },
  {
    id: 15,
    matchNumber: 15,
    date: "Dec 20, 2025",
    time: "4:00 PM",
    venue: "Vasai Sports Ground",
    team1: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl },
    team2: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl },
    status: "Upcoming",
  },
  {
    id: 16,
    matchNumber: 16,
    date: "Dec 21, 2025",
    time: "4:00 PM",
    venue: "Virar Stadium",
    team1: { name: "Windstorm Warriors", shortName: "WW", color: "#22c55e", logoUrl: TEAM_LOGOS.WW.logoUrl },
    team2: { name: "Earth Titans", shortName: "ET", color: "#a855f7", logoUrl: TEAM_LOGOS.ET.logoUrl },
    status: "Upcoming",
  },
  {
    id: 17,
    matchNumber: 17,
    date: "Dec 22, 2025",
    time: "4:00 PM",
    venue: "Vasai Sports Ground",
    team1: { name: "Thunder Strikers", shortName: "TS", color: "#facc15", logoUrl: TEAM_LOGOS.TS.logoUrl },
    team2: { name: "Glacier Gladiators", shortName: "GG", color: "#06b6d4", logoUrl: TEAM_LOGOS.GG.logoUrl },
    status: "Upcoming",
  },
  {
    id: 18,
    matchNumber: 18,
    date: "Dec 23, 2025",
    time: "4:00 PM",
    venue: "Nalasopara Cricket Ground",
    team1: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl },
    team2: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl },
    status: "Upcoming",
  },
];

// Helper to get team logo
function getTeamLogoData(shortName: string) {
  return TEAM_LOGOS[shortName as keyof typeof TEAM_LOGOS] || {
    name: shortName,
    shortName: shortName,
    color: "#666666",
    logoUrl: "",
  };
}

// Helper to format score from runs/wickets
function formatScore(runs?: number, wickets?: number): string | undefined {
  if (runs === undefined) return undefined;
  if (wickets === undefined) return `${runs}`;
  return `${runs}/${wickets}`;
}

// Helper to format overs
function formatOvers(overs?: number): string | undefined {
  if (overs === undefined) return undefined;
  return overs.toString();
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function MatchesPage() {
  let allMatches: MatchData[] = fallbackMatches;

  try {
    const contentstackMatches = await getAllMatches();
    
    if (contentstackMatches && contentstackMatches.length > 0) {
      allMatches = contentstackMatches.map((match): MatchData => {
        const team1Data = match.team_1?.[0];
        const team2Data = match.team_2?.[0];
        const team1Logo = getTeamLogoData(team1Data?.short_name || "");
        const team2Logo = getTeamLogoData(team2Data?.short_name || "");
        const venueData = match.venue?.[0];
        
        return {
          id: match.match_number || 0,
          matchNumber: match.match_number || 0,
          date: match.match_date 
            ? new Date(match.match_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "TBD",
          time: match.match_time || "4:00 PM",
          venue: venueData?.venue_name || "Vasai Sports Ground",
          team1: {
            name: team1Data?.team_name || team1Logo.name,
            shortName: team1Data?.short_name || team1Logo.shortName,
            color: team1Data?.primary_color || team1Logo.color,
            logoUrl: team1Data?.team_logo?.url || team1Logo.logoUrl,
            score: formatScore(match.team_1_runs, match.team_1_wickets),
            overs: formatOvers(match.team_1_overs),
          },
          team2: {
            name: team2Data?.team_name || team2Logo.name,
            shortName: team2Data?.short_name || team2Logo.shortName,
            color: team2Data?.primary_color || team2Logo.color,
            logoUrl: team2Data?.team_logo?.url || team2Logo.logoUrl,
            score: formatScore(match.team_2_runs, match.team_2_wickets),
            overs: formatOvers(match.team_2_overs),
          },
          status: match.match_status || "Upcoming",
          result: match.result,
          motm: match.man_of_the_match,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching matches from Contentstack:", error);
    // Use fallback data
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              MATCH <span className="gradient-text">SCHEDULE</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              OCPL 2025 Season - All matches and results
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Matches */}
      <MatchFilters initialMatches={allMatches} />
    </div>
  );
}

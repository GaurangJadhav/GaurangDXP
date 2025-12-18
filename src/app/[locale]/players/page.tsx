"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Trophy, Target, Shield } from "lucide-react";
import { TEAM_LOGOS } from "@/lib/team-logos";

// Mock data - In production, this would come from Contentstack
const players = [
  {
    id: "rahul-patil",
    name: "Rahul Patil",
    jersey: 7,
    team: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl },
    role: "Batsman",
    battingStyle: "Right-Handed",
    bowlingStyle: "Right-arm Off Spin",
    isCaptain: true,
    stats: { matches: 45, runs: 1850, wickets: 12, avg: 48.68, sr: 142.5 },
  },
  {
    id: "amit-sharma",
    name: "Amit Sharma",
    jersey: 11,
    team: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl },
    role: "Bowler",
    battingStyle: "Right-Handed",
    bowlingStyle: "Right-arm Fast",
    isCaptain: false,
    stats: { matches: 40, runs: 180, wickets: 68, avg: 9.0, sr: 110.0 },
  },
  {
    id: "suresh-kumar",
    name: "Suresh Kumar",
    jersey: 23,
    team: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl },
    role: "All-Rounder",
    battingStyle: "Left-Handed",
    bowlingStyle: "Left-arm Orthodox",
    isCaptain: true,
    stats: { matches: 42, runs: 1120, wickets: 45, avg: 32.0, sr: 128.5 },
  },
  {
    id: "vikram-desai",
    name: "Vikram Desai",
    jersey: 45,
    team: { name: "Windstorm Warriors", shortName: "WW", color: "#22c55e", logoUrl: TEAM_LOGOS.WW.logoUrl },
    role: "Wicket-Keeper",
    battingStyle: "Right-Handed",
    bowlingStyle: "N/A",
    isCaptain: false,
    stats: { matches: 38, runs: 920, wickets: 0, avg: 28.75, sr: 145.2 },
  },
  {
    id: "pradeep-singh",
    name: "Pradeep Singh",
    jersey: 18,
    team: { name: "Windstorm Warriors", shortName: "WW", color: "#22c55e", logoUrl: TEAM_LOGOS.WW.logoUrl },
    role: "Batsman",
    battingStyle: "Right-Handed",
    bowlingStyle: "Right-arm Medium",
    isCaptain: true,
    stats: { matches: 44, runs: 1450, wickets: 8, avg: 38.15, sr: 132.0 },
  },
  {
    id: "rohan-joshi",
    name: "Rohan Joshi",
    jersey: 99,
    team: { name: "Earth Titans", shortName: "ET", color: "#a855f7", logoUrl: TEAM_LOGOS.ET.logoUrl },
    role: "All-Rounder",
    battingStyle: "Right-Handed",
    bowlingStyle: "Right-arm Leg Spin",
    isCaptain: true,
    stats: { matches: 32, runs: 680, wickets: 42, avg: 24.28, sr: 138.0 },
  },
  {
    id: "mahesh-patil",
    name: "Mahesh Patil",
    jersey: 33,
    team: { name: "Thunder Strikers", shortName: "TS", color: "#facc15", logoUrl: TEAM_LOGOS.TS.logoUrl },
    role: "Batsman",
    battingStyle: "Left-Handed",
    bowlingStyle: "N/A",
    isCaptain: true,
    stats: { matches: 43, runs: 1580, wickets: 0, avg: 42.7, sr: 140.5 },
  },
  {
    id: "karan-thakur",
    name: "Karan Thakur",
    jersey: 8,
    team: { name: "Glacier Gladiators", shortName: "GG", color: "#06b6d4", logoUrl: TEAM_LOGOS.GG.logoUrl },
    role: "Bowler",
    battingStyle: "Right-Handed",
    bowlingStyle: "Left-arm Fast",
    isCaptain: true,
    stats: { matches: 18, runs: 120, wickets: 28, avg: 12.0, sr: 125.0 },
  },
  {
    id: "rajesh-yadav",
    name: "Rajesh Yadav",
    jersey: 55,
    team: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl },
    role: "All-Rounder",
    battingStyle: "Right-Handed",
    bowlingStyle: "Right-arm Medium",
    isCaptain: false,
    stats: { matches: 38, runs: 520, wickets: 32, avg: 18.57, sr: 122.0 },
  },
  {
    id: "anil-more",
    name: "Anil More",
    jersey: 12,
    team: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl },
    role: "Bowler",
    battingStyle: "Right-Handed",
    bowlingStyle: "Right-arm Off Spin",
    isCaptain: false,
    stats: { matches: 40, runs: 180, wickets: 52, avg: 9.0, sr: 95.0 },
  },
];

const roleIcons = {
  Batsman: Trophy,
  Bowler: Target,
  "All-Rounder": Shield,
  "Wicket-Keeper": Shield,
};

type RoleFilter = "All" | "Batsman" | "Bowler" | "All-Rounder" | "Wicket-Keeper";
type TeamFilter = "All" | string;

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("All");

  const teams = Array.from(new Set(players.map((p) => p.team.shortName)));

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || player.role === roleFilter;
    const matchesTeam = teamFilter === "All" || player.team.shortName === teamFilter;
    return matchesSearch && matchesRole && matchesTeam;
  });

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              THE <span className="gradient-text">PLAYERS</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Meet the stars of OCPL - from seasoned veterans to rising talents
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-dark-500" />
                <span className="text-dark-400 text-sm">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500"
                >
                  <option value="All">All Roles</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-Rounder">All-Rounder</option>
                  <option value="Wicket-Keeper">Wicket-Keeper</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-dark-400 text-sm">Team:</span>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500"
                >
                  <option value="All">All Teams</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => {
              const RoleIcon = roleIcons[player.role as keyof typeof roleIcons] || Trophy;
              
              return (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="card group overflow-hidden stagger-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Player Header */}
                  <div
                    className="h-32 relative flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${player.team.color}30 0%, ${player.team.color}10 100%)`,
                    }}
                  >
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="font-display text-4xl text-white">
                        {player.jersey}
                      </span>
                    </div>
                    {player.isCaptain && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-accent-500 text-dark-900 text-xs font-bold">
                        CAPTAIN
                      </div>
                    )}
                    <div
                      className="absolute bottom-3 left-3 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
                      style={{ backgroundColor: `${player.team.color}40` }}
                    >
                      <Image
                        src={player.team.logoUrl}
                        alt={player.team.name}
                        width={28}
                        height={28}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-primary-500 transition-colors">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <RoleIcon className="w-4 h-4 text-primary-500" />
                      <span className="text-dark-400 text-sm">{player.role}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-dark-500 mb-4">
                      <span>{player.battingStyle}</span>
                      {player.bowlingStyle !== "N/A" && (
                        <>
                          <span>•</span>
                          <span>{player.bowlingStyle}</span>
                        </>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                      <div className="text-center">
                        <p className="font-display text-lg text-white">
                          {player.stats.matches}
                        </p>
                        <p className="text-xs text-dark-500">Matches</p>
                      </div>
                      <div className="text-center">
                        <p className="font-display text-lg text-primary-500">
                          {player.stats.runs}
                        </p>
                        <p className="text-xs text-dark-500">Runs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-display text-lg text-purple-500">
                          {player.stats.wickets}
                        </p>
                        <p className="text-xs text-dark-500">Wickets</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark-400 text-lg">No players found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Summary */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wider text-white text-center mb-12">
            PLAYER STATISTICS
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <p className="font-display text-5xl gradient-text mb-2">
                {players.length}+
              </p>
              <p className="text-dark-400">Total Players</p>
            </div>
            <div className="card p-6 text-center">
              <p className="font-display text-5xl text-primary-500 mb-2">
                {players.reduce((sum, p) => sum + p.stats.runs, 0).toLocaleString()}
              </p>
              <p className="text-dark-400">Total Runs</p>
            </div>
            <div className="card p-6 text-center">
              <p className="font-display text-5xl text-purple-500 mb-2">
                {players.reduce((sum, p) => sum + p.stats.wickets, 0)}
              </p>
              <p className="text-dark-400">Total Wickets</p>
            </div>
            <div className="card p-6 text-center">
              <p className="font-display text-5xl text-secondary-500 mb-2">
                {players.filter((p) => p.isCaptain).length}
              </p>
              <p className="text-dark-400">Team Captains</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


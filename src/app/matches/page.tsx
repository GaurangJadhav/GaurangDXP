"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Trophy, Play } from "lucide-react";
import { TEAM_LOGOS } from "@/lib/team-logos";

// Mock data - In production, this would come from Contentstack
const allMatches = [
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

type FilterType = "all" | "upcoming" | "completed" | "live";

export default function MatchesPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredMatches = allMatches.filter((match) => {
    if (filter === "all") return true;
    return match.status.toLowerCase() === filter;
  });

  const upcomingCount = allMatches.filter((m) => m.status === "Upcoming").length;
  const completedCount = allMatches.filter((m) => m.status === "Completed").length;
  const liveCount = allMatches.filter((m) => m.status === "Live").length;

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

      {/* Filters */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-dark-300 hover:bg-white/10"
              }`}
            >
              All ({allMatches.length})
            </button>
            {liveCount > 0 && (
              <button
                onClick={() => setFilter("live")}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === "live"
                    ? "bg-red-500 text-white"
                    : "bg-white/5 text-dark-300 hover:bg-white/10"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live ({liveCount})
              </button>
            )}
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === "upcoming"
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-dark-300 hover:bg-white/10"
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === "completed"
                  ? "bg-secondary-500 text-white"
                  : "bg-white/5 text-dark-300 hover:bg-white/10"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>
      </section>

      {/* Matches List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredMatches.map((match, index) => (
              <div
                key={match.id}
                className="card overflow-hidden stagger-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Match Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`badge ${
                            match.status === "Live"
                              ? "badge-live"
                              : match.status === "Upcoming"
                              ? "badge-upcoming"
                              : "badge-completed"
                          }`}
                        >
                          {match.status === "Live" && (
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2" />
                          )}
                          {match.status}
                        </span>
                        <span className="text-dark-500 text-sm">
                          Match {match.matchNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-dark-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {match.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {match.time}
                        </div>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between">
                      {/* Team 1 */}
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                          style={{ backgroundColor: `${match.team1.color}20` }}
                        >
                          <Image
                            src={match.team1.logoUrl}
                            alt={match.team1.name}
                            width={56}
                            height={56}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-lg">
                            {match.team1.name}
                          </p>
                          {match.team1.score && (
                            <p className="font-mono text-xl text-primary-500">
                              {match.team1.score}
                              <span className="text-dark-500 text-sm ml-2">
                                ({match.team1.overs} ov)
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* VS */}
                      <div className="px-8">
                        <span className="font-display text-2xl text-dark-500">VS</span>
                      </div>

                      {/* Team 2 */}
                      <div className="flex items-center gap-4 flex-1 justify-end text-right">
                        <div>
                          <p className="font-semibold text-white text-lg">
                            {match.team2.name}
                          </p>
                          {match.team2.score && (
                            <p className="font-mono text-xl text-primary-500">
                              {match.team2.score}
                              <span className="text-dark-500 text-sm ml-2">
                                ({match.team2.overs} ov)
                              </span>
                            </p>
                          )}
                        </div>
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                          style={{ backgroundColor: `${match.team2.color}20` }}
                        >
                          <Image
                            src={match.team2.logoUrl}
                            alt={match.team2.name}
                            width={56}
                            height={56}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>

                    {/* Result */}
                    {match.result && (
                      <div className="mt-6 pt-4 border-t border-white/5">
                        <p className="text-secondary-500 font-medium">{match.result}</p>
                        {match.motm && (
                          <p className="text-dark-400 text-sm mt-1">
                            <Trophy className="w-4 h-4 inline mr-1 text-accent-500" />
                            Player of the Match: {match.motm}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Venue & Actions */}
                  <div className="lg:w-64 p-6 bg-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-2 text-dark-400 mb-4">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span className="text-sm">{match.venue}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {match.status === "Completed" && (
                        <button className="w-full btn-secondary text-sm flex items-center justify-center gap-2">
                          <Play className="w-4 h-4" />
                          Watch Highlights
                        </button>
                      )}
                      <Link
                        href={`/matches/${match.matchNumber}`}
                        className="w-full btn-primary text-sm text-center block"
                      >
                        {match.status === "Completed" ? "Full Scorecard" : "Match Details"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark-400 text-lg">No matches found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


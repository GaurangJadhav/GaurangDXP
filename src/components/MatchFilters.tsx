"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Trophy, Play } from "lucide-react";

interface TeamData {
  name: string;
  shortName: string;
  color: string;
  logoUrl: string;
  score?: string;
  overs?: string;
}

interface Match {
  id: number;
  matchNumber: number;
  date: string;
  time: string;
  venue: string;
  team1: TeamData;
  team2: TeamData;
  status: string;
  result?: string;
  motm?: string;
}

type FilterType = "all" | "upcoming" | "completed" | "live";

interface MatchFiltersProps {
  initialMatches: Match[];
}

export default function MatchFilters({ initialMatches }: MatchFiltersProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredMatches = initialMatches.filter((match) => {
    if (filter === "all") return true;
    return match.status.toLowerCase() === filter;
  });

  const upcomingCount = initialMatches.filter((m) => m.status === "Upcoming").length;
  const completedCount = initialMatches.filter((m) => m.status === "Completed").length;
  const liveCount = initialMatches.filter((m) => m.status === "Live").length;

  return (
    <>
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
              All ({initialMatches.length})
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
                          {match.team1.logoUrl ? (
                            <Image
                              src={match.team1.logoUrl}
                              alt={match.team1.name}
                              width={56}
                              height={56}
                              className="object-contain"
                              unoptimized
                            />
                          ) : (
                            <span className="font-display text-xl" style={{ color: match.team1.color }}>
                              {match.team1.shortName}
                            </span>
                          )}
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
                          {match.team2.logoUrl ? (
                            <Image
                              src={match.team2.logoUrl}
                              alt={match.team2.name}
                              width={56}
                              height={56}
                              className="object-contain"
                              unoptimized
                            />
                          ) : (
                            <span className="font-display text-xl" style={{ color: match.team2.color }}>
                              {match.team2.shortName}
                            </span>
                          )}
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
    </>
  );
}


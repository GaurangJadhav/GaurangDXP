"use client";

import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, TrendingUp, Award } from "lucide-react";
import { TEAM_LOGOS } from "@/lib/team-logos";

// Mock data - In production, this would come from Contentstack
const teams = [
  {
    id: "fc",
    name: "Flame Chargers",
    shortName: "FC",
    color: "#e87425",
    logoUrl: TEAM_LOGOS.FC.logoUrl,
    motto: "Ignite the Fire!",
    owner: "Rajesh Patil",
    homeGround: "Vasai Sports Ground",
    established: 2021,
    stats: { matches: 45, wins: 32, losses: 11, titles: 2 },
    description: "The most successful team in OCPL history with 2 championship titles. Known for their fiery batting.",
  },
  {
    id: "ss",
    name: "Storm Surfers",
    shortName: "SS",
    color: "#3b82f6",
    logoUrl: TEAM_LOGOS.SS.logoUrl,
    motto: "Ride the Storm!",
    owner: "Suresh Sharma",
    homeGround: "Nalasopara Cricket Ground",
    established: 2021,
    stats: { matches: 45, wins: 28, losses: 15, titles: 1 },
    description: "Known for disciplined bowling attack. They surge through opponents like a storm.",
  },
  {
    id: "ww",
    name: "Windstorm Warriors",
    shortName: "WW",
    color: "#22c55e",
    logoUrl: TEAM_LOGOS.WW.logoUrl,
    motto: "Swift as the Wind!",
    owner: "Amit Deshmukh",
    homeGround: "Virar Stadium",
    established: 2021,
    stats: { matches: 45, wins: 25, losses: 18, titles: 1 },
    description: "Explosive batting lineup that sweeps through opposition like a windstorm.",
  },
  {
    id: "et",
    name: "Earth Titans",
    shortName: "ET",
    color: "#a855f7",
    logoUrl: TEAM_LOGOS.ET.logoUrl,
    motto: "Solid as Earth!",
    owner: "Priya Mehta",
    homeGround: "Nallasopara Sports Complex",
    established: 2022,
    stats: { matches: 35, wins: 18, losses: 15, titles: 0 },
    description: "Young fearless team with a rock-solid foundation and grounded approach.",
  },
  {
    id: "ts",
    name: "Thunder Strikers",
    shortName: "TS",
    color: "#facc15",
    logoUrl: TEAM_LOGOS.TS.logoUrl,
    motto: "Strike like Thunder!",
    owner: "Vikram Singh",
    homeGround: "Vasai Sports Ground",
    established: 2021,
    stats: { matches: 45, wins: 22, losses: 21, titles: 1 },
    description: "Royal franchise with star lineup that strikes fear into opponents.",
  },
  {
    id: "gg",
    name: "Glacier Gladiators",
    shortName: "GG",
    color: "#06b6d4",
    logoUrl: TEAM_LOGOS.GG.logoUrl,
    motto: "Cool Under Pressure!",
    owner: "Ravi Kumar",
    homeGround: "Palghar District Ground",
    established: 2023,
    stats: { matches: 20, wins: 8, losses: 11, titles: 0 },
    description: "Newest team with fresh energy. They stay ice-cool in pressure situations.",
  },
];

export default function TeamsPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              THE <span className="gradient-text">TEAMS</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Six franchises battling for glory in Vasai&apos;s premier cricket league
            </p>
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="card group overflow-hidden stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Team Header */}
                <div
                  className="h-32 relative flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${team.color}30 0%, ${team.color}10 100%)`,
                  }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden"
                    style={{ backgroundColor: `${team.color}30` }}
                  >
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      width={88}
                      height={88}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  {team.stats.titles > 0 && (
                    <div className="absolute top-4 right-4 flex items-center gap-1">
                      {[...Array(team.stats.titles)].map((_, i) => (
                        <Trophy
                          key={i}
                          className="w-5 h-5 text-accent-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Team Info */}
                <div className="p-6">
                  <h2 className="font-display text-2xl tracking-wider text-white mb-1">
                    {team.name}
                  </h2>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: team.color }}
                  >
                    {team.motto}
                  </p>
                  <p className="text-dark-400 text-sm mb-6 line-clamp-2">
                    {team.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                    <div className="text-center">
                      <p className="font-display text-2xl text-white">
                        {team.stats.matches}
                      </p>
                      <p className="text-xs text-dark-500 uppercase">Matches</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl text-secondary-500">
                        {team.stats.wins}
                      </p>
                      <p className="text-xs text-dark-500 uppercase">Wins</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl text-white">
                        {((team.stats.wins / team.stats.matches) * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-dark-500 uppercase">Win Rate</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Championship History */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wider text-white text-center mb-12">
            CHAMPIONSHIP HISTORY
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: 2024, winner: "Flame Chargers", runnerUp: "Windstorm Warriors" },
              { year: 2023, winner: "Thunder Strikers", runnerUp: "Storm Surfers" },
              { year: 2022, winner: "Windstorm Warriors", runnerUp: "Flame Chargers" },
              { year: 2021, winner: "Flame Chargers", runnerUp: "Storm Surfers" },
            ].map((season, index) => (
              <div
                key={season.year}
                className="card p-6 text-center stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-accent-500" />
                </div>
                <p className="font-display text-3xl text-white mb-2">{season.year}</p>
                <p className="text-primary-500 font-semibold mb-1">{season.winner}</p>
                <p className="text-dark-500 text-sm">Runner-up: {season.runnerUp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Leaders */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wider text-white text-center mb-12">
            ALL-TIME TEAM STATS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Most Wins */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white">MOST WINS</h3>
                  <p className="text-dark-500 text-sm">All-time standings</p>
                </div>
              </div>
              <div className="space-y-4">
                {teams
                  .sort((a, b) => b.stats.wins - a.stats.wins)
                  .slice(0, 4)
                  .map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-dark-400">
                          {index + 1}
                        </span>
                        <span className="text-white">{team.name}</span>
                      </div>
                      <span className="font-mono text-secondary-500">
                        {team.stats.wins}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Most Titles */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white">MOST TITLES</h3>
                  <p className="text-dark-500 text-sm">Championship wins</p>
                </div>
              </div>
              <div className="space-y-4">
                {teams
                  .filter((t) => t.stats.titles > 0)
                  .sort((a, b) => b.stats.titles - a.stats.titles)
                  .map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-dark-400">
                          {index + 1}
                        </span>
                        <span className="text-white">{team.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(team.stats.titles)].map((_, i) => (
                          <Trophy
                            key={i}
                            className="w-4 h-4 text-accent-400"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Best Win Rate */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white">BEST WIN RATE</h3>
                  <p className="text-dark-500 text-sm">Minimum 20 matches</p>
                </div>
              </div>
              <div className="space-y-4">
                {teams
                  .filter((t) => t.stats.matches >= 20)
                  .sort(
                    (a, b) =>
                      b.stats.wins / b.stats.matches -
                      a.stats.wins / a.stats.matches
                  )
                  .slice(0, 4)
                  .map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-dark-400">
                          {index + 1}
                        </span>
                        <span className="text-white">{team.name}</span>
                      </div>
                      <span className="font-mono text-primary-500">
                        {((team.stats.wins / team.stats.matches) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, TrendingUp, Award } from "lucide-react";
import { getAllTeams } from "@/lib/contentstack";
import { TEAM_LOGOS, getAllTeamLogos } from "@/lib/team-logos";
import { Locale, isValidLocale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";

// Fallback mock data in case Contentstack fetch fails
const fallbackTeams = getAllTeamLogos().map((team, index) => ({
  id: team.shortName.toLowerCase(),
  name: team.name,
  shortName: team.shortName,
  color: team.color,
  logoUrl: team.logoUrl,
  motto: "Cricket Excellence!",
  owner: "OCPL",
  homeGround: "Vasai Sports Ground",
  established: 2021,
  stats: { matches: 45, wins: 30 - index * 3, losses: 15 + index * 2, titles: index < 3 ? 2 - index : 0 },
  description: `${team.name} - One of the premier teams in OCPL.`,
}));

// Helper function to get team logo URL
function getTeamLogoUrl(shortName: string): string {
  const logoData = TEAM_LOGOS[shortName as keyof typeof TEAM_LOGOS];
  return logoData?.logoUrl || "";
}

// Helper function to get team color
function getTeamColor(shortName: string): string {
  const logoData = TEAM_LOGOS[shortName as keyof typeof TEAM_LOGOS];
  return logoData?.color || "#666666";
}

export const revalidate = 60; // Revalidate every 60 seconds

interface PageProps {
  params: { locale: string };
}

export default async function TeamsPage({ params }: PageProps) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }
  
  const locale = params.locale as Locale;
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key);
  
  let teams = fallbackTeams;
  
  try {
    const contentstackTeams = await getAllTeams(locale);
    
    if (contentstackTeams && contentstackTeams.length > 0) {
      teams = contentstackTeams.map((team) => ({
        id: team.short_name?.toLowerCase() || team.uid,
        name: team.team_name || team.title,
        shortName: team.short_name || "",
        color: team.primary_color || getTeamColor(team.short_name || ""),
        logoUrl: team.team_logo?.url || getTeamLogoUrl(team.short_name || ""),
        motto: team.team_motto || "Cricket Excellence!",
        owner: team.owner_name || "OCPL",
        homeGround: team.home_ground || "Vasai Sports Ground",
        established: team.established_year || 2021,
        stats: {
          matches: team.stats?.matches_played || 0,
          wins: team.stats?.wins || 0,
          losses: team.stats?.losses || 0,
          titles: team.stats?.titles || 0,
        },
        description: team.description || `${team.team_name} - One of the premier teams in OCPL.`,
      }));
    }
  } catch (error) {
    console.error("Error fetching teams from Contentstack:", error);
    // Use fallback data
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              {t("nav.teams").toUpperCase()}
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
                    {team.logoUrl ? (
                      <Image
                        src={team.logoUrl}
                        alt={team.name}
                        width={88}
                        height={88}
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <span className="font-display text-3xl" style={{ color: team.color }}>
                        {team.shortName}
                      </span>
                    )}
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
                        {team.stats.matches > 0 
                          ? ((team.stats.wins / team.stats.matches) * 100).toFixed(0) 
                          : 0}%
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
                {[...teams]
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
                {[...teams]
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
                {[...teams]
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

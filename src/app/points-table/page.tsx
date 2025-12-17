import Image from "next/image";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { TEAM_LOGOS } from "@/lib/team-logos";
import { getPointsTable } from "@/lib/contentstack";

// Fallback mock data
const fallbackPointsTable = [
  {
    position: 1,
    team: { name: "Flame Chargers", shortName: "FC", color: "#e87425", logoUrl: TEAM_LOGOS.FC.logoUrl },
    played: 10,
    won: 8,
    lost: 1,
    tied: 0,
    nr: 1,
    points: 17,
    nrr: 1.256,
    form: ["W", "W", "W", "L", "W"],
    qualified: true,
  },
  {
    position: 2,
    team: { name: "Storm Surfers", shortName: "SS", color: "#3b82f6", logoUrl: TEAM_LOGOS.SS.logoUrl },
    played: 10,
    won: 7,
    lost: 2,
    tied: 0,
    nr: 1,
    points: 15,
    nrr: 0.892,
    form: ["W", "L", "W", "W", "W"],
    qualified: true,
  },
  {
    position: 3,
    team: { name: "Windstorm Warriors", shortName: "WW", color: "#22c55e", logoUrl: TEAM_LOGOS.WW.logoUrl },
    played: 10,
    won: 6,
    lost: 3,
    tied: 0,
    nr: 1,
    points: 13,
    nrr: 0.445,
    form: ["L", "W", "W", "W", "L"],
    qualified: true,
  },
  {
    position: 4,
    team: { name: "Thunder Strikers", shortName: "TS", color: "#facc15", logoUrl: TEAM_LOGOS.TS.logoUrl },
    played: 10,
    won: 5,
    lost: 4,
    tied: 0,
    nr: 1,
    points: 11,
    nrr: 0.125,
    form: ["W", "W", "L", "L", "W"],
    qualified: true,
  },
  {
    position: 5,
    team: { name: "Earth Titans", shortName: "ET", color: "#a855f7", logoUrl: TEAM_LOGOS.ET.logoUrl },
    played: 10,
    won: 3,
    lost: 6,
    tied: 0,
    nr: 1,
    points: 7,
    nrr: -0.523,
    form: ["L", "L", "W", "L", "W"],
    qualified: false,
  },
  {
    position: 6,
    team: { name: "Glacier Gladiators", shortName: "GG", color: "#06b6d4", logoUrl: TEAM_LOGOS.GG.logoUrl },
    played: 10,
    won: 1,
    lost: 8,
    tied: 0,
    nr: 1,
    points: 3,
    nrr: -1.892,
    form: ["L", "L", "L", "W", "L"],
    qualified: false,
  },
];

const topScorers = [
  { name: "Rahul Patil", team: "FC", runs: 485, matches: 10, avg: 60.62, sr: 152.3 },
  { name: "Mahesh Patil", team: "TS", runs: 412, matches: 10, avg: 51.5, sr: 145.8 },
  { name: "Pradeep Singh", team: "WW", runs: 378, matches: 10, avg: 47.25, sr: 138.5 },
  { name: "Suresh Kumar", team: "SS", runs: 342, matches: 10, avg: 42.75, sr: 132.0 },
  { name: "Vikram Desai", team: "WW", runs: 298, matches: 10, avg: 37.25, sr: 148.5 },
];

const topWicketTakers = [
  { name: "Amit Sharma", team: "FC", wickets: 18, matches: 10, avg: 14.2, econ: 6.8 },
  { name: "Anil More", team: "SS", wickets: 15, matches: 10, avg: 18.5, econ: 5.9 },
  { name: "Rohan Joshi", team: "ET", wickets: 14, matches: 10, avg: 19.2, econ: 6.5 },
  { name: "Karan Thakur", team: "GG", wickets: 12, matches: 10, avg: 22.1, econ: 7.4 },
  { name: "Rajesh Yadav", team: "FC", wickets: 10, matches: 10, avg: 24.5, econ: 7.8 },
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

function FormBadge({ result }: { result: string }) {
  const bgColor =
    result === "W"
      ? "bg-secondary-500"
      : result === "L"
      ? "bg-red-500"
      : "bg-dark-500";

  return (
    <span
      className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center text-xs font-bold text-white`}
    >
      {result}
    </span>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PointsTablePage() {
  let pointsTable = fallbackPointsTable;

  try {
    const contentstackPointsTable = await getPointsTable();
    
    if (contentstackPointsTable && contentstackPointsTable.length > 0) {
      pointsTable = contentstackPointsTable.map((entry, index) => {
        const teamData = entry.team?.[0];
        const teamLogoData = getTeamLogoData(teamData?.short_name || "");
        
        return {
          position: entry.position || index + 1,
          team: {
            name: teamData?.team_name || teamLogoData.name,
            shortName: teamData?.short_name || teamLogoData.shortName,
            color: teamData?.primary_color || teamLogoData.color,
            logoUrl: teamData?.team_logo?.url || teamLogoData.logoUrl,
          },
          played: entry.matches_played || 0,
          won: entry.wins || 0,
          lost: entry.losses || 0,
          tied: entry.ties || 0,
          nr: entry.no_results || 0,
          points: entry.points || 0,
          nrr: entry.net_run_rate || 0,
          form: entry.recent_form || ["W", "W", "L", "W", "L"],
          qualified: (entry.position || index + 1) <= 4,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching points table from Contentstack:", error);
    // Use fallback data
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              POINTS <span className="gradient-text">TABLE</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              OCPL 2025 Season Standings
            </p>
          </div>
        </div>
      </section>

      {/* Points Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Team</th>
                    <th className="text-center">P</th>
                    <th className="text-center">W</th>
                    <th className="text-center">L</th>
                    <th className="text-center">T</th>
                    <th className="text-center">NR</th>
                    <th className="text-center">Pts</th>
                    <th className="text-center">NRR</th>
                    <th className="text-center hide-mobile">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {pointsTable.map((entry) => (
                    <tr
                      key={entry.position}
                      className={entry.qualified ? "" : "opacity-60"}
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-lg text-white">
                            {entry.position}
                          </span>
                          {entry.position <= 4 && (
                            <div className="w-2 h-2 rounded-full bg-secondary-500" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                            style={{
                              backgroundColor: `${entry.team.color}20`,
                            }}
                          >
                            {entry.team.logoUrl ? (
                              <Image
                                src={entry.team.logoUrl}
                                alt={entry.team.name}
                                width={36}
                                height={36}
                                className="object-contain"
                                unoptimized
                              />
                            ) : (
                              <span className="font-display text-sm" style={{ color: entry.team.color }}>
                                {entry.team.shortName}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {entry.team.name}
                            </p>
                            {entry.qualified && (
                              <span className="text-xs text-secondary-500">
                                Qualified
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-dark-300">{entry.played}</td>
                      <td className="text-center text-secondary-500 font-semibold">
                        {entry.won}
                      </td>
                      <td className="text-center text-red-400">{entry.lost}</td>
                      <td className="text-center text-dark-400">{entry.tied}</td>
                      <td className="text-center text-dark-400">{entry.nr}</td>
                      <td className="text-center">
                        <span className="font-display text-xl text-primary-500">
                          {entry.points}
                        </span>
                      </td>
                      <td className="text-center">
                        <span
                          className={`font-mono ${
                            entry.nrr >= 0 ? "text-secondary-500" : "text-red-400"
                          }`}
                        >
                          {entry.nrr >= 0 ? "+" : ""}
                          {entry.nrr.toFixed(3)}
                        </span>
                      </td>
                      <td className="hide-mobile">
                        <div className="flex items-center gap-1 justify-center">
                          {entry.form.map((result, i) => (
                            <FormBadge key={i} result={result} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary-500" />
              <span>Qualified for Playoffs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">P</span>
              <span>Played</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">W</span>
              <span>Won</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">L</span>
              <span>Lost</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">NRR</span>
              <span>Net Run Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Orange Cap - Top Scorers */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-primary-500" />
                </div>
                <div>
                  <h2 className="font-display text-2xl tracking-wider text-white">
                    ORANGE CAP
                  </h2>
                  <p className="text-dark-400">Top Run Scorers</p>
                </div>
              </div>

              <div className="space-y-4">
                {topScorers.map((player, index) => (
                  <div
                    key={player.name}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0 ? "bg-primary-500/10 border border-primary-500/30" : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-display ${
                          index === 0
                            ? "bg-primary-500 text-white"
                            : "bg-white/10 text-dark-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{player.name}</p>
                        <p className="text-sm text-dark-500">{player.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-primary-500">
                        {player.runs}
                      </p>
                      <p className="text-xs text-dark-500">
                        Avg: {player.avg} | SR: {player.sr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purple Cap - Top Wicket Takers */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-purple-500" />
                </div>
                <div>
                  <h2 className="font-display text-2xl tracking-wider text-white">
                    PURPLE CAP
                  </h2>
                  <p className="text-dark-400">Top Wicket Takers</p>
                </div>
              </div>

              <div className="space-y-4">
                {topWicketTakers.map((player, index) => (
                  <div
                    key={player.name}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0 ? "bg-purple-500/10 border border-purple-500/30" : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-display ${
                          index === 0
                            ? "bg-purple-500 text-white"
                            : "bg-white/10 text-dark-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{player.name}</p>
                        <p className="text-sm text-dark-500">{player.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-purple-500">
                        {player.wickets}
                      </p>
                      <p className="text-xs text-dark-500">
                        Avg: {player.avg} | Econ: {player.econ}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playoff Scenarios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wider text-white text-center mb-12">
            PLAYOFF PICTURE
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">QUALIFIED</h3>
              <p className="text-dark-400 text-sm mb-4">
                Teams confirmed for playoffs
              </p>
              <div className="space-y-2">
                {pointsTable
                  .filter((t) => t.qualified)
                  .map((t) => (
                    <div
                      key={t.position}
                      className="flex items-center justify-center gap-2"
                    >
                      <span style={{ color: t.team.color }}>{t.team.shortName}</span>
                      <span className="text-dark-300">{t.team.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4">
                <Minus className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">IN CONTENTION</h3>
              <p className="text-dark-400 text-sm mb-4">
                Still have a mathematical chance
              </p>
              <p className="text-dark-500">
                All playoff spots are filled for this season
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">ELIMINATED</h3>
              <p className="text-dark-400 text-sm mb-4">
                Cannot qualify for playoffs
              </p>
              <div className="space-y-2">
                {pointsTable
                  .filter((t) => !t.qualified)
                  .map((t) => (
                    <div
                      key={t.position}
                      className="flex items-center justify-center gap-2"
                    >
                      <span style={{ color: t.team.color }}>{t.team.shortName}</span>
                      <span className="text-dark-300">{t.team.name}</span>
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

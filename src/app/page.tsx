import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Trophy, 
  Users, 
  ArrowRight, 
  Play,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { TEAM_LOGOS, getAllTeamLogos } from "@/lib/team-logos";
import { getAllTeams, getUpcomingMatches, getLatestNews } from "@/lib/contentstack";
import { siteConfig } from "@/lib/site-config";
import CountdownTimer from "@/components/CountdownTimer";

// Fallback mock data
const fallbackTeams = getAllTeamLogos().map((team, index) => ({
  id: index + 1,
  name: team.name,
  shortName: team.shortName,
  color: team.color,
  logoUrl: team.logoUrl,
  wins: 8 - index,
  matches: 10,
}));

const fallbackUpcomingMatches = [
  {
    id: 1,
    matchNumber: 15,
    team1: { ...TEAM_LOGOS.FC },
    team2: { ...TEAM_LOGOS.SS },
    date: "Dec 20, 2025",
    time: "4:00 PM",
    venue: "Vasai Sports Ground",
  },
  {
    id: 2,
    matchNumber: 16,
    team1: { ...TEAM_LOGOS.WW },
    team2: { ...TEAM_LOGOS.ET },
    date: "Dec 21, 2025",
    time: "4:00 PM",
    venue: "Virar Stadium",
  },
  {
    id: 3,
    matchNumber: 17,
    team1: { ...TEAM_LOGOS.TS },
    team2: { ...TEAM_LOGOS.GG },
    date: "Dec 22, 2025",
    time: "4:00 PM",
    venue: "Vasai Sports Ground",
  },
];

interface NewsItem {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const fallbackNews: NewsItem[] = [
  {
    id: 1,
    title: "Flame Chargers clinch thriller against Storm Surfers",
    excerpt: "In a nail-biting finish, Flame Chargers secured victory in the last over...",
    date: "Dec 15, 2025",
    category: "Match Report",
  },
  {
    id: 2,
    title: "OCPL 2025 Season kicks off with grand ceremony",
    excerpt: "The fifth edition of Only Cricket League began with a spectacular opening...",
    date: "Dec 10, 2025",
    category: "News",
  },
  {
    id: 3,
    title: "Rising star Rahul Patil scores century on debut",
    excerpt: "Young talent from Vasai West made heads turn with a stunning 102 off 58 balls...",
    date: "Dec 12, 2025",
    category: "Feature",
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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const nextMatchDate = new Date("2025-12-20T16:00:00");

  // Fetch data from Contentstack
  let teams = fallbackTeams;
  let upcomingMatches = fallbackUpcomingMatches;
  let news: NewsItem[] = fallbackNews;

  try {
    // Fetch teams
    const contentstackTeams = await getAllTeams();
    if (contentstackTeams && contentstackTeams.length > 0) {
      teams = contentstackTeams.map((team, index) => ({
        id: index + 1,
        name: team.team_name || team.title,
        shortName: team.short_name || "",
        color: team.primary_color || getTeamLogoData(team.short_name || "").color,
        logoUrl: team.team_logo?.url || getTeamLogoData(team.short_name || "").logoUrl,
        wins: team.stats?.wins || 0,
        matches: team.stats?.matches_played || 0,
      }));
    }

    // Fetch upcoming matches
    const contentstackMatches = await getUpcomingMatches();
    if (contentstackMatches && contentstackMatches.length > 0) {
      upcomingMatches = contentstackMatches.slice(0, 3).map((match) => {
        const team1Data = match.team_1?.[0];
        const team2Data = match.team_2?.[0];
        const team1Logo = getTeamLogoData(team1Data?.short_name || "");
        const team2Logo = getTeamLogoData(team2Data?.short_name || "");
        
        return {
          id: match.match_number || 0,
          matchNumber: match.match_number || 0,
          team1: {
            name: team1Data?.team_name || team1Logo.name,
            shortName: team1Data?.short_name || team1Logo.shortName,
            color: team1Data?.primary_color || team1Logo.color,
            logoUrl: team1Data?.team_logo?.url || team1Logo.logoUrl,
          },
          team2: {
            name: team2Data?.team_name || team2Logo.name,
            shortName: team2Data?.short_name || team2Logo.shortName,
            color: team2Data?.primary_color || team2Logo.color,
            logoUrl: team2Data?.team_logo?.url || team2Logo.logoUrl,
          },
          date: match.match_date 
            ? new Date(match.match_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "TBD",
          time: match.match_time || "4:00 PM",
          venue: match.venue?.[0]?.venue_name || "Vasai Sports Ground",
        };
      });
    }

    // Fetch latest news
    const contentstackNews = await getLatestNews(3);
    if (contentstackNews && contentstackNews.length > 0) {
      news = contentstackNews.map((article) => ({
        id: article.uid || "",
        title: article.title || "",
        excerpt: article.excerpt || article.content?.substring(0, 150) + "..." || "",
        date: article.publish_date 
          ? new Date(article.publish_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "Recent",
        category: article.category || "News",
      }));
    }
  } catch (error) {
    console.error("Error fetching data from Contentstack:", error);
    // Use fallback data
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-pattern overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary-500/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-400 text-sm font-medium">
                Season {siteConfig.season.number} • {siteConfig.season.status}
              </span>
            </div>

            {/* Logo */}
            <div className="mb-6 animate-slide-up">
              <Image
                src={siteConfig.logo.url}
                alt={siteConfig.logo.alt}
                width={180}
                height={180}
                className="mx-auto rounded-full shadow-2xl shadow-primary-500/20"
                unoptimized
                priority
              />
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6 animate-slide-up">
              <span className="gradient-text">{siteConfig.name}</span>
            </h1>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white/90 tracking-wide mb-4">
              {siteConfig.fullName.toUpperCase()}
            </p>
            <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-12">
              Vasai&apos;s premier cricket tournament bringing together players from all 
              walks of life to celebrate the beautiful game
            </p>

            {/* Countdown */}
            <div className="mb-12">
              <p className="text-sm text-dark-500 uppercase tracking-wider mb-4">
                Next Match In
              </p>
              <div className="flex justify-center">
                <CountdownTimer targetDate={nextMatchDate.toISOString()} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/matches" className="btn-primary inline-flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                View Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/teams" className="btn-secondary inline-flex items-center gap-2">
                <Users className="w-5 h-5" />
                Explore Teams
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary-500" />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Teams", value: "6", icon: Users },
              { label: "Players", value: "90+", icon: Trophy },
              { label: "Matches", value: "30", icon: Calendar },
              { label: "Seasons", value: "5", icon: Play },
            ].map((stat) => (
              <div key={stat.label} className="text-center stagger-item">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-500/5 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-500" />
                </div>
                <p className="font-display text-4xl md:text-5xl text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-dark-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white mb-2">
                UPCOMING MATCHES
              </h2>
              <p className="text-dark-400">Don&apos;t miss the action</p>
            </div>
            <Link
              href="/matches"
              className="hidden md:flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match, index) => (
              <div
                key={match.id}
                className="card p-6 stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="badge badge-upcoming">Match {match.matchNumber}</span>
                  <div className="flex items-center gap-2 text-dark-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {match.time}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  {/* Team 1 */}
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 mx-auto overflow-hidden"
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
                    <p className="text-sm text-dark-300 font-medium">
                      {match.team1.name}
                    </p>
                  </div>

                  {/* VS */}
                  <div className="flex flex-col items-center">
                    <span className="font-display text-2xl text-dark-500">VS</span>
                  </div>

                  {/* Team 2 */}
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 mx-auto overflow-hidden"
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
                    <p className="text-sm text-dark-300 font-medium">
                      {match.team2.name}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-dark-400">
                      <Calendar className="w-4 h-4" />
                      {match.date}
                    </div>
                    <div className="flex items-center gap-2 text-dark-400">
                      <MapPin className="w-4 h-4" />
                      {match.venue}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 text-primary-500"
            >
              View All Matches
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-20 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white mb-2">
              THE TEAMS
            </h2>
            <p className="text-dark-400">Six teams battling for glory</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teams.map((team, index) => (
              <Link
                key={team.id}
                href={`/teams/${team.shortName.toLowerCase()}`}
                className="card p-6 text-center group stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 overflow-hidden"
                  style={{ backgroundColor: `${team.color}20` }}
                >
                  {team.logoUrl ? (
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      width={72}
                      height={72}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="font-display text-2xl" style={{ color: team.color }}>
                      {team.shortName}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">
                  {team.name}
                </h3>
                <p className="text-dark-500 text-xs">
                  W: {team.wins} / M: {team.matches}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/teams" className="btn-secondary inline-flex items-center gap-2">
              View All Teams
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white mb-2">
                LATEST NEWS
              </h2>
              <p className="text-dark-400">Stay updated with OCPL</p>
            </div>
            <Link
              href="/news"
              className="hidden md:flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <article
                key={article.id}
                className="card overflow-hidden group stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Placeholder Image */}
                <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl text-white/20">OCPL</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-dark-500 text-sm mb-2">{article.date}</p>
                  <h3 className="font-semibold text-white mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-dark-400 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center gap-2 text-primary-500 text-sm mt-4 group-hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-secondary-500/20" />
        <div className="absolute inset-0 hero-pattern" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider text-white mb-6">
            BE PART OF THE ACTION
          </h2>
          <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            Join us at the ground, cheer for your favorite team, and be part of 
            Vasai&apos;s biggest cricket celebration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/matches" className="btn-primary inline-flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Match Schedule
            </Link>
            <Link href="/gallery" className="btn-secondary inline-flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Highlights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

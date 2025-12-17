"use client";

import { useState, useEffect } from "react";
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

// Mock data - In production, this would come from Contentstack
const mockTeams = getAllTeamLogos().map((team, index) => ({
  id: index + 1,
  name: team.name,
  shortName: team.shortName,
  color: team.color,
  logoUrl: team.logoUrl,
  wins: 8 - index,
  matches: 10,
}));

const mockUpcomingMatches = [
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

const mockNews = [
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

// Countdown Component
function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-2">
            <span className="font-display text-3xl md:text-4xl text-white">
              {value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-dark-400 uppercase tracking-wider">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const nextMatchDate = new Date("2025-12-20T16:00:00");

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
                Season 5 • Now Live
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6 animate-slide-up">
              <span className="gradient-text">OCPL</span>
            </h1>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white/90 tracking-wide mb-4">
              ONLY CRICKET LEAGUE
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
                <Countdown targetDate={nextMatchDate} />
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
            {mockUpcomingMatches.map((match, index) => (
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
                      <Image
                        src={match.team1.logoUrl}
                        alt={match.team1.name}
                        width={56}
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
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
                      <Image
                        src={match.team2.logoUrl}
                        alt={match.team2.name}
                        width={56}
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
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
            {mockTeams.map((team, index) => (
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
                  <Image
                    src={team.logoUrl}
                    alt={team.name}
                    width={72}
                    height={72}
                    className="object-contain"
                    unoptimized
                  />
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
            {mockNews.map((article, index) => (
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


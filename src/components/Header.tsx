"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Trophy, Users, Calendar, BarChart3, Newspaper, Image as ImageIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Matches", href: "/matches", icon: Calendar },
  { label: "Teams", href: "/teams", icon: Users },
  { label: "Players", href: "/players", icon: Trophy },
  { label: "Points Table", href: "/points-table", icon: BarChart3 },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Gallery", href: "/gallery", icon: ImageIcon },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform bg-white/10">
              <Image
                src={siteConfig.logo.url}
                alt={siteConfig.logo.alt}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-wider gradient-text">
                {siteConfig.name}
              </span>
              <span className="text-[10px] text-dark-400 uppercase tracking-widest">
                {siteConfig.fullName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link flex items-center gap-2 text-sm font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Season Badge */}
          <div className="hidden md:flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30">
              <span className="text-primary-400 font-semibold text-sm">
                Season {siteConfig.season.year}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary-500" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 glass-dark border-t border-white/5 animate-slide-down">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary-500" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-center">
                <span className="text-primary-400 font-semibold text-sm">
                  Season {siteConfig.season.year}
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

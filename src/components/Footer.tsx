import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Matches", href: "/matches" },
  { label: "Teams", href: "/teams" },
  { label: "Players", href: "/players" },
  { label: "Points Table", href: "/points-table" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="font-display text-2xl text-white">O</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-wider gradient-text">
                  OCPL
                </span>
                <span className="text-[10px] text-dark-400 uppercase tracking-widest">
                  Only Cricket League
                </span>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              A league played in Vasai between local players. This league consists of 
              players from all age groups, from various walks of life who love to enjoy 
              this beautiful game.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-dark-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-white mb-6">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-white mb-6">
              CONTACT US
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-dark-400 text-sm">
                  Vasai West, Palghar District,<br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:info@ocpl.in"
                  className="text-dark-400 hover:text-primary-500 transition-colors text-sm"
                >
                  info@ocpl.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-dark-400 hover:text-primary-500 transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

          {/* Sponsors */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-white mb-6">
              SPONSORS
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-2">
                  Title Sponsor
                </p>
                <p className="text-white font-semibold">Your Brand Here</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-dark-500 uppercase tracking-wider mb-2">
                  Associate Partner
                </p>
                <p className="text-dark-300 text-sm">Partner opportunities available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm">
              © {new Date().getFullYear()} OCPL - Only Cricket League. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-dark-500 hover:text-primary-500 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-dark-500 hover:text-primary-500 transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


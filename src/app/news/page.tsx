"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

// Mock data - In production, this would come from Contentstack
const articles = [
  {
    id: "flame-chargers-thriller",
    title: "Flame Chargers clinch thriller against Storm Surfers",
    excerpt: "In a nail-biting finish, Flame Chargers secured victory in the last over. Captain Rahul Patil's brilliant 78 set up the win as the Chargers defended 185 runs successfully.",
    content: "Full article content here...",
    author: "OCPL Media",
    date: "Dec 15, 2025",
    category: "Match Report",
    tags: ["Flame Chargers", "Storm Surfers", "Match 1"],
    relatedTeam: "FC",
    featured: true,
  },
  {
    id: "ocpl-2025-kickoff",
    title: "OCPL 2025 Season kicks off with grand ceremony",
    excerpt: "The fifth edition of Only Cricket League began with a spectacular opening ceremony at Vasai Sports Ground. All six teams were introduced to the cheering crowd.",
    content: "Full article content here...",
    author: "OCPL Media",
    date: "Dec 10, 2025",
    category: "News",
    tags: ["Opening Ceremony", "Season 5"],
    featured: true,
  },
  {
    id: "rahul-patil-century",
    title: "Rising star Rahul Patil scores century on debut season",
    excerpt: "Young talent from Vasai West made heads turn with a stunning 102 off 58 balls. This marks his second century in OCPL and cements his position as one of the league's best.",
    content: "Full article content here...",
    author: "Sports Desk",
    date: "Dec 12, 2025",
    category: "Feature",
    tags: ["Rahul Patil", "Century", "Flame Chargers"],
    relatedTeam: "FC",
    featured: false,
  },
  {
    id: "windstorm-warriors-comeback",
    title: "Windstorm Warriors stage remarkable comeback to beat Earth Titans",
    excerpt: "From 45/4, Windstorm Warriors recovered to chase down 146 with Vikram Desai playing a match-winning knock of 55 not out.",
    content: "Full article content here...",
    author: "OCPL Media",
    date: "Dec 8, 2025",
    category: "Match Report",
    tags: ["Windstorm Warriors", "Earth Titans", "Match 2"],
    relatedTeam: "WW",
    featured: false,
  },
  {
    id: "auction-preview-2026",
    title: "OCPL 2026 Auction: Teams gear up for mega event",
    excerpt: "With retention announcements done, all six franchises are preparing their strategies for the upcoming auction. Here's what to expect.",
    content: "Full article content here...",
    author: "Analysis Team",
    date: "Dec 5, 2025",
    category: "News",
    tags: ["Auction", "Season 6", "Preview"],
    featured: false,
  },
  {
    id: "karan-thakur-interview",
    title: "Exclusive: Karan Thakur on leading Glacier Gladiators",
    excerpt: "The young captain speaks about the challenges and excitement of leading a new franchise in OCPL.",
    content: "Full article content here...",
    author: "Interview Team",
    date: "Dec 3, 2025",
    category: "Interview",
    tags: ["Karan Thakur", "Glacier Gladiators", "Captain"],
    relatedTeam: "GG",
    featured: false,
  },
  {
    id: "thunder-strikers-dominance",
    title: "Thunder Strikers dominate Glacier Gladiators with clinical performance",
    excerpt: "Mahesh Patil's elegant 82 powered Strikers to a massive 192/4, a total that proved too much for the Gladiators.",
    content: "Full article content here...",
    author: "OCPL Media",
    date: "Dec 1, 2025",
    category: "Match Report",
    tags: ["Thunder Strikers", "Glacier Gladiators", "Match 3"],
    relatedTeam: "TS",
    featured: false,
  },
  {
    id: "community-impact",
    title: "OCPL's impact on Vasai's cricket community",
    excerpt: "How the Only Cricket League has transformed local cricket and created opportunities for players from all walks of life.",
    content: "Full article content here...",
    author: "Feature Desk",
    date: "Nov 28, 2025",
    category: "Feature",
    tags: ["Community", "Impact", "Local Cricket"],
    featured: false,
  },
];

const categories = ["All", "News", "Match Report", "Feature", "Interview", "Announcement"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter((article) => {
    return selectedCategory === "All" || article.category === selectedCategory;
  });

  const featuredArticles = articles.filter((a) => a.featured);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              LATEST <span className="gradient-text">NEWS</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Stay updated with match reports, interviews, and announcements
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl tracking-wider text-white mb-8">
            FEATURED STORIES
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="card group overflow-hidden stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Placeholder */}
                <div className="h-56 bg-gradient-to-br from-primary-500/30 to-secondary-500/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl text-white/10">OCPL</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-dark-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                  </div>

                  <h3 className="font-semibold text-xl text-white mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-dark-400 line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-primary-500 group-hover:gap-3 transition-all">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white"
                    : "bg-white/5 text-dark-300 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="card group overflow-hidden stagger-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image Placeholder */}
                <div className="h-44 bg-gradient-to-br from-primary-500/20 to-secondary-500/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl text-white/10">OCPL</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-dark-500 mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>

                  <h3 className="font-semibold text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-dark-400 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-xs text-dark-400"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-dark-400 text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl tracking-wider text-white mb-4">
            NEVER MISS AN UPDATE
          </h2>
          <p className="text-dark-400 mb-8">
            Subscribe to our newsletter for the latest news, match updates, and exclusive content
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}


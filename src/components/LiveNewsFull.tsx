"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Clock, Newspaper, ChevronRight, Radio, Filter, Search } from "lucide-react";
import { LiveNewsArticle, formatNewsDate } from "@/lib/news-api";

interface LiveNewsFullProps {
  news: LiveNewsArticle[];
}

const categories = ["All", "Cricket", "IPL", "International", "Domestic"];

export default function LiveNewsFull({ news }: LiveNewsFullProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (!news || news.length === 0) {
    return (
      <div className="py-20 text-center">
        <Newspaper className="w-16 h-16 text-dark-600 mx-auto mb-4" />
        <p className="text-dark-400 text-lg">No news articles available at the moment.</p>
      </div>
    );
  }

  // Filter news based on category and search
  const filteredNews = news.filter((article) => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" ||
      article.category.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      article.title.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const featuredNews = filteredNews.slice(0, 2);
  const remainingNews = filteredNews.slice(2);

  return (
    <>
      {/* Live Indicator Bar */}
      <section className="py-4 bg-gradient-to-r from-red-500/10 via-primary-500/10 to-red-500/10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Radio className="w-5 h-5 text-red-500" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <span className="text-white font-medium">Live Cricket News</span>
              <span className="text-xs text-dark-400 bg-white/5 px-2 py-1 rounded-full">
                {news.length} articles • Updated hourly
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary-500 text-white"
                      : "bg-white/5 text-dark-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredNews.length > 0 && (
        <section className="py-12 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl tracking-wider text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary-500 rounded-full" />
              TOP STORIES
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredNews.map((article, index) => (
                <a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl bg-dark-900/50 border border-white/5 hover:border-primary-500/30 transition-all duration-300 stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/10 flex items-center justify-center">
                        <Newspaper className="w-20 h-20 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      {index === 0 && (
                        <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          BREAKING
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                        {article.source}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-dark-400 mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      {formatNewsDate(article.pubDate)}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-dark-400 line-clamp-2 mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary-500 text-sm font-medium">
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl tracking-wider text-white mb-8 flex items-center gap-3">
            <span className="w-1 h-6 bg-secondary-500 rounded-full" />
            ALL NEWS
          </h2>

          {remainingNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingNews.map((article, index) => (
                <a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl bg-dark-900/30 border border-white/5 hover:border-primary-500/30 hover:bg-dark-900/50 transition-all duration-300 stagger-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/10 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
                        {article.source}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-dark-500 mb-2">
                      <Clock className="w-3 h-3" />
                      {formatNewsDate(article.pubDate)}
                    </div>

                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-dark-400 text-sm line-clamp-2 mb-3">
                      {article.description}
                    </p>

                    <div className="flex items-center gap-1 text-primary-500 text-sm">
                      Read more
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-400">No articles match your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


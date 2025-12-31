import { getLiveCricketNews } from "@/lib/news-api";
import LiveNewsFull from "@/components/LiveNewsFull";

export default async function NewsPage() {
  // Fetch live cricket news
  const liveNews = await getLiveCricketNews(12).catch((error) => {
    console.error("Error fetching live news:", error);
    return [];
  });

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              CRICKET <span className="gradient-text">NEWS</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Live updates from the world of cricket - IPL, international matches, and more
            </p>
          </div>
        </div>
      </section>

      {/* Live News Full Page */}
      <LiveNewsFull news={liveNews} />

      {/* Newsletter CTA */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl tracking-wider text-white mb-4">
            NEVER MISS AN UPDATE
          </h2>
          <p className="text-dark-400 mb-8">
            Subscribe to our newsletter for the latest cricket news and match updates
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

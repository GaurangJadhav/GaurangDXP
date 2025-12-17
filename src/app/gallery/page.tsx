import { Play, Eye, Clock, Filter } from "lucide-react";
import { getAllVideos } from "@/lib/contentstack";
import VideoGrid from "@/components/VideoGrid";
import { Video } from "@/types/contentstack";

// Fallback mock data with placeholder YouTube IDs
const fallbackVideos: Video[] = [
  {
    uid: "1",
    title: "Amazing Catch by Rahul Patil - Match 8",
    description: "Stunning one-handed catch at the boundary by Flame Chargers captain",
    youtube_video_id: "dQw4w9WgXcQ", // Placeholder - replace with actual ID
    video_type: "Short",
    category: "Best Catches",
    publish_date: "2025-12-09",
    views: 15000,
    duration: 30,
    is_featured: true,
  },
  {
    uid: "2",
    title: "Monster Six by Mahesh Patil",
    description: "Huge six out of the ground by Thunder Strikers batsman",
    youtube_video_id: "dQw4w9WgXcQ",
    video_type: "Short",
    category: "Best Sixes",
    publish_date: "2025-12-07",
    views: 12000,
    duration: 25,
    is_featured: true,
  },
  {
    uid: "3",
    title: "Hat-trick by Amit Sharma",
    description: "Three wickets in three balls - incredible bowling spell",
    youtube_video_id: "dQw4w9WgXcQ",
    video_type: "Short",
    category: "Best Wickets",
    publish_date: "2025-12-05",
    views: 20000,
    duration: 45,
    is_featured: true,
  },
  {
    uid: "4",
    title: "OCPL 2025 Opening Ceremony Highlights",
    description: "Best moments from the grand opening ceremony",
    youtube_video_id: "dQw4w9WgXcQ",
    video_type: "Highlight",
    category: "Ceremony",
    publish_date: "2025-12-01",
    views: 25000,
    duration: 120,
    is_featured: false,
  },
  {
    uid: "5",
    title: "Match 1 Final Over Thriller",
    description: "Nail-biting last over as Flame Chargers clinch victory",
    youtube_video_id: "dQw4w9WgXcQ",
    video_type: "Highlight",
    category: "Match Highlights",
    publish_date: "2025-12-01",
    views: 18000,
    duration: 90,
    is_featured: true,
  },
  {
    uid: "6",
    title: "Run Out of the Season",
    description: "Lightning quick throw by Storm Surfers fielder",
    youtube_video_id: "dQw4w9WgXcQ",
    video_type: "Short",
    category: "Best Catches",
    publish_date: "2025-12-10",
    views: 8000,
    duration: 20,
    is_featured: false,
  },
];

// Helper to format views (for stats section)
function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export const revalidate = 60;

export default async function GalleryPage() {
  let videos: Video[] = fallbackVideos;

  try {
    const contentstackVideos = await getAllVideos();
    if (contentstackVideos && contentstackVideos.length > 0) {
      videos = contentstackVideos;
    }
  } catch (error) {
    console.error("Error fetching videos from Contentstack:", error);
  }

  // Get unique categories
  const categories = Array.from(new Set(videos.map((v) => v.category).filter(Boolean)));

  // Separate featured and shorts
  const featuredVideos = videos.filter((v) => v.is_featured);
  const shortVideos = videos.filter((v) => v.video_type === "Short");

  // Stats
  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              VIDEO <span className="gradient-text">GALLERY</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Watch the best moments from OCPL - catches, sixes, wickets, and more!
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Play className="w-6 h-6 text-primary-500" />
              <div>
                <p className="font-display text-2xl text-white">{videos.length}</p>
                <p className="text-dark-500 text-sm">Videos</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Eye className="w-6 h-6 text-secondary-500" />
              <div>
                <p className="font-display text-2xl text-white">{formatViews(totalViews)}</p>
                <p className="text-dark-500 text-sm">Total Views</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-accent-500" />
              <div>
                <p className="font-display text-2xl text-white">{shortVideos.length}</p>
                <p className="text-dark-500 text-sm">Shorts</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Filter className="w-6 h-6 text-purple-500" />
              <div>
                <p className="font-display text-2xl text-white">{categories.length}</p>
                <p className="text-dark-500 text-sm">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      {featuredVideos.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl tracking-wider text-white mb-8">
              FEATURED <span className="text-primary-500">VIDEOS</span>
            </h2>
            <VideoGrid videos={featuredVideos} />
          </div>
        </section>
      )}

      {/* YouTube Shorts Section */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
            </div>
            <h2 className="font-display text-3xl tracking-wider text-white">
              YOUTUBE <span className="text-red-500">SHORTS</span>
            </h2>
          </div>
          
          <p className="text-dark-400 mb-8">
            Quick highlights and best moments in vertical format - perfect for mobile viewing!
          </p>

          <VideoGrid 
            videos={shortVideos} 
            isShorts={true}
          />
        </div>
      </section>

      {/* All Videos by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wider text-white mb-8">
            ALL <span className="text-secondary-500">VIDEOS</span>
          </h2>
          
          <VideoGrid 
            videos={videos} 
            showCategories={true}
            categories={categories as string[]}
          />
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
          </div>
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-white mb-4">
            SUBSCRIBE FOR MORE
          </h2>
          <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
            Follow OCPL on YouTube for the latest highlights, interviews, and behind-the-scenes content
          </p>
          <a
            href="https://youtube.com/@ocpl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Eye, Clock, X } from "lucide-react";

interface Video {
  uid: string;
  title: string;
  description?: string;
  youtube_video_id: string;
  video_type?: string;
  category?: string;
  thumbnail_url?: string;
  publish_date?: string;
  views?: number;
  duration?: number;
  is_featured?: boolean;
}

interface VideoGridProps {
  videos: Video[];
  isShorts?: boolean;
  showCategories?: boolean;
  categories?: string[];
}

// Helper to format views
function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

// Helper to format duration
function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoGrid({
  videos,
  isShorts = false,
  showCategories = false,
  categories = [],
}: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Filter videos by category
  const filteredVideos = showCategories && activeCategory !== "All"
    ? videos.filter((v) => v.category === activeCategory)
    : videos;

  // Get YouTube thumbnail URL
  const getThumbnailUrl = (video: Video) => {
    if (video.thumbnail_url) return video.thumbnail_url;
    // Use YouTube's thumbnail API
    return `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`;
  };

  // Get YouTube embed URL
  const getEmbedUrl = (videoId: string, isShort: boolean = false) => {
    if (isShort) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <>
      {/* Category Filter */}
      {showCategories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "All"
                ? "bg-primary-500 text-white"
                : "bg-white/5 text-dark-300 hover:bg-white/10"
            }`}
          >
            All ({videos.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-dark-300 hover:bg-white/10"
              }`}
            >
              {category} ({videos.filter((v) => v.category === category).length})
            </button>
          ))}
        </div>
      )}

      {/* Video Grid */}
      <div className={`grid gap-6 ${
        isShorts 
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" 
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}>
        {filteredVideos.map((video, index) => (
          <button
            key={video.uid}
            onClick={() => setSelectedVideo(video)}
            className={`card group overflow-hidden text-left stagger-item ${
              isShorts ? "aspect-[9/16]" : ""
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Thumbnail */}
            <div className={`relative overflow-hidden ${isShorts ? "h-full" : "aspect-video"}`}>
              <Image
                src={getThumbnailUrl(video)}
                alt={video.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                unoptimized
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration Badge */}
              {video.duration && !isShorts && (
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
                  {formatDuration(video.duration)}
                </div>
              )}

              {/* Shorts Badge */}
              {isShorts && (
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-red-500 text-white text-xs font-bold">
                  SHORT
                </div>
              )}

              {/* Category Badge */}
              {video.category && !isShorts && (
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-primary-500/80 text-white text-xs font-medium">
                  {video.category}
                </div>
              )}
            </div>

            {/* Video Info */}
            {!isShorts && (
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-dark-400 text-xs mb-3 line-clamp-2">
                    {video.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-dark-500 text-xs">
                  {video.views && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatViews(video.views)} views
                    </div>
                  )}
                  {video.publish_date && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(video.publish_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Shorts Title Overlay */}
            {isShorts && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xs font-medium line-clamp-2">
                  {video.title}
                </h3>
                {video.views && (
                  <p className="text-dark-400 text-xs mt-1">
                    {formatViews(video.views)} views
                  </p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <Play className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No videos found in this category</p>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div 
            className={`w-full ${
              selectedVideo.video_type === "Short" 
                ? "max-w-sm aspect-[9/16]" 
                : "max-w-4xl aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(selectedVideo.youtube_video_id, selectedVideo.video_type === "Short")}
              title={selectedVideo.title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Video Info Below */}
            <div className="mt-4 text-center">
              <h3 className="text-white font-semibold text-lg">{selectedVideo.title}</h3>
              {selectedVideo.description && (
                <p className="text-dark-400 text-sm mt-2">{selectedVideo.description}</p>
              )}
              <div className="flex items-center justify-center gap-4 mt-3 text-dark-500 text-sm">
                {selectedVideo.views && (
                  <span>{formatViews(selectedVideo.views)} views</span>
                )}
                {selectedVideo.category && (
                  <span className="px-2 py-1 rounded bg-primary-500/20 text-primary-400 text-xs">
                    {selectedVideo.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


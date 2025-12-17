"use client";

import { useState } from "react";
import { Calendar, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

// Mock data - In production, this would come from Contentstack
const galleries = [
  {
    id: "opening-ceremony-2025",
    title: "OCPL 2025 Opening Ceremony",
    description: "Grand opening ceremony at Vasai Sports Ground",
    date: "Dec 1, 2025",
    imageCount: 24,
    coverColor: "#e87425",
  },
  {
    id: "match-1-vw-vs-nk",
    title: "Match 1: VW vs NK",
    description: "Vasai Warriors vs Nalasopara Knights - Season opener",
    date: "Dec 1, 2025",
    imageCount: 18,
    coverColor: "#3b82f6",
  },
  {
    id: "match-2-vt-vs-ns",
    title: "Match 2: VT vs NS",
    description: "Virar Titans vs Nallasopara Strikers",
    date: "Dec 2, 2025",
    imageCount: 15,
    coverColor: "#22c55e",
  },
  {
    id: "match-3-vk-vs-pp",
    title: "Match 3: VK vs PP",
    description: "Vasai Kings vs Palghar Panthers",
    date: "Dec 3, 2025",
    imageCount: 20,
    coverColor: "#facc15",
  },
  {
    id: "team-photoshoots",
    title: "Team Photoshoots 2025",
    description: "Official team photos for the season",
    date: "Nov 25, 2025",
    imageCount: 30,
    coverColor: "#a855f7",
  },
  {
    id: "practice-sessions",
    title: "Pre-Season Practice",
    description: "Teams preparing for OCPL 2025",
    date: "Nov 20, 2025",
    imageCount: 22,
    coverColor: "#ef4444",
  },
];

// Mock images for lightbox demo
const sampleImages = [
  { id: 1, caption: "Opening ceremony fireworks" },
  { id: 2, caption: "Team captains with trophy" },
  { id: 3, caption: "Crowd at Vasai Sports Ground" },
  { id: 4, caption: "Players during national anthem" },
  { id: 5, caption: "Chief guest addressing the crowd" },
  { id: 6, caption: "Team parade" },
];

export default function GalleryPage() {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openGallery = (galleryId: string) => {
    setSelectedGallery(galleryId);
    setLightboxIndex(0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setSelectedGallery(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % sampleImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + sampleImages.length) % sampleImages.length);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
              PHOTO <span className="gradient-text">GALLERY</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Capturing the best moments from OCPL matches and events
            </p>
          </div>
        </div>
      </section>

      {/* Galleries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery, index) => (
              <button
                key={gallery.id}
                onClick={() => openGallery(gallery.id)}
                className="card group overflow-hidden text-left stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Cover Image Placeholder */}
                <div
                  className="h-56 relative flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${gallery.coverColor}40 0%, ${gallery.coverColor}20 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-white/20" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                      View Gallery
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <span className="text-white text-sm font-medium">
                      {gallery.imageCount} photos
                    </span>
                  </div>
                </div>

                {/* Gallery Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-dark-500 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {gallery.date}
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-primary-500 transition-colors">
                    {gallery.title}
                  </h3>
                  <p className="text-dark-400 text-sm">{gallery.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-5xl gradient-text mb-2">
                {galleries.length}
              </p>
              <p className="text-dark-400">Galleries</p>
            </div>
            <div>
              <p className="font-display text-5xl text-primary-500 mb-2">
                {galleries.reduce((sum, g) => sum + g.imageCount, 0)}+
              </p>
              <p className="text-dark-400">Photos</p>
            </div>
            <div>
              <p className="font-display text-5xl text-secondary-500 mb-2">5</p>
              <p className="text-dark-400">Seasons Covered</p>
            </div>
            <div>
              <p className="font-display text-5xl text-accent-500 mb-2">100+</p>
              <p className="text-dark-400">Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl tracking-wider text-white text-center mb-12">
            VIDEO HIGHLIGHTS
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Best Catches of OCPL 2024", views: "12K" },
              { title: "Top 10 Sixes - Season 4", views: "8.5K" },
              { title: "Final Match Highlights", views: "25K" },
            ].map((video, index) => (
              <div
                key={index}
                className="card overflow-hidden group cursor-pointer stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-44 bg-gradient-to-br from-primary-500/20 to-dark-800 relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-primary-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-dark-500 text-sm">{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div className="max-w-4xl w-full px-16">
            <div className="aspect-video bg-gradient-to-br from-primary-500/30 to-secondary-500/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-24 h-24 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">Image placeholder</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-medium">
                {sampleImages[lightboxIndex].caption}
              </p>
              <p className="text-dark-500 text-sm mt-1">
                {lightboxIndex + 1} of {sampleImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


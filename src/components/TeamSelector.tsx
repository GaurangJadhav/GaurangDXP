"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { getFavoriteTeam, setFavoriteTeam } from "@/lib/personalization";
import { getAllTeamLogos } from "@/lib/team-logos";

const teams = getAllTeamLogos().map((team) => ({
  id: team.shortName,
  name: team.name,
  color: team.color,
  logoUrl: team.logoUrl,
}));

interface TeamSelectorProps {
  onClose?: () => void;
  showAsModal?: boolean;
}

export default function TeamSelector({ onClose, showAsModal = false }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const favorite = getFavoriteTeam();
    if (favorite) {
      setSelectedTeam(favorite);
      if (!showAsModal) {
        setIsVisible(false);
      }
    }
  }, [showAsModal]);

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
    setFavoriteTeam(teamId);
    
    // Close after selection with a small delay for visual feedback
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 500);
  };

  if (!isVisible && !showAsModal) return null;

  const content = (
    <div className={`${showAsModal ? '' : 'fixed bottom-4 right-4 z-40'}`}>
      <div className="card p-6 max-w-sm animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary-500" />
            <h3 className="font-display text-lg text-white">Pick Your Team</h3>
          </div>
          {!showAsModal && (
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-dark-400" />
            </button>
          )}
        </div>
        
        <p className="text-dark-400 text-sm mb-4">
          Select your favorite team for a personalized experience
        </p>

        <div className="grid grid-cols-3 gap-2">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => handleTeamSelect(team.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTeam === team.id
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden"
                style={{ backgroundColor: `${team.color}30` }}
              >
                <Image
                  src={team.logoUrl}
                  alt={team.name}
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-xs text-dark-300 text-center truncate">
                {team.name.split(' ')[0]}
              </p>
            </button>
          ))}
        </div>

        {selectedTeam && (
          <div className="mt-4 p-3 rounded-lg bg-secondary-500/10 border border-secondary-500/30">
            <p className="text-secondary-400 text-sm text-center">
              ✓ You&apos;re now following {teams.find(t => t.id === selectedTeam)?.name}!
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (showAsModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative">
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="absolute -top-2 -right-2 p-2 rounded-full bg-dark-800 hover:bg-dark-700 transition-colors z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
}


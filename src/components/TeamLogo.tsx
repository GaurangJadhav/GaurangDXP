"use client";

import Image from "next/image";
import { TEAM_LOGOS } from "@/lib/team-logos";

interface TeamLogoProps {
  shortName: string;
  size?: "sm" | "md" | "lg" | "xl";
  showFallback?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-20 h-20",
  xl: "w-24 h-24",
};

const sizePx = {
  sm: 40,
  md: 64,
  lg: 80,
  xl: 96,
};

export default function TeamLogo({
  shortName,
  size = "md",
  showFallback = true,
  className = "",
}: TeamLogoProps) {
  const team = TEAM_LOGOS[shortName.toUpperCase()];

  if (!team) {
    return showFallback ? (
      <div
        className={`${sizeClasses[size]} rounded-full bg-dark-800 flex items-center justify-center ${className}`}
      >
        <span className="font-display text-dark-400 text-lg">{shortName}</span>
      </div>
    ) : null;
  }

  return (
    <div
      className={`${sizeClasses[size]} relative rounded-full overflow-hidden ${className}`}
      style={{ backgroundColor: `${team.color}20` }}
    >
      <Image
        src={team.logoUrl}
        alt={`${team.name} logo`}
        width={sizePx[size]}
        height={sizePx[size]}
        className="object-contain p-1"
        unoptimized // Using Contentstack CDN
      />
    </div>
  );
}

interface TeamLogoWithNameProps extends TeamLogoProps {
  showName?: boolean;
  namePosition?: "bottom" | "right";
}

export function TeamLogoWithName({
  shortName,
  size = "md",
  showFallback = true,
  showName = true,
  namePosition = "bottom",
  className = "",
}: TeamLogoWithNameProps) {
  const team = TEAM_LOGOS[shortName.toUpperCase()];

  const containerClass =
    namePosition === "bottom"
      ? "flex flex-col items-center"
      : "flex items-center gap-3";

  return (
    <div className={`${containerClass} ${className}`}>
      <TeamLogo shortName={shortName} size={size} showFallback={showFallback} />
      {showName && team && (
        <span
          className={`font-medium text-white ${
            namePosition === "bottom" ? "mt-2 text-sm text-center" : ""
          }`}
        >
          {team.name}
        </span>
      )}
    </div>
  );
}


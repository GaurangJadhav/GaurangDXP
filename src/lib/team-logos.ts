/**
 * Team Logo URLs from Contentstack Assets
 * These logos are stored in Contentstack and can be used across the website
 */

export interface TeamLogoInfo {
  shortName: string;
  name: string;
  logoUrl: string;
  color: string;
}

export const TEAM_LOGOS: Record<string, TeamLogoInfo> = {
  FC: {
    shortName: "FC",
    name: "Flame Chargers",
    logoUrl: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/blt38885cac718250fa/694252b3c7260010bbf4b61f/FlameChargers.png",
    color: "#e87425",
  },
  SS: {
    shortName: "SS",
    name: "Storm Surfers",
    logoUrl: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/bltb59ce66178c557c3/694252b2ca96fc63562edac7/StormSurfers.png",
    color: "#3b82f6",
  },
  WW: {
    shortName: "WW",
    name: "Windstorm Warriors",
    logoUrl: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/bltdcdd5ec6cc895eb3/694252b31308b83f6a0b0ffd/WindstormWarriors.png",
    color: "#22c55e",
  },
  ET: {
    shortName: "ET",
    name: "Earth Titans",
    logoUrl: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/blt18d548132544b2f8/694252b27d8e35362b710ea7/EarthTitans.png",
    color: "#a855f7",
  },
  TS: {
    shortName: "TS",
    name: "Thunder Strikers",
    logoUrl: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/blt7e202081d1ba2e2e/694252b3c478796ccbbfa8cc/ThunderStrikers.png",
    color: "#facc15",
  },
  GG: {
    shortName: "GG",
    name: "Glacier Gladiators",
    logoUrl: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/blt033d5d3465f191b4/694252b3b0a12cabf012d3dc/GlacierGladiators.png",
    color: "#06b6d4",
  },
};

/**
 * Get team logo URL by short name
 */
export function getTeamLogo(shortName: string): string | null {
  return TEAM_LOGOS[shortName.toUpperCase()]?.logoUrl || null;
}

/**
 * Get team info by short name
 */
export function getTeamInfo(shortName: string): TeamLogoInfo | null {
  return TEAM_LOGOS[shortName.toUpperCase()] || null;
}

/**
 * Get all teams as array
 */
export function getAllTeamLogos(): TeamLogoInfo[] {
  return Object.values(TEAM_LOGOS);
}


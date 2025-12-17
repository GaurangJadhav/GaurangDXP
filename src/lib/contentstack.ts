import Contentstack from "contentstack";
import type {
  Team,
  Player,
  Match,
  Article,
  Homepage,
  Season,
  PointsTableEntry,
  Venue,
  Gallery,
  Video,
} from "@/types/contentstack";

// Initialize Contentstack SDK
const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY || "",
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || "",
  environment: process.env.CONTENTSTACK_ENVIRONMENT || "production",
  region: (process.env.CONTENTSTACK_REGION as Contentstack.Region) || Contentstack.Region.US,
});

// Helper function to handle errors
const handleError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  throw error;
};

// ==================== TEAMS ====================
export async function getAllTeams(): Promise<Team[]> {
  try {
    const result = await Stack.ContentType("team")
      .Query()
      .includeReference(["captain"])
      .toJSON()
      .find();
    return result[0] as Team[];
  } catch (error) {
    handleError(error, "getAllTeams");
    return [];
  }
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  try {
    const result = await Stack.ContentType("team")
      .Query()
      .where("short_name", slug.toUpperCase())
      .includeReference(["captain"])
      .toJSON()
      .find();
    return result[0]?.[0] as Team || null;
  } catch (error) {
    handleError(error, "getTeamBySlug");
    return null;
  }
}

// ==================== PLAYERS ====================
export async function getAllPlayers(): Promise<Player[]> {
  try {
    const result = await Stack.ContentType("player")
      .Query()
      .includeReference(["team"])
      .toJSON()
      .find();
    return result[0] as Player[];
  } catch (error) {
    handleError(error, "getAllPlayers");
    return [];
  }
}

export async function getPlayersByTeam(teamUid: string): Promise<Player[]> {
  try {
    const result = await Stack.ContentType("player")
      .Query()
      .where("team", teamUid)
      .includeReference(["team"])
      .toJSON()
      .find();
    return result[0] as Player[];
  } catch (error) {
    handleError(error, "getPlayersByTeam");
    return [];
  }
}

export async function getPlayerByUid(uid: string): Promise<Player | null> {
  try {
    const result = await Stack.ContentType("player")
      .Entry(uid)
      .includeReference(["team"])
      .toJSON()
      .fetch();
    return result as unknown as Player;
  } catch (error) {
    handleError(error, "getPlayerByUid");
    return null;
  }
}

// ==================== MATCHES ====================
export async function getAllMatches(): Promise<Match[]> {
  try {
    const result = await Stack.ContentType("match")
      .Query()
      .includeReference(["team_1", "team_2", "venue", "toss_winner", "man_of_the_match"])
      .toJSON()
      .find();
    return result[0] as Match[];
  } catch (error) {
    handleError(error, "getAllMatches");
    return [];
  }
}

export async function getUpcomingMatches(): Promise<Match[]> {
  try {
    const result = await Stack.ContentType("match")
      .Query()
      .where("match_status", "Upcoming")
      .includeReference(["team_1", "team_2", "venue"])
      .ascending("match_date")
      .toJSON()
      .find();
    return result[0] as Match[];
  } catch (error) {
    handleError(error, "getUpcomingMatches");
    return [];
  }
}

export async function getLiveMatches(): Promise<Match[]> {
  try {
    const result = await Stack.ContentType("match")
      .Query()
      .where("match_status", "Live")
      .includeReference(["team_1", "team_2", "venue", "toss_winner"])
      .toJSON()
      .find();
    return result[0] as Match[];
  } catch (error) {
    handleError(error, "getLiveMatches");
    return [];
  }
}

export async function getCompletedMatches(): Promise<Match[]> {
  try {
    const result = await Stack.ContentType("match")
      .Query()
      .where("match_status", "Completed")
      .includeReference(["team_1", "team_2", "venue", "man_of_the_match"])
      .descending("match_date")
      .toJSON()
      .find();
    return result[0] as Match[];
  } catch (error) {
    handleError(error, "getCompletedMatches");
    return [];
  }
}

export async function getMatchByNumber(matchNumber: number): Promise<Match | null> {
  try {
    const result = await Stack.ContentType("match")
      .Query()
      .where("match_number", matchNumber)
      .includeReference(["team_1", "team_2", "venue", "toss_winner", "man_of_the_match"])
      .toJSON()
      .find();
    return result[0]?.[0] as Match || null;
  } catch (error) {
    handleError(error, "getMatchByNumber");
    return null;
  }
}

// ==================== ARTICLES/NEWS ====================
export async function getAllArticles(): Promise<Article[]> {
  try {
    const result = await Stack.ContentType("article")
      .Query()
      .includeReference(["related_team", "related_players", "related_match"])
      .descending("publish_date")
      .toJSON()
      .find();
    return result[0] as Article[];
  } catch (error) {
    handleError(error, "getAllArticles");
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const result = await Stack.ContentType("article")
      .Query()
      .where("slug", slug)
      .includeReference(["related_team", "related_players", "related_match"])
      .toJSON()
      .find();
    return result[0]?.[0] as Article || null;
  } catch (error) {
    handleError(error, "getArticleBySlug");
    return null;
  }
}

export async function getLatestNews(limit: number = 5): Promise<Article[]> {
  try {
    const result = await Stack.ContentType("article")
      .Query()
      .descending("publish_date")
      .limit(limit)
      .toJSON()
      .find();
    return result[0] as Article[];
  } catch (error) {
    handleError(error, "getLatestNews");
    return [];
  }
}

// ==================== HOMEPAGE ====================
export async function getHomepage(): Promise<Homepage | null> {
  try {
    const result = await Stack.ContentType("homepage")
      .Query()
      .includeReference([
        "featured_matches",
        "featured_teams",
        "featured_players",
        "latest_news",
      ])
      .toJSON()
      .find();
    return result[0]?.[0] as Homepage || null;
  } catch (error) {
    handleError(error, "getHomepage");
    return null;
  }
}

// ==================== SEASONS ====================
export async function getAllSeasons(): Promise<Season[]> {
  try {
    const result = await Stack.ContentType("season")
      .Query()
      .includeReference(["champion_team", "runner_up", "orange_cap", "purple_cap", "mvp"])
      .descending("year")
      .toJSON()
      .find();
    return result[0] as Season[];
  } catch (error) {
    handleError(error, "getAllSeasons");
    return [];
  }
}

export async function getCurrentSeason(): Promise<Season | null> {
  try {
    const currentYear = new Date().getFullYear();
    const result = await Stack.ContentType("season")
      .Query()
      .where("year", currentYear)
      .includeReference(["champion_team", "runner_up", "orange_cap", "purple_cap", "mvp"])
      .toJSON()
      .find();
    return result[0]?.[0] as Season || null;
  } catch (error) {
    handleError(error, "getCurrentSeason");
    return null;
  }
}

// ==================== POINTS TABLE ====================
export async function getPointsTable(seasonUid?: string): Promise<PointsTableEntry[]> {
  try {
    const baseQuery = Stack.ContentType("points_table").Query();
    
    const result = await (seasonUid 
      ? baseQuery.where("season", seasonUid)
      : baseQuery)
      .includeReference(["team", "season"])
      .ascending("position")
      .toJSON()
      .find();
    return result[0] as PointsTableEntry[];
  } catch (error) {
    handleError(error, "getPointsTable");
    return [];
  }
}

// ==================== VENUES ====================
export async function getAllVenues(): Promise<Venue[]> {
  try {
    const result = await Stack.ContentType("venue")
      .Query()
      .toJSON()
      .find();
    return result[0] as Venue[];
  } catch (error) {
    handleError(error, "getAllVenues");
    return [];
  }
}

// ==================== GALLERY ====================
export async function getAllGalleries(): Promise<Gallery[]> {
  try {
    const result = await Stack.ContentType("gallery")
      .Query()
      .includeReference(["match", "season"])
      .descending("date")
      .toJSON()
      .find();
    return result[0] as Gallery[];
  } catch (error) {
    handleError(error, "getAllGalleries");
    return [];
  }
}

// ==================== PERSONALIZATION ====================
// Function to get personalized content based on user attributes
export async function getPersonalizedContent<T>(
  contentTypeUid: string,
  entryUid: string,
  userAttributes: Record<string, string>
): Promise<T | null> {
  try {
    // In a real implementation, this would call the Personalization Edge API
    // For now, we'll return the base content
    const result = await Stack.ContentType(contentTypeUid)
      .Entry(entryUid)
      .toJSON()
      .fetch();
    
    // Log user attributes for personalization tracking
    console.log("Personalization attributes:", userAttributes);
    
    return result as unknown as T;
  } catch (error) {
    handleError(error, "getPersonalizedContent");
    return null;
  }
}

// ==================== VIDEOS ====================
export async function getAllVideos(): Promise<Video[]> {
  try {
    const result = await Stack.ContentType("video")
      .Query()
      .descending("publish_date")
      .toJSON()
      .find();
    return result[0] as Video[];
  } catch (error) {
    handleError(error, "getAllVideos");
    return [];
  }
}

export async function getFeaturedVideos(): Promise<Video[]> {
  try {
    const result = await Stack.ContentType("video")
      .Query()
      .where("is_featured", true)
      .descending("publish_date")
      .toJSON()
      .find();
    return result[0] as Video[];
  } catch (error) {
    handleError(error, "getFeaturedVideos");
    return [];
  }
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  try {
    const result = await Stack.ContentType("video")
      .Query()
      .where("category", category)
      .descending("publish_date")
      .toJSON()
      .find();
    return result[0] as Video[];
  } catch (error) {
    handleError(error, "getVideosByCategory");
    return [];
  }
}

export async function getVideosByType(videoType: string): Promise<Video[]> {
  try {
    const result = await Stack.ContentType("video")
      .Query()
      .where("video_type", videoType)
      .descending("publish_date")
      .toJSON()
      .find();
    return result[0] as Video[];
  } catch (error) {
    handleError(error, "getVideosByType");
    return [];
  }
}

// Export the Stack for advanced usage
export { Stack };


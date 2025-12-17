/**
 * OCPL Contentstack Setup Script v2
 * 
 * This script creates all content types and entries for the OCPL website
 * Run with: node scripts/setup-contentstack-v2.js
 */

const https = require('https');

// Contentstack credentials
const CONFIG = {
  authtoken: 'blte5c1f92ccc96f8a3',
  api_key: 'blt2a1a0df4ff6bc454',
  org_uid: 'blt95003e57aa11d5e4',
  base_url: 'api.contentstack.io',
};

// Helper function to make API requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONFIG.base_url,
      port: 443,
      path: `/v3${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'authtoken': CONFIG.authtoken,
        'api_key': CONFIG.api_key,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ statusCode: res.statusCode, error: parsed });
          }
        } catch (e) {
          reject({ statusCode: res.statusCode, error: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Store created UIDs for references
const createdUids = {
  venues: {},
  teams: {},
  players: {},
  seasons: {},
  matches: {},
  articles: {},
};

// ==================== CONTENT TYPE DEFINITIONS ====================

async function createContentTypes() {
  console.log('\n📋 Creating Content Types...\n');

  const contentTypes = [
    // 1. Venue
    {
      content_type: {
        title: "Venue",
        uid: "venue",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Venue Name", uid: "venue_name", data_type: "text", mandatory: true },
          { display_name: "Location", uid: "location", data_type: "text", mandatory: true },
          { display_name: "City", uid: "city", data_type: "text", mandatory: true },
          { display_name: "Capacity", uid: "capacity", data_type: "number", mandatory: false },
          { display_name: "Facilities", uid: "facilities", data_type: "text", mandatory: false, multiple: true },
          { display_name: "Description", uid: "description", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 2. Team
    {
      content_type: {
        title: "Team",
        uid: "team",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Team Name", uid: "team_name", data_type: "text", mandatory: true },
          { display_name: "Short Name", uid: "short_name", data_type: "text", mandatory: true },
          { display_name: "Primary Color", uid: "primary_color", data_type: "text", mandatory: true },
          { display_name: "Secondary Color", uid: "secondary_color", data_type: "text", mandatory: false },
          { display_name: "Owner Name", uid: "owner_name", data_type: "text", mandatory: false },
          { display_name: "Home Ground", uid: "home_ground", data_type: "text", mandatory: false },
          { display_name: "Established Year", uid: "established_year", data_type: "number", mandatory: false },
          { display_name: "Team Motto", uid: "team_motto", data_type: "text", mandatory: false },
          { display_name: "Description", uid: "description", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
          { display_name: "Matches Played", uid: "matches_played", data_type: "number", mandatory: false },
          { display_name: "Wins", uid: "wins", data_type: "number", mandatory: false },
          { display_name: "Losses", uid: "losses", data_type: "number", mandatory: false },
          { display_name: "Titles Won", uid: "titles_won", data_type: "number", mandatory: false },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 3. Player
    {
      content_type: {
        title: "Player",
        uid: "player",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Player Name", uid: "player_name", data_type: "text", mandatory: true },
          { display_name: "Jersey Number", uid: "jersey_number", data_type: "number", mandatory: true },
          { display_name: "Role", uid: "role", data_type: "text", mandatory: true },
          { display_name: "Batting Style", uid: "batting_style", data_type: "text", mandatory: false },
          { display_name: "Bowling Style", uid: "bowling_style", data_type: "text", mandatory: false },
          { display_name: "Team", uid: "team", data_type: "reference", reference_to: ["team"], mandatory: false },
          { display_name: "Age", uid: "age", data_type: "number", mandatory: false },
          { display_name: "Locality", uid: "locality", data_type: "text", mandatory: false },
          { display_name: "Occupation", uid: "occupation", data_type: "text", mandatory: false },
          { display_name: "Bio", uid: "bio", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
          { display_name: "Is Captain", uid: "is_captain", data_type: "boolean", mandatory: false },
          { display_name: "Matches", uid: "matches", data_type: "number", mandatory: false },
          { display_name: "Runs", uid: "runs", data_type: "number", mandatory: false },
          { display_name: "Highest Score", uid: "highest_score", data_type: "number", mandatory: false },
          { display_name: "Batting Average", uid: "batting_average", data_type: "number", mandatory: false },
          { display_name: "Strike Rate", uid: "strike_rate", data_type: "number", mandatory: false },
          { display_name: "Wickets", uid: "wickets", data_type: "number", mandatory: false },
          { display_name: "Best Bowling", uid: "best_bowling", data_type: "text", mandatory: false },
          { display_name: "Catches", uid: "catches", data_type: "number", mandatory: false },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 4. Season
    {
      content_type: {
        title: "Season",
        uid: "season",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Season Name", uid: "season_name", data_type: "text", mandatory: true },
          { display_name: "Year", uid: "year", data_type: "number", mandatory: true },
          { display_name: "Start Date", uid: "start_date", data_type: "isodate", mandatory: false },
          { display_name: "End Date", uid: "end_date", data_type: "isodate", mandatory: false },
          { display_name: "Total Matches", uid: "total_matches", data_type: "number", mandatory: false },
          { display_name: "Total Runs", uid: "total_runs", data_type: "number", mandatory: false },
          { display_name: "Total Wickets", uid: "total_wickets", data_type: "number", mandatory: false },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 5. Match
    {
      content_type: {
        title: "Match",
        uid: "match",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Match Number", uid: "match_number", data_type: "number", mandatory: true },
          { display_name: "Match Date", uid: "match_date", data_type: "isodate", mandatory: true },
          { display_name: "Match Time", uid: "match_time", data_type: "text", mandatory: true },
          { display_name: "Venue", uid: "venue", data_type: "reference", reference_to: ["venue"], mandatory: false },
          { display_name: "Team 1", uid: "team_1", data_type: "reference", reference_to: ["team"], mandatory: false },
          { display_name: "Team 2", uid: "team_2", data_type: "reference", reference_to: ["team"], mandatory: false },
          { display_name: "Toss Winner", uid: "toss_winner", data_type: "text", mandatory: false },
          { display_name: "Toss Decision", uid: "toss_decision", data_type: "text", mandatory: false },
          { display_name: "Match Status", uid: "match_status", data_type: "text", mandatory: true },
          { display_name: "Result", uid: "result", data_type: "text", mandatory: false },
          { display_name: "Team 1 Runs", uid: "team_1_runs", data_type: "number", mandatory: false },
          { display_name: "Team 1 Wickets", uid: "team_1_wickets", data_type: "number", mandatory: false },
          { display_name: "Team 1 Overs", uid: "team_1_overs", data_type: "number", mandatory: false },
          { display_name: "Team 2 Runs", uid: "team_2_runs", data_type: "number", mandatory: false },
          { display_name: "Team 2 Wickets", uid: "team_2_wickets", data_type: "number", mandatory: false },
          { display_name: "Team 2 Overs", uid: "team_2_overs", data_type: "number", mandatory: false },
          { display_name: "Man of the Match", uid: "man_of_the_match", data_type: "text", mandatory: false },
          { display_name: "Match Report", uid: "match_report", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 6. Points Table
    {
      content_type: {
        title: "Points Table",
        uid: "points_table",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Team", uid: "team", data_type: "reference", reference_to: ["team"], mandatory: false },
          { display_name: "Position", uid: "position", data_type: "number", mandatory: true },
          { display_name: "Matches Played", uid: "matches_played", data_type: "number", mandatory: true },
          { display_name: "Wins", uid: "wins", data_type: "number", mandatory: true },
          { display_name: "Losses", uid: "losses", data_type: "number", mandatory: true },
          { display_name: "Ties", uid: "ties", data_type: "number", mandatory: false },
          { display_name: "No Results", uid: "no_results", data_type: "number", mandatory: false },
          { display_name: "Points", uid: "points", data_type: "number", mandatory: true },
          { display_name: "Net Run Rate", uid: "net_run_rate", data_type: "number", mandatory: false },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 7. Article
    {
      content_type: {
        title: "Article",
        uid: "article",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "URL Slug", uid: "slug", data_type: "text", mandatory: true },
          { display_name: "Excerpt", uid: "excerpt", data_type: "text", mandatory: true, field_metadata: { multiline: true } },
          { display_name: "Content", uid: "content", data_type: "text", mandatory: true, field_metadata: { multiline: true } },
          { display_name: "Author", uid: "author", data_type: "text", mandatory: true },
          { display_name: "Publish Date", uid: "publish_date", data_type: "isodate", mandatory: true },
          { display_name: "Category", uid: "category", data_type: "text", mandatory: true },
          { display_name: "Tags", uid: "tags", data_type: "text", mandatory: false, multiple: true },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    },
    // 8. Homepage
    {
      content_type: {
        title: "Homepage",
        uid: "homepage",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true },
          { display_name: "Headline", uid: "headline", data_type: "text", mandatory: true },
          { display_name: "Subheadline", uid: "subheadline", data_type: "text", mandatory: false },
          { display_name: "CTA Text", uid: "cta_text", data_type: "text", mandatory: false },
          { display_name: "CTA Link", uid: "cta_link", data_type: "text", mandatory: false },
          { display_name: "Countdown Date", uid: "countdown_date", data_type: "isodate", mandatory: false },
        ],
        options: { is_page: false, singleton: true, title: "title" }
      }
    },
  ];

  for (const ct of contentTypes) {
    try {
      // First try to delete if exists
      try {
        await makeRequest('DELETE', `/content_types/${ct.content_type.uid}?force=true`);
        console.log(`  🗑️  Deleted existing: ${ct.content_type.title}`);
        await sleep(1000);
      } catch (e) {
        // Ignore if doesn't exist
      }

      console.log(`  Creating: ${ct.content_type.title}...`);
      await makeRequest('POST', '/content_types', ct);
      console.log(`  ✅ Created: ${ct.content_type.title}`);
      await sleep(1500);
    } catch (error) {
      console.log(`  ❌ Error creating ${ct.content_type.title}:`, error.error?.error_message || JSON.stringify(error));
    }
  }
}

async function createEntries() {
  // Create Venues
  console.log('\n🏟️  Creating Venues...\n');
  
  const venues = [
    { title: "Vasai Sports Ground", venue_name: "Vasai Sports Ground", location: "Near Vasai Railway Station", city: "Vasai", capacity: 2000, facilities: ["Floodlights", "Pavilion", "Scoreboard"], description: "Premier cricket venue in Vasai" },
    { title: "Virar Stadium", venue_name: "Virar Stadium", location: "Virar West", city: "Virar", capacity: 1500, facilities: ["Floodlights", "Pavilion"], description: "Home ground of Virar Titans" },
    { title: "Nalasopara Cricket Ground", venue_name: "Nalasopara Cricket Ground", location: "Nalasopara West", city: "Nalasopara", capacity: 1200, facilities: ["Pavilion", "Scoreboard"], description: "Home venue for Nalasopara Knights" },
  ];

  for (const venue of venues) {
    try {
      const result = await makeRequest('POST', '/content_types/venue/entries?locale=en-us', { entry: venue });
      createdUids.venues[venue.title] = result.entry.uid;
      console.log(`  ✅ ${venue.title} (${result.entry.uid})`);
      await sleep(500);
    } catch (error) {
      console.log(`  ❌ ${venue.title}:`, error.error?.error_message || error);
    }
  }

  // Create Teams
  console.log('\n🏆 Creating Teams...\n');
  
  const teams = [
    { title: "Vasai Warriors", team_name: "Vasai Warriors", short_name: "VW", primary_color: "#e87425", secondary_color: "#d95a1b", owner_name: "Rajesh Patil", home_ground: "Vasai Sports Ground", established_year: 2021, team_motto: "Warriors Never Give Up!", description: "Most successful team in OCPL", matches_played: 45, wins: 32, losses: 11, titles_won: 2 },
    { title: "Nalasopara Knights", team_name: "Nalasopara Knights", short_name: "NK", primary_color: "#3b82f6", secondary_color: "#2563eb", owner_name: "Suresh Sharma", home_ground: "Nalasopara Cricket Ground", established_year: 2021, team_motto: "Rise of the Knights", description: "Known for disciplined bowling", matches_played: 45, wins: 28, losses: 15, titles_won: 1 },
    { title: "Virar Titans", team_name: "Virar Titans", short_name: "VT", primary_color: "#22c55e", secondary_color: "#16a34a", owner_name: "Amit Deshmukh", home_ground: "Virar Stadium", established_year: 2021, team_motto: "Titans Rise Together", description: "Explosive batting lineup", matches_played: 45, wins: 25, losses: 18, titles_won: 1 },
    { title: "Nallasopara Strikers", team_name: "Nallasopara Strikers", short_name: "NS", primary_color: "#a855f7", secondary_color: "#9333ea", owner_name: "Priya Mehta", home_ground: "Nallasopara Sports Complex", established_year: 2022, team_motto: "Strike Hard, Strike Fast", description: "Young fearless team", matches_played: 35, wins: 18, losses: 15, titles_won: 0 },
    { title: "Vasai Kings", team_name: "Vasai Kings", short_name: "VK", primary_color: "#facc15", secondary_color: "#eab308", owner_name: "Vikram Singh", home_ground: "Vasai Sports Ground", established_year: 2021, team_motto: "Crown the Kings", description: "Royal franchise", matches_played: 45, wins: 22, losses: 21, titles_won: 1 },
    { title: "Palghar Panthers", team_name: "Palghar Panthers", short_name: "PP", primary_color: "#ef4444", secondary_color: "#dc2626", owner_name: "Ravi Kumar", home_ground: "Palghar District Ground", established_year: 2023, team_motto: "Unleash the Panther", description: "Newest team", matches_played: 20, wins: 8, losses: 11, titles_won: 0 },
  ];

  for (const team of teams) {
    try {
      const result = await makeRequest('POST', '/content_types/team/entries?locale=en-us', { entry: team });
      createdUids.teams[team.short_name] = result.entry.uid;
      console.log(`  ✅ ${team.title} (${result.entry.uid})`);
      await sleep(500);
    } catch (error) {
      console.log(`  ❌ ${team.title}:`, error.error?.error_message || error);
    }
  }

  // Create Players
  console.log('\n👤 Creating Players...\n');
  
  const players = [
    { title: "Rahul Patil", player_name: "Rahul Patil", jersey_number: 7, role: "Batsman", batting_style: "Right-Handed", bowling_style: "Right-arm Off Spin", team: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : null, age: 28, locality: "Vasai West", occupation: "Software Engineer", bio: "Captain and star batsman", is_captain: true, matches: 45, runs: 1850, highest_score: 102, batting_average: 48.68, strike_rate: 142.5, wickets: 12, best_bowling: "2/18", catches: 22 },
    { title: "Amit Sharma", player_name: "Amit Sharma", jersey_number: 11, role: "Bowler", batting_style: "Right-Handed", bowling_style: "Right-arm Fast", team: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : null, age: 25, locality: "Vasai East", occupation: "Gym Trainer", bio: "Spearhead bowler", is_captain: false, matches: 40, runs: 180, highest_score: 25, batting_average: 9.0, strike_rate: 110.0, wickets: 68, best_bowling: "5/22", catches: 8 },
    { title: "Suresh Kumar", player_name: "Suresh Kumar", jersey_number: 23, role: "All-Rounder", batting_style: "Left-Handed", bowling_style: "Left-arm Orthodox", team: createdUids.teams["NK"] ? [{ uid: createdUids.teams["NK"], _content_type_uid: "team" }] : null, age: 30, locality: "Nalasopara West", occupation: "Business Owner", bio: "Captain of Knights", is_captain: true, matches: 42, runs: 1120, highest_score: 78, batting_average: 32.0, strike_rate: 128.5, wickets: 45, best_bowling: "4/28", catches: 18 },
    { title: "Vikram Desai", player_name: "Vikram Desai", jersey_number: 45, role: "Wicket-Keeper", batting_style: "Right-Handed", bowling_style: "N/A", team: createdUids.teams["VT"] ? [{ uid: createdUids.teams["VT"], _content_type_uid: "team" }] : null, age: 26, locality: "Virar West", occupation: "Bank Employee", bio: "Quick reflexes behind stumps", is_captain: false, matches: 38, runs: 920, highest_score: 85, batting_average: 28.75, strike_rate: 145.2, wickets: 0, catches: 35 },
    { title: "Pradeep Singh", player_name: "Pradeep Singh", jersey_number: 18, role: "Batsman", batting_style: "Right-Handed", bowling_style: "Right-arm Medium", team: createdUids.teams["VT"] ? [{ uid: createdUids.teams["VT"], _content_type_uid: "team" }] : null, age: 32, locality: "Virar East", occupation: "Teacher", bio: "Captain of Titans", is_captain: true, matches: 44, runs: 1450, highest_score: 95, batting_average: 38.15, strike_rate: 132.0, wickets: 8, best_bowling: "2/15", catches: 15 },
    { title: "Mahesh Patil", player_name: "Mahesh Patil", jersey_number: 33, role: "Batsman", batting_style: "Left-Handed", bowling_style: "N/A", team: createdUids.teams["VK"] ? [{ uid: createdUids.teams["VK"], _content_type_uid: "team" }] : null, age: 29, locality: "Vasai Road", occupation: "Businessman", bio: "Stylish left-hander captain", is_captain: true, matches: 43, runs: 1580, highest_score: 98, batting_average: 42.7, strike_rate: 140.5, wickets: 0, catches: 20 },
  ];

  for (const player of players) {
    try {
      // Remove null team references
      if (!player.team) delete player.team;
      const result = await makeRequest('POST', '/content_types/player/entries?locale=en-us', { entry: player });
      createdUids.players[player.title] = result.entry.uid;
      console.log(`  ✅ ${player.title} (${result.entry.uid})`);
      await sleep(500);
    } catch (error) {
      console.log(`  ❌ ${player.title}:`, error.error?.error_message || error);
    }
  }

  // Create Season
  console.log('\n📅 Creating Season...\n');
  
  try {
    const season = { title: "OCPL 2025", season_name: "OCPL 2025", year: 2025, start_date: "2025-12-01", end_date: "2025-01-15", total_matches: 30, total_runs: 8500, total_wickets: 320 };
    const result = await makeRequest('POST', '/content_types/season/entries?locale=en-us', { entry: season });
    createdUids.seasons["2025"] = result.entry.uid;
    console.log(`  ✅ OCPL 2025 (${result.entry.uid})`);
  } catch (error) {
    console.log(`  ❌ Season:`, error.error?.error_message || error);
  }

  // Create Matches
  console.log('\n🏏 Creating Matches...\n');
  
  const matches = [
    { title: "Match 1: VW vs NK", match_number: 1, match_date: "2025-12-01", match_time: "4:00 PM", venue: createdUids.venues["Vasai Sports Ground"] ? [{ uid: createdUids.venues["Vasai Sports Ground"], _content_type_uid: "venue" }] : null, team_1: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : null, team_2: createdUids.teams["NK"] ? [{ uid: createdUids.teams["NK"], _content_type_uid: "team" }] : null, toss_winner: "Vasai Warriors", toss_decision: "Bat", match_status: "Completed", result: "Vasai Warriors won by 25 runs", team_1_runs: 185, team_1_wickets: 6, team_1_overs: 20, team_2_runs: 160, team_2_wickets: 8, team_2_overs: 20, man_of_the_match: "Rahul Patil", match_report: "Opening match of OCPL 2025" },
    { title: "Match 2: VT vs NS", match_number: 2, match_date: "2025-12-02", match_time: "4:00 PM", venue: createdUids.venues["Virar Stadium"] ? [{ uid: createdUids.venues["Virar Stadium"], _content_type_uid: "venue" }] : null, team_1: createdUids.teams["VT"] ? [{ uid: createdUids.teams["VT"], _content_type_uid: "team" }] : null, team_2: createdUids.teams["NS"] ? [{ uid: createdUids.teams["NS"], _content_type_uid: "team" }] : null, match_status: "Completed", result: "Virar Titans won by 5 wickets", team_1_runs: 145, team_1_wickets: 9, team_1_overs: 20, team_2_runs: 148, team_2_wickets: 5, team_2_overs: 18, man_of_the_match: "Vikram Desai", match_report: "Titans chase down target" },
    { title: "Match 15: VW vs NK", match_number: 15, match_date: "2025-12-20", match_time: "4:00 PM", venue: createdUids.venues["Vasai Sports Ground"] ? [{ uid: createdUids.venues["Vasai Sports Ground"], _content_type_uid: "venue" }] : null, team_1: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : null, team_2: createdUids.teams["NK"] ? [{ uid: createdUids.teams["NK"], _content_type_uid: "team" }] : null, match_status: "Upcoming", team_1_runs: 0, team_1_wickets: 0, team_1_overs: 0, team_2_runs: 0, team_2_wickets: 0, team_2_overs: 0 },
  ];

  for (const match of matches) {
    try {
      // Remove null references
      Object.keys(match).forEach(key => { if (match[key] === null) delete match[key]; });
      const result = await makeRequest('POST', '/content_types/match/entries?locale=en-us', { entry: match });
      createdUids.matches[match.title] = result.entry.uid;
      console.log(`  ✅ ${match.title} (${result.entry.uid})`);
      await sleep(500);
    } catch (error) {
      console.log(`  ❌ ${match.title}:`, error.error?.error_message || error);
    }
  }

  // Create Articles
  console.log('\n📰 Creating Articles...\n');
  
  const articles = [
    { title: "Vasai Warriors clinch thriller", slug: "vw-thriller-match-1", excerpt: "Warriors win opening match by 25 runs", content: "Captain Rahul Patil led from the front with 78 runs.", author: "OCPL Media", publish_date: "2025-12-01", category: "Match Report", tags: ["Vasai Warriors", "Match 1"] },
    { title: "OCPL 2025 Season kicks off", slug: "ocpl-2025-opening", excerpt: "Grand opening ceremony at Vasai Sports Ground", content: "The fifth edition began with spectacular ceremony.", author: "OCPL Media", publish_date: "2025-12-01", category: "News", tags: ["Opening", "Season 5"] },
    { title: "Rahul Patil in brilliant form", slug: "rahul-patil-form", excerpt: "Star batsman continues to dominate", content: "Rahul Patil has been the standout performer.", author: "Sports Desk", publish_date: "2025-12-02", category: "Feature", tags: ["Rahul Patil", "Top Scorer"] },
  ];

  for (const article of articles) {
    try {
      const result = await makeRequest('POST', '/content_types/article/entries?locale=en-us', { entry: article });
      createdUids.articles[article.slug] = result.entry.uid;
      console.log(`  ✅ ${article.title} (${result.entry.uid})`);
      await sleep(500);
    } catch (error) {
      console.log(`  ❌ ${article.title}:`, error.error?.error_message || error);
    }
  }

  // Create Homepage
  console.log('\n🏠 Creating Homepage...\n');
  
  try {
    const homepage = { title: "OCPL Homepage", headline: "OCPL 2025", subheadline: "Vasai's Premier Cricket League", cta_text: "View Schedule", cta_link: "/matches", countdown_date: "2025-12-20" };
    const result = await makeRequest('POST', '/content_types/homepage/entries?locale=en-us', { entry: homepage });
    console.log(`  ✅ Homepage (${result.entry.uid})`);
  } catch (error) {
    console.log(`  ❌ Homepage:`, error.error?.error_message || error);
  }

  // Create Points Table
  console.log('\n📊 Creating Points Table...\n');
  
  const pointsData = [
    { short: "VW", position: 1, played: 10, wins: 8, losses: 1, ties: 0, nr: 1, points: 17, nrr: 1.256 },
    { short: "NK", position: 2, played: 10, wins: 7, losses: 2, ties: 0, nr: 1, points: 15, nrr: 0.892 },
    { short: "VT", position: 3, played: 10, wins: 6, losses: 3, ties: 0, nr: 1, points: 13, nrr: 0.445 },
    { short: "VK", position: 4, played: 10, wins: 5, losses: 4, ties: 0, nr: 1, points: 11, nrr: 0.125 },
    { short: "NS", position: 5, played: 10, wins: 3, losses: 6, ties: 0, nr: 1, points: 7, nrr: -0.523 },
    { short: "PP", position: 6, played: 10, wins: 1, losses: 8, ties: 0, nr: 1, points: 3, nrr: -1.892 },
  ];

  for (const pt of pointsData) {
    if (!createdUids.teams[pt.short]) continue;
    try {
      const entry = { title: `${pt.short} - Season 2025`, team: [{ uid: createdUids.teams[pt.short], _content_type_uid: "team" }], position: pt.position, matches_played: pt.played, wins: pt.wins, losses: pt.losses, ties: pt.ties, no_results: pt.nr, points: pt.points, net_run_rate: pt.nrr };
      const result = await makeRequest('POST', '/content_types/points_table/entries?locale=en-us', { entry });
      console.log(`  ✅ ${entry.title} (${result.entry.uid})`);
      await sleep(500);
    } catch (error) {
      console.log(`  ❌ ${pt.short}:`, error.error?.error_message || error);
    }
  }
}

async function main() {
  console.log('🏏 OCPL Contentstack Setup v2\n');
  console.log('='.repeat(50));

  await createContentTypes();
  await sleep(2000);
  await createEntries();

  console.log('\n' + '='.repeat(50));
  console.log('✅ Setup Complete!\n');
  console.log('Summary:');
  console.log(`  Venues: ${Object.keys(createdUids.venues).length}`);
  console.log(`  Teams: ${Object.keys(createdUids.teams).length}`);
  console.log(`  Players: ${Object.keys(createdUids.players).length}`);
  console.log(`  Matches: ${Object.keys(createdUids.matches).length}`);
  console.log(`  Articles: ${Object.keys(createdUids.articles).length}`);
  console.log('\nNext steps:');
  console.log('  1. Go to Contentstack and PUBLISH all entries');
  console.log('  2. Create a Delivery Token in Settings > Tokens');
  console.log('  3. Update your .env.local file');
  console.log('  4. Run: npm run dev');
}

main().catch(console.error);


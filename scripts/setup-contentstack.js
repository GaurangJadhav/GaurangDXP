/**
 * OCPL Contentstack Setup Script
 * 
 * This script creates all content types and entries for the OCPL website
 * Run with: node scripts/setup-contentstack.js
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

// ==================== CONTENT TYPE DEFINITIONS ====================

const contentTypes = [
  // 1. Venue (no dependencies)
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
        { display_name: "Venue Image", uid: "venue_image", data_type: "file", mandatory: false },
        { display_name: "Facilities", uid: "facilities", data_type: "text", mandatory: false, multiple: true },
        { display_name: "Description", uid: "description", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
      ],
      options: { is_page: false, singleton: false, title: "title" }
    }
  },
  // 2. Team (no dependencies initially)
  {
    content_type: {
      title: "Team",
      uid: "team",
      schema: [
        { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
        { display_name: "Team Name", uid: "team_name", data_type: "text", mandatory: true },
        { display_name: "Short Name", uid: "short_name", data_type: "text", mandatory: true },
        { display_name: "Team Logo", uid: "team_logo", data_type: "file", mandatory: false },
        { display_name: "Primary Color", uid: "primary_color", data_type: "text", mandatory: true },
        { display_name: "Secondary Color", uid: "secondary_color", data_type: "text", mandatory: false },
        { display_name: "Owner Name", uid: "owner_name", data_type: "text", mandatory: false },
        { display_name: "Home Ground", uid: "home_ground", data_type: "text", mandatory: false },
        { display_name: "Established Year", uid: "established_year", data_type: "number", mandatory: false },
        { display_name: "Team Motto", uid: "team_motto", data_type: "text", mandatory: false },
        { display_name: "Description", uid: "description", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
        {
          display_name: "Team Stats",
          uid: "stats",
          data_type: "group",
          schema: [
            { display_name: "Matches Played", uid: "matches_played", data_type: "number" },
            { display_name: "Wins", uid: "wins", data_type: "number" },
            { display_name: "Losses", uid: "losses", data_type: "number" },
            { display_name: "Ties", uid: "ties", data_type: "number" },
            { display_name: "Titles Won", uid: "titles_won", data_type: "number" },
          ]
        }
      ],
      options: { is_page: false, singleton: false, title: "title" }
    }
  },
  // 3. Player (references team)
  {
    content_type: {
      title: "Player",
      uid: "player",
      schema: [
        { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
        { display_name: "Player Name", uid: "player_name", data_type: "text", mandatory: true },
        { display_name: "Jersey Number", uid: "jersey_number", data_type: "number", mandatory: true },
        { display_name: "Profile Image", uid: "profile_image", data_type: "file", mandatory: false },
        { 
          display_name: "Role", 
          uid: "role", 
          data_type: "text", 
          mandatory: true,
          enum: { advanced: false, choices: [{ value: "Batsman" }, { value: "Bowler" }, { value: "All-Rounder" }, { value: "Wicket-Keeper" }] }
        },
        { 
          display_name: "Batting Style", 
          uid: "batting_style", 
          data_type: "text", 
          mandatory: true,
          enum: { advanced: false, choices: [{ value: "Right-Handed" }, { value: "Left-Handed" }] }
        },
        { 
          display_name: "Bowling Style", 
          uid: "bowling_style", 
          data_type: "text", 
          mandatory: false,
          enum: { advanced: false, choices: [
            { value: "Right-arm Fast" }, { value: "Right-arm Medium" }, { value: "Right-arm Off Spin" },
            { value: "Right-arm Leg Spin" }, { value: "Left-arm Fast" }, { value: "Left-arm Medium" },
            { value: "Left-arm Orthodox" }, { value: "N/A" }
          ]}
        },
        { display_name: "Team", uid: "team", data_type: "reference", reference_to: ["team"], mandatory: false },
        { display_name: "Age", uid: "age", data_type: "number", mandatory: false },
        { display_name: "Locality", uid: "locality", data_type: "text", mandatory: false },
        { display_name: "Occupation", uid: "occupation", data_type: "text", mandatory: false },
        { display_name: "Bio", uid: "bio", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
        { display_name: "Is Captain", uid: "is_captain", data_type: "boolean", mandatory: false },
        {
          display_name: "Player Stats",
          uid: "stats",
          data_type: "group",
          schema: [
            { display_name: "Matches", uid: "matches", data_type: "number" },
            { display_name: "Runs", uid: "runs", data_type: "number" },
            { display_name: "Highest Score", uid: "highest_score", data_type: "number" },
            { display_name: "Batting Average", uid: "batting_average", data_type: "number" },
            { display_name: "Strike Rate", uid: "strike_rate", data_type: "number" },
            { display_name: "Fifties", uid: "fifties", data_type: "number" },
            { display_name: "Hundreds", uid: "hundreds", data_type: "number" },
            { display_name: "Wickets", uid: "wickets", data_type: "number" },
            { display_name: "Best Bowling", uid: "best_bowling", data_type: "text" },
            { display_name: "Bowling Average", uid: "bowling_average", data_type: "number" },
            { display_name: "Economy", uid: "economy", data_type: "number" },
            { display_name: "Catches", uid: "catches", data_type: "number" },
          ]
        }
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
        { display_name: "Champion Team", uid: "champion_team", data_type: "reference", reference_to: ["team"], mandatory: false },
        { display_name: "Runner Up", uid: "runner_up", data_type: "reference", reference_to: ["team"], mandatory: false },
        { display_name: "Orange Cap", uid: "orange_cap", data_type: "reference", reference_to: ["player"], mandatory: false },
        { display_name: "Purple Cap", uid: "purple_cap", data_type: "reference", reference_to: ["player"], mandatory: false },
        {
          display_name: "Season Stats",
          uid: "season_stats",
          data_type: "group",
          schema: [
            { display_name: "Total Matches", uid: "total_matches", data_type: "number" },
            { display_name: "Total Runs", uid: "total_runs", data_type: "number" },
            { display_name: "Total Wickets", uid: "total_wickets", data_type: "number" },
          ]
        }
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
        { display_name: "Team 1", uid: "team_1", data_type: "reference", reference_to: ["team"], mandatory: true },
        { display_name: "Team 2", uid: "team_2", data_type: "reference", reference_to: ["team"], mandatory: true },
        { display_name: "Toss Winner", uid: "toss_winner", data_type: "reference", reference_to: ["team"], mandatory: false },
        { 
          display_name: "Toss Decision", 
          uid: "toss_decision", 
          data_type: "text", 
          mandatory: false,
          enum: { advanced: false, choices: [{ value: "Bat" }, { value: "Bowl" }] }
        },
        { 
          display_name: "Match Status", 
          uid: "match_status", 
          data_type: "text", 
          mandatory: true,
          enum: { advanced: false, choices: [{ value: "Upcoming" }, { value: "Live" }, { value: "Completed" }, { value: "Abandoned" }] }
        },
        { display_name: "Result", uid: "result", data_type: "text", mandatory: false },
        { display_name: "Man of the Match", uid: "man_of_the_match", data_type: "reference", reference_to: ["player"], mandatory: false },
        {
          display_name: "Scorecard",
          uid: "scorecard",
          data_type: "group",
          schema: [
            {
              display_name: "Team 1 Score",
              uid: "team_1_score",
              data_type: "group",
              schema: [
                { display_name: "Runs", uid: "runs", data_type: "number" },
                { display_name: "Wickets", uid: "wickets", data_type: "number" },
                { display_name: "Overs", uid: "overs", data_type: "number" },
              ]
            },
            {
              display_name: "Team 2 Score",
              uid: "team_2_score",
              data_type: "group",
              schema: [
                { display_name: "Runs", uid: "runs", data_type: "number" },
                { display_name: "Wickets", uid: "wickets", data_type: "number" },
                { display_name: "Overs", uid: "overs", data_type: "number" },
              ]
            }
          ]
        },
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
        { display_name: "Team", uid: "team", data_type: "reference", reference_to: ["team"], mandatory: true },
        { display_name: "Season", uid: "season", data_type: "reference", reference_to: ["season"], mandatory: false },
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
        { display_name: "Featured Image", uid: "featured_image", data_type: "file", mandatory: false },
        { display_name: "Excerpt", uid: "excerpt", data_type: "text", mandatory: true, field_metadata: { multiline: true } },
        { display_name: "Content", uid: "content", data_type: "text", mandatory: true, field_metadata: { multiline: true } },
        { display_name: "Author", uid: "author", data_type: "text", mandatory: true },
        { display_name: "Publish Date", uid: "publish_date", data_type: "isodate", mandatory: true },
        { 
          display_name: "Category", 
          uid: "category", 
          data_type: "text", 
          mandatory: true,
          enum: { advanced: false, choices: [
            { value: "Match Report" }, { value: "News" }, { value: "Interview" }, { value: "Feature" }, { value: "Announcement" }
          ]}
        },
        { display_name: "Tags", uid: "tags", data_type: "text", mandatory: false, multiple: true },
        { display_name: "Related Team", uid: "related_team", data_type: "reference", reference_to: ["team"], mandatory: false },
        { display_name: "Related Match", uid: "related_match", data_type: "reference", reference_to: ["match"], mandatory: false },
      ],
      options: { is_page: true, singleton: false, title: "title", url_pattern: "/news/:slug" }
    }
  },
  // 8. Homepage
  {
    content_type: {
      title: "Homepage",
      uid: "homepage",
      schema: [
        { display_name: "Title", uid: "title", data_type: "text", mandatory: true },
        {
          display_name: "Hero Section",
          uid: "hero_section",
          data_type: "group",
          schema: [
            { display_name: "Headline", uid: "headline", data_type: "text", mandatory: true },
            { display_name: "Subheadline", uid: "subheadline", data_type: "text", mandatory: false },
            { display_name: "Background Image", uid: "background_image", data_type: "file", mandatory: false },
            { display_name: "CTA Text", uid: "cta_text", data_type: "text", mandatory: false },
            { display_name: "CTA Link", uid: "cta_link", data_type: "text", mandatory: false },
            { display_name: "Countdown Date", uid: "countdown_date", data_type: "isodate", mandatory: false },
          ]
        },
        { display_name: "Featured Matches", uid: "featured_matches", data_type: "reference", reference_to: ["match"], mandatory: false, multiple: true },
        { display_name: "Featured Teams", uid: "featured_teams", data_type: "reference", reference_to: ["team"], mandatory: false, multiple: true },
        { display_name: "Latest News", uid: "latest_news", data_type: "reference", reference_to: ["article"], mandatory: false, multiple: true },
        {
          display_name: "Sponsors",
          uid: "sponsors",
          data_type: "group",
          multiple: true,
          schema: [
            { display_name: "Name", uid: "name", data_type: "text", mandatory: true },
            { display_name: "Logo", uid: "logo", data_type: "file", mandatory: false },
            { 
              display_name: "Tier", 
              uid: "tier", 
              data_type: "text", 
              mandatory: true,
              enum: { advanced: false, choices: [{ value: "Title" }, { value: "Associate" }, { value: "Official" }] }
            },
            { display_name: "Website", uid: "website", data_type: "text", mandatory: false },
          ]
        },
      ],
      options: { is_page: true, singleton: true, title: "title", url_pattern: "/" }
    }
  },
];

// ==================== ENTRY DATA ====================

const venueEntries = [
  {
    entry: {
      title: "Vasai Sports Ground",
      venue_name: "Vasai Sports Ground",
      location: "Near Vasai Railway Station, Vasai West",
      city: "Vasai",
      capacity: 2000,
      facilities: ["Floodlights", "Pavilion", "Scoreboard", "Seating Gallery", "Refreshment Stalls", "Parking"],
      description: "The Vasai Sports Ground is the premier cricket venue in Vasai and the home ground for both Vasai Warriors and Vasai Kings."
    }
  },
  {
    entry: {
      title: "Virar Stadium",
      venue_name: "Virar Stadium",
      location: "Virar West, Near ST Bus Stand",
      city: "Virar",
      capacity: 1500,
      facilities: ["Floodlights", "Pavilion", "Digital Scoreboard", "Seating Gallery", "Canteen"],
      description: "Virar Stadium is the home ground of Virar Titans. Known for its true bounce and carry."
    }
  },
  {
    entry: {
      title: "Nalasopara Cricket Ground",
      venue_name: "Nalasopara Cricket Ground",
      location: "Nalasopara West, Near Railway Station",
      city: "Nalasopara",
      capacity: 1200,
      facilities: ["Pavilion", "Scoreboard", "Seating Area", "Refreshments"],
      description: "The Nalasopara Cricket Ground is the home venue for Nalasopara Knights."
    }
  },
];

const teamEntries = [
  {
    entry: {
      title: "Vasai Warriors",
      team_name: "Vasai Warriors",
      short_name: "VW",
      primary_color: "#e87425",
      secondary_color: "#d95a1b",
      owner_name: "Rajesh Patil",
      home_ground: "Vasai Sports Ground",
      established_year: 2021,
      team_motto: "Warriors Never Give Up!",
      description: "The most successful team in OCPL history with 2 championship titles.",
      stats: { matches_played: 45, wins: 32, losses: 11, ties: 1, titles_won: 2 }
    }
  },
  {
    entry: {
      title: "Nalasopara Knights",
      team_name: "Nalasopara Knights",
      short_name: "NK",
      primary_color: "#3b82f6",
      secondary_color: "#2563eb",
      owner_name: "Suresh Sharma",
      home_ground: "Nalasopara Cricket Ground",
      established_year: 2021,
      team_motto: "Rise of the Knights",
      description: "Known for disciplined bowling attack and tactical approach.",
      stats: { matches_played: 45, wins: 28, losses: 15, ties: 1, titles_won: 1 }
    }
  },
  {
    entry: {
      title: "Virar Titans",
      team_name: "Virar Titans",
      short_name: "VT",
      primary_color: "#22c55e",
      secondary_color: "#16a34a",
      owner_name: "Amit Deshmukh",
      home_ground: "Virar Stadium",
      established_year: 2021,
      team_motto: "Titans Rise Together",
      description: "Powerhouse known for explosive batting and pace bowling.",
      stats: { matches_played: 45, wins: 25, losses: 18, ties: 0, titles_won: 1 }
    }
  },
  {
    entry: {
      title: "Nallasopara Strikers",
      team_name: "Nallasopara Strikers",
      short_name: "NS",
      primary_color: "#a855f7",
      secondary_color: "#9333ea",
      owner_name: "Priya Mehta",
      home_ground: "Nallasopara Sports Complex",
      established_year: 2022,
      team_motto: "Strike Hard, Strike Fast",
      description: "Young team known for fearless cricket and exciting players.",
      stats: { matches_played: 35, wins: 18, losses: 15, ties: 1, titles_won: 0 }
    }
  },
  {
    entry: {
      title: "Vasai Kings",
      team_name: "Vasai Kings",
      short_name: "VK",
      primary_color: "#facc15",
      secondary_color: "#eab308",
      owner_name: "Vikram Singh",
      home_ground: "Vasai Sports Ground",
      established_year: 2021,
      team_motto: "Crown the Kings",
      description: "The royal franchise with star-studded lineup.",
      stats: { matches_played: 45, wins: 22, losses: 21, ties: 1, titles_won: 1 }
    }
  },
  {
    entry: {
      title: "Palghar Panthers",
      team_name: "Palghar Panthers",
      short_name: "PP",
      primary_color: "#ef4444",
      secondary_color: "#dc2626",
      owner_name: "Ravi Kumar",
      home_ground: "Palghar District Ground",
      established_year: 2023,
      team_motto: "Unleash the Panther",
      description: "Newest addition bringing fresh energy from Palghar district.",
      stats: { matches_played: 20, wins: 8, losses: 11, ties: 0, titles_won: 0 }
    }
  },
];

// Store created UIDs for references
const createdUids = {
  venues: {},
  teams: {},
  players: {},
  seasons: {},
  matches: {},
  articles: {},
};

// ==================== MAIN SETUP FUNCTION ====================

async function setup() {
  console.log('🏏 OCPL Contentstack Setup\n');
  console.log('='.repeat(50));

  try {
    // Step 1: Create Content Types
    console.log('\n📋 Step 1: Creating Content Types...\n');
    
    for (const ct of contentTypes) {
      try {
        console.log(`  Creating: ${ct.content_type.title}...`);
        await makeRequest('POST', '/content_types', ct);
        console.log(`  ✅ Created: ${ct.content_type.title}`);
        await sleep(1000); // Rate limiting
      } catch (error) {
        if (error.error && error.error.error_code === 115) {
          console.log(`  ⚠️  Already exists: ${ct.content_type.title}`);
        } else {
          console.log(`  ❌ Error creating ${ct.content_type.title}:`, error.error?.error_message || error);
        }
      }
    }

    // Step 2: Create Venues
    console.log('\n🏟️  Step 2: Creating Venues...\n');
    
    for (const venue of venueEntries) {
      try {
        console.log(`  Creating: ${venue.entry.title}...`);
        const result = await makeRequest('POST', '/content_types/venue/entries?locale=en-us', venue);
        createdUids.venues[venue.entry.title] = result.entry.uid;
        console.log(`  ✅ Created: ${venue.entry.title} (${result.entry.uid})`);
        await sleep(500);
      } catch (error) {
        console.log(`  ❌ Error:`, error.error?.error_message || error);
      }
    }

    // Step 3: Create Teams
    console.log('\n🏆 Step 3: Creating Teams...\n');
    
    for (const team of teamEntries) {
      try {
        console.log(`  Creating: ${team.entry.title}...`);
        const result = await makeRequest('POST', '/content_types/team/entries?locale=en-us', team);
        createdUids.teams[team.entry.short_name] = result.entry.uid;
        console.log(`  ✅ Created: ${team.entry.title} (${result.entry.uid})`);
        await sleep(500);
      } catch (error) {
        console.log(`  ❌ Error:`, error.error?.error_message || error);
      }
    }

    // Step 4: Create Players
    console.log('\n👤 Step 4: Creating Players...\n');
    
    const playerEntries = [
      {
        entry: {
          title: "Rahul Patil",
          player_name: "Rahul Patil",
          jersey_number: 7,
          role: "Batsman",
          batting_style: "Right-Handed",
          bowling_style: "Right-arm Off Spin",
          team: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
          age: 28,
          locality: "Vasai West",
          occupation: "Software Engineer",
          bio: "Captain and star batsman of Vasai Warriors. Known for elegant stroke play.",
          is_captain: true,
          stats: { matches: 45, runs: 1850, highest_score: 102, batting_average: 48.68, strike_rate: 142.5, fifties: 15, hundreds: 2, wickets: 12, best_bowling: "2/18", bowling_average: 28.5, economy: 7.2, catches: 22 }
        }
      },
      {
        entry: {
          title: "Amit Sharma",
          player_name: "Amit Sharma",
          jersey_number: 11,
          role: "Bowler",
          batting_style: "Right-Handed",
          bowling_style: "Right-arm Fast",
          team: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
          age: 25,
          locality: "Vasai East",
          occupation: "Gym Trainer",
          bio: "Spearhead of the Warriors bowling attack with express pace.",
          is_captain: false,
          stats: { matches: 40, runs: 180, highest_score: 25, batting_average: 9.0, strike_rate: 110.0, fifties: 0, hundreds: 0, wickets: 68, best_bowling: "5/22", bowling_average: 18.2, economy: 6.8, catches: 8 }
        }
      },
      {
        entry: {
          title: "Suresh Kumar",
          player_name: "Suresh Kumar",
          jersey_number: 23,
          role: "All-Rounder",
          batting_style: "Left-Handed",
          bowling_style: "Left-arm Orthodox",
          team: createdUids.teams["NK"] ? [{ uid: createdUids.teams["NK"], _content_type_uid: "team" }] : undefined,
          age: 30,
          locality: "Nalasopara West",
          occupation: "Business Owner",
          bio: "Captain and heart of Nalasopara Knights. Genuine all-rounder.",
          is_captain: true,
          stats: { matches: 42, runs: 1120, highest_score: 78, batting_average: 32.0, strike_rate: 128.5, fifties: 8, hundreds: 0, wickets: 45, best_bowling: "4/28", bowling_average: 22.5, economy: 7.0, catches: 18 }
        }
      },
      {
        entry: {
          title: "Vikram Desai",
          player_name: "Vikram Desai",
          jersey_number: 45,
          role: "Wicket-Keeper",
          batting_style: "Right-Handed",
          bowling_style: "N/A",
          team: createdUids.teams["VT"] ? [{ uid: createdUids.teams["VT"], _content_type_uid: "team" }] : undefined,
          age: 26,
          locality: "Virar West",
          occupation: "Bank Employee",
          bio: "Wicketkeeper-batsman for Virar Titans with lightning-quick reflexes.",
          is_captain: false,
          stats: { matches: 38, runs: 920, highest_score: 85, batting_average: 28.75, strike_rate: 145.2, fifties: 6, hundreds: 0, wickets: 0, best_bowling: "-", bowling_average: 0, economy: 0, catches: 35 }
        }
      },
      {
        entry: {
          title: "Pradeep Singh",
          player_name: "Pradeep Singh",
          jersey_number: 18,
          role: "Batsman",
          batting_style: "Right-Handed",
          bowling_style: "Right-arm Medium",
          team: createdUids.teams["VT"] ? [{ uid: createdUids.teams["VT"], _content_type_uid: "team" }] : undefined,
          age: 32,
          locality: "Virar East",
          occupation: "Teacher",
          bio: "Captain of Virar Titans. Known for playing crucial innings under pressure.",
          is_captain: true,
          stats: { matches: 44, runs: 1450, highest_score: 95, batting_average: 38.15, strike_rate: 132.0, fifties: 12, hundreds: 0, wickets: 8, best_bowling: "2/15", bowling_average: 32.0, economy: 7.5, catches: 15 }
        }
      },
      {
        entry: {
          title: "Mahesh Patil",
          player_name: "Mahesh Patil",
          jersey_number: 33,
          role: "Batsman",
          batting_style: "Left-Handed",
          bowling_style: "N/A",
          team: createdUids.teams["VK"] ? [{ uid: createdUids.teams["VK"], _content_type_uid: "team" }] : undefined,
          age: 29,
          locality: "Vasai Road",
          occupation: "Businessman",
          bio: "Stylish left-hander who captains Vasai Kings. Known for elegant cover drives.",
          is_captain: true,
          stats: { matches: 43, runs: 1580, highest_score: 98, batting_average: 42.7, strike_rate: 140.5, fifties: 14, hundreds: 0, wickets: 0, best_bowling: "-", bowling_average: 0, economy: 0, catches: 20 }
        }
      },
    ];

    for (const player of playerEntries) {
      try {
        // Remove team reference if undefined
        if (!player.entry.team) {
          delete player.entry.team;
        }
        console.log(`  Creating: ${player.entry.title}...`);
        const result = await makeRequest('POST', '/content_types/player/entries?locale=en-us', player);
        createdUids.players[player.entry.title] = result.entry.uid;
        console.log(`  ✅ Created: ${player.entry.title} (${result.entry.uid})`);
        await sleep(500);
      } catch (error) {
        console.log(`  ❌ Error:`, error.error?.error_message || error);
      }
    }

    // Step 5: Create Season
    console.log('\n📅 Step 5: Creating Season...\n');
    
    const seasonEntry = {
      entry: {
        title: "OCPL 2025",
        season_name: "OCPL 2025",
        year: 2025,
        start_date: "2025-12-01",
        end_date: "2025-01-15",
        season_stats: { total_matches: 30, total_runs: 8500, total_wickets: 320 }
      }
    };

    try {
      console.log(`  Creating: ${seasonEntry.entry.title}...`);
      const result = await makeRequest('POST', '/content_types/season/entries?locale=en-us', seasonEntry);
      createdUids.seasons["2025"] = result.entry.uid;
      console.log(`  ✅ Created: ${seasonEntry.entry.title} (${result.entry.uid})`);
    } catch (error) {
      console.log(`  ❌ Error:`, error.error?.error_message || error);
    }

    // Step 6: Create Matches
    console.log('\n🏏 Step 6: Creating Matches...\n');
    
    const matchEntries = [
      {
        entry: {
          title: "Match 1: VW vs NK",
          match_number: 1,
          match_date: "2025-12-01",
          match_time: "4:00 PM",
          venue: createdUids.venues["Vasai Sports Ground"] ? [{ uid: createdUids.venues["Vasai Sports Ground"], _content_type_uid: "venue" }] : undefined,
          team_1: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
          team_2: createdUids.teams["NK"] ? [{ uid: createdUids.teams["NK"], _content_type_uid: "team" }] : undefined,
          toss_winner: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
          toss_decision: "Bat",
          match_status: "Completed",
          result: "Vasai Warriors won by 25 runs",
          man_of_the_match: createdUids.players["Rahul Patil"] ? [{ uid: createdUids.players["Rahul Patil"], _content_type_uid: "player" }] : undefined,
          scorecard: {
            team_1_score: { runs: 185, wickets: 6, overs: 20 },
            team_2_score: { runs: 160, wickets: 8, overs: 20 }
          },
          match_report: "In the opening match of OCPL 2025, Vasai Warriors set the tone with a commanding victory."
        }
      },
      {
        entry: {
          title: "Match 2: VT vs NS",
          match_number: 2,
          match_date: "2025-12-02",
          match_time: "4:00 PM",
          venue: createdUids.venues["Virar Stadium"] ? [{ uid: createdUids.venues["Virar Stadium"], _content_type_uid: "venue" }] : undefined,
          team_1: createdUids.teams["VT"] ? [{ uid: createdUids.teams["VT"], _content_type_uid: "team" }] : undefined,
          team_2: createdUids.teams["NS"] ? [{ uid: createdUids.teams["NS"], _content_type_uid: "team" }] : undefined,
          match_status: "Completed",
          result: "Virar Titans won by 5 wickets",
          scorecard: {
            team_1_score: { runs: 145, wickets: 9, overs: 20 },
            team_2_score: { runs: 148, wickets: 5, overs: 18 }
          },
          match_report: "Virar Titans chased down a modest target with Vikram Desai playing a crucial knock."
        }
      },
      {
        entry: {
          title: "Match 15: VW vs NK (Upcoming)",
          match_number: 15,
          match_date: "2025-12-20",
          match_time: "4:00 PM",
          venue: createdUids.venues["Vasai Sports Ground"] ? [{ uid: createdUids.venues["Vasai Sports Ground"], _content_type_uid: "venue" }] : undefined,
          team_1: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
          team_2: createdUids.teams["NK"] ? [{ uid: createdUids.teams["NK"], _content_type_uid: "team" }] : undefined,
          match_status: "Upcoming",
          scorecard: {
            team_1_score: { runs: 0, wickets: 0, overs: 0 },
            team_2_score: { runs: 0, wickets: 0, overs: 0 }
          }
        }
      },
    ];

    for (const match of matchEntries) {
      try {
        // Clean undefined references
        Object.keys(match.entry).forEach(key => {
          if (match.entry[key] === undefined) delete match.entry[key];
        });
        console.log(`  Creating: ${match.entry.title}...`);
        const result = await makeRequest('POST', '/content_types/match/entries?locale=en-us', match);
        createdUids.matches[match.entry.title] = result.entry.uid;
        console.log(`  ✅ Created: ${match.entry.title} (${result.entry.uid})`);
        await sleep(500);
      } catch (error) {
        console.log(`  ❌ Error:`, error.error?.error_message || error);
      }
    }

    // Step 7: Create Articles
    console.log('\n📰 Step 7: Creating Articles...\n');
    
    const articleEntries = [
      {
        entry: {
          title: "Vasai Warriors clinch thriller against Nalasopara Knights",
          slug: "vasai-warriors-thriller-match-1",
          excerpt: "In a nail-biting finish, Vasai Warriors secured victory in the last over. Captain Rahul Patil's brilliant 78 set up the win.",
          content: "In the opening match of OCPL 2025, Vasai Warriors set the tone with a commanding victory. Captain Rahul Patil led from the front with a brilliant 78 off 52 balls. The Knights' chase never got going as Amit Sharma picked up 3 crucial wickets upfront. This win puts the Warriors in a strong position early in the season.",
          author: "OCPL Media",
          publish_date: "2025-12-01",
          category: "Match Report",
          tags: ["Vasai Warriors", "Nalasopara Knights", "Match 1"],
          related_team: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
        }
      },
      {
        entry: {
          title: "OCPL 2025 Season kicks off with grand ceremony",
          slug: "ocpl-2025-opening-ceremony",
          excerpt: "The fifth edition of Only Cricket League began with a spectacular opening ceremony at Vasai Sports Ground.",
          content: "The fifth edition of Only Cricket League began with a spectacular opening ceremony at Vasai Sports Ground. All six teams were introduced to the cheering crowd. The ceremony featured cultural performances, fireworks, and the unveiling of the OCPL 2025 trophy. Chief Guest welcomed all teams and wished them the best for the season.",
          author: "OCPL Media",
          publish_date: "2025-12-01",
          category: "News",
          tags: ["Opening Ceremony", "Season 5", "OCPL 2025"],
        }
      },
      {
        entry: {
          title: "Rising star Rahul Patil continues his brilliant form",
          slug: "rahul-patil-brilliant-form",
          excerpt: "Young talent from Vasai West continues to make heads turn with consistent performances.",
          content: "Rahul Patil, the captain of Vasai Warriors, has been in scintillating form this season. His ability to anchor innings while maintaining a high strike rate makes him one of the most valuable players in OCPL. In the opening match, he scored a match-winning 78 that set the tone for the season.",
          author: "Sports Desk",
          publish_date: "2025-12-02",
          category: "Feature",
          tags: ["Rahul Patil", "Vasai Warriors", "Top Scorer"],
          related_team: createdUids.teams["VW"] ? [{ uid: createdUids.teams["VW"], _content_type_uid: "team" }] : undefined,
        }
      },
    ];

    for (const article of articleEntries) {
      try {
        // Clean undefined references
        Object.keys(article.entry).forEach(key => {
          if (article.entry[key] === undefined) delete article.entry[key];
        });
        console.log(`  Creating: ${article.entry.title.substring(0, 40)}...`);
        const result = await makeRequest('POST', '/content_types/article/entries?locale=en-us', article);
        createdUids.articles[article.entry.slug] = result.entry.uid;
        console.log(`  ✅ Created: ${article.entry.title.substring(0, 40)}... (${result.entry.uid})`);
        await sleep(500);
      } catch (error) {
        console.log(`  ❌ Error:`, error.error?.error_message || error);
      }
    }

    // Step 8: Create Homepage
    console.log('\n🏠 Step 8: Creating Homepage...\n');
    
    const homepageEntry = {
      entry: {
        title: "OCPL Homepage",
        hero_section: {
          headline: "OCPL 2025",
          subheadline: "Vasai's Premier Cricket League - Season 5",
          cta_text: "View Schedule",
          cta_link: "/matches",
          countdown_date: "2025-12-20"
        },
        sponsors: [
          { name: "Title Sponsor", tier: "Title", website: "https://example.com" },
          { name: "Associate Partner", tier: "Associate", website: "https://example.com" }
        ]
      }
    };

    try {
      console.log(`  Creating: Homepage...`);
      const result = await makeRequest('POST', '/content_types/homepage/entries?locale=en-us', homepageEntry);
      console.log(`  ✅ Created: Homepage (${result.entry.uid})`);
    } catch (error) {
      console.log(`  ❌ Error:`, error.error?.error_message || error);
    }

    // Step 9: Create Points Table entries
    console.log('\n📊 Step 9: Creating Points Table...\n');
    
    const pointsTableData = [
      { team: "VW", position: 1, played: 10, wins: 8, losses: 1, ties: 0, nr: 1, points: 17, nrr: 1.256 },
      { team: "NK", position: 2, played: 10, wins: 7, losses: 2, ties: 0, nr: 1, points: 15, nrr: 0.892 },
      { team: "VT", position: 3, played: 10, wins: 6, losses: 3, ties: 0, nr: 1, points: 13, nrr: 0.445 },
      { team: "VK", position: 4, played: 10, wins: 5, losses: 4, ties: 0, nr: 1, points: 11, nrr: 0.125 },
      { team: "NS", position: 5, played: 10, wins: 3, losses: 6, ties: 0, nr: 1, points: 7, nrr: -0.523 },
      { team: "PP", position: 6, played: 10, wins: 1, losses: 8, ties: 0, nr: 1, points: 3, nrr: -1.892 },
    ];

    for (const pt of pointsTableData) {
      if (!createdUids.teams[pt.team]) continue;
      
      const entry = {
        entry: {
          title: `${pt.team} - Season 2025`,
          team: [{ uid: createdUids.teams[pt.team], _content_type_uid: "team" }],
          position: pt.position,
          matches_played: pt.played,
          wins: pt.wins,
          losses: pt.losses,
          ties: pt.ties,
          no_results: pt.nr,
          points: pt.points,
          net_run_rate: pt.nrr,
        }
      };

      try {
        console.log(`  Creating: ${entry.entry.title}...`);
        await makeRequest('POST', '/content_types/points_table/entries?locale=en-us', entry);
        console.log(`  ✅ Created: ${entry.entry.title}`);
        await sleep(500);
      } catch (error) {
        console.log(`  ❌ Error:`, error.error?.error_message || error);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ OCPL Contentstack Setup Complete!\n');
    console.log('Created UIDs:');
    console.log('  Teams:', Object.keys(createdUids.teams).length);
    console.log('  Players:', Object.keys(createdUids.players).length);
    console.log('  Venues:', Object.keys(createdUids.venues).length);
    console.log('  Matches:', Object.keys(createdUids.matches).length);
    console.log('  Articles:', Object.keys(createdUids.articles).length);
    console.log('\nNext steps:');
    console.log('  1. Go to Contentstack and publish all entries');
    console.log('  2. Create a Delivery Token');
    console.log('  3. Update .env.local with your credentials');
    console.log('  4. Run: npm run dev');

  } catch (error) {
    console.error('Setup failed:', error);
  }
}

// Run setup
setup();


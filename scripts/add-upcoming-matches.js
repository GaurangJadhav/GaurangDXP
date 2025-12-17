/**
 * Add Upcoming Matches to Contentstack
 * Run with: node scripts/add-upcoming-matches.js
 */

const https = require("https");

const config = {
  api_key: "blt2a1a0df4ff6bc454",
  authtoken: "blte5c1f92ccc96f8a3",
};

// Team UIDs
const teams = {
  FC: "blt5268708d1c13318c", // Flame Chargers
  SS: "blt42334b12b7abd6dc", // Storm Surfers
  WW: "bltfb585a18e23cf737", // Windstorm Warriors
  ET: "blt9f2a46f0057ff4c2", // Earth Titans
  TS: "blt15a9111fb0bcd13c", // Thunder Strikers
  GG: "blt55e0a24a0ef0d6ff", // Glacier Gladiators
};

// Venue UIDs
const venues = {
  vasai: "bltc5a45681d36999a6",    // Vasai Sports Ground
  virar: "blt1143d90b036d81dc",    // Virar Stadium
  nalasopara: "blt5f1197781d5830df", // Nalasopara Cricket Ground
};

// Upcoming matches to create
const upcomingMatches = [
  {
    match_number: 16,
    title: "Match 16: FC vs SS",
    team_1: teams.FC,
    team_2: teams.SS,
    venue: venues.vasai,
    match_date: "2025-12-20",
    match_time: "4:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 17,
    title: "Match 17: WW vs ET",
    team_1: teams.WW,
    team_2: teams.ET,
    venue: venues.virar,
    match_date: "2025-12-21",
    match_time: "4:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 18,
    title: "Match 18: TS vs GG",
    team_1: teams.TS,
    team_2: teams.GG,
    venue: venues.nalasopara,
    match_date: "2025-12-22",
    match_time: "4:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 19,
    title: "Match 19: SS vs WW",
    team_1: teams.SS,
    team_2: teams.WW,
    venue: venues.vasai,
    match_date: "2025-12-23",
    match_time: "4:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 20,
    title: "Match 20: FC vs ET",
    team_1: teams.FC,
    team_2: teams.ET,
    venue: venues.virar,
    match_date: "2025-12-24",
    match_time: "4:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 21,
    title: "Match 21: GG vs SS - Semi Final 1",
    team_1: teams.GG,
    team_2: teams.SS,
    venue: venues.vasai,
    match_date: "2025-12-26",
    match_time: "2:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 22,
    title: "Match 22: FC vs TS - Semi Final 2",
    team_1: teams.FC,
    team_2: teams.TS,
    venue: venues.vasai,
    match_date: "2025-12-26",
    match_time: "6:00 PM",
    match_status: "Upcoming",
  },
  {
    match_number: 23,
    title: "Match 23: Final",
    team_1: teams.FC,
    team_2: teams.SS,
    venue: venues.vasai,
    match_date: "2025-12-28",
    match_time: "4:00 PM",
    match_status: "Upcoming",
  },
];

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.contentstack.io",
      port: 443,
      path: path,
      method: method,
      headers: {
        api_key: config.api_key,
        authtoken: config.authtoken,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function createMatch(match) {
  const entry = {
    entry: {
      title: match.title,
      match_number: match.match_number,
      match_date: match.match_date,
      match_time: match.match_time,
      match_status: match.match_status,
      team_1: [{ uid: match.team_1, _content_type_uid: "team" }],
      team_2: [{ uid: match.team_2, _content_type_uid: "team" }],
      venue: [{ uid: match.venue, _content_type_uid: "venue" }],
    },
  };

  const result = await makeRequest("POST", "/v3/content_types/match/entries", entry);
  return result;
}

async function publishEntry(entryUid) {
  const publishData = {
    entry: {
      environments: ["production"],
      locales: ["en-us"],
    },
  };

  const result = await makeRequest(
    "POST",
    `/v3/content_types/match/entries/${entryUid}/publish`,
    publishData
  );
  return result;
}

async function updateExistingMatch(entryUid, match) {
  const entry = {
    entry: {
      title: match.title,
      match_number: match.match_number,
      match_date: match.match_date,
      match_time: match.match_time,
      match_status: match.match_status,
      team_1: [{ uid: match.team_1, _content_type_uid: "team" }],
      team_2: [{ uid: match.team_2, _content_type_uid: "team" }],
      venue: [{ uid: match.venue, _content_type_uid: "venue" }],
    },
  };

  const result = await makeRequest("PUT", `/v3/content_types/match/entries/${entryUid}`, entry);
  return result;
}

async function main() {
  console.log("=".repeat(60));
  console.log("ADDING UPCOMING MATCHES TO CONTENTSTACK");
  console.log("=".repeat(60));
  console.log("");

  // First, get existing matches to avoid duplicates
  const existingResult = await makeRequest("GET", "/v3/content_types/match/entries");
  const existingMatches = existingResult.data.entries || [];
  const existingMatchNumbers = new Set(existingMatches.map((m) => m.match_number));

  console.log(`Found ${existingMatches.length} existing matches\n`);

  // Update existing Match 15 with proper team references
  const match15 = existingMatches.find((m) => m.match_number === 15);
  if (match15) {
    console.log("📝 Updating Match 15 with team references...");
    const updateResult = await updateExistingMatch(match15.uid, {
      title: "Match 15: FC vs SS",
      match_number: 15,
      match_date: "2025-12-20",
      match_time: "4:00 PM",
      match_status: "Upcoming",
      team_1: teams.FC,
      team_2: teams.SS,
      venue: venues.vasai,
    });
    
    if (updateResult.status === 200) {
      console.log("   ✅ Updated successfully");
      // Publish the updated entry
      const publishResult = await publishEntry(match15.uid);
      console.log(`   ${publishResult.status === 200 ? "✅" : "⚠️"} Published`);
    } else {
      console.log(`   ❌ Error: ${updateResult.data.error_message || "Unknown error"}`);
    }
  }

  console.log("");

  // Create new matches
  for (const match of upcomingMatches) {
    if (existingMatchNumbers.has(match.match_number)) {
      console.log(`⏭️ Match ${match.match_number} already exists, skipping...`);
      continue;
    }

    console.log(`📝 Creating ${match.title}...`);
    const result = await createMatch(match);

    if (result.status === 201) {
      console.log(`   ✅ Created successfully`);
      
      // Publish the entry
      const entryUid = result.data.entry.uid;
      const publishResult = await publishEntry(entryUid);
      console.log(`   ${publishResult.status === 200 ? "✅" : "⚠️"} Published`);
    } else {
      console.log(`   ❌ Error: ${result.data.error_message || "Unknown error"}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("DONE!");
  console.log("=".repeat(60));
}

main().catch(console.error);


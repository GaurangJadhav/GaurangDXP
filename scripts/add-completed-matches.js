/**
 * Add Completed Matches to Contentstack
 * Run with: node scripts/add-completed-matches.js
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

// Completed matches to create (using schema fields: team_1_runs, team_1_wickets, team_1_overs as numbers)
const completedMatches = [
  {
    match_number: 1,
    title: "Match 1: FC vs SS - Opening Match",
    team_1: teams.FC,
    team_2: teams.SS,
    venue: venues.vasai,
    match_date: "2025-12-01",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 185, team_1_wickets: 6, team_1_overs: 20,
    team_2_runs: 160, team_2_wickets: 8, team_2_overs: 20,
    result: "Flame Chargers won by 25 runs",
    man_of_the_match: "Rahul Patil (FC)",
  },
  {
    match_number: 2,
    title: "Match 2: WW vs ET",
    team_1: teams.WW,
    team_2: teams.ET,
    venue: venues.virar,
    match_date: "2025-12-02",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 145, team_1_wickets: 9, team_1_overs: 20,
    team_2_runs: 148, team_2_wickets: 5, team_2_overs: 18.2,
    result: "Earth Titans won by 5 wickets",
    man_of_the_match: "Vikram Desai (ET)",
  },
  {
    match_number: 3,
    title: "Match 3: TS vs GG",
    team_1: teams.TS,
    team_2: teams.GG,
    venue: venues.vasai,
    match_date: "2025-12-03",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 192, team_1_wickets: 4, team_1_overs: 20,
    team_2_runs: 150, team_2_wickets: 10, team_2_overs: 18.4,
    result: "Thunder Strikers won by 42 runs",
    man_of_the_match: "Mahesh Patil (TS)",
  },
  {
    match_number: 4,
    title: "Match 4: SS vs WW",
    team_1: teams.SS,
    team_2: teams.WW,
    venue: venues.nalasopara,
    match_date: "2025-12-05",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 175, team_1_wickets: 7, team_1_overs: 20,
    team_2_runs: 172, team_2_wickets: 9, team_2_overs: 20,
    result: "Storm Surfers won by 3 runs",
    man_of_the_match: "Suresh Kumar (SS)",
  },
  {
    match_number: 5,
    title: "Match 5: FC vs ET",
    team_1: teams.FC,
    team_2: teams.ET,
    venue: venues.vasai,
    match_date: "2025-12-06",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 198, team_1_wickets: 5, team_1_overs: 20,
    team_2_runs: 165, team_2_wickets: 8, team_2_overs: 20,
    result: "Flame Chargers won by 33 runs",
    man_of_the_match: "Rahul Patil (FC)",
  },
  {
    match_number: 6,
    title: "Match 6: GG vs SS",
    team_1: teams.GG,
    team_2: teams.SS,
    venue: venues.virar,
    match_date: "2025-12-07",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 142, team_1_wickets: 10, team_1_overs: 19.2,
    team_2_runs: 143, team_2_wickets: 3, team_2_overs: 16.4,
    result: "Storm Surfers won by 7 wickets",
    man_of_the_match: "Anil More (SS)",
  },
  {
    match_number: 7,
    title: "Match 7: WW vs TS",
    team_1: teams.WW,
    team_2: teams.TS,
    venue: venues.nalasopara,
    match_date: "2025-12-08",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 168, team_1_wickets: 6, team_1_overs: 20,
    team_2_runs: 170, team_2_wickets: 4, team_2_overs: 19.1,
    result: "Thunder Strikers won by 6 wickets",
    man_of_the_match: "Mahesh Patil (TS)",
  },
  {
    match_number: 8,
    title: "Match 8: FC vs GG",
    team_1: teams.FC,
    team_2: teams.GG,
    venue: venues.vasai,
    match_date: "2025-12-09",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 210, team_1_wickets: 3, team_1_overs: 20,
    team_2_runs: 145, team_2_wickets: 10, team_2_overs: 17.3,
    result: "Flame Chargers won by 65 runs",
    man_of_the_match: "Amit Sharma (FC)",
  },
  {
    match_number: 9,
    title: "Match 9: ET vs SS",
    team_1: teams.ET,
    team_2: teams.SS,
    venue: venues.virar,
    match_date: "2025-12-10",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 155, team_1_wickets: 8, team_1_overs: 20,
    team_2_runs: 158, team_2_wickets: 5, team_2_overs: 18.5,
    result: "Storm Surfers won by 5 wickets",
    man_of_the_match: "Suresh Kumar (SS)",
  },
  {
    match_number: 10,
    title: "Match 10: TS vs FC",
    team_1: teams.TS,
    team_2: teams.FC,
    venue: venues.vasai,
    match_date: "2025-12-11",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 178, team_1_wickets: 7, team_1_overs: 20,
    team_2_runs: 182, team_2_wickets: 4, team_2_overs: 19.2,
    result: "Flame Chargers won by 6 wickets",
    man_of_the_match: "Rahul Patil (FC)",
  },
  {
    match_number: 11,
    title: "Match 11: WW vs GG",
    team_1: teams.WW,
    team_2: teams.GG,
    venue: venues.nalasopara,
    match_date: "2025-12-12",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 188, team_1_wickets: 5, team_1_overs: 20,
    team_2_runs: 152, team_2_wickets: 9, team_2_overs: 20,
    result: "Windstorm Warriors won by 36 runs",
    man_of_the_match: "Pradeep Singh (WW)",
  },
  {
    match_number: 12,
    title: "Match 12: SS vs TS",
    team_1: teams.SS,
    team_2: teams.TS,
    venue: venues.vasai,
    match_date: "2025-12-13",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 165, team_1_wickets: 7, team_1_overs: 20,
    team_2_runs: 162, team_2_wickets: 8, team_2_overs: 20,
    result: "Storm Surfers won by 3 runs",
    man_of_the_match: "Anil More (SS)",
  },
  {
    match_number: 13,
    title: "Match 13: ET vs WW",
    team_1: teams.ET,
    team_2: teams.WW,
    venue: venues.virar,
    match_date: "2025-12-14",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 148, team_1_wickets: 10, team_1_overs: 19.4,
    team_2_runs: 149, team_2_wickets: 2, team_2_overs: 15.3,
    result: "Windstorm Warriors won by 8 wickets",
    man_of_the_match: "Vikram Desai (WW)",
  },
  {
    match_number: 14,
    title: "Match 14: FC vs WW",
    team_1: teams.FC,
    team_2: teams.WW,
    venue: venues.vasai,
    match_date: "2025-12-15",
    match_time: "4:00 PM",
    match_status: "Completed",
    team_1_runs: 195, team_1_wickets: 4, team_1_overs: 20,
    team_2_runs: 178, team_2_wickets: 7, team_2_overs: 20,
    result: "Flame Chargers won by 17 runs",
    man_of_the_match: "Rahul Patil (FC)",
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
      team_1_runs: match.team_1_runs,
      team_1_wickets: match.team_1_wickets,
      team_1_overs: match.team_1_overs,
      team_2_runs: match.team_2_runs,
      team_2_wickets: match.team_2_wickets,
      team_2_overs: match.team_2_overs,
      result: match.result,
      man_of_the_match: match.man_of_the_match,
    },
  };

  const result = await makeRequest("POST", "/v3/content_types/match/entries", entry);
  return result;
}

async function updateMatch(entryUid, match) {
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
      team_1_runs: match.team_1_runs,
      team_1_wickets: match.team_1_wickets,
      team_1_overs: match.team_1_overs,
      team_2_runs: match.team_2_runs,
      team_2_wickets: match.team_2_wickets,
      team_2_overs: match.team_2_overs,
      result: match.result,
      man_of_the_match: match.man_of_the_match,
    },
  };

  const result = await makeRequest("PUT", `/v3/content_types/match/entries/${entryUid}`, entry);
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

async function main() {
  console.log("=".repeat(60));
  console.log("ADDING COMPLETED MATCHES TO CONTENTSTACK");
  console.log("=".repeat(60));
  console.log("");

  // First, get existing matches
  const existingResult = await makeRequest("GET", "/v3/content_types/match/entries");
  const existingMatches = existingResult.data.entries || [];
  const existingMatchMap = new Map();
  existingMatches.forEach((m) => existingMatchMap.set(m.match_number, m));

  console.log(`Found ${existingMatches.length} existing matches\n`);

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const match of completedMatches) {
    const existing = existingMatchMap.get(match.match_number);

    if (existing) {
      // Update existing match
      console.log(`📝 Updating Match ${match.match_number}...`);
      const result = await updateMatch(existing.uid, match);

      if (result.status === 200) {
        console.log(`   ✅ Updated`);
        await publishEntry(existing.uid);
        updated++;
      } else {
        console.log(`   ❌ Error: ${JSON.stringify(result.data.errors || result.data.error_message)}`);
        errors++;
      }
    } else {
      // Create new match
      console.log(`➕ Creating Match ${match.match_number}...`);
      const result = await createMatch(match);

      if (result.status === 201) {
        console.log(`   ✅ Created`);
        await publishEntry(result.data.entry.uid);
        created++;
      } else {
        console.log(`   ❌ Error: ${JSON.stringify(result.data.errors || result.data.error_message)}`);
        errors++;
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`DONE! Created: ${created}, Updated: ${updated}, Errors: ${errors}`);
  console.log("=".repeat(60));
}

main().catch(console.error);

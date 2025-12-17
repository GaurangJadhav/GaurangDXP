/**
 * Debug script to test Contentstack connection and data fetching
 * Run with: node scripts/debug-contentstack.js
 */

const Contentstack = require("contentstack");

// Configuration - Update these values
const config = {
  api_key: process.env.CONTENTSTACK_API_KEY || "blt2a1a0df4ff6bc454",
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || "", // ADD YOUR DELIVERY TOKEN HERE
  environment: process.env.CONTENTSTACK_ENVIRONMENT || "production",
  region: process.env.CONTENTSTACK_REGION || "us",
};

console.log("=".repeat(60));
console.log("CONTENTSTACK DEBUG SCRIPT");
console.log("=".repeat(60));
console.log("\n📋 Configuration:");
console.log(`   API Key: ${config.api_key}`);
console.log(`   Delivery Token: ${config.delivery_token ? config.delivery_token.substring(0, 10) + "..." : "❌ NOT SET"}`);
console.log(`   Environment: ${config.environment}`);
console.log(`   Region: ${config.region}`);
console.log("");

if (!config.delivery_token) {
  console.log("❌ ERROR: CONTENTSTACK_DELIVERY_TOKEN is not set!");
  console.log("");
  console.log("To fix this:");
  console.log("1. Go to Contentstack → Settings → Tokens → Delivery Tokens");
  console.log("2. Create a new delivery token for your environment");
  console.log("3. Either:");
  console.log("   a) Set the environment variable: export CONTENTSTACK_DELIVERY_TOKEN=your_token");
  console.log("   b) Or edit this script and add the token directly");
  console.log("");
  process.exit(1);
}

// Initialize Stack
const Stack = Contentstack.Stack({
  api_key: config.api_key,
  delivery_token: config.delivery_token,
  environment: config.environment,
  region: config.region === "eu" ? Contentstack.Region.EU : Contentstack.Region.US,
});

async function testConnection() {
  console.log("🔄 Testing Contentstack connection...\n");

  // Test 1: Fetch Teams
  console.log("1️⃣ Fetching Teams...");
  try {
    const teamsResult = await Stack.ContentType("team").Query().toJSON().find();
    const teams = teamsResult[0] || [];
    console.log(`   ✅ Found ${teams.length} teams`);
    if (teams.length > 0) {
      teams.forEach((team, i) => {
        console.log(`      ${i + 1}. ${team.team_name || team.title} (${team.short_name || "N/A"})`);
        console.log(`         - Logo: ${team.team_logo?.url ? "✅ Has logo" : "❌ No logo"}`);
        console.log(`         - Published: ${team._version ? "✅ Yes" : "❓ Unknown"}`);
      });
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.error_message || error.message}`);
    if (error.error_code === 109) {
      console.log("   💡 This usually means the API key or delivery token is invalid");
    }
  }

  console.log("");

  // Test 2: Fetch Points Table
  console.log("2️⃣ Fetching Points Table...");
  try {
    const ptResult = await Stack.ContentType("points_table")
      .Query()
      .includeReference(["team"])
      .toJSON()
      .find();
    const pointsTable = ptResult[0] || [];
    console.log(`   ✅ Found ${pointsTable.length} points table entries`);
    if (pointsTable.length > 0) {
      pointsTable.forEach((entry, i) => {
        const teamName = entry.team?.[0]?.team_name || "Unknown Team";
        console.log(`      ${i + 1}. Position ${entry.position}: ${teamName} - ${entry.points || 0} pts`);
      });
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.error_message || error.message}`);
  }

  console.log("");

  // Test 3: Fetch Matches
  console.log("3️⃣ Fetching Matches...");
  try {
    const matchesResult = await Stack.ContentType("match")
      .Query()
      .includeReference(["team_1", "team_2", "venue"])
      .toJSON()
      .find();
    const matches = matchesResult[0] || [];
    console.log(`   ✅ Found ${matches.length} matches`);
    if (matches.length > 0) {
      matches.slice(0, 3).forEach((match, i) => {
        const team1 = match.team_1?.[0]?.team_name || "TBD";
        const team2 = match.team_2?.[0]?.team_name || "TBD";
        console.log(`      ${i + 1}. Match ${match.match_number}: ${team1} vs ${team2} (${match.match_status || "Unknown"})`);
      });
      if (matches.length > 3) {
        console.log(`      ... and ${matches.length - 3} more matches`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.error_message || error.message}`);
  }

  console.log("");

  // Test 4: Check available content types
  console.log("4️⃣ Checking Content Types availability...");
  const contentTypes = ["team", "player", "match", "venue", "points_table", "article", "season"];
  
  for (const ct of contentTypes) {
    try {
      const result = await Stack.ContentType(ct).Query().limit(1).toJSON().find();
      const count = result[0]?.length || 0;
      console.log(`   ${count > 0 ? "✅" : "⚠️"} ${ct}: ${count > 0 ? "Has entries" : "No entries or doesn't exist"}`);
    } catch (error) {
      console.log(`   ❌ ${ct}: ${error.error_message || "Error fetching"}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("DEBUG COMPLETE");
  console.log("=".repeat(60));
  
  console.log("\n📝 Common Issues & Solutions:");
  console.log("");
  console.log("1. 'Stack not found' or 'API key not valid':");
  console.log("   → Check that the API key is correct");
  console.log("   → Ensure the delivery token belongs to this stack");
  console.log("");
  console.log("2. 'No entries found':");
  console.log("   → Make sure entries are PUBLISHED (not just saved as draft)");
  console.log("   → Check that the environment name matches");
  console.log("");
  console.log("3. 'Content type not found':");
  console.log("   → The content type might have a different UID");
  console.log("   → Check Contentstack dashboard for exact UIDs");
  console.log("");
  console.log("4. For Launch deployment:");
  console.log("   → Add these environment variables in Launch settings:");
  console.log("     CONTENTSTACK_API_KEY=blt2a1a0df4ff6bc454");
  console.log("     CONTENTSTACK_DELIVERY_TOKEN=<your-token>");
  console.log("     CONTENTSTACK_ENVIRONMENT=production");
  console.log("     CONTENTSTACK_REGION=us");
}

testConnection().catch(console.error);


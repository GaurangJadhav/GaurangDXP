/**
 * Check Stack information using Management API
 * Run with: node scripts/check-stack-info.js
 */

const https = require("https");

const config = {
  api_key: "blt2a1a0df4ff6bc454",
  authtoken: "blte5c1f92ccc96f8a3", // Management token
};

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.contentstack.io",
      port: 443,
      path: path,
      method: "GET",
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
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

async function checkStackInfo() {
  console.log("=".repeat(60));
  console.log("CONTENTSTACK STACK INFORMATION");
  console.log("=".repeat(60));
  console.log("");

  // 1. List Environments
  console.log("1️⃣ Environments in your stack:");
  try {
    const envResponse = await makeRequest("/v3/environments");
    if (envResponse.environments) {
      envResponse.environments.forEach((env, i) => {
        console.log(`   ${i + 1}. ${env.name} (UID: ${env.uid})`);
        console.log(`      - URLs: ${env.urls?.join(", ") || "N/A"}`);
      });
    } else {
      console.log("   ❌ Could not fetch environments:", envResponse.error_message || "Unknown error");
    }
  } catch (error) {
    console.log("   ❌ Error:", error.message);
  }

  console.log("");

  // 2. List Delivery Tokens
  console.log("2️⃣ Delivery Tokens:");
  try {
    const tokenResponse = await makeRequest("/v3/stacks/delivery_tokens");
    if (tokenResponse.tokens) {
      if (tokenResponse.tokens.length === 0) {
        console.log("   ⚠️ No delivery tokens found!");
        console.log("   → You need to create a delivery token in Contentstack");
        console.log("   → Go to Settings → Tokens → Delivery Tokens → + Add Token");
      } else {
        tokenResponse.tokens.forEach((token, i) => {
          console.log(`   ${i + 1}. ${token.name}`);
          console.log(`      - Token: ${token.token}`);
          console.log(`      - Environment: ${token.scope?.[0]?.environments?.[0]?.name || "All"}`);
          console.log(`      - Created: ${token.created_at}`);
        });
      }
    } else {
      console.log("   ❌ Could not fetch tokens:", tokenResponse.error_message || "Unknown error");
    }
  } catch (error) {
    console.log("   ❌ Error:", error.message);
  }

  console.log("");

  // 3. Check Content Types
  console.log("3️⃣ Content Types in your stack:");
  try {
    const ctResponse = await makeRequest("/v3/content_types");
    if (ctResponse.content_types) {
      ctResponse.content_types.forEach((ct, i) => {
        console.log(`   ${i + 1}. ${ct.title} (uid: ${ct.uid})`);
      });
    } else {
      console.log("   ❌ Could not fetch content types:", ctResponse.error_message || "Unknown error");
    }
  } catch (error) {
    console.log("   ❌ Error:", error.message);
  }

  console.log("");

  // 4. Check published entries count
  console.log("4️⃣ Published Entries per Content Type:");
  const contentTypes = ["team", "player", "match", "venue", "points_table"];
  
  for (const ct of contentTypes) {
    try {
      const response = await makeRequest(`/v3/content_types/${ct}/entries?include_publish_details=true`);
      if (response.entries) {
        const total = response.entries.length;
        const published = response.entries.filter(e => 
          e.publish_details && Object.keys(e.publish_details).length > 0
        ).length;
        console.log(`   ${ct}: ${published}/${total} published`);
        
        if (published === 0 && total > 0) {
          console.log(`      ⚠️ Entries exist but none are published!`);
        }
      }
    } catch (error) {
      console.log(`   ${ct}: Error - ${error.message}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`
For your website to show live data, you need:

1. ✅ A Delivery Token (check above if you have one)
2. ✅ Entries must be PUBLISHED to the environment
3. ✅ Environment variables set in Launch:
   
   CONTENTSTACK_API_KEY=blt2a1a0df4ff6bc454
   CONTENTSTACK_DELIVERY_TOKEN=<token from above>
   CONTENTSTACK_ENVIRONMENT=<environment name from above>
   CONTENTSTACK_REGION=us
`);
}

checkStackInfo().catch(console.error);


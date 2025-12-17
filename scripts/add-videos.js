/**
 * Add Video entries to Contentstack
 * Run with: node scripts/add-videos.js
 * 
 * IMPORTANT: Replace the placeholder YouTube IDs with your actual YouTube Short IDs
 * The YouTube Short ID is the part after /shorts/ in the URL
 * Example: youtube.com/shorts/ABC123xyz -> ID is "ABC123xyz"
 */

const https = require("https");

const config = {
  api_key: "blt2a1a0df4ff6bc454",
  authtoken: "blte5c1f92ccc96f8a3",
};

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

async function publishEntry(entryUid) {
  const publishData = {
    entry: {
      environments: ["production"],
      locales: ["en-us"],
    },
  };
  return makeRequest("POST", `/v3/content_types/video/entries/${entryUid}/publish`, publishData);
}

async function createVideo(video) {
  const entry = {
    entry: {
      title: video.title,
      description: video.description,
      youtube_video_id: video.youtube_video_id,
      video_type: video.video_type,
      category: video.category,
      publish_date: video.publish_date,
      views: video.views,
      duration: video.duration,
      is_featured: video.is_featured,
    },
  };

  const result = await makeRequest("POST", "/v3/content_types/video/entries", entry);
  return result;
}

async function main() {
  console.log("=".repeat(60));
  console.log("ADDING VIDEO ENTRIES TO CONTENTSTACK");
  console.log("=".repeat(60));
  console.log("");

  // ============================================================
  // UPDATE THESE VIDEO IDs WITH YOUR ACTUAL YOUTUBE SHORT IDs
  // ============================================================
  const videos = [
    {
      title: "Amazing Catch by Rahul Patil - Match 8",
      description: "Stunning one-handed catch at the boundary by Flame Chargers captain",
      youtube_video_id: "REPLACE_WITH_ACTUAL_ID_1", // <-- Replace this
      video_type: "Short",
      category: "Best Catches",
      publish_date: "2025-12-09",
      views: 15000,
      duration: 30,
      is_featured: true,
    },
    {
      title: "Monster Six by Mahesh Patil",
      description: "Huge six out of the ground by Thunder Strikers batsman",
      youtube_video_id: "REPLACE_WITH_ACTUAL_ID_2", // <-- Replace this
      video_type: "Short",
      category: "Best Sixes",
      publish_date: "2025-12-07",
      views: 12000,
      duration: 25,
      is_featured: true,
    },
    {
      title: "Hat-trick by Amit Sharma",
      description: "Three wickets in three balls - incredible bowling spell",
      youtube_video_id: "REPLACE_WITH_ACTUAL_ID_3", // <-- Replace this
      video_type: "Short",
      category: "Best Wickets",
      publish_date: "2025-12-05",
      views: 20000,
      duration: 45,
      is_featured: true,
    },
    {
      title: "OCPL 2025 Opening Ceremony Highlights",
      description: "Best moments from the grand opening ceremony",
      youtube_video_id: "REPLACE_WITH_ACTUAL_ID_4", // <-- Replace this
      video_type: "Highlight",
      category: "Ceremony",
      publish_date: "2025-12-01",
      views: 25000,
      duration: 120,
      is_featured: false,
    },
    {
      title: "Match 1 Final Over Thriller",
      description: "Nail-biting last over as Flame Chargers clinch victory",
      youtube_video_id: "REPLACE_WITH_ACTUAL_ID_5", // <-- Replace this
      video_type: "Highlight",
      category: "Match Highlights",
      publish_date: "2025-12-01",
      views: 18000,
      duration: 90,
      is_featured: true,
    },
    {
      title: "Run Out of the Season",
      description: "Lightning quick throw by Storm Surfers fielder",
      youtube_video_id: "REPLACE_WITH_ACTUAL_ID_6", // <-- Replace this
      video_type: "Short",
      category: "Best Catches",
      publish_date: "2025-12-10",
      views: 8000,
      duration: 20,
      is_featured: false,
    },
  ];

  console.log("⚠️  IMPORTANT: Make sure to update the YouTube video IDs in this script!\n");
  console.log(`Creating ${videos.length} video entries...\n`);

  for (const video of videos) {
    console.log(`📹 Creating: ${video.title}...`);
    const result = await createVideo(video);

    if (result.status === 201) {
      console.log(`   ✅ Created successfully`);
      const publishResult = await publishEntry(result.data.entry.uid);
      if (publishResult.status === 200) {
        console.log(`   📤 Published to production`);
      } else {
        console.log(`   ⚠️ Publish failed: ${publishResult.data.error_message || "Unknown error"}`);
      }
    } else {
      console.log(`   ❌ Error: ${result.data.error_message || JSON.stringify(result.data)}`);
    }
    console.log("");
  }

  console.log("=".repeat(60));
  console.log("DONE!");
  console.log("=".repeat(60));
  console.log(`
Next steps:
1. Go to Contentstack > Content > Video
2. Update each video entry with the actual YouTube Short ID
3. The YouTube Short ID is the part after /shorts/ in the URL
   Example: youtube.com/shorts/ABC123xyz -> ID is "ABC123xyz"
4. Save and publish each entry after updating
`);
}

main().catch(console.error);


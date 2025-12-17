/**
 * Create Video content type and add sample videos
 * Run with: node scripts/create-video-content-type.js
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

// Video content type schema
const videoContentType = {
  content_type: {
    title: "Video",
    uid: "video",
    schema: [
      {
        display_name: "Title",
        uid: "title",
        data_type: "text",
        mandatory: true,
        unique: true,
        field_metadata: { _default: true },
      },
      {
        display_name: "Description",
        uid: "description",
        data_type: "text",
        field_metadata: { multiline: true },
      },
      {
        display_name: "YouTube Video ID",
        uid: "youtube_video_id",
        data_type: "text",
        mandatory: true,
        field_metadata: {
          description: "The ID from the YouTube URL (e.g., 'dQw4w9WgXcQ' from youtube.com/shorts/dQw4w9WgXcQ)",
        },
      },
      {
        display_name: "Video Type",
        uid: "video_type",
        data_type: "text",
        enum: {
          advanced: false,
          choices: [
            { value: "Short" },
            { value: "Highlight" },
            { value: "Full Match" },
            { value: "Interview" },
            { value: "Behind the Scenes" },
          ],
        },
        mandatory: true,
      },
      {
        display_name: "Category",
        uid: "category",
        data_type: "text",
        enum: {
          advanced: false,
          choices: [
            { value: "Match Highlights" },
            { value: "Best Catches" },
            { value: "Best Sixes" },
            { value: "Best Wickets" },
            { value: "Player Interviews" },
            { value: "Behind the Scenes" },
            { value: "Ceremony" },
            { value: "Other" },
          ],
        },
      },
      {
        display_name: "Related Match",
        uid: "related_match",
        data_type: "reference",
        reference_to: ["match"],
        field_metadata: { ref_multiple: false },
      },
      {
        display_name: "Related Team",
        uid: "related_team",
        data_type: "reference",
        reference_to: ["team"],
        field_metadata: { ref_multiple: false },
      },
      {
        display_name: "Publish Date",
        uid: "publish_date",
        data_type: "isodate",
      },
      {
        display_name: "Views",
        uid: "views",
        data_type: "number",
        field_metadata: { description: "Approximate view count" },
      },
      {
        display_name: "Duration (seconds)",
        uid: "duration",
        data_type: "number",
      },
      {
        display_name: "Is Featured",
        uid: "is_featured",
        data_type: "boolean",
      },
      {
        display_name: "Tags",
        uid: "tags",
        data_type: "text",
        multiple: true,
      },
    ],
    options: {
      is_page: false,
      singleton: false,
      title: "title",
    },
  },
};

async function createContentType() {
  console.log("Creating Video content type...");
  
  // First check if it exists
  const checkResult = await makeRequest("GET", "/v3/content_types/video");
  
  if (checkResult.status === 200) {
    console.log("Video content type already exists, updating...");
    const updateResult = await makeRequest("PUT", "/v3/content_types/video", videoContentType);
    if (updateResult.status === 200) {
      console.log("✅ Video content type updated successfully");
    } else {
      console.log("❌ Error updating:", updateResult.data.error_message || updateResult.data);
    }
  } else {
    const createResult = await makeRequest("POST", "/v3/content_types", videoContentType);
    if (createResult.status === 201) {
      console.log("✅ Video content type created successfully");
    } else {
      console.log("❌ Error creating:", createResult.data.error_message || createResult.data);
    }
  }
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
      tags: video.tags,
    },
  };

  const result = await makeRequest("POST", "/v3/content_types/video/entries", entry);
  return result;
}

async function main() {
  console.log("=".repeat(60));
  console.log("CREATING VIDEO CONTENT TYPE AND SAMPLE VIDEOS");
  console.log("=".repeat(60));
  console.log("");

  // Create content type
  await createContentType();
  console.log("");

  // Note: You'll need to add your actual YouTube Short video IDs here
  // For now, using placeholder IDs - replace with real ones
  const sampleVideos = [
    {
      title: "Amazing Catch by Rahul Patil - Match 8",
      description: "Stunning one-handed catch at the boundary by Flame Chargers captain",
      youtube_video_id: "PLACEHOLDER_ID_1", // Replace with actual YouTube Short ID
      video_type: "Short",
      category: "Best Catches",
      publish_date: "2025-12-09",
      views: 15000,
      duration: 30,
      is_featured: true,
      tags: ["catch", "fielding", "flame chargers"],
    },
    {
      title: "Monster Six by Mahesh Patil",
      description: "Huge six out of the ground by Thunder Strikers batsman",
      youtube_video_id: "PLACEHOLDER_ID_2",
      video_type: "Short",
      category: "Best Sixes",
      publish_date: "2025-12-07",
      views: 12000,
      duration: 25,
      is_featured: true,
      tags: ["six", "batting", "thunder strikers"],
    },
    {
      title: "Hat-trick by Amit Sharma",
      description: "Three wickets in three balls - incredible bowling spell",
      youtube_video_id: "PLACEHOLDER_ID_3",
      video_type: "Short",
      category: "Best Wickets",
      publish_date: "2025-12-05",
      views: 20000,
      duration: 45,
      is_featured: true,
      tags: ["wicket", "bowling", "hat-trick"],
    },
    {
      title: "OCPL 2025 Opening Ceremony Highlights",
      description: "Best moments from the grand opening ceremony",
      youtube_video_id: "PLACEHOLDER_ID_4",
      video_type: "Highlight",
      category: "Ceremony",
      publish_date: "2025-12-01",
      views: 25000,
      duration: 120,
      is_featured: false,
      tags: ["ceremony", "opening", "ocpl 2025"],
    },
    {
      title: "Match 1 Final Over Thriller",
      description: "Nail-biting last over as Flame Chargers clinch victory",
      youtube_video_id: "PLACEHOLDER_ID_5",
      video_type: "Highlight",
      category: "Match Highlights",
      publish_date: "2025-12-01",
      views: 18000,
      duration: 90,
      is_featured: true,
      tags: ["thriller", "last over", "flame chargers"],
    },
    {
      title: "Run Out of the Season",
      description: "Lightning quick throw by Storm Surfers fielder",
      youtube_video_id: "PLACEHOLDER_ID_6",
      video_type: "Short",
      category: "Other",
      publish_date: "2025-12-10",
      views: 8000,
      duration: 20,
      is_featured: false,
      tags: ["run out", "fielding", "storm surfers"],
    },
  ];

  console.log("Creating sample video entries...");
  console.log("⚠️  Note: Replace PLACEHOLDER_ID_X with actual YouTube video IDs\n");

  for (const video of sampleVideos) {
    console.log(`📹 Creating: ${video.title}...`);
    const result = await createVideo(video);

    if (result.status === 201) {
      console.log("   ✅ Created");
      await publishEntry(result.data.entry.uid);
    } else {
      console.log(`   ❌ Error: ${result.data.error_message || "Unknown error"}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("DONE!");
  console.log("=".repeat(60));
  console.log(`
Next steps:
1. Go to Contentstack and update the video entries with real YouTube Short IDs
2. The YouTube Short ID is the part after /shorts/ in the URL
   Example: youtube.com/shorts/ABC123xyz -> ID is "ABC123xyz"
`);
}

main().catch(console.error);


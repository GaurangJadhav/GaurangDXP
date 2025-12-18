/**
 * Localize all content in Contentstack
 * Run with: node scripts/localize-all-content.js
 */

const https = require("https");

const config = {
  api_key: "blt2a1a0df4ff6bc454",
  authtoken: "blte5c1f92ccc96f8a3",
};

function makeRequest(method, path, body = null, locale = null) {
  return new Promise((resolve, reject) => {
    const headers = {
      api_key: config.api_key,
      authtoken: config.authtoken,
      "Content-Type": "application/json",
    };

    // Only add locale header for non-English locales
    if (locale && locale !== "en-us") {
      headers["locale"] = locale;
    }

    const options = {
      hostname: "api.contentstack.io",
      port: 443,
      path: path,
      method: method,
      headers: headers,
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

// Video translations
const videoTranslations = {
  "Stunning Boundary Catch - OCPL 2025": {
    hi: { title: "शानदार बाउंड्री कैच - OCPL 2025", description: "बाउंड्री रोप पर अविश्वसनीय कैच से महत्वपूर्ण रन बचे" },
    mr: { title: "अप्रतिम बाउंड्री कॅच - OCPL 2025", description: "बाउंड्री रोपवर अविश्वसनीय कॅच ने महत्त्वाचे धावा वाचवल्या" },
  },
  "Massive Six Over Long-On": {
    hi: { title: "लॉन्ग-ऑन पर विशाल छक्का", description: "शक्तिशाली हिटिंग ने गेंद को स्टैंड में भेजा" },
    mr: { title: "लाँग-ऑनवर प्रचंड षटकार", description: "शक्तिशाली फटकेबाजीने चेंडू स्टँडमध्ये पाठवला" },
  },
  "Perfect Yorker - Clean Bowled!": {
    hi: { title: "परफेक्ट यॉर्कर - क्लीन बोल्ड!", description: "पैर की उंगलियों को कुचलने वाली यॉर्कर ने स्टंप्स उड़ाए" },
    mr: { title: "परफेक्ट यॉर्कर - क्लीन बोल्ड!", description: "पायाच्या बोटांना चिरडणाऱ्या यॉर्करने स्टंप्स उडवले" },
  },
  "Match Winning Last Over": {
    hi: { title: "मैच जीताने वाला आखिरी ओवर", description: "रोमांचक अंतिम ओवर ने मैच का परिणाम तय किया" },
    mr: { title: "सामना जिंकणारा शेवटचा षटक", description: "थरारक अंतिम षटकाने सामन्याचा निकाल ठरवला" },
  },
  "Lightning Fast Run Out": {
    hi: { title: "बिजली की तेजी से रन आउट", description: "मिड-विकेट से सीधी हिट ने बल्लेबाज को शॉर्ट किया" },
    mr: { title: "विजेच्या वेगाने रन आउट", description: "मिड-विकेटवरून थेट फेकीने फलंदाजाला शॉर्ट केले" },
  },
  "Back-to-Back Sixes": {
    hi: { title: "लगातार दो छक्के", description: "दो लगातार छक्कों ने खेल का रुख बदल दिया" },
    mr: { title: "सलग दोन षटकार", description: "सलग दोन षटकारांनी खेळाचा कल बदलला" },
  },
  "Diving Catch in the Deep": {
    hi: { title: "डीप में डाइविंग कैच", description: "पूरे स्ट्रेच पर डाइविंग कैच ने भीड़ को चौंका दिया" },
    mr: { title: "डीपमध्ये डायव्हिंग कॅच", description: "पूर्ण स्ट्रेचवर डायव्हिंग कॅचने प्रेक्षकांना अचंबित केले" },
  },
  "Hat-trick Hero Celebration": {
    hi: { title: "हैट्रिक हीरो का जश्न", description: "तीन गेंदों में तीन विकेट - अविश्वसनीय गेंदबाजी" },
    mr: { title: "हॅट्ट्रिक हिरोचा उत्सव", description: "तीन चेंडूंत तीन विकेट्स - अविश्वसनीय गोलंदाजी" },
  },
  "OCPL Opening Ceremony 2025": {
    hi: { title: "OCPL उद्घाटन समारोह 2025", description: "OCPL सीज़न 5 के भव्य उद्घाटन समारोह की झलकियां" },
    mr: { title: "OCPL उद्घाटन सोहळा 2025", description: "OCPL सीझन 5 च्या भव्य उद्घाटन सोहळ्याचे हायलाइट्स" },
  },
  "OCPL Highlight - YouTube Short": {
    hi: { title: "OCPL हाइलाइट - YouTube शॉर्ट", description: "इस YouTube शॉर्ट में OCPL का रोमांचक पल" },
    mr: { title: "OCPL हायलाइट - YouTube शॉर्ट", description: "या YouTube शॉर्टमध्ये OCPL चा थरारक क्षण" },
  },
};

// Points table position translations
const positionTranslations = {
  1: { hi: "पहला", mr: "पहिला" },
  2: { hi: "दूसरा", mr: "दुसरा" },
  3: { hi: "तीसरा", mr: "तिसरा" },
  4: { hi: "चौथा", mr: "चौथा" },
  5: { hi: "पांचवां", mr: "पाचवा" },
  6: { hi: "छठा", mr: "सहावा" },
};

async function localizeVideos() {
  console.log("\n📹 LOCALIZING VIDEOS");
  console.log("-".repeat(40));

  const videosResult = await makeRequest("GET", "/v3/content_types/video/entries");
  
  if (videosResult.status !== 200 || !videosResult.data.entries) {
    console.log("❌ Error fetching videos");
    return;
  }

  const videos = videosResult.data.entries;
  console.log(`Found ${videos.length} videos\n`);

  for (const video of videos) {
    const translations = videoTranslations[video.title];
    
    if (!translations) {
      console.log(`⚠️ No translation for: ${video.title.substring(0, 30)}...`);
      continue;
    }

    console.log(`🎬 ${video.title.substring(0, 35)}...`);

    for (const [lang, trans] of Object.entries(translations)) {
      const locale = lang === "hi" ? "hi-in" : "mr-in";
      
      const updateResult = await makeRequest(
        "PUT",
        `/v3/content_types/video/entries/${video.uid}`,
        { entry: { title: trans.title, description: trans.description } },
        locale
      );

      if (updateResult.status === 200) {
        console.log(`   ${locale}: ✅`);
        
        // Publish
        await makeRequest(
          "POST",
          `/v3/content_types/video/entries/${video.uid}/publish`,
          { entry: { environments: ["production"], locales: [locale] } }
        );
      } else {
        console.log(`   ${locale}: ❌`);
      }
    }
  }
}

async function localizeVenues() {
  console.log("\n🏟️ LOCALIZING VENUES");
  console.log("-".repeat(40));

  const venueTranslations = {
    "Vasai Sports Ground": {
      hi: { venue_name: "वसई खेल मैदान", city: "वसई" },
      mr: { venue_name: "वसई क्रीडांगण", city: "वसई" },
    },
    "Virar Stadium": {
      hi: { venue_name: "विरार स्टेडियम", city: "विरार" },
      mr: { venue_name: "विरार स्टेडियम", city: "विरार" },
    },
  };

  const venuesResult = await makeRequest("GET", "/v3/content_types/venue/entries");
  
  if (venuesResult.status !== 200 || !venuesResult.data.entries) {
    console.log("❌ Error fetching venues or no venues found");
    return;
  }

  const venues = venuesResult.data.entries;
  console.log(`Found ${venues.length} venues\n`);

  for (const venue of venues) {
    const translations = venueTranslations[venue.venue_name];
    
    if (!translations) {
      console.log(`⚠️ No translation for: ${venue.venue_name}`);
      continue;
    }

    console.log(`🏟️ ${venue.venue_name}`);

    for (const [lang, trans] of Object.entries(translations)) {
      const locale = lang === "hi" ? "hi-in" : "mr-in";
      
      const updateResult = await makeRequest(
        "PUT",
        `/v3/content_types/venue/entries/${venue.uid}`,
        { entry: trans },
        locale
      );

      if (updateResult.status === 200) {
        console.log(`   ${locale}: ✅`);
        await makeRequest(
          "POST",
          `/v3/content_types/venue/entries/${venue.uid}/publish`,
          { entry: { environments: ["production"], locales: [locale] } }
        );
      } else {
        console.log(`   ${locale}: ❌`);
      }
    }
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("LOCALIZING ALL CONTENTSTACK CONTENT");
  console.log("=".repeat(60));

  await localizeVideos();
  await localizeVenues();

  console.log("\n" + "=".repeat(60));
  console.log("ALL LOCALIZATION COMPLETE!");
  console.log("=".repeat(60));
}

main().catch(console.error);


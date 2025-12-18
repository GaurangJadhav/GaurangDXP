/**
 * Localize team entries in Contentstack for Hindi and Marathi
 * Run with: node scripts/localize-teams.js
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

    if (locale) {
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

// Team translations
const teamTranslations = {
  "Flame Chargers": {
    hi: { team_name: "फ्लेम चार्जर्स", tagline: "आग की लपटों की तरह तेज" },
    mr: { team_name: "फ्लेम चार्जर्स", tagline: "अग्नीच्या ज्वालांसारखे वेगवान" },
  },
  "Storm Surfers": {
    hi: { team_name: "स्टॉर्म सर्फर्स", tagline: "तूफान की लहरों पर सवार" },
    mr: { team_name: "स्टॉर्म सर्फर्स", tagline: "वादळाच्या लाटांवर स्वार" },
  },
  "Windstorm Warriors": {
    hi: { team_name: "विंडस्टॉर्म वॉरियर्स", tagline: "हवा के योद्धा" },
    mr: { team_name: "विंडस्टॉर्म वॉरियर्स", tagline: "वाऱ्याचे योद्धे" },
  },
  "Earth Titans": {
    hi: { team_name: "अर्थ टाइटन्स", tagline: "धरती के राक्षस" },
    mr: { team_name: "अर्थ टायटन्स", tagline: "पृथ्वीचे राक्षस" },
  },
  "Thunder Strikers": {
    hi: { team_name: "थंडर स्ट्राइकर्स", tagline: "बिजली की गति से प्रहार" },
    mr: { team_name: "थंडर स्ट्रायकर्स", tagline: "विजेच्या वेगाने प्रहार" },
  },
  "Glacier Gladiators": {
    hi: { team_name: "ग्लेशियर ग्लेडिएटर्स", tagline: "बर्फ की तरह शांत, योद्धा की तरह मजबूत" },
    mr: { team_name: "ग्लेशियर ग्लॅडिएटर्स", tagline: "बर्फासारखे शांत, योद्ध्यासारखे मजबूत" },
  },
};

async function localizeTeam(teamUid, englishName, locale, translations) {
  const updateData = {
    entry: {
      team_name: translations.team_name,
      tagline: translations.tagline,
    },
  };

  const result = await makeRequest(
    "PUT",
    `/v3/content_types/team/entries/${teamUid}`,
    updateData,
    locale
  );

  return result;
}

async function publishEntry(contentType, entryUid, locale) {
  const publishData = {
    entry: {
      environments: ["production"],
      locales: [locale],
    },
  };
  return makeRequest(
    "POST",
    `/v3/content_types/${contentType}/entries/${entryUid}/publish`,
    publishData
  );
}

async function main() {
  console.log("=".repeat(60));
  console.log("LOCALIZING TEAM ENTRIES");
  console.log("=".repeat(60));
  console.log("");

  // First, get all teams
  console.log("Fetching teams...");
  const teamsResult = await makeRequest("GET", "/v3/content_types/team/entries");

  if (teamsResult.status !== 200) {
    console.log("❌ Error fetching teams:", teamsResult.data);
    return;
  }

  const teams = teamsResult.data.entries;
  console.log(`Found ${teams.length} teams\n`);

  const locales = ["hi-in", "mr-in"];

  for (const team of teams) {
    const englishName = team.team_name;
    const translations = teamTranslations[englishName];

    if (!translations) {
      console.log(`⚠️ No translations found for: ${englishName}`);
      continue;
    }

    console.log(`\n🏏 ${englishName}`);

    for (const locale of locales) {
      const localeKey = locale.split("-")[0]; // hi-in -> hi
      const translation = translations[localeKey];

      if (!translation) continue;

      console.log(`   ${locale}: ${translation.team_name}...`);

      const result = await localizeTeam(team.uid, englishName, locale, translation);

      if (result.status === 200) {
        console.log(`   ✅ Localized`);

        // Publish the localized entry
        const publishResult = await publishEntry("team", team.uid, locale);
        if (publishResult.status === 200) {
          console.log(`   📤 Published`);
        }
      } else {
        console.log(`   ❌ Error: ${result.data.error_message || JSON.stringify(result.data)}`);
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("DONE!");
  console.log("=".repeat(60));
}

main().catch(console.error);


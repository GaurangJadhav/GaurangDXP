/**
 * Update Team Names in Contentstack
 */

const https = require('https');

const CONFIG = {
  authtoken: 'blte5c1f92ccc96f8a3',
  api_key: 'blt2a1a0df4ff6bc454',
  base_url: 'api.contentstack.io',
};

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
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ error: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// New team names mapping
const teamUpdates = {
  "Vasai Warriors": {
    new_name: "Flame Chargers",
    short_name: "FC",
    color: "#e87425",
    motto: "Ignite the Fire!",
    description: "The most successful team in OCPL history with 2 championship titles. Known for their fiery batting and aggressive gameplay."
  },
  "Nalasopara Knights": {
    new_name: "Storm Surfers",
    short_name: "SS",
    color: "#3b82f6",
    motto: "Ride the Storm!",
    description: "Known for disciplined bowling attack and tactical approach. They surge through opponents like a storm."
  },
  "Virar Titans": {
    new_name: "Windstorm Warriors",
    short_name: "WW",
    color: "#22c55e",
    motto: "Swift as the Wind!",
    description: "Explosive batting lineup that sweeps through opposition like a windstorm."
  },
  "Nallasopara Strikers": {
    new_name: "Earth Titans",
    short_name: "ET",
    color: "#a855f7",
    motto: "Solid as Earth!",
    description: "Young fearless team with a rock-solid foundation and grounded approach."
  },
  "Vasai Kings": {
    new_name: "Thunder Strikers",
    short_name: "TS",
    color: "#facc15",
    motto: "Strike like Thunder!",
    description: "Royal franchise with star lineup that strikes fear into opponents."
  },
  "Palghar Panthers": {
    new_name: "Glacier Gladiators",
    short_name: "GG",
    color: "#06b6d4",
    motto: "Cool Under Pressure!",
    description: "Newest team with fresh energy. They stay ice-cool in pressure situations."
  }
};

async function main() {
  console.log('🔄 Updating Team Names in Contentstack...\n');

  // Get existing teams
  const teamsResult = await makeRequest('GET', '/content_types/team/entries?locale=en-us');
  
  if (!teamsResult.entries) {
    console.log('❌ Could not fetch teams');
    return;
  }

  console.log(`Found ${teamsResult.entries.length} teams to update\n`);

  for (const team of teamsResult.entries) {
    const update = teamUpdates[team.team_name];
    
    if (!update) {
      console.log(`⚠️  No update mapping for: ${team.team_name}`);
      continue;
    }

    const updatedEntry = {
      entry: {
        title: update.new_name,
        team_name: update.new_name,
        short_name: update.short_name,
        primary_color: update.color,
        team_motto: update.motto,
        description: update.description,
        // Keep existing stats
        owner_name: team.owner_name,
        home_ground: team.home_ground,
        established_year: team.established_year,
        secondary_color: team.secondary_color,
        stats: team.stats
      }
    };

    const result = await makeRequest('PUT', `/content_types/team/entries/${team.uid}?locale=en-us`, updatedEntry);
    
    if (result.entry) {
      console.log(`✅ ${team.team_name} → ${update.new_name} (${update.short_name})`);
    } else {
      console.log(`❌ Failed to update ${team.team_name}: ${result.error_message || JSON.stringify(result)}`);
    }
    
    await sleep(500);
  }

  // Update Points Table entries
  console.log('\n📊 Updating Points Table...\n');
  
  const pointsResult = await makeRequest('GET', '/content_types/points_table/entries?locale=en-us');
  
  for (const pt of pointsResult.entries || []) {
    // Find the new team name based on the old title
    let newTitle = pt.title;
    for (const [oldName, update] of Object.entries(teamUpdates)) {
      if (pt.title.includes(oldName.split(' ')[0])) {
        newTitle = `${update.new_name} - Position ${pt.position}`;
        break;
      }
    }

    if (newTitle !== pt.title) {
      const result = await makeRequest('PUT', `/content_types/points_table/entries/${pt.uid}?locale=en-us`, {
        entry: { ...pt, title: newTitle }
      });
      
      if (result.entry) {
        console.log(`✅ Updated: ${newTitle}`);
      }
      await sleep(300);
    }
  }

  // Update Player team references (just update their bio to mention new team)
  console.log('\n👤 Note: Player entries still reference teams by UID, so they will automatically show the new team names.');

  console.log('\n✅ Team names updated successfully!');
  console.log('\nNew Teams:');
  Object.entries(teamUpdates).forEach(([old, update]) => {
    console.log(`  ${update.short_name} - ${update.new_name}`);
  });
}

main().catch(console.error);


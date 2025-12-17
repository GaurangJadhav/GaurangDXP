/**
 * Update Team Entries with Logo Assets
 */

const https = require('https');

const CONFIG = {
  authtoken: 'blte5c1f92ccc96f8a3',
  api_key: 'blt2a1a0df4ff6bc454',
  base_url: 'api.contentstack.io',
};

// Mapping of team short names to asset UIDs
const TEAM_LOGOS = {
  'FC': 'blt38885cac718250fa', // FlameChargers.png
  'SS': 'bltb59ce66178c557c3', // StormSurfers.png
  'WW': 'bltdcdd5ec6cc895eb3', // WindstormWarriors.png
  'ET': 'blt18d548132544b2f8', // EarthTitans.png
  'TS': 'blt7e202081d1ba2e2e', // ThunderStrikers.png
  'GG': 'blt033d5d3465f191b4', // GlacierGladiators.png
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

async function main() {
  console.log('🖼️  Updating Team Logos...\n');

  // Get all teams
  const teamsResponse = await makeRequest('GET', '/content_types/team/entries?locale=en-us');
  const teams = teamsResponse.entries || [];

  for (const team of teams) {
    const assetUid = TEAM_LOGOS[team.short_name];
    
    if (!assetUid) {
      console.log(`⚠️  No logo mapping found for ${team.team_name} (${team.short_name})`);
      continue;
    }

    console.log(`Updating ${team.team_name}...`);

    // Update the team entry with the logo reference
    const updateData = {
      entry: {
        team_logo: assetUid,
      }
    };

    const result = await makeRequest(
      'PUT',
      `/content_types/team/entries/${team.uid}?locale=en-us`,
      updateData
    );

    if (result.entry) {
      console.log(`✅ ${team.team_name} logo updated successfully`);
    } else {
      console.log(`❌ Failed to update ${team.team_name}:`, result.error_message || JSON.stringify(result));
    }
  }

  console.log('\n✨ Team logo updates complete!');
  console.log('\n📝 Remember to publish the team entries in Contentstack.');
}

main().catch(console.error);


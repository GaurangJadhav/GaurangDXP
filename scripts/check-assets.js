/**
 * Check Contentstack Assets and Team Data
 */

const https = require('https');

const CONFIG = {
  authtoken: 'blte5c1f92ccc96f8a3',
  api_key: 'blt2a1a0df4ff6bc454',
  base_url: 'api.contentstack.io',
};

function makeRequest(method, path) {
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
    req.end();
  });
}

async function main() {
  console.log('📂 Checking Contentstack Assets...\n');

  // Get all assets
  const assets = await makeRequest('GET', '/assets?include_folders=true');
  
  console.log('Assets found:', assets.assets?.length || 0);
  console.log('\nAsset Details:');
  
  assets.assets?.forEach((asset, i) => {
    console.log(`\n${i + 1}. ${asset.title || asset.filename}`);
    console.log(`   UID: ${asset.uid}`);
    console.log(`   URL: ${asset.url}`);
    console.log(`   Type: ${asset.content_type}`);
  });

  // Get teams to see their current structure
  console.log('\n\n📋 Current Team Data:');
  const teams = await makeRequest('GET', '/content_types/team/entries?locale=en-us');
  
  teams.entries?.forEach(team => {
    console.log(`\n${team.team_name} (${team.short_name})`);
    console.log(`   UID: ${team.uid}`);
    console.log(`   Logo: ${team.team_logo ? JSON.stringify(team.team_logo) : 'Not set'}`);
  });
}

main().catch(console.error);


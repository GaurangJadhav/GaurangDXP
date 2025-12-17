/**
 * Debug Team Content Type
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
          const parsed = JSON.parse(body);
          resolve({ statusCode: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('🔍 Debugging Team Content Type...\n');

  // Get Team content type schema
  const teamCT = await makeRequest('GET', '/content_types/team');
  console.log('Team Content Type Schema:');
  console.log(JSON.stringify(teamCT.data.content_type?.schema, null, 2));

  // Try to get existing team entries
  console.log('\n\nExisting Team Entries:');
  const entries = await makeRequest('GET', '/content_types/team/entries?locale=en-us');
  console.log('Entries:', entries.data.entries?.length || 0);
  if (entries.data.entries?.length > 0) {
    console.log('First entry:', JSON.stringify(entries.data.entries[0], null, 2));
  }

  // Try a minimal team entry
  console.log('\n\nTrying minimal team entry...');
  const minimalTeam = {
    entry: {
      title: "Test Team"
    }
  };
  const result = await makeRequest('POST', '/content_types/team/entries?locale=en-us', minimalTeam);
  console.log('Result:', result.statusCode);
  console.log('Response:', JSON.stringify(result.data, null, 2));

  // If successful, delete it
  if (result.data.entry?.uid) {
    console.log('\nDeleting test entry...');
    await makeRequest('DELETE', `/content_types/team/entries/${result.data.entry.uid}?locale=en-us`);
  }
}

main().catch(console.error);


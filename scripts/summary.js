/**
 * Summary of all Contentstack data
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
  console.log('📊 OCPL Contentstack Data Summary\n');
  console.log('='.repeat(60));

  const contentTypes = ['venue', 'team', 'player', 'season', 'match', 'points_table', 'article', 'homepage'];
  
  for (const ct of contentTypes) {
    const result = await makeRequest('GET', `/content_types/${ct}/entries?locale=en-us`);
    const count = result.entries?.length || 0;
    const icon = count > 0 ? '✅' : '❌';
    console.log(`\n${icon} ${ct.toUpperCase()}: ${count} entries`);
    
    if (result.entries?.length > 0) {
      result.entries.forEach((entry, i) => {
        console.log(`   ${i + 1}. ${entry.title} (${entry.uid})`);
      });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📋 Content Types Created:');
  const cts = await makeRequest('GET', '/content_types');
  cts.content_types?.forEach(ct => {
    console.log(`   • ${ct.title} (${ct.uid})`);
  });

  console.log('\n✅ Your Contentstack stack is ready!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Go to Contentstack Dashboard');
  console.log('   2. Navigate to each content type and PUBLISH all entries');
  console.log('   3. Go to Settings > Tokens > Delivery Tokens');
  console.log('   4. Create a new Delivery Token for "production" environment');
  console.log('   5. Copy the token and add to your .env.local file:');
  console.log('      CONTENTSTACK_API_KEY=blt2a1a0df4ff6bc454');
  console.log('      CONTENTSTACK_DELIVERY_TOKEN=<your_delivery_token>');
  console.log('      CONTENTSTACK_ENVIRONMENT=production');
  console.log('   6. Run: npm install && npm run dev');
}

main().catch(console.error);


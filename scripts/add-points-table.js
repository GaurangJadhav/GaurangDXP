/**
 * Add Points Table entries
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

async function main() {
  console.log('📊 Adding Points Table entries...\n');

  // Get team UIDs
  const teamsResult = await makeRequest('GET', '/content_types/team/entries?locale=en-us');
  const teamUids = {};
  teamsResult.entries?.forEach(team => {
    teamUids[team.short_name] = team.uid;
  });
  console.log('Team UIDs:', teamUids);

  const pointsData = [
    { short: "VW", name: "Vasai Warriors", position: 1, played: 10, wins: 8, losses: 1, ties: 0, nr: 1, points: 17, nrr: 1.256 },
    { short: "NK", name: "Nalasopara Knights", position: 2, played: 10, wins: 7, losses: 2, ties: 0, nr: 1, points: 15, nrr: 0.892 },
    { short: "VT", name: "Virar Titans", position: 3, played: 10, wins: 6, losses: 3, ties: 0, nr: 1, points: 13, nrr: 0.445 },
    { short: "VK", name: "Vasai Kings", position: 4, played: 10, wins: 5, losses: 4, ties: 0, nr: 1, points: 11, nrr: 0.125 },
    { short: "NS", name: "Nallasopara Strikers", position: 5, played: 10, wins: 3, losses: 6, ties: 0, nr: 1, points: 7, nrr: -0.523 },
    { short: "PP", name: "Palghar Panthers", position: 6, played: 10, wins: 1, losses: 8, ties: 0, nr: 1, points: 3, nrr: -1.892 },
  ];

  for (const pt of pointsData) {
    const teamUid = teamUids[pt.short];
    if (!teamUid) {
      console.log(`❌ Team ${pt.short} not found`);
      continue;
    }

    const entry = {
      entry: {
        title: `${pt.name} - Position ${pt.position}`,
        team: [{ uid: teamUid, _content_type_uid: "team" }],
        position: pt.position,
        matches_played: pt.played,
        wins: pt.wins,
        losses: pt.losses,
        ties: pt.ties,
        no_results: pt.nr,
        points: pt.points,
        net_run_rate: pt.nrr,
      }
    };

    const result = await makeRequest('POST', '/content_types/points_table/entries?locale=en-us', entry);
    if (result.entry?.uid) {
      console.log(`✅ ${entry.entry.title} (${result.entry.uid})`);
    } else {
      console.log(`❌ ${pt.name}: ${result.error_message || JSON.stringify(result)}`);
    }
    await sleep(500);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);


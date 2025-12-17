/**
 * Add Teams to Contentstack
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
  console.log('🏆 Adding Teams...\n');

  // First, let's check what content types exist
  console.log('Checking existing content types...');
  const ctResult = await makeRequest('GET', '/content_types');
  console.log('Content types:', ctResult.data.content_types?.map(ct => ct.uid).join(', '));

  // Check if team content type exists
  const teamCT = ctResult.data.content_types?.find(ct => ct.uid === 'team');
  
  if (!teamCT) {
    console.log('\nCreating Team content type...');
    const createCT = await makeRequest('POST', '/content_types', {
      content_type: {
        title: "Team",
        uid: "team",
        schema: [
          { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
          { display_name: "Team Name", uid: "team_name", data_type: "text", mandatory: true },
          { display_name: "Short Name", uid: "short_name", data_type: "text", mandatory: true },
          { display_name: "Primary Color", uid: "primary_color", data_type: "text", mandatory: true },
          { display_name: "Owner Name", uid: "owner_name", data_type: "text", mandatory: false },
          { display_name: "Home Ground", uid: "home_ground", data_type: "text", mandatory: false },
          { display_name: "Team Motto", uid: "team_motto", data_type: "text", mandatory: false },
          { display_name: "Description", uid: "description", data_type: "text", mandatory: false, field_metadata: { multiline: true } },
          { display_name: "Wins", uid: "wins", data_type: "number", mandatory: false },
          { display_name: "Losses", uid: "losses", data_type: "number", mandatory: false },
          { display_name: "Titles Won", uid: "titles_won", data_type: "number", mandatory: false },
        ],
        options: { is_page: false, singleton: false, title: "title" }
      }
    });
    console.log('Create CT result:', createCT.statusCode, createCT.data.error_message || 'Success');
    await sleep(2000);
  } else {
    console.log('Team content type already exists');
  }

  // Now add teams
  const teams = [
    { title: "Vasai Warriors", team_name: "Vasai Warriors", short_name: "VW", primary_color: "#e87425", owner_name: "Rajesh Patil", home_ground: "Vasai Sports Ground", team_motto: "Warriors Never Give Up!", description: "Most successful team in OCPL with 2 championship titles", wins: 32, losses: 11, titles_won: 2 },
    { title: "Nalasopara Knights", team_name: "Nalasopara Knights", short_name: "NK", primary_color: "#3b82f6", owner_name: "Suresh Sharma", home_ground: "Nalasopara Cricket Ground", team_motto: "Rise of the Knights", description: "Known for disciplined bowling attack", wins: 28, losses: 15, titles_won: 1 },
    { title: "Virar Titans", team_name: "Virar Titans", short_name: "VT", primary_color: "#22c55e", owner_name: "Amit Deshmukh", home_ground: "Virar Stadium", team_motto: "Titans Rise Together", description: "Explosive batting lineup", wins: 25, losses: 18, titles_won: 1 },
    { title: "Nallasopara Strikers", team_name: "Nallasopara Strikers", short_name: "NS", primary_color: "#a855f7", owner_name: "Priya Mehta", home_ground: "Nallasopara Sports Complex", team_motto: "Strike Hard, Strike Fast", description: "Young fearless team", wins: 18, losses: 15, titles_won: 0 },
    { title: "Vasai Kings", team_name: "Vasai Kings", short_name: "VK", primary_color: "#facc15", owner_name: "Vikram Singh", home_ground: "Vasai Sports Ground", team_motto: "Crown the Kings", description: "Royal franchise with star lineup", wins: 22, losses: 21, titles_won: 1 },
    { title: "Palghar Panthers", team_name: "Palghar Panthers", short_name: "PP", primary_color: "#ef4444", owner_name: "Ravi Kumar", home_ground: "Palghar District Ground", team_motto: "Unleash the Panther", description: "Newest team with fresh energy", wins: 8, losses: 11, titles_won: 0 },
  ];

  console.log('\nAdding team entries...');
  for (const team of teams) {
    const result = await makeRequest('POST', '/content_types/team/entries?locale=en-us', { entry: team });
    if (result.statusCode >= 200 && result.statusCode < 300) {
      console.log(`✅ ${team.title} (${result.data.entry?.uid})`);
    } else {
      console.log(`❌ ${team.title}: ${result.data.error_message || JSON.stringify(result.data)}`);
    }
    await sleep(500);
  }

  // Create Article content type and entries
  console.log('\n📰 Creating Article content type...');
  const articleCT = await makeRequest('POST', '/content_types', {
    content_type: {
      title: "Article",
      uid: "article",
      schema: [
        { display_name: "Title", uid: "title", data_type: "text", mandatory: true, unique: true },
        { display_name: "Slug", uid: "slug", data_type: "text", mandatory: true },
        { display_name: "Excerpt", uid: "excerpt", data_type: "text", mandatory: true, field_metadata: { multiline: true } },
        { display_name: "Content", uid: "content", data_type: "text", mandatory: true, field_metadata: { multiline: true } },
        { display_name: "Author", uid: "author", data_type: "text", mandatory: true },
        { display_name: "Publish Date", uid: "publish_date", data_type: "isodate", mandatory: true },
        { display_name: "Category", uid: "category", data_type: "text", mandatory: true },
      ],
      options: { is_page: false, singleton: false, title: "title" }
    }
  });
  console.log('Article CT:', articleCT.statusCode, articleCT.data.error_message || 'Success');
  await sleep(2000);

  const articles = [
    { title: "Vasai Warriors clinch thriller", slug: "vw-thriller-match-1", excerpt: "Warriors win opening match by 25 runs", content: "Captain Rahul Patil led from the front with 78 runs in the opening match.", author: "OCPL Media", publish_date: "2025-12-01", category: "Match Report" },
    { title: "OCPL 2025 Season kicks off", slug: "ocpl-2025-opening", excerpt: "Grand opening ceremony at Vasai Sports Ground", content: "The fifth edition began with spectacular ceremony featuring all six teams.", author: "OCPL Media", publish_date: "2025-12-01", category: "News" },
    { title: "Rahul Patil in brilliant form", slug: "rahul-patil-form", excerpt: "Star batsman continues to dominate", content: "Rahul Patil has been the standout performer of the season so far.", author: "Sports Desk", publish_date: "2025-12-02", category: "Feature" },
  ];

  console.log('\nAdding article entries...');
  for (const article of articles) {
    const result = await makeRequest('POST', '/content_types/article/entries?locale=en-us', { entry: article });
    if (result.statusCode >= 200 && result.statusCode < 300) {
      console.log(`✅ ${article.title} (${result.data.entry?.uid})`);
    } else {
      console.log(`❌ ${article.title}: ${result.data.error_message || JSON.stringify(result.data)}`);
    }
    await sleep(500);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);


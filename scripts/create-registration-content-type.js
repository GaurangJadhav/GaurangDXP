/**
 * Create Player Registration content type in Contentstack
 * This will store form submissions and trigger Automate workflows
 * Run with: node scripts/create-registration-content-type.js
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

async function createContentType() {
  console.log("=".repeat(60));
  console.log("CREATING PLAYER REGISTRATION CONTENT TYPE");
  console.log("=".repeat(60));
  console.log("");

  const contentType = {
    content_type: {
      title: "Player Registration",
      uid: "player_registration",
      schema: [
        {
          display_name: "Title",
          uid: "title",
          data_type: "text",
          mandatory: true,
          unique: false,
          field_metadata: {
            _default: true,
          },
        },
        // Personal Information
        {
          display_name: "Full Name",
          uid: "full_name",
          data_type: "text",
          mandatory: true,
          field_metadata: {
            description: "Player's full name",
          },
        },
        {
          display_name: "Email",
          uid: "email",
          data_type: "text",
          mandatory: true,
          field_metadata: {
            description: "Player's email address",
          },
        },
        {
          display_name: "Phone",
          uid: "phone",
          data_type: "text",
          mandatory: true,
          field_metadata: {
            description: "Player's contact number",
          },
        },
        {
          display_name: "Date of Birth",
          uid: "date_of_birth",
          data_type: "isodate",
          mandatory: true,
          field_metadata: {
            description: "Player's date of birth",
          },
        },
        {
          display_name: "Address",
          uid: "address",
          data_type: "text",
          mandatory: false,
          field_metadata: {
            description: "Player's residential address",
            multiline: true,
          },
        },
        // Cricket Information
        {
          display_name: "Preferred Role",
          uid: "preferred_role",
          data_type: "text",
          mandatory: true,
          enum: {
            advanced: false,
            choices: [
              { value: "batsman" },
              { value: "bowler" },
              { value: "all-rounder" },
              { value: "wicket-keeper" },
            ],
          },
          field_metadata: {
            description: "Player's preferred playing role",
          },
        },
        {
          display_name: "Batting Style",
          uid: "batting_style",
          data_type: "text",
          mandatory: true,
          enum: {
            advanced: false,
            choices: [
              { value: "right-handed" },
              { value: "left-handed" },
            ],
          },
          field_metadata: {
            description: "Player's batting style",
          },
        },
        {
          display_name: "Bowling Style",
          uid: "bowling_style",
          data_type: "text",
          mandatory: false,
          enum: {
            advanced: false,
            choices: [
              { value: "fast" },
              { value: "medium" },
              { value: "spin" },
              { value: "none" },
            ],
          },
          field_metadata: {
            description: "Player's bowling style",
          },
        },
        {
          display_name: "Experience (Years)",
          uid: "experience",
          data_type: "text",
          mandatory: false,
          field_metadata: {
            description: "Years of cricket experience",
          },
        },
        {
          display_name: "Preferred Team",
          uid: "preferred_team",
          data_type: "text",
          mandatory: false,
          field_metadata: {
            description: "Team preference (if any)",
          },
        },
        {
          display_name: "Previous Teams",
          uid: "previous_teams",
          data_type: "text",
          mandatory: false,
          field_metadata: {
            description: "Teams played for previously",
          },
        },
        {
          display_name: "Achievements",
          uid: "achievements",
          data_type: "text",
          mandatory: false,
          field_metadata: {
            description: "Notable cricket achievements",
            multiline: true,
          },
        },
        // Registration Status
        {
          display_name: "Registration Status",
          uid: "registration_status",
          data_type: "text",
          mandatory: false,
          enum: {
            advanced: false,
            choices: [
              { value: "pending" },
              { value: "approved" },
              { value: "rejected" },
              { value: "waitlisted" },
            ],
          },
          field_metadata: {
            description: "Current status of the registration",
          },
        },
        {
          display_name: "Registration Date",
          uid: "registration_date",
          data_type: "isodate",
          mandatory: false,
          field_metadata: {
            description: "Date when registration was submitted",
          },
        },
        {
          display_name: "Admin Notes",
          uid: "admin_notes",
          data_type: "text",
          mandatory: false,
          field_metadata: {
            description: "Internal notes for administrators",
            multiline: true,
          },
        },
      ],
      options: {
        is_page: false,
        singleton: false,
        title: "title",
        publishable: true,
      },
    },
  };

  console.log("Creating content type: player_registration...");
  const result = await makeRequest("POST", "/v3/content_types", contentType);

  if (result.status === 201) {
    console.log("✅ Content type created successfully!");
    console.log("");
    console.log("Content Type UID: player_registration");
  } else if (result.data.error_code === 115) {
    console.log("⚠️ Content type already exists");
  } else {
    console.log("❌ Error creating content type:");
    console.log(JSON.stringify(result.data, null, 2));
  }

  console.log("");
  console.log("=".repeat(60));
  console.log("NEXT STEPS: Set up Contentstack Automate");
  console.log("=".repeat(60));
  console.log(`
1. Go to Contentstack Dashboard > Automate

2. Create a new Automation:
   - Name: "Send Registration Confirmation Email"
   - Trigger: "Entry Created" on "player_registration" content type

3. Add Action: "Send Email"
   - To: {{entry.email}}
   - Subject: "Welcome to OCPL - Registration Received!"
   - Body: (Use the email template below)

EMAIL TEMPLATE:
---
Dear {{entry.full_name}},

Thank you for registering for OCPL Season 5! 🏏

We have received your registration with the following details:

📋 REGISTRATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━
Name: {{entry.full_name}}
Email: {{entry.email}}
Phone: {{entry.phone}}
Role: {{entry.preferred_role}}
Batting: {{entry.batting_style}}
Bowling: {{entry.bowling_style}}

Our team will review your application and get back to you soon.

Best regards,
OCPL Team
---

4. Save and Activate the automation
`);
}

createContentType().catch(console.error);


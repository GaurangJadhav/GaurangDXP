import { NextRequest, NextResponse } from "next/server";

// Contentstack Management API configuration
const CONTENTSTACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
const CONTENTSTACK_MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const CONTENTSTACK_REGION = process.env.CONTENTSTACK_REGION || "us"; // us, eu, azure-na, azure-eu

// Get the correct API host based on region
function getApiHost() {
  switch (CONTENTSTACK_REGION) {
    case "eu":
      return "eu-api.contentstack.com";
    case "azure-na":
      return "azure-na-api.contentstack.com";
    case "azure-eu":
      return "azure-eu-api.contentstack.com";
    default:
      return "api.contentstack.io";
  }
}

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address?: string;
  preferredRole: string;
  battingStyle: string;
  bowlingStyle?: string;
  experience?: string;
  preferredTeam?: string;
  previousTeams?: string;
  achievements?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.dateOfBirth || !data.preferredRole || !data.battingStyle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if Management Token is configured
    if (!CONTENTSTACK_API_KEY || !CONTENTSTACK_MANAGEMENT_TOKEN) {
      console.error("Contentstack credentials not configured");
      // For demo purposes, just log and return success
      console.log("Registration received (demo mode):", data);
      return NextResponse.json({
        success: true,
        message: "Registration received (demo mode - Contentstack not configured)",
        data: { name: data.name, email: data.email },
      });
    }

    // Create entry in Contentstack
    const apiHost = getApiHost();
    const entryData = {
      entry: {
        title: `${data.name} - ${new Date().toISOString().split("T")[0]}`,
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        address: data.address || "",
        preferred_role: data.preferredRole,
        batting_style: data.battingStyle,
        bowling_style: data.bowlingStyle || "none",
        experience: data.experience || "",
        preferred_team: data.preferredTeam || "any",
        previous_teams: data.previousTeams || "",
        achievements: data.achievements || "",
        registration_status: "pending",
        registration_date: new Date().toISOString(),
      },
    };

    const response = await fetch(
      `https://${apiHost}/v3/content_types/player_registration/entries`,
      {
        method: "POST",
        headers: {
          "api_key": CONTENTSTACK_API_KEY,
          "authorization": CONTENTSTACK_MANAGEMENT_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Contentstack API error:", result);
      
      // If content type doesn't exist, return helpful message
      if (result.error_code === 118) {
        return NextResponse.json({
          success: false,
          error: "Registration system not configured. Please contact administrator.",
          details: "Content type 'player_registration' not found in Contentstack",
        }, { status: 500 });
      }
      
      return NextResponse.json(
        { error: "Failed to save registration", details: result },
        { status: 500 }
      );
    }

    // Entry created successfully - Automate will handle the email
    console.log("Registration created:", result.entry?.uid);

    return NextResponse.json({
      success: true,
      message: "Registration successful! You will receive a confirmation email shortly.",
      entryId: result.entry?.uid,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


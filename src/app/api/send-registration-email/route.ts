import { NextRequest, NextResponse } from "next/server";

// This endpoint receives webhook from Contentstack Automate
// and sends a confirmation email using Resend

const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface WebhookPayload {
  // Contentstack Automate webhook payload structure
  trigger?: {
    data?: {
      entry?: {
        full_name?: string;
        email?: string;
        phone?: string;
        preferred_role?: string;
        batting_style?: string;
        bowling_style?: string;
        experience?: string;
        preferred_team?: string;
      };
    };
  };
  // Direct entry structure (alternative)
  entry?: {
    full_name?: string;
    email?: string;
    phone?: string;
    preferred_role?: string;
    batting_style?: string;
    bowling_style?: string;
    experience?: string;
    preferred_team?: string;
  };
  // Flat structure (another alternative)
  full_name?: string;
  email?: string;
  phone?: string;
  preferred_role?: string;
  batting_style?: string;
  bowling_style?: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookPayload = await request.json();
    
    console.log("Webhook received:", JSON.stringify(payload, null, 2));

    // Extract entry data from various possible structures
    const entry = 
      payload.trigger?.data?.entry || 
      payload.entry || 
      payload;

    const {
      full_name,
      email,
      phone,
      preferred_role,
      batting_style,
      bowling_style,
    } = entry;

    // Validate required fields
    if (!email || !full_name) {
      console.error("Missing required fields:", { email, full_name });
      return NextResponse.json(
        { error: "Missing required fields: email or full_name" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!RESEND_API_KEY) {
      console.log("Resend not configured. Email would be sent to:", email);
      return NextResponse.json({
        success: true,
        message: "Email skipped (Resend not configured)",
        recipient: email,
      });
    }

    // Build the email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to OCPL</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #1a1a2e; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #e87425, #22c55e); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 32px; letter-spacing: 2px;">🏏 OCPL</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Only Cricket Premier League</p>
      <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 14px;">Season 5 • 2025</p>
    </div>
    
    <!-- Content -->
    <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px;">
      
      <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
        Dear <strong style="color: #e87425;">${full_name}</strong>,
      </p>
      
      <p style="font-size: 16px; color: #555; line-height: 1.6;">
        Thank you for registering for <strong>OCPL Season 5</strong>! We're thrilled to have you join Vasai's premier cricket league.
      </p>
      
      <!-- Registration Details Box -->
      <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #e87425;">
        <h3 style="color: #e87425; margin: 0 0 20px 0; font-size: 18px;">📋 Your Registration Details</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: bold; width: 140px;">Name:</td>
            <td style="padding: 10px 0; color: #333;">${full_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: bold; border-top: 1px solid #ddd;">Email:</td>
            <td style="padding: 10px 0; color: #333; border-top: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: bold; border-top: 1px solid #ddd;">Phone:</td>
            <td style="padding: 10px 0; color: #333; border-top: 1px solid #ddd;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: bold; border-top: 1px solid #ddd;">Role:</td>
            <td style="padding: 10px 0; color: #333; border-top: 1px solid #ddd; text-transform: capitalize;">${preferred_role || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: bold; border-top: 1px solid #ddd;">Batting:</td>
            <td style="padding: 10px 0; color: #333; border-top: 1px solid #ddd; text-transform: capitalize;">${batting_style || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; font-weight: bold; border-top: 1px solid #ddd;">Bowling:</td>
            <td style="padding: 10px 0; color: #333; border-top: 1px solid #ddd; text-transform: capitalize;">${bowling_style || "None"}</td>
          </tr>
        </table>
      </div>
      
      <!-- Next Steps -->
      <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 25px 0;">
        <h3 style="color: #e87425; margin: 0 0 15px 0; font-size: 16px;">📌 What Happens Next?</h3>
        <ol style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
          <li>Our team will review your registration (3-5 days)</li>
          <li>You'll receive a confirmation email with your status</li>
          <li>Selected players will be invited for trials</li>
          <li>Team assignments announced before season starts</li>
        </ol>
      </div>
      
      <p style="font-size: 16px; color: #555; line-height: 1.6;">
        We look forward to seeing you on the field! 🏆
      </p>
      
      <p style="font-size: 16px; color: #555; margin-top: 30px;">
        Best regards,<br>
        <strong style="color: #e87425;">The OCPL Team</strong>
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 30px 20px; color: #888; font-size: 13px;">
      <p style="margin: 0;">© 2025 Only Cricket Premier League (OCPL)</p>
      <p style="margin: 5px 0 0;">Vasai, Maharashtra, India</p>
      <p style="margin: 15px 0 0; font-size: 11px; color: #aaa;">
        You received this email because you registered for OCPL Season 5.
      </p>
    </div>
    
  </div>
</body>
</html>
    `;

    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "OCPL <onboarding@resend.dev>", // Use your verified domain in production
        to: [email],
        subject: `🏏 Welcome to OCPL - Registration Received, ${full_name}!`,
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", result);
      return NextResponse.json(
        { error: "Failed to send email", details: result },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", result);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      emailId: result.id,
      recipient: email,
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "OCPL Registration Email Webhook is running",
    usage: "POST entry data to this endpoint to send confirmation email",
  });
}


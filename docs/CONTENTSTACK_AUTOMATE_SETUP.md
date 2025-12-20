# Contentstack Automate Setup for Email Notifications

This guide explains how to set up Contentstack Automate to send confirmation emails when players register for OCPL.

## Overview

When a player submits the "Join The League" form:
1. The form data is sent to `/api/register`
2. The API creates an entry in the `player_registration` content type
3. Contentstack Automate detects the new entry and sends a confirmation email

## Step 1: Create Management Token

1. Go to **Contentstack Dashboard** → **Settings** → **Tokens**
2. Click **+ Add Token** → **Management Token**
3. Configure:
   - **Name**: `OCPL Registration API`
   - **Description**: `Token for player registration form submissions`
   - **Scope**: Select `player_registration` content type with **Write** permission
4. Click **Generate Token**
5. Copy the token and add it to your environment variables:

```env
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here
```

## Step 2: Create Player Registration Content Type

In Contentstack Dashboard → **Content Models** → **+ New Content Type**:

### Content Type Settings
- **Name**: Player Registration
- **UID**: `player_registration`
- **Description**: Stores player registration form submissions

### Fields to Add

| Field Name | UID | Type | Required |
|------------|-----|------|----------|
| Title | title | Single Line Text | Yes |
| Full Name | full_name | Single Line Text | Yes |
| Email | email | Single Line Text | Yes |
| Phone | phone | Single Line Text | Yes |
| Date of Birth | date_of_birth | Date | Yes |
| Address | address | Multi Line Text | No |
| Preferred Role | preferred_role | Select (batsman, bowler, all-rounder, wicket-keeper) | Yes |
| Batting Style | batting_style | Select (right-handed, left-handed) | Yes |
| Bowling Style | bowling_style | Select (fast, medium, spin, none) | No |
| Experience | experience | Single Line Text | No |
| Preferred Team | preferred_team | Single Line Text | No |
| Previous Teams | previous_teams | Single Line Text | No |
| Achievements | achievements | Multi Line Text | No |
| Registration Status | registration_status | Select (pending, approved, rejected, waitlisted) | No |
| Registration Date | registration_date | Date | No |
| Admin Notes | admin_notes | Multi Line Text | No |

## Step 3: Set Up Contentstack Automate

### 3.1 Access Automate
1. Go to **Contentstack Dashboard**
2. Click **Automate** in the left sidebar
3. Click **+ New Automation**

### 3.2 Configure Trigger

1. **Automation Name**: `Send Registration Confirmation Email`
2. **Description**: `Sends email when a new player registration is created`
3. **Trigger**: Select **Entry Created**
4. **Content Type**: Select `player_registration`

### 3.3 Add Email Action

1. Click **+ Add Action**
2. Select **Send Email** (or use a connector like SendGrid, Mailchimp)
3. Configure the email:

#### Email Configuration

**To (Recipient)**:
```
{{$.trigger.data.entry.email}}
```

**Subject**:
```
🏏 Welcome to OCPL - Registration Received!
```

**Body** (HTML):
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #e87425, #22c55e); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .details h3 { color: #e87425; margin-top: 0; border-bottom: 2px solid #e87425; padding-bottom: 10px; }
    .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; width: 140px; color: #666; }
    .detail-value { color: #333; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .cta { background: #e87425; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏏 OCPL Season 5</h1>
      <p>Only Cricket Premier League</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>{{$.trigger.data.entry.full_name}}</strong>,</p>
      
      <p>Thank you for registering for OCPL Season 5! We're excited to have you join our cricket community.</p>
      
      <div class="details">
        <h3>📋 Your Registration Details</h3>
        
        <div class="detail-row">
          <span class="detail-label">Name:</span>
          <span class="detail-value">{{$.trigger.data.entry.full_name}}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">{{$.trigger.data.entry.email}}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span class="detail-value">{{$.trigger.data.entry.phone}}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Role:</span>
          <span class="detail-value">{{$.trigger.data.entry.preferred_role}}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Batting Style:</span>
          <span class="detail-value">{{$.trigger.data.entry.batting_style}}</span>
        </div>
        
        <div class="detail-row">
          <span class="detail-label">Bowling Style:</span>
          <span class="detail-value">{{$.trigger.data.entry.bowling_style}}</span>
        </div>
      </div>
      
      <h3>📌 What's Next?</h3>
      <ol>
        <li>Our team will review your registration</li>
        <li>You'll receive a confirmation within 3-5 business days</li>
        <li>Selected players will be invited for trials</li>
        <li>Final team assignments will be announced before the season</li>
      </ol>
      
      <p style="text-align: center;">
        <a href="https://ocpl.example.com" class="cta">Visit OCPL Website</a>
      </p>
      
      <p>If you have any questions, feel free to reach out to us.</p>
      
      <p>Best regards,<br><strong>OCPL Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© 2025 Only Cricket Premier League (OCPL)</p>
      <p>Vasai, Maharashtra, India</p>
    </div>
  </div>
</body>
</html>
```

### 3.4 Save and Activate

1. Click **Save**
2. Toggle the automation to **Active**

## Step 4: Update Environment Variables

Add these to your `.env.local` file:

```env
# Existing variables
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=production

# New variable for registration
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
```

For Contentstack Launch, add `CONTENTSTACK_MANAGEMENT_TOKEN` in the environment variables section.

## Step 5: Test the Integration

1. Start the development server: `npm run dev`
2. Go to the homepage
3. Click "Join The League"
4. Fill out the form and submit
5. Check:
   - Contentstack for the new entry in `player_registration`
   - Your email inbox for the confirmation email

## Troubleshooting

### Email not sending?
- Check if the automation is **Active**
- Verify the email connector is properly configured
- Check Automate logs for errors

### Entry not creating?
- Verify the Management Token has write permissions
- Check browser console for API errors
- Ensure content type UID matches exactly: `player_registration`

### Wrong data in email?
- Verify field UIDs match the template variables
- Check the entry in Contentstack to confirm data is saved correctly

## Optional: Add More Automations

### Admin Notification
Create another automation to notify admins when a new registration is received:

- **Trigger**: Entry Created on `player_registration`
- **Action**: Send Email to admin@ocpl.com
- **Subject**: `New Player Registration: {{$.trigger.data.entry.full_name}}`

### Status Change Notification
Notify players when their registration status changes:

- **Trigger**: Entry Updated on `player_registration`
- **Condition**: `registration_status` field changed
- **Action**: Send Email based on new status (approved/rejected/waitlisted)

---

For more information, visit [Contentstack Automate Documentation](https://www.contentstack.com/docs/developers/automate/)


# OCPL - Only Cricket League 🏏

A modern, feature-rich website for **Only Cricket League (OCPL)** - Vasai's premier cricket tournament. Built with Next.js and powered by Contentstack CMS.

![OCPL Banner](https://via.placeholder.com/1200x400/1a1b23/e87425?text=OCPL+-+Only+Cricket+League)

## 🌟 Features

- **Dynamic Content Management** - All content managed through Contentstack CMS
- **Real-time Match Updates** - Live scores and match status updates
- **Team & Player Profiles** - Comprehensive team and player information
- **Points Table** - Auto-updating league standings
- **News & Articles** - Latest news and match reports
- **Personalization** - Tailored content based on user preferences
- **Responsive Design** - Beautiful UI across all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS animations
- **CMS**: Contentstack
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
ocpl-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── teams/             # Teams pages
│   │   ├── players/           # Players pages
│   │   ├── matches/           # Matches pages
│   │   ├── points-table/      # Points table page
│   │   ├── news/              # News pages
│   │   └── gallery/           # Gallery pages
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility functions & Contentstack SDK
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Additional styles
├── contentstack/              # Contentstack configuration
│   ├── content-types/         # Content type schemas
│   ├── entries/               # Sample entries data
│   ├── automate-workflows.json
│   ├── personalization-config.json
│   └── launch-config.json
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Contentstack account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ocpl-website.git
   cd ocpl-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   CONTENTSTACK_ENVIRONMENT=production
   CONTENTSTACK_REGION=us
   CONTENTSTACK_PREVIEW_TOKEN=your_preview_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📊 Contentstack Setup

### Content Types

The following content types need to be created in Contentstack:

| Content Type | Description |
|-------------|-------------|
| `team` | Cricket team information |
| `player` | Player profiles and stats |
| `match` | Match details and scorecards |
| `venue` | Ground/venue information |
| `season` | Season details and awards |
| `points_table` | Team standings |
| `article` | News and match reports |
| `homepage` | Homepage content |
| `gallery` | Photo galleries |

📁 Content type schemas are available in `/contentstack/content-types/`

### Sample Entries

Sample entries for all content types are available in `/contentstack/entries/`. Import these to quickly populate your stack.

## 🎯 Contentstack Features Used

### 1. Personalization

The website uses Contentstack Personalization to deliver tailored content:

- **Team-based personalization**: Show relevant content based on user's favorite team
- **Location-based personalization**: Customize content for users from different localities
- **Engagement-based personalization**: Different experiences for new vs returning visitors

Configuration: `/contentstack/personalization-config.json`

### 2. Automate

Automated workflows configured for:

- **Match Status Updates**: Notifications when matches go live or complete
- **Article Publishing**: Trigger site rebuilds and notifications
- **Points Table Updates**: Auto-calculate standings after match completion
- **Player Stats Updates**: Aggregate player statistics

Configuration: `/contentstack/automate-workflows.json`

### 3. Launch

Deployment configuration for Contentstack Launch:

- Auto-deploy on content publish
- Git-based deployments
- Preview environments
- Custom domains

Configuration: `/contentstack/launch-config.json`

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#e87425` | Brand orange (cricket ball) |
| Secondary | `#22c55e` | Success states (cricket pitch) |
| Accent | `#facc15` | Highlights (trophy gold) |
| Dark | `#1a1b23` | Background |

### Typography

- **Display**: Bebas Neue (headings, scores)
- **Body**: Outfit (content, UI)
- **Mono**: JetBrains Mono (stats, numbers)

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, upcoming matches, teams, news |
| Teams | `/teams` | All teams with stats |
| Team Detail | `/teams/[id]` | Individual team page |
| Players | `/players` | All players listing |
| Player Detail | `/players/[id]` | Individual player profile |
| Matches | `/matches` | Match schedule and results |
| Match Detail | `/matches/[id]` | Match scorecard |
| Points Table | `/points-table` | League standings |
| News | `/news` | All articles |
| Article | `/news/[slug]` | Individual article |
| Gallery | `/gallery` | Photo galleries |

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

### Code Style

- ESLint for code quality
- Prettier for formatting
- TypeScript for type safety

## 📦 Deployment

### Contentstack Launch

1. Connect your GitHub repository to Contentstack Launch
2. Configure environment variables
3. Set up custom domain
4. Enable auto-deploy on content publish

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Development**: Bootcamp Team
- **Design**: OCPL Creative Team
- **Content**: OCPL Media Team

## 📞 Contact

- **Email**: info@ocpl.in
- **Website**: https://ocpl.in
- **Location**: Vasai, Maharashtra, India

---

Made with ❤️ for the cricket lovers of Vasai

*OCPL - Where every player is a star, and every match is a celebration!* 🏆


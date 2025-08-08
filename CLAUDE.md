# ChessStats - Claude Context

## Project Overview

ChessStats is a React-based web application that visualizes Chess.com player statistics. Users can enter any Chess.com username to view detailed rating progression, fun statistics, and interactive charts showing playing patterns and performance insights.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Charts**: Recharts
- **Styling**: Tailwind CSS 4.1.11 with CSS Modules
- **Routing**: React Router DOM 7.7.0

### Key Directory Structure

```
src/
├── Components/
│   ├── BasicStats/         # Rating statistics display
│   ├── ChessStatsBox/      # Fun statistics dashboard
│   ├── InputUserName/      # Username input component  
│   └── MonthlyStats/       # Rating progression charts
├── hooks/                  # Custom React hooks (useChessGames, useChessProfile, etc.)
├── lib/
│   ├── data/              # chessDataService.ts - main data access
│   ├── services/          # API services and statistical calculations
│   │   └── FunStats/      # Individual stat calculation services
│   └── utils/             # Helper utilities
├── Pages/                 # Page components (Dashboard, ErrorPage, landingPage)
└── Types/                 # TypeScript definitions
```

## Data Flow

1. Username validation via Chess.com API
2. Parallel data fetching (games, profile, statistics)
3. Statistical analysis and chart data preparation  
4. Interactive visualization rendering

## Key Services

- **chessDataService.ts**: Main data fetching orchestration
- **gameService.ts**: Chess.com game archive processing
- **profileService.ts**: User profile and basic stats
- **monthlyStatsService.ts**: Rating progression data
- **FunStats/ services**: Individual statistic calculations (BestWin, Nemesis, Rival, etc.)

## Recent Changes

Based on recent commits, the project has undergone:
- Deployment configuration fixes
- UI scaling improvements
- Type safety enhancements and ESLint warning resolution
- Account edge case handling
- Build stability improvements

## Chess.com API Integration

Uses Chess.com Public API endpoints:
- Player profiles: `/pub/player/{username}`
- Player stats: `/pub/player/{username}/stats`
- Game archives: `/pub/player/{username}/games/archives`
- Monthly games: `/pub/player/{username}/games/{YYYY}/{MM}`

## Performance Considerations

- Large game archives (10,000+ games) may cause slower loading
- Rate limiting considerations for high-volume users
- Statistics require minimum game thresholds for accuracy

## Fun Statistics Explained

The application calculates various engaging statistics:
- **Best Win/Worst Loss**: Based on rating differences
- **Win/Losing Streaks**: Consecutive game outcomes
- **Dedication**: Peak gaming days
- **Rival/Nemesis/Victim**: Opponent relationship analysis
- **Child/Parent**: 10+ consecutive wins/losses vs same opponent
# ChessStats

ChessStats is a web application for visualizing and analyzing Chess.com player statistics. Enter any Chess.com username to see detailed rating progression and cool statistics

<img width="1694" height="978" alt="image" src="https://github.com/user-attachments/assets/971c89b0-0741-4acd-91b6-3c9b369c7e83" />

## 🎯 Features

### Rating History & Analytics
- **Monthly Rating Progression**: Interactive charts showing rating evolution over time
- **Multi-Format Support**: Separate analysis for Bullet, Blitz, Rapid, and Daily chess (100 games minimum to be visible)
- **Smart Time Intervals**: Automatically adjusts chart granularity (monthly/yearly) based on data span
- **Games Per Day Calculation**: Shows playing frequency and total games

### Advanced Stats Dashboard (On hover there is a description and explainer)
- **🏆 Best Win**: Your highest-rated victory and the story behind it
- **💔 Worst Loss**: Learning from your most painful defeats
- **🔥 Win Streaks**: Current and longest winning streaks
- **🥀 Losing Streaks**: Track and overcome rough patches
- **🎯 Dedication**: Your most intense chess playing days
- **⚔️ Rival**: The opponent you've played against most frequently
- **😈 Nemesis**: The player who gives you the most trouble
- **🎯 Victim**: The opponent you consistently defeat
- **👶 Child**: Players you've "adopted" by winning 10+ consecutive games in a specific rating class (e.g rapid)
- **👨‍👧‍👦 Parent**: Players who have "adopted" you

### Project Structure

```
src/
├── Components/           # React UI components
│   ├── BasicStats/      # Rating statistics display
│   ├── InputUserName/   # Username search interface
│   ├── MonthlyStats/    # Rating progression charts
│   └── AdvancedStats/   # Advanced statistical visualizations
├── hooks/               # Custom React hooks (useChessGames, useChessProfile, etc.)
├── lib/                 # Core business logic
│   ├── data/           # Data access layer (chessDataService)
│   ├── services/       # API services and data processing
│   │   └── AdvancedStats/   # Statistical analysis services
│   └── utils/          # Utility functions and helpers
├── Pages/              # Page components (Dashboard, ErrorPage, etc.)
├── Types/              # Consolidated TypeScript type definitions
└── Utils/              # Data transformation utilities
```

## 🔄 How It Works

### Data Architecture & Flow

#### 1. Data Acquisition Layer
- **Username Validation**: Real-time validation against Chess.com's player database
- **Parallel Data Fetching**: Simultaneous retrieval of player profile, statistics, and game archives
- **Data Caching**: Optimized data fetching to minimize redundant API calls

#### 2. Data Processing Pipeline
```
Raw Chess.com API Data → Normalization → Statistical Analysis → Chart Data Preparation → UI Rendering
```

**Game Data Processing**:
- Fetches complete game archives from Chess.com's monthly endpoints
- Calculates user perspective (win/loss/draw) based on color and result
- Extracts rating, opponent, and time information

**Statistical Computation**:
- **Time-based Analysis**: Groups games by time class (bullet, blitz, rapid, daily)
- **Rating Progression**: Computes monthly rating changes and trends  
- **Performance Metrics**: Calculates win rates, average ratings, and streaks

#### 3. Core Services

**ChessDataService**: Central orchestration layer that coordinates data fetching
- Manages service dependencies
- Provides unified interface for React components

**GameService**: Specialized game data processor
- Handles Chess.com game archive API endpoints
- Processes large datasets (10,000+ games) efficiently
- Transforms raw game data into standardized format

**ProfileService**: User profile and statistics manager
- Fetches player metadata 
- Handles country information resolution
- Manages profile data normalization

**MonthlyStatsService**: Rating progression analytics
- Processes historical rating data by time periods
- Generates chart-ready data structures
- Handles missing data points 

**Advanced Stats Services**: Specialized statistical calculators
- **BestWinService**: Analyzes rating differentials for optimal victories
- **StreakServices**: Computes consecutive game outcomes
- **RivalService**: Identifies frequent opponents and playing patterns
- **AdoptionService**: Tracks parent/child relationships (10+ consecutive games)

#### 4. Miscellaneous

### Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Charts**: Recharts for interactive data visualization
- **Styling**: Tailwind CSS 4.1.11 with CSS Modules for component-specific styles
- **Routing**: React Router DOM 7.7.0 for navigation
- **API**: Chess.com Public API for live data


## 📝 API Reference

This application uses the [Chess.com Public API](https://www.chess.com/news/view/published-data-api):

- **Player Profile**: `/pub/player/{username}`
- **Player Stats**: `/pub/player/{username}/stats`
- **Game Archives**: `/pub/player/{username}/games/archives`
- **Monthly Games**: `/pub/player/{username}/games/{YYYY}/{MM}`

## Known Issues

- Very large game archives (10,000+ games) may cause slower initial loading
- Rate limiting may affect users with extremely high game volumes
- Some statistics require minimum game thresholds to be meaningful


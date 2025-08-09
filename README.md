# ChessStats

ChessStats is a comprehensive web application for visualizing and analyzing Chess.com player statistics. Enter any Chess.com username to see detailed rating progression, fun statistics, and interactive charts that reveal playing patterns and performance insights.

## 🎯 Features

### Rating History & Analytics
- **Monthly Rating Progression**: Interactive charts showing rating evolution over time
- **Multi-Format Support**: Separate analysis for Bullet, Blitz, Rapid, and Daily chess
- **Smart Time Intervals**: Automatically adjusts chart granularity (weekly/monthly/yearly) based on data span
- **Games Per Day Calculation**: Shows playing frequency and dedication metrics

### Fun Statistics Dashboard
- **🏆 Best Win**: Your highest-rated victory and the story behind it
- **💔 Worst Loss**: Learning from your most painful defeats
- **🔥 Win Streaks**: Current and longest winning streaks
- **📉 Losing Streaks**: Track and overcome rough patches
- **🎯 Dedication**: Your most intense chess playing days
- **🥊 Rival**: The opponent you've played against most frequently
- **😈 Nemesis**: The player who gives you the most trouble
- **🎯 Victim**: The opponent you consistently defeat
- **👶 Child**: Players you've "adopted" by winning 10+ consecutive games in a specific rating class (e.g rapid)
- **👨‍👧‍👦 Parent**: Players who have "adopted" you

### User Experience
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Real-time Data**: Fetches live data from Chess.com API
- **Loading States**: Elegant skeleton screens during data fetching
- **Error Handling**: Graceful fallbacks for network issues
- **Username Validation**: Real-time verification of Chess.com usernames

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ChessStats

# Install dependencies
npm install
# or
yarn install
```

### Running the Application

```bash
# Start development server
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## 🏗️ Architecture

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
│   │   └── FunStats/   # Statistical analysis services
│   └── utils/          # Utility functions and helpers
├── Pages/              # Page components (Dashboard, ErrorPage, etc.)
├── Types/              # Consolidated TypeScript type definitions
└── Utils/              # Data transformation utilities
```

## 🔄 How It Works

### Data Architecture & Flow

The application follows a multi-layered architecture designed for scalability and maintainability:

#### 1. Data Acquisition Layer
- **Username Validation**: Real-time validation against Chess.com's player database
- **Parallel Data Fetching**: Simultaneous retrieval of player profile, statistics, and game archives
- **API Rate Management**: Intelligent handling of Chess.com API rate limits and error responses
- **Data Caching**: Optimized data fetching to minimize redundant API calls

#### 2. Data Processing Pipeline
```
Raw Chess.com API Data → Normalization → Statistical Analysis → Chart Data Preparation → UI Rendering
```

**Game Data Processing**:
- Fetches complete game archives from Chess.com's monthly endpoints
- Transforms raw PGN data into structured game objects
- Calculates user perspective (win/loss/draw) based on color and result
- Extracts rating, opponent, and temporal information

**Statistical Computation**:
- **Time-based Analysis**: Groups games by time class (bullet, blitz, rapid, daily)
- **Rating Progression**: Computes monthly rating changes and trends  
- **Performance Metrics**: Calculates win rates, average ratings, and streaks
- **Opponent Analysis**: Builds relationship matrices for rival/nemesis detection

#### 3. Core Services

**ChessDataService**: Central orchestration layer that coordinates data fetching
- Manages service dependencies and error propagation
- Provides unified interface for React components

**GameService**: Specialized game data processor
- Handles Chess.com game archive API endpoints
- Processes large datasets (10,000+ games) efficiently
- Transforms raw game data into standardized format

**ProfileService**: User profile and statistics manager
- Fetches player metadata and rating statistics
- Handles country information resolution
- Manages profile data normalization

**MonthlyStatsService**: Rating progression analytics
- Processes historical rating data by time periods
- Generates chart-ready data structures
- Handles missing data points and interpolation

**FunStats Services**: Specialized statistical calculators
- **BestWinService**: Analyzes rating differentials for optimal victories
- **StreakServices**: Computes consecutive game outcomes
- **RivalService**: Identifies frequent opponents and playing patterns
- **AdoptionService**: Tracks parent/child relationships (10+ consecutive games)

#### 4. Frontend Architecture

**Component Hierarchy**:
```
Dashboard
├── InputUserName (username validation & search)
├── BasicStats (rating overview & charts)
├── MonthlyStats (rating progression visualization)
└── AdvancedStats (fun statistics & insights)
```

**State Management**:
- Custom React hooks for data fetching (`useChessGames`, `useChessProfile`, `useChessStats`)
- Local component state for UI interactions
- Error boundaries for graceful failure handling

**Data Visualization**:
- **Recharts Integration**: Interactive charts with responsive design
- **Dynamic Scaling**: Automatic time interval selection based on data density
- **Multi-series Support**: Comparative analysis across different time classes

### Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Charts**: Recharts for interactive data visualization
- **Styling**: Tailwind CSS 4.1.11 with CSS Modules for component-specific styles
- **Routing**: React Router DOM 7.7.0 for navigation
- **API**: Chess.com Public API for live data

### Performance & Scalability

#### Data Processing Optimization
- **Lazy Loading**: Components render progressively as data becomes available
- **Memory Management**: Efficient processing of large game datasets (10,000+ games)
- **Async Processing**: Non-blocking statistical calculations using web workers principles
- **Error Recovery**: Graceful degradation when API limits are reached

#### API Integration Strategy
- **Rate Limit Handling**: Implements exponential backoff for Chess.com API limits
- **Concurrent Requests**: Parallel fetching of different data types (profile, stats, games)
- **Data Validation**: Robust type checking and data sanitization
- **Cache Optimization**: Minimizes redundant API calls through intelligent caching

#### Statistical Processing
- **Algorithmic Efficiency**: O(n) complexity for most statistical calculations
- **Data Structures**: Optimized data structures for rapid querying and filtering
- **Memory Footprint**: Minimal memory usage through streaming data processing
- **Real-time Updates**: Incremental calculations for dynamic chart updates

## 📊 Statistics Explained

### Fun Statistics Details

**🏆 Best Win**: Calculated based on the highest rating difference in your favor when you won a game.

**💔 Worst Loss**: Determined by the largest rating gap when you lost to a lower-rated opponent.

**🔥 Win/Losing Streaks**: Tracks consecutive wins/losses chronologically across all games.

**🎯 Dedication**: Finds the day you played the most games, showing your peak chess activity.

**🥊 Rival**: The opponent you've played against most frequently (minimum 3 games required).

**😈 Nemesis**: The player you lose to most often (minimum 2 losses required).

**🎯 Victim**: The opponent you beat most consistently (minimum 2 wins required).

**👶 Child/👨‍👧‍👦 Parent**: Based on 10+ consecutive wins/losses against the same opponent in the same time class.

## 🔧 Configuration

### Environment Variables

No environment variables are required as the app uses the public Chess.com API.

### Customization

- **Time Classes**: Modify the `CHESS_TIME_CLASSES` constant in `src/Utils/buildChartData.tsx` to adjust supported chess formats
- **Chart Colors**: Update color schemes in the MonthlyStatsBox component
- **Statistics**: Add new fun statistics by creating services in `src/lib/services/FunStats/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add JSDoc comments for complex functions
- Use semantic component naming
- Maintain consistent code style with ESLint
- Test edge cases for statistical calculations

## 📝 API Reference

This application uses the [Chess.com Public API](https://www.chess.com/news/view/published-data-api):

- **Player Profile**: `/pub/player/{username}`
- **Player Stats**: `/pub/player/{username}/stats`
- **Game Archives**: `/pub/player/{username}/games/archives`
- **Monthly Games**: `/pub/player/{username}/games/{YYYY}/{MM}`

## 🐛 Known Issues

- Very large game archives (10,000+ games) may cause slower initial loading
- Rate limiting may affect users with extremely high game volumes
- Some statistics require minimum game thresholds to be meaningful

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Chess.com for providing the public API
- The React and TypeScript communities
- Recharts for excellent charting capabilities
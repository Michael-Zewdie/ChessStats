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
│   ├── ChessStatsBox/   # Fun statistics dashboard
│   │   └── StatBoxes/   # Individual stat components
│   ├── InputUserName/   # Username search interface
│   └── MonthlyStats/    # Rating progression charts
├── hooks/               # Custom React hooks
├── lib/                 # Core business logic
│   ├── data/           # Data access layer
│   ├── services/       # API services and data processing
│   │   └── FunStats/   # Statistical analysis services
│   └── utils/          # Utility functions
├── Pages/              # Page components
├── Types/              # TypeScript type definitions
└── Utils/              # Data transformation utilities
```

### Key Components

#### Data Flow
1. **Username Input** → Username validation via Chess.com API
2. **Data Fetching** → Parallel fetching of games, profile, and statistics
3. **Data Processing** → Statistical analysis and chart data preparation
4. **Visualization** → Interactive charts and statistics display

#### Core Services

**GameService** - Fetches and processes game data from Chess.com archives
**ProfileService** - Handles user profile and statistics data
**MonthlyStatsService** - Processes rating progression data
**FunStats Services** - Individual services for each fun statistic calculation

### Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Charts**: Recharts for interactive data visualization
- **Styling**: Tailwind CSS with CSS Modules for component-specific styles
- **Routing**: React Router DOM for navigation
- **API**: Chess.com Public API for live data

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
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChessStatView is a React + TypeScript web application that visualizes Chess.com player statistics and rating histories. It's built with Vite, uses Tailwind CSS for styling, and Recharts for data visualization.

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

### Application Structure
- **Frontend-only app**: No backend server, directly consumes Chess.com public API
- **Single Page Application**: React Router with two main routes:
  - `/` - Landing page with username input
  - `/profile/:username` - Dashboard displaying user stats and charts

### Key Directories
- `src/Api/` - API integration modules for Chess.com endpoints
- `src/Components/` - Reusable UI components organized by feature
- `src/hooks/` - Custom React hooks for data fetching and state management  
- `src/Types/` - TypeScript type definitions for Chess.com API responses
- `src/Utils/` - Data transformation and utility functions
- `src/Config/` - Configuration constants (e.g., chess time controls)
- `src/Pages/` - Top-level page components

### Data Flow
1. User enters username on landing page
2. Dashboard page uses custom hooks (useChessStats, useChessProfile, useMonthlyStats) 
3. Hooks fetch data from Chess.com API via route modules in `src/Api/`
4. Raw API responses are transformed using utility functions
5. Components render charts and stats using processed data

### Chess.com API Integration
- **Basic Stats**: `/pub/player/{username}/stats` - current ratings and game records
- **Profile Info**: `/pub/player/{username}` - user profile and avatar
- **Monthly Archives**: `/pub/player/{username}/games/{YYYY}/{MM}` - historical game data
- **Country Info**: `/pub/country/{country}` - country name resolution

### Component Architecture
Components follow a pattern of UI component + Box wrapper:
- `*UI.tsx` - Pure presentational component
- `*Box.tsx` - Container with data fetching and state management
- CSS modules in `styles/` subdirectories for component-specific styling

### TypeScript Configuration
- Uses project references with separate configs for app and build tools
- Strict mode enabled with comprehensive type checking
- Custom types defined for all Chess.com API responses

### Styling
- Tailwind CSS v4 with Vite plugin
- CSS modules for component-specific styles
- Responsive design patterns throughout

## Testing and Quality
- ESLint configuration with TypeScript, React hooks, and React refresh rules
- No test framework currently configured
- Type checking with `tsc -b` during build process
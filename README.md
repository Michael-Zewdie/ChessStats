# ChessStatView

ChessStatView is a web application for visualizing and comparing Chess.com player rating histories. Enter a Chess.com username to see detailed rating trends by time control (bullet, blitz, rapid, etc.), with interactive charts and stats.

image.png


## Features

- **User Search:** Enter any valid Chess.com username to view their rating history.
- **Rating History Visualization:**
  - Fetches monthly game archives from the Chess.com API.
  - Aggregates and displays rating progression for each time control (bullet, blitz, rapid, daily).
  - Interactive area chart with color-coded lines for each time class.
- **Responsive UI:** Clean, modern interface with loading and error states.
- **TypeScript & React:** Built with Vite, React, and TypeScript for speed and reliability.

## Planned Features
- **Player Comparison:** Compare two or more players' rating progressions side-by-side.
- **Export:** Download charts as PNG or CSV.
- **Advanced Stats:** Peak, average, and streak annotations.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/Components/` — UI components (profile, stats, charts)
- `src/hooks/` — Custom React hooks for data fetching
- `src/Api/` — API integration and backend logic
- `src/Types/` — TypeScript type definitions
- `src/Utils/` — Data transformation utilities



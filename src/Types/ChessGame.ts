// Raw Chess.com API game data (directly from API)
export interface ChessComGameRaw {
  end_time?: number;           // Unix timestamp when game ended
  time_class: string;          // Time control (bullet, blitz, rapid, daily)
  white: {                     // White player info
    username: string;
    rating: number;
    result?: string;           // 'win', 'checkmated', 'resigned', etc.
  };
  black: {                     // Black player info  
    username: string;
    rating: number;
    result?: string;           // 'win', 'checkmated', 'resigned', etc.
  };
  rules?: string;              // Game variant (e.g., 'chess', 'kingofthehill')
  pgn?: string;               // Portable Game Notation (if needed for analysis)
  url?: string;               // Link to game on Chess.com
  fen?: string;               // Final position in FEN notation
}

// Processed/normalized game data (for internal use after transformation)
export interface ChessGame {
  opponent: string;            // Opponent's username (calculated based on user perspective)
  result: 'win' | 'loss' | 'draw';  // Game result from user's perspective
  userRating: number;          // User's rating in this game
  opponentRating: number;      // Opponent's rating in this game
  date: string;                // ISO date string (calculated from end_time)
  time_class: string;          // Time control (bullet, blitz, rapid, daily)
  gameUrl?: string;            // URL to view the game on Chess.com
}

// // Type aliases for backward compatibility and clarity
// export type ChessComGame = ChessComGameRaw;
// export type ChessComGameDetailed = ChessComGameRaw;
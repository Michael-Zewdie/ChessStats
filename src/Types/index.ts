// ========================================
// CHESS.COM API TYPES (Raw from API)
// ========================================

export interface ChessComGameRaw {
  end_time?: number;
  time_class: string;
  white: {
    username: string;
    rating: number;
    result?: string;
  };
  black: {
    username: string;
    rating: number;
    result?: string;
  };
  rules?: string;
  pgn?: string;
  url?: string;
  fen?: string;
}

export interface RawChessProfile {
  avatar: string;
  player_id: number;
  "@id": string;
  url: string;
  name: string;
  username: string;
  followers: number;
  country: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league: string;
  streaming_platforms: string[];
}

// ========================================
// PROCESSED TYPES (Internal use)
// ========================================

export interface ChessGame {
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  userRating: number;
  opponentRating: number;
  date: string;
  time_class: string;
  gameUrl?: string;
}

export interface ChessProfile {
  avatar: string;
  player_id: number;
  name: string;
  username: string;
  followers: number;
  country: string;
  status: string;
  streaming_platforms: string[];
}

export interface GameRecord {
  win: number;
  loss: number;
  draw: number;
  time_per_move?: number;
  timeout_percent?: number;
}

export interface RatingInfo {
  rating: number;
  date: number;
  rd?: number;
  game?: string;
}

export interface ModeStats {
  last: RatingInfo;
  best: RatingInfo;
  record: GameRecord;
}

export interface ChessProfileStats {
  chess_daily?: ModeStats;
  chess_rapid?: ModeStats;
  chess_bullet?: ModeStats;
  chess_blitz?: ModeStats;
  tactics?: {
    highest: { rating: number; date: number };
    lowest: { rating: number; date: number };
  };
  puzzle_rush?: {
    best: { total_attempts: number; score: number };
  };
}

// ========================================
// CHART & UI TYPES
// ========================================

export interface MonthlyRatingPoint {
  month: string;
  start: number;
  end: number;
  change: number;
  time_class: string;
  firstGameDate?: string;
  totalGames?: number;
  lastGameDate?: string;
}

export interface ChartRow {
  name: string;
  current: number;
  best: number;
}

export interface ComparisonPoint {
  month: string;
  time_class: string;
  [username: string]: string | number;
}

export interface MultiPlayerData {
  [username: string]: MonthlyRatingPoint[];
}

// ========================================
// API & UTILITY TYPES
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
  details?: unknown;
}

export interface ProfileApiResponse {
  profile: ChessProfile | null;
  stats: ChessProfileStats | null;
  country?: string;
}

export interface GetUserRequest {
  username: string;
}

export type ModeKey = 'chess_daily' | 'chess_rapid' | 'chess_bullet' | 'chess_blitz';

// ========================================
// LEGACY COMPATIBILITY EXPORTS
// ========================================

export type { RawChessProfile as rawChessProfile };
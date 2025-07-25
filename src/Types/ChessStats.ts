type GameRecord = {
  win: number;
  loss: number;
  draw: number;
  time_per_move?: number; // only for daily
  timeout_percent?: number; // only for daily
};

type RatingInfo = {
  rating: number;
  date: number;
  rd?: number; // only in "last"
  game?: string; // only in "best"
};

type ModeStats = {
  last: RatingInfo;
  best: RatingInfo;
  record: GameRecord;
};

type TacticsStats = {
  highest: {
    rating: number;
    date: number;
  };
  lowest: {
    rating: number;
    date: number;
  };
};

type PuzzleRushStats = {
  best: {
    total_attempts: number;
    score: number;
  };
};

export type ChessProfileStats = {
  chess_daily: ModeStats;
  chess_rapid: ModeStats;
  chess_bullet: ModeStats;
  chess_blitz: ModeStats;
  tactics: TacticsStats;
  puzzle_rush: PuzzleRushStats;
};
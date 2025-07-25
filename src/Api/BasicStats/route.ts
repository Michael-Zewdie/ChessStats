import type { ChessProfileStats } from "../../Types/ChessStats";

function normalizeBestRating(control: any): void {
  if (!control) return;
  if (!control.best || control.best.rating === 100 || control.best.rating < control.last.rating) {
    control.best = { ...control.last };
  }
}

function toChessProfileStats(raw: any): ChessProfileStats {
  normalizeBestRating(raw.chess_daily);
  normalizeBestRating(raw.chess_rapid);
  normalizeBestRating(raw.chess_bullet);
  normalizeBestRating(raw.chess_blitz);

  return {
    chess_daily: raw.chess_daily,
    chess_rapid: raw.chess_rapid,
    chess_bullet: raw.chess_bullet,
    chess_blitz: raw.chess_blitz,
    tactics: raw.tactics,
    puzzle_rush: raw.puzzle_rush,
  };
}

export async function fetchStats(username: string): Promise<ChessProfileStats> {
  const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
  const json = await res.json();
  return toChessProfileStats(json);
}
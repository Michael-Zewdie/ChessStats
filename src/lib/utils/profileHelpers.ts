import type { ChessProfile, rawChessProfile, ChessProfileStats } from '../../Types/index';

type ModeStats = NonNullable<ChessProfileStats['chess_blitz']>;

export function normalizeBestRating(control: ModeStats | undefined): void {
  if (!control) return;
  if (!control.best || control.best.rating === 100 || control.best.rating < control.last.rating) {
    control.best = { ...control.last };
  }
}

export function toChessProfileStats(raw: ChessProfileStats): ChessProfileStats {
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

export function toChessProfile(raw: rawChessProfile): ChessProfile {
  return {
    avatar: raw.avatar ?? "",
    player_id: raw.player_id ?? 0,
    name: raw.name ?? "",
    username: raw.username ?? "",
    followers: raw.followers ?? 0,
    country: raw.country ?? "",
    status: raw.status ?? "basic",
    streaming_platforms: Array.isArray(raw.streaming_platforms) ? raw.streaming_platforms : [],
  };
}
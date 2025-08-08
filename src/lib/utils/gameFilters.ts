import type { ChessGame } from '../../Types/ChessGame';
import type { ChessProfileStats } from '../../Types/ChessStats';
import { MINIMUM_GAME_COUNTS, TIME_CONTROLS, type TimeControlKey } from '../config/gameThresholds';

/**
 * Count games by time class from the games array
 */
export function countGamesByTimeClass(games: ChessGame[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  games.forEach(game => {
    const timeClass = game.time_class;
    counts[timeClass] = (counts[timeClass] || 0) + 1;
  });
  
  return counts;
}

/**
 * Get total game count across all time controls
 */
export function getTotalGameCount(games: ChessGame[]): number {
  return games.length;
}

/**
 * Check if user has enough total games to show any statistics
 */
export function hasEnoughGamesTotal(games: ChessGame[]): boolean {
  return getTotalGameCount(games) >= MINIMUM_GAME_COUNTS.TOTAL_MINIMUM;
}

/**
 * Check if user has at least 100 games in ANY single time_class
 * This determines whether to show statistics at all
 */
export function hasEnoughGamesInAnyTimeClass(games: ChessGame[]): boolean {
  const gameCounts = countGamesByTimeClass(games);
  
  // Check if any time class has at least 100 games
  return Object.values(gameCounts).some(count => count >= 100);
}

/**
 * Get time controls that have enough games to display
 */
export function getEligibleTimeControls(games: ChessGame[]): TimeControlKey[] {
  const gameCounts = countGamesByTimeClass(games);
  const eligibleControls: TimeControlKey[] = [];
  
  Object.entries(TIME_CONTROLS).forEach(([key, value]) => {
    const timeClass = value.replace('chess_', ''); // 'chess_blitz' -> 'blitz'
    const count = gameCounts[timeClass] || 0;
    
    if (count >= MINIMUM_GAME_COUNTS[key as TimeControlKey]) {
      eligibleControls.push(key as TimeControlKey);
    }
  });
  
  return eligibleControls;
}

/**
 * Filter stats object to only include time controls with enough games
 */
export function filterStatsForEligibleTimeControls(
  stats: ChessProfileStats, 
  eligibleTimeControls: TimeControlKey[]
): Partial<ChessProfileStats> {
  const filteredStats: Partial<ChessProfileStats> = {
    tactics: stats.tactics,
    puzzle_rush: stats.puzzle_rush
  };
  
  eligibleTimeControls.forEach(control => {
    const timeControlKey = TIME_CONTROLS[control];
    if (stats[timeControlKey]) {
      filteredStats[timeControlKey] = stats[timeControlKey];
    }
  });
  
  return filteredStats;
}

/**
 * Check if a specific time control has enough games
 */
export function hasEnoughGamesForTimeControl(games: ChessGame[], timeControl: TimeControlKey): boolean {
  const gameCounts = countGamesByTimeClass(games);
  const timeClass = TIME_CONTROLS[timeControl].replace('chess_', '');
  const count = gameCounts[timeClass] || 0;
  
  return count >= MINIMUM_GAME_COUNTS[timeControl];
}
import type { ChessGame } from '../../../Types/index';

export interface LosingStreakStats {
  worstLosingStreak: number;
}

export class LosingStreakService {
  static calculate(games: ChessGame[]): LosingStreakStats {
    if (!games?.length) {
      return { worstLosingStreak: 0 };
    }
    
    const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let currentStreak = 0;
    let worstLosingStreak = 0;
    
    for (const game of sortedGames) {
      if (game.result === 'loss') {
        currentStreak++;
        worstLosingStreak = Math.max(worstLosingStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return {
      worstLosingStreak
    };
  }
}
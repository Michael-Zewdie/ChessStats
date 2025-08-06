import type { ChessGame } from '../../../Types/ChessGame';

export interface LosingStreakStats {
  worstLosingStreak: number;
}

export class LosingStreakService {
  static calculate(games: ChessGame[]): LosingStreakStats {
    if (!games || games.length === 0) {
      return { worstLosingStreak: 0 };
    }
    
    try {
      // Sort games by date to ensure chronological order
      const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      let currentStreak = 0;
      let worstLosingStreak = 0;
      
      for (const game of sortedGames) {
        if (game.result === 'loss') {
          currentStreak++;
          worstLosingStreak = Math.max(worstLosingStreak, currentStreak);
        } else {
          // Reset streak on win or draw
          currentStreak = 0;
        }
      }
      
      return {
        worstLosingStreak
      };
    } catch (error) {
      return { worstLosingStreak: 0 };
    }
  }
}
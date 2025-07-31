import type { ChessGame } from '../../../Types/ChessGame';

export interface TiltmasterStats {
  worstLosingStreak: number;
}

export class TiltmasterService {
  static calculate(games: ChessGame[]): TiltmasterStats {
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
      console.error('Error calculating tiltmaster stats:', error);
      return { worstLosingStreak: 0 };
    }
  }
}
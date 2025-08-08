import type { ChessGame } from '../../../Types/ChessGame';

export interface WinStreakStats {
  longestWinStreak: number;
  currentWinStreak: number;
  totalWins: number;
}

export class WinStreakService {
  static calculate(games: ChessGame[]): WinStreakStats {
    if (!games || games.length === 0) {
      return { longestWinStreak: 0, currentWinStreak: 0, totalWins: 0 };
    }
    
    try {
      // Sort games by date to ensure chronological order
      const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      let currentStreak = 0;
      let longestWinStreak = 0;
      let currentWinStreak = 0;
      const totalWins = games.filter(game => game.result === 'win').length;
      
      for (let i = 0; i < sortedGames.length; i++) {
        const game = sortedGames[i];
        
        if (game.result === 'win') {
          currentStreak++;
          longestWinStreak = Math.max(longestWinStreak, currentStreak);
          
          // If this is the most recent game and it's a win, update current streak
          if (i === sortedGames.length - 1) {
            currentWinStreak = currentStreak;
          }
        } else {
          // Reset streak on loss or draw
          currentStreak = 0;
          
          // If this is the most recent game and it's not a win, current streak is 0
          if (i === sortedGames.length - 1) {
            currentWinStreak = 0;
          }
        }
      }
      
      return {
        longestWinStreak,
        currentWinStreak,
        totalWins
      };
    } catch {
      return { longestWinStreak: 0, currentWinStreak: 0, totalWins: 0 };
    }
  }
}
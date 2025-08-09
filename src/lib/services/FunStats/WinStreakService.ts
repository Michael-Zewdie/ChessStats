import type { ChessGame } from '../../../Types/index';

export interface WinStreakStats {
  longestWinStreak: number;
  currentWinStreak: number;
  totalWins: number;
}

export class WinStreakService {
  static calculate(games: ChessGame[]): WinStreakStats {
    if (!games?.length) {
      return { longestWinStreak: 0, currentWinStreak: 0, totalWins: 0 };
    }
    
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
        
        if (i === sortedGames.length - 1) {
          currentWinStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
        
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
  }
}
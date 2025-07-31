import type { ChessGame } from '../../../Types/ChessGame';

export interface BestWinStats {
  bestWinScore: number;
  totalGamesAgainstHigherRated: number;
  winsAgainstHigherRated: number;
}

export class BestWinService {
  static calculate(games: ChessGame[]): BestWinStats {
    if (!games || games.length === 0) {
      return { bestWinScore: 0, totalGamesAgainstHigherRated: 0, winsAgainstHigherRated: 0 };
    }
    
    try {
      const gamesAgainstHigherRated = games.filter(game => 
        game.opponentRating && game.userRating && game.opponentRating > game.userRating
      );
      const winsAgainstHigherRated = gamesAgainstHigherRated.filter(game => game.result === 'win').length;
      
      const bestWinScore = gamesAgainstHigherRated.length > 0 
        ? Math.round((winsAgainstHigherRated / gamesAgainstHigherRated.length) * 100)
        : 0;
      
      return {
        bestWinScore,
        totalGamesAgainstHigherRated: gamesAgainstHigherRated.length,
        winsAgainstHigherRated
      };
    } catch (error) {
      console.error('Error calculating best win stats:', error);
      return { bestWinScore: 0, totalGamesAgainstHigherRated: 0, winsAgainstHigherRated: 0 };
    }
  }

  static findBestWin(games: ChessGame[]): { 
    opponent: string; 
    ratingDiff: number; 
    userRating: number; 
    opponentRating: number; 
    timeClass: string 
  } | null {
    if (!games || games.length === 0) return null;
    
    try {
      const bestWins = games.filter(game => 
        game.result === 'win' && 
        game.opponentRating && 
        game.userRating && 
        game.opponentRating > game.userRating
      );
      
      if (bestWins.length === 0) return null;
      
      const bestWin = bestWins.reduce((biggest, current) => {
        const currentDiff = current.opponentRating - current.userRating;
        const biggestDiff = biggest.opponentRating - biggest.userRating;
        return currentDiff > biggestDiff ? current : biggest;
      });

      return {
        opponent: bestWin.opponent,
        ratingDiff: bestWin.opponentRating - bestWin.userRating,
        userRating: bestWin.userRating,
        opponentRating: bestWin.opponentRating,
        timeClass: bestWin.time_class
      };
    } catch (error) {
      console.error('Error finding best win:', error);
      return null;
    }
  }
}
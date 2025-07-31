import type { ChessGame } from '../../../Types/ChessGame';

export interface UpsetStats {
  upsetScore: number;
  totalGamesAgainstHigherRated: number;
  winsAgainstHigherRated: number;
}

export class UpsetService {
  static calculate(games: ChessGame[]): UpsetStats {
    if (!games || games.length === 0) {
      return { upsetScore: 0, totalGamesAgainstHigherRated: 0, winsAgainstHigherRated: 0 };
    }
    
    try {
      const gamesAgainstHigherRated = games.filter(game => 
        game.opponentRating && game.userRating && game.opponentRating > game.userRating
      );
      const winsAgainstHigherRated = gamesAgainstHigherRated.filter(game => game.result === 'win').length;
      
      const upsetScore = gamesAgainstHigherRated.length > 0 
        ? Math.round((winsAgainstHigherRated / gamesAgainstHigherRated.length) * 100)
        : 0;
      
      return {
        upsetScore,
        totalGamesAgainstHigherRated: gamesAgainstHigherRated.length,
        winsAgainstHigherRated
      };
    } catch (error) {
      console.error('Error calculating upset stats:', error);
      return { upsetScore: 0, totalGamesAgainstHigherRated: 0, winsAgainstHigherRated: 0 };
    }
  }

  static findBiggestUpset(games: ChessGame[]): { opponent: string; ratingDiff: number } | null {
    if (!games || games.length === 0) return null;
    
    try {
      const upsetWins = games.filter(game => 
        game.result === 'win' && 
        game.opponentRating && 
        game.userRating && 
        game.opponentRating > game.userRating
      );
      
      if (upsetWins.length === 0) return null;
      
      const biggestUpset = upsetWins.reduce((biggest, current) => {
        const currentDiff = current.opponentRating - current.userRating;
        const biggestDiff = biggest.opponentRating - biggest.userRating;
        return currentDiff > biggestDiff ? current : biggest;
      });

      return {
        opponent: biggestUpset.opponent,
        ratingDiff: biggestUpset.opponentRating - biggestUpset.userRating
      };
    } catch (error) {
      console.error('Error finding biggest upset:', error);
      return null;
    }
  }
}
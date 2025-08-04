import type { ChessGame } from '../../../Types/ChessGame';

type BestWin = {
  opponent: string; 
  ratingDiff: number; 
  userRating: number; 
  opponentRating: number; 
  timeClass: string;
}

export class BestWinService {

  static findBestWin(games: ChessGame[]): BestWin | null {
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
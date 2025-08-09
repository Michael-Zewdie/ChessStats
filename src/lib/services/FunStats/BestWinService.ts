import type { ChessGame } from '../../../Types/index';

type BestWin = {
  opponent: string; 
  ratingDiff: number; 
  userRating: number; 
  opponentRating: number; 
  timeClass: string;
  gameUrl?: string;
}

export class BestWinService {

  static findBestWin(games: ChessGame[]): BestWin | null {
    if (!games?.length) return null;
    
    const bestWins = games.filter(game => 
      game.result === 'win' && 
      game.opponentRating && 
      game.userRating && 
      game.opponentRating > game.userRating
    );
    
    if (!bestWins.length) return null;
    
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
      timeClass: bestWin.time_class,
      gameUrl: bestWin.gameUrl
    };
  }
}
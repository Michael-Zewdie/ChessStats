import type { ChessGame } from '../../../Types/ChessGame';

export interface BullyStats {
  bullyScore: number;
  totalGamesAgainstLowerRated: number;
  winsAgainstLowerRated: number;
}

export class BullyService {
  static calculate(games: ChessGame[]): BullyStats {
    if (!games || games.length === 0) {
      return { bullyScore: 0, totalGamesAgainstLowerRated: 0, winsAgainstLowerRated: 0 };
    }
    
    try {
      const gamesAgainstLowerRated = games.filter(game => 
        game.opponentRating && game.userRating && game.opponentRating < game.userRating
      );
      const winsAgainstLowerRated = gamesAgainstLowerRated.filter(game => game.result === 'win').length;
      
      const bullyScore = gamesAgainstLowerRated.length > 0 
        ? Math.round((winsAgainstLowerRated / gamesAgainstLowerRated.length) * 100)
        : 0;
      
      return {
        bullyScore,
        totalGamesAgainstLowerRated: gamesAgainstLowerRated.length,
        winsAgainstLowerRated
      };
    } catch (error) {
      console.error('Error calculating bully stats:', error);
      return { bullyScore: 0, totalGamesAgainstLowerRated: 0, winsAgainstLowerRated: 0 };
    }
  }
}
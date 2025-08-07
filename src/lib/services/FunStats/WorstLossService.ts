import type { ChessGame } from '../../../Types/ChessGame';

export interface WorstLossStats {
  worstLossScore: number;
  totalLosses: number;
}

export class WorstLossService {
  static calculate(games: ChessGame[]): WorstLossStats {
    if (!games || games.length === 0) {
      return { worstLossScore: 0, totalLosses: 0 };
    }
    
    try {
      const losses = games.filter(game => game.result === 'loss');
      const totalLosses = losses.length;
      
      const worstLoss = this.findWorstLoss(games);
      const worstLossScore = worstLoss ? worstLoss.ratingDiff : 0;
      
      return {
        worstLossScore,
        totalLosses
      };
    } catch {
      return { worstLossScore: 0, totalLosses: 0 };
    }
  }

  static findWorstLoss(games: ChessGame[]): { 
    opponent: string; 
    ratingDiff: number; 
    userRating: number; 
    opponentRating: number; 
    timeClass: string;
    gameUrl?: string;
  } | null {
    if (!games || games.length === 0) return null;
    
    try {
      const losses = games.filter(game => 
        game.result === 'loss' && 
        game.opponentRating && 
        game.userRating
      );
      
      if (losses.length === 0) return null;
      
      // Find the loss with the greatest rating difference (user rating - opponent rating)
      // Positive difference means we lost to a lower-rated player (worse loss)
      const worstLoss = losses.reduce((worst, current) => {
        const currentDiff = current.userRating - current.opponentRating;
        const worstDiff = worst.userRating - worst.opponentRating;
        return currentDiff > worstDiff ? current : worst;
      });

      return {
        opponent: worstLoss.opponent,
        ratingDiff: worstLoss.userRating - worstLoss.opponentRating,
        userRating: worstLoss.userRating,
        opponentRating: worstLoss.opponentRating,
        timeClass: worstLoss.time_class,
        gameUrl: worstLoss.gameUrl
      };
    } catch {
      return null;
    }
  }
}
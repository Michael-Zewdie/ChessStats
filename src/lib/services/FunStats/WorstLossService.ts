import type { ChessGame } from '../../../Types/index';

export interface WorstLossStats {
  worstLossScore: number;
  totalLosses: number;
}

export class WorstLossService {
  static calculate(games: ChessGame[]): WorstLossStats {
    if (!games?.length) {
      return { worstLossScore: 0, totalLosses: 0 };
    }
    
    const losses = games.filter(game => game.result === 'loss');
    const totalLosses = losses.length;
    
    const worstLoss = this.findWorstLoss(games);
    const worstLossScore = worstLoss ? worstLoss.ratingDiff : 0;
    
    return {
      worstLossScore,
      totalLosses
    };
  }

  static findWorstLoss(games: ChessGame[]): { 
    opponent: string; 
    ratingDiff: number; 
    userRating: number; 
    opponentRating: number; 
    timeClass: string;
    gameUrl?: string;
  } | null {
    if (!games?.length) return null;
    
    const losses = games.filter(game => 
      game.result === 'loss' && 
      game.opponentRating && 
      game.userRating
    );
    
    if (!losses.length) return null;
    
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
  }
}
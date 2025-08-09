import type { ChessGame } from '../../../Types/index';

export interface NemesisStats {
  nemesisOpponent: string | null;
  lossesToNemesis: number;
  totalGamesVsNemesis: number;
  winRateVsNemesis: number;
}

export class NemesisService {
  static calculate(games: ChessGame[]): NemesisStats {
    if (!games?.length) {
      return { nemesisOpponent: null, lossesToNemesis: 0, totalGamesVsNemesis: 0, winRateVsNemesis: 0 };
    }
    const lossesPerOpponent = new Map<string, number>();
    const totalGamesPerOpponent = new Map<string, number>();
    const winsPerOpponent = new Map<string, number>();
    
    for (const game of games) {
      const opponent = game.opponent;
      
      totalGamesPerOpponent.set(opponent, (totalGamesPerOpponent.get(opponent) ?? 0) + 1);
      
      if (game.result === 'loss') {
        lossesPerOpponent.set(opponent, (lossesPerOpponent.get(opponent) ?? 0) + 1);
      }
      
      if (game.result === 'win') {
        winsPerOpponent.set(opponent, (winsPerOpponent.get(opponent) ?? 0) + 1);
      }
    }
    
    let nemesisOpponent: string | null = null;
    let maxLosses = 1;
    
    for (const [opponent, losses] of lossesPerOpponent.entries()) {
      if (losses > maxLosses) {
        maxLosses = losses;
        nemesisOpponent = opponent;
      }
    }
    
    const lossesToNemesis = nemesisOpponent ? (lossesPerOpponent.get(nemesisOpponent) || 0) : 0;
    const totalGamesVsNemesis = nemesisOpponent ? (totalGamesPerOpponent.get(nemesisOpponent) || 0) : 0;
    const winsVsNemesis = nemesisOpponent ? (winsPerOpponent.get(nemesisOpponent) || 0) : 0;
    const winRateVsNemesis = totalGamesVsNemesis > 0 ? Math.round((winsVsNemesis / totalGamesVsNemesis) * 100) : 0;
    
    return {
      nemesisOpponent,
      lossesToNemesis,
      totalGamesVsNemesis,
      winRateVsNemesis
    };
  }
}
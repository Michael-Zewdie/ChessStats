import type { ChessGame } from '../../../Types/ChessGame';

export interface NemesisStats {
  nemesisOpponent: string | null;
  lossesToNemesis: number;
  totalGamesVsNemesis: number;
  winRateVsNemesis: number;
}

export class NemesisService {
  static calculate(games: ChessGame[]): NemesisStats {
    if (!games || games.length === 0) {
      return { nemesisOpponent: null, lossesToNemesis: 0, totalGamesVsNemesis: 0, winRateVsNemesis: 0 };
    }
    
    try {
      // Count losses against each opponent
      const lossesPerOpponent = new Map<string, number>();
      const totalGamesPerOpponent = new Map<string, number>();
      const winsPerOpponent = new Map<string, number>();
      
      for (const game of games) {
        const opponent = game.opponent;
        
        // Count total games
        if (totalGamesPerOpponent.has(opponent)) {
          totalGamesPerOpponent.set(opponent, totalGamesPerOpponent.get(opponent)! + 1);
        } else {
          totalGamesPerOpponent.set(opponent, 1);
        }
        
        // Count losses
        if (game.result === 'loss') {
          if (lossesPerOpponent.has(opponent)) {
            lossesPerOpponent.set(opponent, lossesPerOpponent.get(opponent)! + 1);
          } else {
            lossesPerOpponent.set(opponent, 1);
          }
        }
        
        // Count wins
        if (game.result === 'win') {
          if (winsPerOpponent.has(opponent)) {
            winsPerOpponent.set(opponent, winsPerOpponent.get(opponent)! + 1);
          } else {
            winsPerOpponent.set(opponent, 1);
          }
        }
      }
      
      // Find the opponent with the most losses (minimum 2 losses to be considered a nemesis)
      let nemesisOpponent: string | null = null;
      let maxLosses = 1; // Need at least 2 losses to be a nemesis
      
      for (const [opponent, losses] of lossesPerOpponent.entries()) {
        if (losses > maxLosses) {
          maxLosses = losses;
          nemesisOpponent = opponent;
        }
      }
      
      // Calculate stats for the nemesis
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
    } catch {
      return { nemesisOpponent: null, lossesToNemesis: 0, totalGamesVsNemesis: 0, winRateVsNemesis: 0 };
    }
  }
}
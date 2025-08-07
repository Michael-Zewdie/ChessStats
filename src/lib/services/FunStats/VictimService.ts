import type { ChessGame } from '../../../Types/ChessGame';

export interface VictimStats {
  victimOpponent: string | null;
  winsAgainstVictim: number;
  totalGamesVsVictim: number;
  winRateVsVictim: number;
}

export class VictimService {
  /**
   * Identifies the opponent the player beats most often ("victim")
   * A victim must have been beaten at least twice
   */
  static calculate(games: ChessGame[]): VictimStats {
    if (!games || games.length === 0) {
      return { victimOpponent: null, winsAgainstVictim: 0, totalGamesVsVictim: 0, winRateVsVictim: 0 };
    }
    
    try {
      // Count wins against each opponent
      const winsPerOpponent = new Map<string, number>();
      const totalGamesPerOpponent = new Map<string, number>();
      const lossesPerOpponent = new Map<string, number>();
      
      for (const game of games) {
        const opponent = game.opponent;
        
        // Count total games
        if (totalGamesPerOpponent.has(opponent)) {
          totalGamesPerOpponent.set(opponent, totalGamesPerOpponent.get(opponent)! + 1);
        } else {
          totalGamesPerOpponent.set(opponent, 1);
        }
        
        // Count wins
        if (game.result === 'win') {
          if (winsPerOpponent.has(opponent)) {
            winsPerOpponent.set(opponent, winsPerOpponent.get(opponent)! + 1);
          } else {
            winsPerOpponent.set(opponent, 1);
          }
        }
        
        // Count losses
        if (game.result === 'loss') {
          if (lossesPerOpponent.has(opponent)) {
            lossesPerOpponent.set(opponent, lossesPerOpponent.get(opponent)! + 1);
          } else {
            lossesPerOpponent.set(opponent, 1);
          }
        }
      }
      
      // Find the opponent with the most wins (minimum 2 wins to be considered a victim)
      let victimOpponent: string | null = null;
      let maxWins = 1; // Need at least 2 wins to be a victim
      
      for (const [opponent, wins] of winsPerOpponent.entries()) {
        if (wins > maxWins) {
          maxWins = wins;
          victimOpponent = opponent;
        }
      }
      
      // Calculate stats for the victim
      const winsAgainstVictim = victimOpponent ? (winsPerOpponent.get(victimOpponent) || 0) : 0;
      const totalGamesVsVictim = victimOpponent ? (totalGamesPerOpponent.get(victimOpponent) || 0) : 0;
      const winRateVsVictim = totalGamesVsVictim > 0 ? Math.round((winsAgainstVictim / totalGamesVsVictim) * 100) : 0;
      
      return {
        victimOpponent,
        winsAgainstVictim,
        totalGamesVsVictim,
        winRateVsVictim
      };
    } catch {
      return { victimOpponent: null, winsAgainstVictim: 0, totalGamesVsVictim: 0, winRateVsVictim: 0 };
    }
  }
}
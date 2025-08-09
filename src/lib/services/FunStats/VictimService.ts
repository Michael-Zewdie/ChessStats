import type { ChessGame } from '../../../Types/index';

export interface VictimStats {
  victimOpponent: string | null;
  winsAgainstVictim: number;
  totalGamesVsVictim: number;
  winRateVsVictim: number;
}

export class VictimService {
  static calculate(games: ChessGame[]): VictimStats {
    if (!games?.length) {
      return { victimOpponent: null, winsAgainstVictim: 0, totalGamesVsVictim: 0, winRateVsVictim: 0 };
    }
    const winsPerOpponent = new Map<string, number>();
    const totalGamesPerOpponent = new Map<string, number>();
    
    for (const game of games) {
      const opponent = game.opponent;
      
      totalGamesPerOpponent.set(opponent, (totalGamesPerOpponent.get(opponent) ?? 0) + 1);
      
      if (game.result === 'win') {
        winsPerOpponent.set(opponent, (winsPerOpponent.get(opponent) ?? 0) + 1);
      }
    }
    
    let victimOpponent: string | null = null;
    let maxWins = 1;
    
    for (const [opponent, wins] of winsPerOpponent.entries()) {
      if (wins > maxWins) {
        maxWins = wins;
        victimOpponent = opponent;
      }
    }
    
    const winsAgainstVictim = victimOpponent ? (winsPerOpponent.get(victimOpponent) || 0) : 0;
    const totalGamesVsVictim = victimOpponent ? (totalGamesPerOpponent.get(victimOpponent) || 0) : 0;
    const winRateVsVictim = totalGamesVsVictim > 0 ? Math.round((winsAgainstVictim / totalGamesVsVictim) * 100) : 0;
    
    return {
      victimOpponent,
      winsAgainstVictim,
      totalGamesVsVictim,
      winRateVsVictim
    };
  }
}
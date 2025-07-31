import type { ChessGame } from '../../../Types/ChessGame';

export interface RivalStats {
  rival: string | null;
  totalGamesWithRival: number;
  winsAgainstRival: number;
  lossesAgainstRival: number;
  drawsAgainstRival: number;
}

export class RivalService {
  static calculate(games: ChessGame[]): RivalStats {
    if (!games || games.length === 0) {
      return { 
        rival: null, 
        totalGamesWithRival: 0, 
        winsAgainstRival: 0, 
        lossesAgainstRival: 0, 
        drawsAgainstRival: 0 
      };
    }
    
    try {
      const gameCountByOpponent: Record<string, {
        total: number;
        wins: number;
        losses: number;
        draws: number;
      }> = {};
      
      games.forEach(game => {
        if (!gameCountByOpponent[game.opponent]) {
          gameCountByOpponent[game.opponent] = {
            total: 0,
            wins: 0,
            losses: 0,
            draws: 0
          };
        }
        
        const opponentStats = gameCountByOpponent[game.opponent];
        opponentStats.total++;
        
        switch (game.result) {
          case 'win':
            opponentStats.wins++;
            break;
          case 'loss':
            opponentStats.losses++;
            break;
          case 'draw':
            opponentStats.draws++;
            break;
        }
      });
      
      if (Object.keys(gameCountByOpponent).length === 0) {
        return { 
          rival: null, 
          totalGamesWithRival: 0, 
          winsAgainstRival: 0, 
          lossesAgainstRival: 0, 
          drawsAgainstRival: 0 
        };
      }
      
      // Find opponent with most total games played
      const mostPlayedOpponent = Object.entries(gameCountByOpponent)
        .reduce((most, current) => current[1].total > most[1].total ? current : most);
      
      // Only consider them a rival if you've played at least 3 games
      const rival = mostPlayedOpponent[1].total >= 3 ? mostPlayedOpponent[0] : null;
      const rivalStats = rival ? mostPlayedOpponent[1] : {
        total: 0,
        wins: 0,
        losses: 0,
        draws: 0
      };
      
      return {
        rival,
        totalGamesWithRival: rivalStats.total,
        winsAgainstRival: rivalStats.wins,
        lossesAgainstRival: rivalStats.losses,
        drawsAgainstRival: rivalStats.draws
      };
    } catch (error) {
      console.error('Error calculating rival:', error);
      return { 
        rival: null, 
        totalGamesWithRival: 0, 
        winsAgainstRival: 0, 
        lossesAgainstRival: 0, 
        drawsAgainstRival: 0 
      };
    }
  }
}
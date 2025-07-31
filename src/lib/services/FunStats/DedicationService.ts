import type { ChessGame } from '../../../Types/ChessGame';

export interface DedicationStats {
  maxGamesInOneDay: number;
  dateOfMaxGames: string | null;
  totalPlayingDays: number;
}

export class DedicationService {
  static calculate(games: ChessGame[]): DedicationStats {
    if (!games || games.length === 0) {
      return { maxGamesInOneDay: 0, dateOfMaxGames: null, totalPlayingDays: 0 };
    }
    
    try {
      // Group games by date
      const gamesByDate = new Map<string, number>();
      
      for (const game of games) {
        // Extract just the date part (YYYY-MM-DD) from the date string
        const dateOnly = new Date(game.date).toISOString().split('T')[0];
        
        if (gamesByDate.has(dateOnly)) {
          gamesByDate.set(dateOnly, gamesByDate.get(dateOnly)! + 1);
        } else {
          gamesByDate.set(dateOnly, 1);
        }
      }
      
      // Find the date with the maximum games
      let maxGamesInOneDay = 0;
      let dateOfMaxGames: string | null = null;
      
      for (const [date, gameCount] of gamesByDate.entries()) {
        if (gameCount > maxGamesInOneDay) {
          maxGamesInOneDay = gameCount;
          dateOfMaxGames = date;
        }
      }
      
      const totalPlayingDays = gamesByDate.size;
      
      return {
        maxGamesInOneDay,
        dateOfMaxGames,
        totalPlayingDays
      };
    } catch (error) {
      console.error('Error calculating dedication stats:', error);
      return { maxGamesInOneDay: 0, dateOfMaxGames: null, totalPlayingDays: 0 };
    }
  }
  
  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  }
}
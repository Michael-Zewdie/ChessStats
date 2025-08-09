import type { ChessGame } from '../../../Types/index';

export interface DedicationStats {
  maxGamesInOneDay: number;
  dateOfMaxGames: string | null;
  totalPlayingDays: number;
}

export class DedicationService {
  static calculate(games: ChessGame[]): DedicationStats {
    if (!games?.length) {
      return { maxGamesInOneDay: 0, dateOfMaxGames: null, totalPlayingDays: 0 };
    }
    
    const gamesByDate = new Map<string, number>();
    
    for (const game of games) {
      const dateOnly = new Date(game.date).toISOString().split('T')[0];
      gamesByDate.set(dateOnly, (gamesByDate.get(dateOnly) ?? 0) + 1);
    }
    
    const [dateOfMaxGames, maxGamesInOneDay] = Array.from(gamesByDate.entries())
      .reduce(([maxDate, maxCount], [date, count]) => 
        count > maxCount ? [date, count] : [maxDate, maxCount]
      , [null as string | null, 0]);
    
    return {
      maxGamesInOneDay,
      dateOfMaxGames,
      totalPlayingDays: gamesByDate.size
    };
  }
  
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
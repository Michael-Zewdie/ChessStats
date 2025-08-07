import type { MonthlyRatingPoint } from '../../Types/MonthlyStats';
import { GameService } from './gameService';

export class MonthlyStatsService {
  /**
   * Processes chess games to generate monthly rating statistics
   * Groups games by month and time class, calculating rating changes
   */
  static async fetchMonthlyStats(username: string): Promise<MonthlyRatingPoint[]> {
    try {
      const games = await GameService.fetchChessGames(username);
      
      if (!games || games.length === 0) {
        return [];
      }

      // Convert ChessGame format to the normalized format needed for processing
      const normalized = games
        .map((game) => ({
          ts: new Date(game.date).getTime(),
          rating: game.userRating,
          time_class: game.time_class,
        }))
        .filter((r) => typeof r.rating === 'number' && r.ts);

      normalized.sort((a, b) => a.ts - b.ts);

      // Track statistics for each time class
      // Calculate first game date and total games per time class
      const timeClassStats = new Map<string, { firstGameDate: string; totalGames: number }>();
      for (const { ts, time_class } of normalized) {
        const existing = timeClassStats.get(time_class);
        if (!existing) {
          timeClassStats.set(time_class, { 
            firstGameDate: new Date(ts).toISOString(), 
            totalGames: 1 
          });
        } else {
          // Keep the earliest date and increment total games
          if (ts < new Date(existing.firstGameDate).getTime()) {
            existing.firstGameDate = new Date(ts).toISOString();
          }
          existing.totalGames++;
        }
      }

      // Group games by month and time class, tracking first and last ratings
      const byMonthClass = new Map<string, { month: string; time_class: string; start: number; end: number }>();
      for (const { ts, rating, time_class } of normalized) {
        const month = new Date(ts).toISOString().slice(0, 7);
        const key = `${month}|${time_class}`;
        const existing = byMonthClass.get(key);
        if (!existing) {
          byMonthClass.set(key, { month, time_class, start: rating!, end: rating! });
        } else {
          existing.end = rating!;
        }
      }

      const result: MonthlyRatingPoint[] = Array.from(byMonthClass.values())
        .map(v => {
          const timeClassStat = timeClassStats.get(v.time_class);
          return {
            month: v.month,
            start: v.start,
            end: v.end,
            change: v.end - v.start,
            time_class: v.time_class,
            firstGameDate: timeClassStat?.firstGameDate,
            totalGames: timeClassStat?.totalGames,
          };
        })
        .sort((a, b) => {
          if (a.time_class === b.time_class) {
            return a.month.localeCompare(b.month);
          }
          return a.time_class.localeCompare(b.time_class);
        });

      return result;
    } catch {
      return [];
    }
  }
}
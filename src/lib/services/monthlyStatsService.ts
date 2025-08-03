import type { MonthlyRatingPoint } from '../../Types/MonthlyStats';
import type { ChessComGame } from '../../Types/ChessGame';

export class MonthlyStatsService {
  private static readonly BASE_URL = 'https://api.chess.com/pub/player';

  static async fetchGameArchives(username: string): Promise<string[]> {
    try {
      const archivesRes = await fetch(`${this.BASE_URL}/${username}/games/archives`);
      if (!archivesRes.ok) {
        throw new Error(`Failed to fetch archives for ${username}: ${archivesRes.status}`);
      }
      const { archives } = (await archivesRes.json()) as { archives: string[] };
      return archives;
    } catch (error) {
      console.error('Error fetching game archives:', error);
      return [];
    }
  }

  static async fetchMonthlyStats(username: string): Promise<MonthlyRatingPoint[]> {
    const userLc = username.toLowerCase();

    try {
      const archives = await this.fetchGameArchives(username);
      
      const monthlyPayloads = await Promise.all(
        archives.map(async (url) => {
          const res = await fetch(url);
          if (!res.ok) return null;
          try {
            return (await res.json()) as { games: ChessComGame[] };
          } catch {
            return null;
          }
        })
      );

      const allGames: ChessComGame[] = monthlyPayloads
        .filter(Boolean)
        .flatMap((m) => (m as { games: ChessComGame[] }).games || []);

      const normalized = allGames
        .map((g) => {
          const youAreWhite = g.white?.username?.toLowerCase() === userLc;
          const me = youAreWhite ? g.white : g.black;
          const tsMs = (g.end_time ?? 0) * 1000;
          return {
            ts: tsMs,
            rating: me?.rating,
            time_class: g.time_class,
          };
        })
        .filter((r) => typeof r.rating === 'number' && r.ts);

      normalized.sort((a, b) => a.ts - b.ts);

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
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      return [];
    }
  }
}
import type { ChessGame, ChessComGameRaw } from '../../Types/ChessGame';
import { determineResult } from '../utils/gameHelpers';

export class GameService {
  private static readonly BASE_URL = 'https://api.chess.com/pub/player';

  private static readonly MAX_RETRIES = 3;
  private static readonly CONCURRENCY = 6;

  private static async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private static async fetchMonthlyGamesWithRetry(archiveUrl: string, attempt = 0): Promise<ChessComGameRaw[] | null> {
    try {
      const res = await fetch(archiveUrl);
      if (res.status === 429 || res.status === 502 || res.status === 503) {
        if (attempt < this.MAX_RETRIES) {
          const backoffMs = Math.min(1000 * Math.pow(2, attempt), 5000) + Math.floor(Math.random() * 250);
          await this.delay(backoffMs);
          return this.fetchMonthlyGamesWithRetry(archiveUrl, attempt + 1);
        }
        return null;
      }
      if (!res.ok) return null;
      const data = (await res.json()) as { games: ChessComGameRaw[] };
      return data.games || [];
    } catch {
      if (attempt < this.MAX_RETRIES) {
        const backoffMs = Math.min(1000 * Math.pow(2, attempt), 5000) + Math.floor(Math.random() * 250);
        await this.delay(backoffMs);
        return this.fetchMonthlyGamesWithRetry(archiveUrl, attempt + 1);
      }
      return null;
    }
  }

  private static async fetchAllMonthlyWithConcurrency(archives: string[]): Promise<(ChessComGameRaw[] | null)[]> {
    const results: (ChessComGameRaw[] | null)[] = new Array(archives.length).fill(null);
    let index = 0;

    const worker = async () => {
      while (true) {
        const current = index++;
        if (current >= archives.length) return;
        const url = archives[current];
        const games = await this.fetchMonthlyGamesWithRetry(url);
        results[current] = games;
        // Gentle spacing to reduce burstiness
        await this.delay(50);
      }
    };

    const workers = Array.from({ length: Math.min(this.CONCURRENCY, archives.length) }, () => worker());
    await Promise.all(workers);
    return results;
  }

  static async fetchGameArchives(username: string): Promise<string[]> {
    try {
      const archivesRes = await fetch(`${this.BASE_URL}/${username}/games/archives`);
      if (archivesRes.status === 404) {
        throw new Error('USER_NOT_FOUND');
      }
      if (!archivesRes.ok) {
        throw new Error(`Failed to fetch archives for ${username}: ${archivesRes.status}`);
      }
      const { archives } = (await archivesRes.json()) as { archives: string[] };
      return archives;
    } catch (error) {
      if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
        throw error;
      }
      return [];
    }
  }

  static async fetchMonthlyGames(archiveUrl: string): Promise<ChessComGameRaw[] | null> {
    try {
      const res = await fetch(archiveUrl);
      if (!res.ok) return null;
      const data = (await res.json()) as { games: ChessComGameRaw[] };
      return data.games || [];
    } catch {
      return null;
    }
  }

  static async fetchChessGames(username: string): Promise<ChessGame[]> {
    const userLc = username.toLowerCase();

    try {
      const archives = await this.fetchGameArchives(username);

      // Use controlled concurrency with retries to avoid Chess.com rate limits
      const monthlyPayloads = await this.fetchAllMonthlyWithConcurrency(archives);

      const allGames: ChessComGameRaw[] = monthlyPayloads
        .filter(Boolean)
        .flatMap((games) => games as ChessComGameRaw[]);

      // Keep only standard chess games. Exclude variants like chess960, kingofthehill, etc.
      const standardGames: ChessComGameRaw[] = allGames.filter(
        (game) => (game.rules ?? 'chess') === 'chess'
      );

      // Some very old archives may include malformed or future-dated end_time; guard against that
      const now = Date.now();

      const validGames = standardGames
        .map((game) => {
          const youAreWhite = game.white?.username?.toLowerCase() === userLc;
          const userColor = youAreWhite ? 'white' : 'black';
          const user = youAreWhite ? game.white : game.black;
          const opponent = youAreWhite ? game.black : game.white;

          if (!user || !opponent || !user.rating || !opponent.rating || !game.end_time) {
            return null;
          }

          const endTimeMs = game.end_time * 1000;
          if (Number.isNaN(endTimeMs) || endTimeMs <= 0 || endTimeMs > now) {
            return null;
          }

          const result = determineResult(userColor, game.white.result, game.black.result);

          return {
            opponent: opponent.username,
            result,
            userRating: user.rating,
            opponentRating: opponent.rating,
            date: new Date(endTimeMs).toISOString(),
            time_class: game.time_class,
            gameUrl: game.url
          } as ChessGame;
        })
        .filter((game): game is ChessGame => game !== null);

      const chessGames = validGames.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      return chessGames;
    } catch {
      return [];
    }
  }
}
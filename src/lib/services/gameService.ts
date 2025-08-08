import type { ChessGame, ChessComGameRaw } from '../../Types/ChessGame';
import { determineResult } from '../utils/gameHelpers';

export class GameService {
  private static readonly BASE_URL = 'https://api.chess.com/pub/player';

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
      
      const monthlyPayloads = await Promise.all(
        archives.map(url => this.fetchMonthlyGames(url))
      );

      const allGames: ChessComGameRaw[] = monthlyPayloads
        .filter(Boolean)
        .flatMap((games) => games as ChessComGameRaw[]);

      const validGames = allGames
        .map((game) => {
          const youAreWhite = game.white?.username?.toLowerCase() === userLc;
          const userColor = youAreWhite ? 'white' : 'black';
          const user = youAreWhite ? game.white : game.black;
          const opponent = youAreWhite ? game.black : game.white;

          if (!user || !opponent || !user.rating || !opponent.rating || !game.end_time) {
            return null;
          }

          const result = determineResult(userColor, game.white.result, game.black.result);

          return {
            opponent: opponent.username,
            result,
            userRating: user.rating,
            opponentRating: opponent.rating,
            date: new Date(game.end_time * 1000).toISOString(),
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
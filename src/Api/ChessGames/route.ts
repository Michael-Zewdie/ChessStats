export interface ChessGame {
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  userRating: number;
  opponentRating: number;
  date: string;
  time_class: string; // 'bullet', 'blitz', 'rapid', 'daily'
}

type ChessComGameDetailed = {
  end_time?: number;
  time_class: string;
  white: { username: string; rating: number; result?: string };
  black: { username: string; rating: number; result?: string };
  rules?: string;
};

function determineResult(
  userColor: 'white' | 'black',
  whiteResult?: string,
  blackResult?: string
): 'win' | 'loss' | 'draw' {
  if (!whiteResult || !blackResult) return 'draw';
  
  if (whiteResult === blackResult) return 'draw';
  
  if (userColor === 'white') {
    return whiteResult === 'win' ? 'win' : 'loss';
  } else {
    return blackResult === 'win' ? 'win' : 'loss';
  }
}

export async function fetchChessGames(username: string): Promise<ChessGame[]> {
  const userLc = username.toLowerCase();

  try {
    // 1) Get list of archive URLs (one per month)
    const archivesRes = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
    if (!archivesRes.ok) {
      throw new Error(`Failed to fetch archives for ${username}: ${archivesRes.status}`);
    }
    const { archives } = (await archivesRes.json()) as { archives: string[] };

    // Limit to last 12 months for performance (can be adjusted)
    const recentArchives = archives.slice(-12);

    // 2) Pull recent months in parallel
    const monthlyPayloads = await Promise.all(
      recentArchives.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) return null;
        try {
          return (await res.json()) as { games: ChessComGameDetailed[] };
        } catch {
          return null;
        }
      })
    );

    // 3) Flatten and normalize games
    const allGames: ChessComGameDetailed[] = monthlyPayloads
      .filter(Boolean)
      .flatMap((m) => (m as { games: ChessComGameDetailed[] }).games || []);

    // 4) Convert to ChessGame format
    const chessGames: ChessGame[] = allGames
      .map((game) => {
        const youAreWhite = game.white?.username?.toLowerCase() === userLc;
        const userColor = youAreWhite ? 'white' : 'black';
        const user = youAreWhite ? game.white : game.black;
        const opponent = youAreWhite ? game.black : game.white;

        // Skip if missing essential data
        if (!user || !opponent || !user.rating || !opponent.rating || !game.end_time) {
          return null;
        }

        // Determine result
        const result = determineResult(userColor, game.white.result, game.black.result);

        // Debug: log opponent username to see what we're getting
        if (Math.random() < 0.01) { // Log 1% of games to avoid spam
          console.log('Opponent username:', opponent.username, 'Time class:', game.time_class);
        }

        return {
          opponent: opponent.username,
          result,
          userRating: user.rating,
          opponentRating: opponent.rating,
          date: new Date(game.end_time * 1000).toISOString(),
          time_class: game.time_class
        };
      })
      .filter((game): game is ChessGame => game !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort chronologically

    return chessGames;
  } catch (error) {
    console.error('Error fetching chess games:', error);
    return [];
  }
}
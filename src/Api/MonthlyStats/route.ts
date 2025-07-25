type ChessComGame = {
  end_time?: number;
  time_class: string;
  white: { username: string; rating: number };
  black: { username: string; rating: number };
};

export type MonthlyRatingPoint = {
  month: string;          // YYYY-MM
  start: number;          // first rating that month
  end: number;            // last rating that month
  change: number;         // end - start
  time_class: string;     // rapid / blitz / bullet / daily etc.
};

export async function MonthlyStats(username: string): Promise<MonthlyRatingPoint[]> {
  const userLc = username.toLowerCase();

  // 1) Get list of archive URLs (one per month)
  const archivesRes = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
  if (!archivesRes.ok) {
    throw new Error(`Failed to fetch archives for ${username}: ${archivesRes.status}`);
  }
  const { archives } = (await archivesRes.json()) as { archives: string[] };

  // 2) Pull all months in parallel (Chess.com is fine with this volume, but you can throttle if needed)
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

  // 3) Flatten and normalize
  const allGames: ChessComGame[] = monthlyPayloads
    .filter(Boolean)
    .flatMap((m) => (m as { games: ChessComGame[] }).games || []);

  const normalized = allGames
    .map((g) => {
      const youAreWhite = g.white?.username?.toLowerCase() === userLc;
      const me = youAreWhite ? g.white : g.black;
      // end_time is seconds since epoch from Chess.com
      const tsMs = (g.end_time ?? 0) * 1000;
      return {
        ts: tsMs,
        rating: me?.rating,
        time_class: g.time_class,
      };
    })
    .filter((r) => typeof r.rating === 'number' && r.ts);

  // 4) Sort by time so we can get first/last rating per month
  normalized.sort((a, b) => a.ts - b.ts);

  // 5) Group by month + time_class
  const byMonthClass = new Map<string, { month: string; time_class: string; start: number; end: number }>();
  for (const { ts, rating, time_class } of normalized) {
    const month = new Date(ts).toISOString().slice(0, 7); // YYYY-MM
    const key = `${month}|${time_class}`;
    const existing = byMonthClass.get(key);
    if (!existing) {
      byMonthClass.set(key, { month, time_class, start: rating!, end: rating! });
    } else {
      existing.end = rating!;
    }
  }

  // 6) Build the final array for Recharts
  const result: MonthlyRatingPoint[] = Array.from(byMonthClass.values())
    .map(v => ({
      month: v.month,
      start: v.start,
      end: v.end,
      change: v.end - v.start,
      time_class: v.time_class,
    }))
    .sort((a, b) => {
      // sort by time_class, then by month
      if (a.time_class === b.time_class) {
        return a.month.localeCompare(b.month);
      }
      return a.time_class.localeCompare(b.time_class);
    });

  return result;
}
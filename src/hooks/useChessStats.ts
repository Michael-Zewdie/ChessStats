import { useEffect, useState } from "react";
import { ChessDataService } from "../lib/data/chessDataService";
import type { ChessProfileStats } from "../Types/ChessStats";

export function useChessStats(username: string | undefined) {
  const [stats, setStats] = useState<ChessProfileStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    ChessDataService.fetchUserStats(username)
      .then(setStats)
      .catch(() => {
        setError("Failed to fetch user stats.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return { stats, loading, error };
}
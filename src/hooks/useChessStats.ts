import { useEffect, useState } from "react";
import { fetchStats } from "../Api/BasicStats/route";
import type { ChessProfileStats } from "../Types/ChessStats";

export function useChessStats(username: string | undefined) {
  const [stats, setStats] = useState<ChessProfileStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setError(null);
    fetchStats(username)
      .then(setStats)
      .catch(() => {
        setError("Failed to fetch user stats.");
      });
  }, [username]);

  return { stats, error };
}
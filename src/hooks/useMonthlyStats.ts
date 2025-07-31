

import { useEffect, useState } from "react";
import { ChessDataService } from "../lib/data/chessDataService";
import type { MonthlyRatingPoint } from "../Types/MonthlyStats";

export type { MonthlyRatingPoint };

export function useMonthlyStats(username: string | undefined) {
  const [data, setData] = useState<MonthlyRatingPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    ChessDataService.fetchMonthlyStats(username)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        console.error("useMonthlyStats: fetch error =", err);
        if (!cancelled) setError("Failed to fetch monthly stats.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, loading, error };
}
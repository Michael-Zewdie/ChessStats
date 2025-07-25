

import { useEffect, useState } from "react";
import { MonthlyStats } from "../Api/MonthlyStats/route";
import type { MonthlyRatingPoint } from "../Api/MonthlyStats/route";

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

    MonthlyStats(username)
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
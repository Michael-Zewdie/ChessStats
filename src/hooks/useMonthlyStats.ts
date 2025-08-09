

import { useEffect, useState } from "react";
import { monthlyStatsService } from "../lib/services/monthlyStatsService";
import type { GameData } from "../Components/MonthlyStats/RatingProgressionChart/RatingProgressionChart";

export function useMonthlyStats(username: string | undefined) {
  const [data, setData] = useState<Record<string, GameData[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      setData({});
      return;
    }
    
    let cancelled = false;
    setLoading(true);

    monthlyStatsService.fetchChartData(username)
      .then((chartData) => {
        if (!cancelled) setData(chartData);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, loading };
}
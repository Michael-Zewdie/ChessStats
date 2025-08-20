import { useMonthlyStats } from "../../hooks/useMonthlyStats";
import { useChessProfile } from "../../hooks/useChessProfile";
import { useChessGames } from "../../hooks/useChessGames";
import { MonthlyStatsBox } from "./MonthlyStatsBox";
import MonthlyStatsSkeleton from "./skeleton/MonthlyStatsSkeleton";
import { hasEnoughGamesForTimeControl } from "../../lib/utils/gameFilters";
import { TIME_CONTROLS, type TimeControlKey } from "../../lib/config/gameThresholds";
import { monthlyStatsService } from "../../lib/services/monthlyStatsService";
import type { GameData } from "./RatingProgressionChart/RatingProgressionChart";
 

interface MonthlyStatsUIProps {
  username?: string;
}

export default function MonthlyStatsUI({ username }: MonthlyStatsUIProps) {
  const { data: chartData, loading } = useMonthlyStats(username);
  const { profile, country } = useChessProfile(username);
  const { games: allGames } = useChessGames(username);

  if (loading) return <MonthlyStatsSkeleton />;
  if (!Object.keys(chartData).length) return null;

  // Filter to only show time classes with enough games
  const filteredChartData: Record<string, GameData[]> = {};
  const timeClassStats = allGames ? monthlyStatsService.getTimeClassStats(allGames) : {};
  
  Object.entries(chartData).forEach(([timeClass, data]) => {
    const timeControlKey = Object.entries(TIME_CONTROLS).find(
      ([, value]) => value.replace('chess_', '') === timeClass
    )?.[0] as TimeControlKey;
    
    if (timeControlKey && allGames && hasEnoughGamesForTimeControl(allGames, timeControlKey)) {
      filteredChartData[timeClass] = data;
    }
  });

  if (!Object.keys(filteredChartData).length) return null;

  return (
    <MonthlyStatsBox 
      chartData={filteredChartData} 
      timeClassStats={timeClassStats}
      profile={profile || undefined} 
      country={country} 
    />
  );
}
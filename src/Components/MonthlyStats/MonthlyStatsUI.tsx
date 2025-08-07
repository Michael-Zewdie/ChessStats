import { useMonthlyStats } from "../../hooks/useMonthlyStats";
import { useChessProfile } from "../../hooks/useChessProfile";
import { MonthlyStatsBox } from "./MonthlyStatsBox";
import MonthlyStatsSkeleton from "./MonthlyStatsSkeleton";
import NoMonthlyDataAvailable from "./NoMonthlyDataAvailable";
import { getEligibleTimeControls, hasEnoughGamesForTimeControl } from "../../lib/utils/gameFilters";
import { TIME_CONTROLS, type TimeControlKey } from "../../lib/config/gameThresholds";
import type { ChessGame } from "../../Types/ChessGame";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface MonthlyStatsUIProps {
  username?: string;
  games?: ChessGame[];
}

export default function MonthlyStatsUI({ username, games }: MonthlyStatsUIProps) {
  const { data, loading, error } = useMonthlyStats(username);
  const { profile, country } = useChessProfile(username);
  const navigate = useNavigate();

  if (loading) return (
    <div className='fixed top-6 right-6 z-10'>
      <MonthlyStatsSkeleton />
    </div>
  );
  
  if (error) {
    return (
      <div className='fixed top-6 right-6 z-10'>
        <div>Error loading monthly stats: {error}</div>
      </div>
    );
  }

  if (!data.length) {
    return null;
  }

  // Filter monthly data to only include time classes with enough games
  const filteredData = games && games.length > 0
    ? data.filter(monthlyPoint => {
        // Map time_class (e.g., 'blitz') to TimeControlKey (e.g., 'BLITZ')
        const timeControlKey = Object.entries(TIME_CONTROLS).find(
          ([, value]) => value.replace('chess_', '') === monthlyPoint.time_class
        )?.[0] as TimeControlKey;
        
        return timeControlKey && hasEnoughGamesForTimeControl(games, timeControlKey);
      })
    : data;

  // If no eligible data after filtering, don't render
  if (filteredData.length === 0) {
    return null;
  }

  return (
    <MonthlyStatsBox data={filteredData} profile={profile || undefined} country={country} />
  );
}
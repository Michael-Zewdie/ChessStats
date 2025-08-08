import BasicStatsBox from "./BasicStatsBox.tsx";
import BasicStatsSkeleton from "./skeleton/BasicStatsSkeleton.tsx";
import { useChessStats } from "../../hooks/useChessStats";
import { getEligibleTimeControls, filterStatsForEligibleTimeControls } from "../../lib/utils/gameFilters";
import type { ChessGame } from "../../Types/ChessGame";

interface ChessStatsUIProps {
  username: string | undefined;
  games?: ChessGame[];
}

export default function BasicStatsUI({ username, games}: ChessStatsUIProps) {
  const { stats, loading, error} = useChessStats(username);

  if (loading) return <BasicStatsSkeleton />;

  if (error) return (
    <div>Error loading stats: {error}</div>
  );

  if (!stats) return null;

  // Filter stats based on games if games are provided
  const filteredStats = games && games.length > 0 
    ? filterStatsForEligibleTimeControls(stats, getEligibleTimeControls(games))
    : stats;

  // If no eligible time controls, don't render
  if (games && games.length > 0 && getEligibleTimeControls(games).length === 0) {
    return null;
  }

  return (
    <BasicStatsBox stats={filteredStats} />
  );
}
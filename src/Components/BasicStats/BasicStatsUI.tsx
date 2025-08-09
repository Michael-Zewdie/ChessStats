import BasicStatsBox from "./BasicStatsBox.tsx";
import BasicStatsSkeleton from "./skeleton/BasicStatsSkeleton.tsx";
import { useChessStats } from "../../hooks/useChessStats";
import { getEligibleTimeControls, filterStatsForEligibleTimeControls } from "../../lib/utils/gameFilters";
import type { ChessGame } from "../../Types/index";

interface ChessStatsUIProps {
  username: string | undefined;
  games?: ChessGame[];
  gamesLoading?: boolean;
}

export default function BasicStatsUI({ username, games, gamesLoading = false}: ChessStatsUIProps) {
  const { stats, loading } = useChessStats(username);

  if (loading || gamesLoading || !games) return <BasicStatsSkeleton />;
  if (!stats) return null;
  
  const eligible = getEligibleTimeControls(games);
  const filteredStats = filterStatsForEligibleTimeControls(stats, eligible);

  if (!eligible.length) return null;

  return (
    <BasicStatsBox stats={filteredStats} />
  );
}
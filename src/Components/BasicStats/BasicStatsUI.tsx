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

  // If upstream games aren't ready yet (undefined or still empty while fetching),
  // keep skeleton to avoid initial render with all time classes and then refilter.
  if (!games || games.length === 0 || loading) return <BasicStatsSkeleton />;

  if (error) return (
    <div>Error loading stats: {error}</div>
  );

  if (!stats) return null;

  // Compute eligible time controls once to keep rendering stable
  const eligible = getEligibleTimeControls(games);
  const filteredStats = filterStatsForEligibleTimeControls(stats, eligible);

  // If no eligible time controls, don't render
  if (eligible.length === 0) {
    return null;
  }

  return (
    <BasicStatsBox stats={filteredStats} />
  );
}
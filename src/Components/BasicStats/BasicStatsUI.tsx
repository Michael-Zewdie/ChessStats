import BasicStatsBox from "./BasicStatsBox.tsx";
import BasicStatsSkeleton from "./BasicStatsSkeleton";
import { useChessStats } from "../../Hooks/useChessStats";

interface ChessStatsUIProps {
  username: string | undefined;
}

export default function BasicStatsUI({ username}: ChessStatsUIProps) {
  const { stats, loading, error: statsError } = useChessStats(username);

  if (loading) return (
    <div className="fixed bottom-6 right-8 z-50">
      <BasicStatsSkeleton />
    </div>
  );
  
  if (!stats) return null;
  
  return (
    <div className="fixed bottom-6 right-8 z-50">
      <BasicStatsBox stats={stats} />
    </div>
  );
}
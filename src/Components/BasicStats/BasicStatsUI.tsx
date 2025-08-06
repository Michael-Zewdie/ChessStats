import BasicStatsBox from "./BasicStatsBox.tsx";
import BasicStatsSkeleton from "./skeleton/BasicStatsSkeleton.tsx";
import NoDataMessage from "../NoDataMessage/NoDataMessage.tsx";
import { useChessStats } from "../../hooks/useChessStats";

interface ChessStatsUIProps {
  username: string | undefined;
}

export default function BasicStatsUI({ username}: ChessStatsUIProps) {
  const { stats, loading, error } = useChessStats(username);

  if (loading) return (
    <div className="fixed bottom-6 right-6 z-50">
      <BasicStatsSkeleton />
    </div>
  );

  if (error) return (
    <NoDataMessage 
      username={username}
      message="Error loading chess stats"
      suggestion={error}
    />
  );

  if (!stats) return (
    <NoDataMessage 
      username={username}
      message="No chess ratings found"
      suggestion="This user doesn't have any rated chess games on Chess.com or their stats may be private."
    />
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <BasicStatsBox stats={stats} />
    </div>
  );
}
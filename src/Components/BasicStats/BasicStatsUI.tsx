import BasicStatsBox from "./BasicStatsBox.tsx";
import { useChessStats } from "../../hooks/useChessStats";
interface ChessStatsUIProps {
  username: string | undefined;
}

export default function BasicStatsUI({ username}: ChessStatsUIProps) {
  const { stats, error: statsError } = useChessStats(username);

  if (!stats) return null
    return (
        <div className="fixed top-6 right- z-50">
          <BasicStatsBox stats={stats} />
        </div>);
}
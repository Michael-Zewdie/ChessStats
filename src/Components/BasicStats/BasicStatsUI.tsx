import BasicStatsBox from "./BasicStatsBox.tsx";
import { useChessStats } from "../../Hooks/useChessStats";
interface ChessStatsUIProps {
  username: string | undefined;
}

export default function BasicStatsUI({ username}: ChessStatsUIProps) {
  const { stats, error: statsError } = useChessStats(username);

  if (!stats) return null
    return (
        <div className="fixed bottom-6 right-8 z-50">
          <BasicStatsBox stats={stats} />
        </div>);
}
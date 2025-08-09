import { useChessStats } from "../../hooks/useChessStats";
import ChessStatsBox from "./AdvancedStatsBox";
import ChessStatsBoxSkeleton from "./skeleton/ChessStatsBoxSkeleton";
import { ChessStatsBoxMobile, ChessStatsBoxMobileSkeleton } from "./mobile";
import { useIsMobile } from "../../hooks/useIsMobile";

import type { ChessGame } from "../../Types/index";

interface ChessStatsBoxUIProps {
  username: string | undefined;
  games?: ChessGame[];
  gamesLoading?: boolean;
}

export default function ChessStatsBoxUI({ username, games, gamesLoading = false }: ChessStatsBoxUIProps) {
  const { stats, loading: statsLoading } = useChessStats(username);
  const isMobile = useIsMobile();
  
  if (statsLoading || gamesLoading || !games) {
    return isMobile ? <ChessStatsBoxMobileSkeleton /> : <ChessStatsBoxSkeleton />;
  }

  const currentRating = stats?.chess_blitz?.last?.rating || 
                       stats?.chess_rapid?.last?.rating || 
                       stats?.chess_bullet?.last?.rating || 
                       1200;

  return isMobile ? 
    <ChessStatsBoxMobile games={games} currentRating={currentRating} /> :
    <ChessStatsBox games={games} />;
}
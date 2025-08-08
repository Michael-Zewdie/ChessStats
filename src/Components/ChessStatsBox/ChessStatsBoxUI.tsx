import { useChessStats } from "../../hooks/useChessStats";
import ChessStatsBox from "./ChessStatsBox";
import ChessStatsBoxSkeleton from "./ChessStatsBoxSkeleton";
import { ChessStatsBoxMobile, ChessStatsBoxMobileSkeleton } from "./mobile";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

import type { ChessGame } from "../../Types/ChessGame";

interface ChessStatsBoxUIProps {
  username: string | undefined;
  games?: ChessGame[];
}

export default function ChessStatsBoxUI({ username, games }: ChessStatsBoxUIProps) {
  const { stats, loading: statsLoading } = useChessStats(username);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const loading = statsLoading;
  
  if (loading || !games) {
    return isMobile ? <ChessStatsBoxMobileSkeleton /> : <ChessStatsBoxSkeleton />;
  }

  // if (games.length === 0) {
  //   return <div>No games data available</div>;
  // }

  // Get current rating from stats
  const currentRating = stats?.chess_blitz?.last?.rating || 
                       stats?.chess_rapid?.last?.rating || 
                       stats?.chess_bullet?.last?.rating || 
                       1200; // fallback rating

  try {
    return isMobile ? 
      <ChessStatsBoxMobile games={games} currentRating={currentRating} /> :
      <ChessStatsBox games={games} currentRating={currentRating} />;
  } catch {
    navigate(`/error?username=${encodeURIComponent(username || '')}&message=${encodeURIComponent('Error displaying stats')}&suggestion=${encodeURIComponent('There was an unexpected error processing the chess statistics.')}`);
    return null;
  }
}
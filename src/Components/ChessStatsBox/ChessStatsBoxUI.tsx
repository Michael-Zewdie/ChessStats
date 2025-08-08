import { useChessStats } from "../../hooks/useChessStats";
import ChessStatsBox from "./ChessStatsBox";
import ChessStatsBoxSkeleton from "./ChessStatsBoxSkeleton";
import { useNavigate } from "react-router-dom";

import type { ChessGame } from "../../Types/ChessGame";

interface ChessStatsBoxUIProps {
  username: string | undefined;
  games?: ChessGame[];
}

export default function ChessStatsBoxUI({ username, games }: ChessStatsBoxUIProps) {
  const { stats, loading: statsLoading } = useChessStats(username);
  const navigate = useNavigate();

  const loading = statsLoading;
  
  if (loading || !games) {
    return <ChessStatsBoxSkeleton />;
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
    return <ChessStatsBox games={games} currentRating={currentRating} />;
  } catch {
    navigate(`/error?username=${encodeURIComponent(username || '')}&message=${encodeURIComponent('Error displaying stats')}&suggestion=${encodeURIComponent('There was an unexpected error processing the chess statistics.')}`);
    return null;
  }
}
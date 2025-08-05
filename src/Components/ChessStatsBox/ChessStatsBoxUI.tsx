import { useChessGames } from "../../Hooks/useChessGames";
import { useChessStats } from "../../Hooks/useChessStats";
import ChessStatsBox from "./ChessStatsBox";
import ChessStatsBoxSkeleton from "./ChessStatsBoxSkeleton";

interface ChessStatsBoxUIProps {
  username: string | undefined;
}


export default function ChessStatsBoxUI({ username }: ChessStatsBoxUIProps) {
  const { games, loading: gamesLoading, error: gamesError } = useChessGames(username);
  const { stats, loading: statsLoading } = useChessStats(username);

  const loading = gamesLoading || statsLoading;
  
  if (loading) {
    return <ChessStatsBoxSkeleton />;
  }

  if (gamesError || !games || games.length === 0) {
    return null;
  }

  // Get current rating from stats
  const currentRating = stats?.chess_blitz?.last?.rating || 
                       stats?.chess_rapid?.last?.rating || 
                       stats?.chess_bullet?.last?.rating || 
                       1200; // fallback rating

  console.log('Rendering ChessStatsBox with', games.length, 'games');
  
  try {
    return <ChessStatsBox games={games} currentRating={currentRating} />;
  } catch (error) {
    console.error('Error rendering ChessStatsBox:', error);
    return null;
  }
}
import { useChessGames } from "../../hooks/useChessGames";
import { useChessStats } from "../../hooks/useChessStats";
import ChessStatsBox from "./ChessStatsBox";
import ChessStatsBoxSkeleton from "./ChessStatsBoxSkeleton";
import NoDataMessage from "../NoDataMessage/NoDataMessage";

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

  if (gamesError) {
    return (
      <NoDataMessage 
        username={username}
        message="Error loading game data"
        suggestion={gamesError}
      />
    );
  }

  if (!games || games.length === 0) {
    return (
      <NoDataMessage 
        username={username}
        message="No games found"
        suggestion="This user doesn't have any game data on Chess.com or their games may be private."
      />
    );
  }

  // Get current rating from stats
  const currentRating = stats?.chess_blitz?.last?.rating || 
                       stats?.chess_rapid?.last?.rating || 
                       stats?.chess_bullet?.last?.rating || 
                       1200; // fallback rating

  try {
    return <ChessStatsBox games={games} currentRating={currentRating} />;
  } catch (_error) {
    return (
      <NoDataMessage 
        username={username}
        message="Error displaying stats"
        suggestion="There was an unexpected error processing the chess statistics."
      />
    );
  }
}
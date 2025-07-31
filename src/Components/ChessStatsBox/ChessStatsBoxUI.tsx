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
  
  // Debug logging
  console.log('ChessStatsBoxUI Debug:', {
    username,
    gamesLoading,
    statsLoading,
    loading,
    gamesError,
    gamesCount: games?.length || 0,
    stats: !!stats
  });
  
  if (loading) {
    console.log('Showing skeleton...');
    return <ChessStatsBoxSkeleton />;
  }

  if (gamesError) {
    console.log('Games error:', gamesError);
    return (
      <div style={{
        backgroundColor: '#18191b',
        color: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        padding: '1.5rem',
        border: '1px solid #374151',
        width: '300px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          Failed to load chess stats
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    console.log('No games found');
    return (
      <div style={{
        backgroundColor: '#18191b',
        color: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        padding: '1.5rem',
        border: '1px solid #374151',
        width: '300px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          No recent games found
        </div>
      </div>
    );
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
    return (
      <div style={{
        backgroundColor: '#18191b',
        color: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        padding: '1.5rem',
        border: '1px solid #374151',
        width: '300px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          Error loading chess stats
        </div>
      </div>
    );
  }
}
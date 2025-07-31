import React, { useMemo } from 'react';
import type { ChessGame } from '../types';

interface ChildBoxProps {
  games: ChessGame[];
}

function findFavoriteChild(games: ChessGame[]): string | null {
  if (!games || games.length === 0) return null;
  
  try {
    // Simple approach: find opponent with most wins against
    const winCountByOpponent: Record<string, number> = {};
    
    games.forEach(game => {
      if (game.result === 'win') {
        winCountByOpponent[game.opponent] = (winCountByOpponent[game.opponent] || 0) + 1;
      }
    });
    
    if (Object.keys(winCountByOpponent).length === 0) return null;
    
    // Find opponent with most wins
    const bestOpponent = Object.entries(winCountByOpponent)
      .reduce((best, current) => current[1] > best[1] ? current : best);
    
    return bestOpponent[1] >= 3 ? bestOpponent[0] : null; // At least 3 wins to be a child
  } catch (error) {
    console.error('Error in findFavoriteChild:', error);
    return null;
  }
}

export default function ChildBox({ games }: ChildBoxProps) {
  const favoriteChild = useMemo(() => findFavoriteChild(games), [games]);
  return (
    <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>👶</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Child</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {favoriteChild || 'None'}
      </div>
    </div>
  );
}
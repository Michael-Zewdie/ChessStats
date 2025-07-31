import React, { useMemo } from 'react';
import type { ChessGame } from '../types';

interface UpsetBoxProps {
  games: ChessGame[];
}

function findBiggestUpset(games: ChessGame[]): { opponent: string; ratingDiff: number } | null {
  if (!games || games.length === 0) return null;
  
  try {
    // Biggest Upset: largest rating difference win
    const upsetWins = games.filter(game => 
      game.result === 'win' && 
      game.opponentRating && 
      game.userRating && 
      game.opponentRating > game.userRating
    );
    
    if (upsetWins.length === 0) return null;
    
    const biggestUpset = upsetWins.reduce((biggest, current) => {
      const currentDiff = current.opponentRating - current.userRating;
      const biggestDiff = biggest.opponentRating - biggest.userRating;
      return currentDiff > biggestDiff ? current : biggest;
    });

    return {
      opponent: biggestUpset.opponent,
      ratingDiff: biggestUpset.opponentRating - biggestUpset.userRating
    };
  } catch (error) {
    console.error('Error in findBiggestUpset:', error);
    return null;
  }
}

export default function UpsetBox({ games }: UpsetBoxProps) {
  const biggestUpset = useMemo(() => findBiggestUpset(games), [games]);
  return (
    <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>⚔️</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Upset</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {biggestUpset 
          ? `+${biggestUpset.ratingDiff} vs ${biggestUpset.opponent}`
          : 'None'
        }
      </div>
    </div>
  );
}
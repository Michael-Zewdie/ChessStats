import React, { useMemo } from 'react';
import type { ChessGame } from '../types';

interface BullyBoxProps {
  games: ChessGame[];
}

function calculateBullyScore(games: ChessGame[]): number {
  if (!games || games.length === 0) return 0;
  
  try {
    // Bully Score: win percentage against lower-rated opponents
    const gamesAgainstLowerRated = games.filter(game => 
      game.opponentRating && game.userRating && game.opponentRating < game.userRating
    );
    const winsAgainstLowerRated = gamesAgainstLowerRated.filter(game => game.result === 'win').length;
    
    return gamesAgainstLowerRated.length > 0 
      ? Math.round((winsAgainstLowerRated / gamesAgainstLowerRated.length) * 100)
      : 0;
  } catch (error) {
    console.error('Error in calculateBullyScore:', error);
    return 0;
  }
}

export default function BullyBox({ games }: BullyBoxProps) {
  const bullyScore = useMemo(() => calculateBullyScore(games), [games]);
  return (
    <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>💪</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Bully</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {bullyScore}%
      </div>
    </div>
  );
}
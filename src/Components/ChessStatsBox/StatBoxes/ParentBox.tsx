import React, { useMemo } from 'react';
import type { ChessGame } from '../types';

interface ParentBoxProps {
  games: ChessGame[];
}

function findPrimaryParent(games: ChessGame[]): string | null {
  if (!games || games.length === 0) return null;
  
  try {
    // Simple approach: find opponent with most losses against (temporary)
    const lossCountByOpponent: Record<string, number> = {};
    
    games.forEach(game => {
      if (game.result === 'loss') {
        lossCountByOpponent[game.opponent] = (lossCountByOpponent[game.opponent] || 0) + 1;
      }
    });
    
    if (Object.keys(lossCountByOpponent).length === 0) return null;
    
    // Find opponent with most losses
    const worstOpponent = Object.entries(lossCountByOpponent)
      .reduce((worst, current) => current[1] > worst[1] ? current : worst);
    
    return worstOpponent[1] >= 5 ? worstOpponent[0] : null; // At least 5 losses to be a parent
  } catch (error) {
    console.error('Error in findPrimaryParent:', error);
    return null;
  }
}

export default function ParentBox({ games }: ParentBoxProps) {
  const primaryParent = useMemo(() => findPrimaryParent(games), [games]);
  return (
    <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>👨‍👧‍👦</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Parent</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {primaryParent || 'None'}
      </div>
    </div>
  );
}
import React, { useMemo } from 'react';
import type { ChessGame } from '../types';
import { UpsetService } from '../../../lib/services/FunStats/UpsetService';

interface UpsetBoxProps {
  games: ChessGame[];
}

export default function UpsetBox({ games }: UpsetBoxProps) {
  const upsetStats = useMemo(() => UpsetService.calculate(games), [games]);
  const biggestUpset = useMemo(() => UpsetService.findBiggestUpset(games), [games]);
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
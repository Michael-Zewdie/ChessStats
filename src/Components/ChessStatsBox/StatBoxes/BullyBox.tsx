import React, { useMemo } from 'react';
import type { ChessGame } from '../types';
import { BullyService } from '../../../lib/services/FunStats/BullyService';

interface BullyBoxProps {
  games: ChessGame[];
}

export default function BullyBox({ games }: BullyBoxProps) {
  const bullyStats = useMemo(() => BullyService.calculate(games), [games]);
  return (
    <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>💪</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Bully</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {bullyStats.bullyScore}%
      </div>
    </div>
  );
}
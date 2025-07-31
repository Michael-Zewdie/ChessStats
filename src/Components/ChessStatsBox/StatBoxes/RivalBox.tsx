import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { RivalService } from '../../../lib/services/FunStats/RivalService';

interface RivalBoxProps {
  games: ChessGame[];
}

export default function RivalBox({ games }: RivalBoxProps) {
  const rivalStats = useMemo(() => RivalService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const tooltipText = rivalStats.rival 
    ? `You have played ${rivalStats.totalGamesWithRival} games against ${rivalStats.rival}`
    : 'No rival found (need at least 3 games with same opponent)';
  
  return (
    <div 
      style={{ 
        textAlign: 'center', 
        padding: '0.75rem', 
        backgroundColor: '#1f2937', 
        borderRadius: '0.5rem',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>⚔️</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Rival</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {rivalStats.rival || 'None'}
      </div>
      
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#000',
            color: '#fff',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            marginBottom: '0.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {tooltipText}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #000'
            }}
          />
        </div>
      )}
    </div>
  );
}
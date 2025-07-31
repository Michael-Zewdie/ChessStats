import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { BestWinService } from '../../../lib/services/FunStats/BestWinService';

interface BestWinBoxProps {
  games: ChessGame[];
}

export default function BestWinBox({ games }: BestWinBoxProps) {
  const bestWinStats = useMemo(() => BestWinService.calculate(games), [games]);
  const bestWin = useMemo(() => BestWinService.findBestWin(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  
  return (
    <div 
      style={{ 
        textAlign: 'center', 
        padding: '0.75rem', 
        backgroundColor: '#1f2937', 
        borderRadius: '0.5rem',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: showTooltip ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: showTooltip 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 20px rgba(251, 191, 36, 0.4)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: showTooltip ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: '#fbbf24',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            cursor: 'pointer',
            zIndex: 1001,
            transition: 'all 0.2s ease',
            opacity: 1,
            transform: 'scale(1)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowDescription(!showDescription);
          }}
          onMouseEnter={(e) => e.stopPropagation()}
        >
          ?
        </div>
      )}

      {showDescription && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            color: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            zIndex: 2000,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(251, 191, 36, 0.2)',
            minWidth: '400px',
            maxWidth: '500px',
            lineHeight: '1.6',
            border: '1px solid rgba(55, 65, 81, 0.6)',
            backdropFilter: 'blur(16px)',
            marginBottom: '0.5rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ 
            fontSize: '1.1rem', 
            fontWeight: '700', 
            color: '#fbbf24', 
            marginBottom: '1rem',
            borderBottom: '2px solid rgba(251, 191, 36, 0.3)',
            paddingBottom: '0.5rem'
          }}>
            🏆 Best Win Stat Explained
          </div>
          <div style={{ fontSize: '0.9rem', color: '#e5e7eb', marginBottom: '1rem' }}>Your <strong>best win</strong> shows your biggest rating victory against a higher-rated opponent.</div>
          <div style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.75rem' }}><strong>How it's calculated:</strong></div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '1rem', paddingLeft: '1rem' }}>• Finds your largest rating difference victory vs higher-rated player<br/>• Shows the opponent's name of your best win<br/>• Displays details when you hover over the box</div>
          <button
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#1f2937',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '0.5rem'
            }}
            onClick={() => setShowDescription(false)}
          >
            Got it!
          </button>
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #1f2937',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
            }}
          />
        </div>
      )}

      {showDescription && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1999
          }}
          onClick={() => setShowDescription(false)}
        />
      )}
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🏆</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Best Win</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {bestWin 
          ? bestWin.opponent
          : 'None'
        }
      </div>
      
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            color: '#f9fafb',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            zIndex: 1000,
            marginBottom: '0.5rem',
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(251, 191, 36, 0.1)',
            minWidth: '250px',
            maxWidth: '300px',
            lineHeight: '1.4',
            border: '1px solid rgba(55, 65, 81, 0.6)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <div style={{ 
            fontSize: '0.8rem', 
            fontWeight: '600', 
            color: '#fbbf24', 
            marginBottom: '0.5rem',
            borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
            paddingBottom: '0.25rem'
          }}>
            Best Win
          </div>
          {bestWin ? (
            <div style={{
              fontSize: '0.75rem',
              color: '#e5e7eb',
              textAlign: 'center'
            }}>
              You beat {bestWin.opponent} in {bestWin.timeClass} when you were rated {bestWin.userRating} and they were rated {bestWin.opponentRating} (+{bestWin.ratingDiff} rating difference)
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center' }}>
              No wins found against higher-rated opponents
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #1f2937',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
            }}
          />
        </div>
      )}
    </div>
  );
}
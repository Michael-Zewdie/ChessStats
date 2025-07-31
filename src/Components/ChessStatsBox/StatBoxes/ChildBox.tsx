import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { AdoptedService } from '../../../lib/services/FunStats/AdoptedService';

interface ChildBoxProps {
  games: ChessGame[];
}

export default function ChildBox({ games }: ChildBoxProps) {
  const adoptedStats = useMemo(() => AdoptedService.calculate(games), [games]);
  const primaryChild = useMemo(() => AdoptedService.getPrimaryChild(adoptedStats), [adoptedStats]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const tooltipText = adoptedStats.totalChildren > 0
    ? `Children (${adoptedStats.totalChildren}):\n` + 
      adoptedStats.children.map(child => 
        `• ${child.opponent} (${child.streakLength}-game streak in ${child.timeClass})`
      ).join('\n')
    : 'No adoptions (need 10+ win streak against same opponent)';
  
  const displayText = primaryChild
    ? primaryChild.opponent
    : adoptedStats.totalChildren > 0
    ? `${adoptedStats.totalChildren} players`
    : 'None';
  
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
      <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>👶</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Child</div>
      <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>
        {displayText}
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
            Children ({adoptedStats.totalChildren})
          </div>
          {adoptedStats.children.map((child, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: index < adoptedStats.children.length - 1 ? '0.4rem' : '0',
              fontSize: '0.75rem'
            }}>
              <span style={{ 
                color: '#10b981', 
                marginRight: '0.5rem',
                fontWeight: '600'
              }}>•</span>
              <span style={{ fontWeight: '500', color: '#e5e7eb' }}>{child.opponent}</span>
              <span style={{ 
                marginLeft: '0.5rem',
                color: '#9ca3af',
                fontSize: '0.7rem'
              }}>
                ({child.streakLength}-game streak in {child.timeClass})
              </span>
            </div>
          ))}
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
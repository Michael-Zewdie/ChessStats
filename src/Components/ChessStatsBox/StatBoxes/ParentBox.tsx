import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { AdoptedService } from '../../../lib/services/FunStats/AdoptedService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface ParentBoxProps {
  games: ChessGame[];
}

export default function ParentBox({ games }: ParentBoxProps) {
  const adoptedStats = useMemo(() => AdoptedService.calculate(games), [games]);
  const primaryParent = useMemo(() => AdoptedService.getPrimaryParent(adoptedStats), [adoptedStats]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const displayText = primaryParent
    ? primaryParent.opponent
    : 'You haven\'t been adopted';
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Parent Stat Explained"
        emoji="👨‍👧‍👦"
        description="Your parents are opponents who have adopted you by winning 10+ consecutive games in the same time class."
        calculation="How it's calculated:"
        details="• Groups games by opponent and time class<br/>• Finds streaks of 10+ consecutive losses to same player<br/>• Each qualifying streak creates a parent relationship"
        showWhenVisible={showTooltip}
      />

      <div className={styles.emoji}>👨‍👧‍👦</div>
      <div className={styles.label}>Parent</div>
      <div className={styles.displayText}>
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
            Top {Math.min(5, adoptedStats.totalParents)} Parents ({adoptedStats.totalParents} total)
          </div>
          {adoptedStats.parents.slice(0, 5).map((parent, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: index < Math.min(5, adoptedStats.parents.length) - 1 ? '0.4rem' : '0',
              fontSize: '0.75rem'
            }}>
              <span className={`${styles.tooltipBullet} ${styles.tooltipBulletRed}`}>•</span>
              <span style={{ fontWeight: '500', color: '#e5e7eb' }}>{parent.opponent}</span>
              <span style={{ 
                marginLeft: '0.5rem',
                color: '#9ca3af',
                fontSize: '0.7rem'
              }}>
                ({parent.streakLength}-game streak in {parent.timeClass})
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
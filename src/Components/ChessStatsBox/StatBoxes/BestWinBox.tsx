import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { BestWinService } from '../../../lib/services/FunStats/BestWinService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface BestWinBoxProps {
  games: ChessGame[];
}

export default function BestWinBox({ games }: BestWinBoxProps) {
  const bestWin = useMemo(() => BestWinService.findBestWin(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Best Win Stat Explained"
        emoji="🏆"
        description="Your best win shows your biggest rating victory against a higher-rated opponent."
        calculation="How it's calculated:"
        details="• Finds your largest rating difference victory vs higher-rated player<br/>• Shows the opponent's name of your best win<br/>• Displays details when you hover over the box"
        showWhenVisible={showTooltip}
      />
      <div className={styles.emoji}>🏆</div>
      <div className={styles.label}>Best Win</div>
      <div className={styles.displayText}>
        {bestWin 
          ? bestWin.opponent
          : 'None'
        }
      
      </div>
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Best Win
          </div>
          {bestWin ? (
            <div className={styles.tooltipOpponent}>
              You beat {bestWin.opponent} in {bestWin.timeClass} when you were rated {bestWin.userRating} and they were rated {bestWin.opponentRating} (+{bestWin.ratingDiff} rating difference)
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center' }}>
              No wins found against higher-rated opponents
            </div>
          )}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
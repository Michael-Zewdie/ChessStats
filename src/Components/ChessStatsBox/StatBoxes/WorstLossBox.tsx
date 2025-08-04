import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { WorstLossService } from '../../../lib/services/FunStats/WorstLossService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface WorstLossBoxProps {
  games: ChessGame[];
}

export default function WorstLossBox({ games }: WorstLossBoxProps) {
  const worstLossStats = useMemo(() => WorstLossService.calculate(games), [games]);
  const worstLoss = useMemo(() => WorstLossService.findWorstLoss(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Worst Loss Stat Explained"
        emoji="💔"
        description="Your worst loss shows the opponent you lost to with the greatest rating difference in your favor."
        calculation="How it's calculated:"
        details="• Finds losses where you had a higher rating than your opponent<br/>• Calculates the rating difference (your rating - opponent rating)<br/>• Shows the opponent from your most painful loss"
        showWhenVisible={showTooltip}
      />
      <div className={styles.emoji}>💔</div>
      <div className={styles.label}>Worst Loss</div>
      <div className={styles.displayText}>
        {worstLoss 
          ? worstLoss.opponent
          : 'None'
        }
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Worst Loss
          </div>
          {worstLoss ? (
            <div className={styles.tooltipOpponent}>
              You lost to {worstLoss.opponent} in {worstLoss.timeClass} when you were rated {worstLoss.userRating} and they were rated {worstLoss.opponentRating} (-{worstLoss.ratingDiff} rating difference)
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center' }}>
              No losses found against lower-rated opponents
            </div>
          )}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
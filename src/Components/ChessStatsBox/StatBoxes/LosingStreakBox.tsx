import React, { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { LosingStreakService } from '../../../lib/services/FunStats/LosingStreakService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface LosingStreakBoxProps {
  games: ChessGame[];
}

export default function LosingStreakBox({ games }: LosingStreakBoxProps) {
  const losingStreakStats = useMemo(() => LosingStreakService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Losing Streak Stat Explained"
        emoji="😠"
        description="Your losing streak shows your worst consecutive losses. Lower is better!"
        calculation="How it's calculated:"
        details="• Counts consecutive losses in chronological order<br/>• Tracks the longest streak of losses<br/>• Shows the maximum consecutive losses you've had"
        showWhenVisible={showTooltip}
      />
      <div className={styles.emoji}>😠</div>
      <div className={styles.label}>Losing Streak</div>
      <div className={styles.displayText}>
        {losingStreakStats.worstLosingStreak}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Worst Losing Streak
          </div>
          <div className={styles.tooltipItem}>
            Worst losing streak: {losingStreakStats.worstLosingStreak} games in a row
          </div>
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
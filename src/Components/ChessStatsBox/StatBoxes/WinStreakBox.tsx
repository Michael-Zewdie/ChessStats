import { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { WinStreakService } from '../../../lib/services/FunStats/WinStreakService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface WinStreakBoxProps {
  games: ChessGame[];
}

export default function WinStreakBox({ games }: WinStreakBoxProps) {
  const winStreakStats = useMemo(() => WinStreakService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Win Streak Stat Explained"
        emoji="🔥"
        description="Your longest win streak shows the maximum consecutive wins you've achieved chronologically across all game types."
        calculation="How it's calculated:"
        details="• Counts consecutive wins in chronological order<br/>• Works across all time controls and game types<br/>• Tracks your longest streak ever achieved"
        showWhenVisible={true}
      />
      <div className={styles.emoji}>🔥</div>
      <div className={styles.label}>Win Streak</div>
      <div className={styles.displayText}>
        {winStreakStats.longestWinStreak}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Longest Win Streak
          </div>
          <div className={styles.tooltipItem}>
            Longest win streak: {winStreakStats.longestWinStreak} games in a row
          </div>
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
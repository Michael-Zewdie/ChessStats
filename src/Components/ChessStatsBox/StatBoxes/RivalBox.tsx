import { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { RivalService } from '../../../lib/services/FunStats/RivalService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface RivalBoxProps {
  games: ChessGame[];
}

export default function RivalBox({ games }: RivalBoxProps) {
  const rivalStats = useMemo(() => RivalService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Rival Stat Explained"
        emoji="⚔️"
        description="Your rival is the opponent you've played the most games against."
        calculation="How it's calculated:"
        details="• Counts total games played against each opponent<br/>• Finds the opponent with the highest game count<br/>• Requires at least 3 games to qualify as a rival"
        showWhenVisible={true}
      />
      <div className={styles.emoji}>⚔️</div>
      <div className={styles.label}>Rival</div>
      <div className={styles.displayText}>
        {rivalStats.rival || 'None'}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Rival
          </div>
          {rivalStats.rival ? (
            <div className={styles.tooltipItem}>
              <span style={{ color: '#8b5cf6', marginRight: '0.5rem', fontWeight: '600' }}>⚔️</span>
              <span className={styles.tooltipOpponent}>{rivalStats.rival}</span>
              <span className={styles.tooltipStreak}>
                ({rivalStats.totalGamesWithRival} games total)
              </span>
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center' }}>
              No rival found (need at least 3 games with same opponent)
            </div>
          )}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
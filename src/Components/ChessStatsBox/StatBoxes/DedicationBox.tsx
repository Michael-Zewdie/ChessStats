import { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { DedicationService } from '../../../lib/services/FunStats/DedicationService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface DedicationBoxProps {
  games: ChessGame[];
}

export default function DedicationBox({ games }: DedicationBoxProps) {
  const dedicationStats = useMemo(() => DedicationService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Dedication Stat Explained"
        emoji="💪"
        description="Your dedication score shows the most games you've ever played in a single day."
        calculation="How it's calculated:"
        details="• Groups all games by date<br/>• Counts games played on each day<br/>• Shows your highest single-day game count"
        showWhenVisible={showTooltip}
      />
      <div className={styles.emoji}>💪</div>
      <div className={styles.label}>Dedication</div>
      <div className={styles.displayText}>
        {dedicationStats.maxGamesInOneDay}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Most Dedicated Day
          </div>
          <div className={styles.tooltipItem}>
            <strong>Max games in one day:</strong> {dedicationStats.maxGamesInOneDay}
          </div>
          {dedicationStats.dateOfMaxGames && (
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.4rem' }}>
              <strong>Date:</strong> {DedicationService.formatDate(dedicationStats.dateOfMaxGames)}
            </div>
          )}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
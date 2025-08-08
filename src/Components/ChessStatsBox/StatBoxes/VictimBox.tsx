import { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { VictimService } from '../../../lib/services/FunStats/VictimService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface VictimBoxProps {
  games: ChessGame[];
}

export default function VictimBox({ games }: VictimBoxProps) {
  const victimStats = useMemo(() => VictimService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Victim Stat Explained"
        emoji="🎯"
        description="Your victim is the opponent you've beaten the most (minimum 2 wins required)."
        calculation="How it's calculated:"
        details="• Counts wins against each opponent<br/>• Finds the player you've beaten most often<br/>• Requires at least 2 wins to qualify as victim"
        showWhenVisible={true}
      />
      <div className={styles.emoji}>🎯</div>
      <div className={styles.label}>Victim</div>
      <div className={styles.displayText}>
        {victimStats.victimOpponent || 'None'}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Your Victim
          </div>
          {victimStats.victimOpponent ? (
            <div className={styles.tooltipItem}>
              You beat {victimStats.victimOpponent} {victimStats.winsAgainstVictim} times
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center' }}>
              No victim found (no opponent with 2+ wins)
            </div>
          )}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
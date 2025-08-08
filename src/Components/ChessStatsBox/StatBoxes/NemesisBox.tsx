import { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { NemesisService } from '../../../lib/services/FunStats/NemesisService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface NemesisBoxProps {
  games: ChessGame[];
}

export default function NemesisBox({ games }: NemesisBoxProps) {
  const nemesisStats = useMemo(() => NemesisService.calculate(games), [games]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Nemesis Stat Explained"
        emoji="😈"
        description="Your nemesis is the opponent you've lost to the most (minimum 2 losses required)."
        calculation="How it's calculated:"
        details="• Counts losses against each opponent<br/>• Finds the player who has beaten you most often<br/>• Requires at least 2 losses to qualify as nemesis"
        showWhenVisible={true}
      />
      <div className={styles.emoji}>😈</div>
      <div className={styles.label}>Nemesis</div>
      <div className={styles.displayText}>
        {nemesisStats.nemesisOpponent || 'None'}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Your Nemesis
          </div>
          {nemesisStats.nemesisOpponent ? (
            <div className={styles.tooltipItem}>
              You lost {nemesisStats.lossesToNemesis} games to {nemesisStats.nemesisOpponent}
            </div>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center' }}>
              No nemesis found (no opponent with 2+ losses)
            </div>
          )}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
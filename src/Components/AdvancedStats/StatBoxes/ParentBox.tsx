import { useMemo, useState } from 'react';
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
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Top {Math.min(5, adoptedStats.totalParents)} Parents ({adoptedStats.totalParents} total)
          </div>
          {adoptedStats.parents.slice(0, 5).map((parent, index) => (
            <div key={index} className={styles.tooltipItem}>
              <span className={`${styles.tooltipBullet} ${styles.tooltipBulletRed}`}>•</span>
              <span className={styles.tooltipOpponent}>{parent.opponent}</span>
              <span className={styles.tooltipStreak}>
                ({parent.streakLength}-game streak in {parent.timeClass})
              </span>
            </div>
          ))}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
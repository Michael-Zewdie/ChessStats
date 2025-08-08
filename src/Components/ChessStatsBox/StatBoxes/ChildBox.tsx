import { useMemo, useState } from 'react';
import type { ChessGame } from '../types';
import { AdoptedService } from '../../../lib/services/FunStats/AdoptedService';
import styles from '../styles/StatBox.module.css';
import StatExplainer from '../StatExplainer';

interface ChildBoxProps {
  games: ChessGame[];
}

export default function ChildBox({ games }: ChildBoxProps) {
  const adoptedStats = useMemo(() => AdoptedService.calculate(games), [games]);
  const primaryChild = useMemo(() => AdoptedService.getPrimaryChild(adoptedStats), [adoptedStats]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const displayText = primaryChild
    ? primaryChild.opponent
    : 'You haven\'t adopted anyone';
  
  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StatExplainer
        title="Child Stat Explained"
        emoji="👶"
        description="Your children are opponents you've adopted by winning 10+ consecutive games against them in the same time class."
        calculation="How it's calculated:"
        details="• Groups games by opponent and time class<br/>• Finds streaks of 10+ consecutive wins vs same player<br/>• Each qualifying streak creates a child relationship"
        showWhenVisible={true}
      />
      <div className={styles.emoji}>👶</div>
      <div className={styles.label}>Child</div>
      <div className={styles.displayText}>
        {displayText}
      </div>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            Top {Math.min(5, adoptedStats.totalChildren)} Children ({adoptedStats.totalChildren} total)
          </div>
          {adoptedStats.children.slice(0, 5).map((child, index) => (
            <div key={index} className={styles.tooltipItem}>
              <span className={`${styles.tooltipBullet} ${styles.tooltipBulletGreen}`}>•</span>
              <span className={styles.tooltipOpponent}>{child.opponent}</span>
              <span className={styles.tooltipStreak}>
                ({child.streakLength}-game streak in {child.timeClass})
              </span>
            </div>
          ))}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}
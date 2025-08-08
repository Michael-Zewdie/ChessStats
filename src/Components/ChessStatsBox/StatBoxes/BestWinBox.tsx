import { useMemo, useState } from 'react';
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
        details="• Finds your largest rating difference victory vs higher-rated player<br/>• Shows opponent name normally, 'View Game' button on hover<br/>• Hover for detailed rating information and game access"
        showWhenVisible={true}
      />
      <div className={styles.emoji}>🏆</div>
      <div className={styles.label}>Best Win</div>
      <div className={styles.displayText}>
        {!showTooltip ? (
          bestWin ? bestWin.opponent : 'None'
        ) : (
          bestWin?.gameUrl ? (
            <a 
              href={bestWin.gameUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#10b981',
                textDecoration: 'none',
                fontSize: 'inherit',
                fontWeight: '600',
                padding: '0',
                border: 'none',
                borderRadius: '0',
                display: 'inline',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.textShadow = '0 0 8px #10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#10b981';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              🏆 View Game
            </a>
          ) : (
            'None'
          )
        )}
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
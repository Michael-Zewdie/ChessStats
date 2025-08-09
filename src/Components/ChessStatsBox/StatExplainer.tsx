import { useState } from 'react';
import styles from './styles/StatBox.module.css';

interface StatExplainerProps {
  title: string;
  emoji: string;
  description: string;
  calculation: string;
  details: string;
  showWhenVisible?: boolean;
}

export default function StatExplainer({ 
  title, 
  emoji, 
  description, 
  calculation,
  details,
  showWhenVisible = false 
}: StatExplainerProps) {
  const [showDescription, setShowDescription] = useState(false);

  // Show the help button on hover, but keep the explainer mounted.
  // Once opened, the explainer stays until user clicks "Got it!".
  const helpButtonStyle: React.CSSProperties = {
    opacity: showWhenVisible ? 1 : 0,
    pointerEvents: showWhenVisible ? 'auto' : 'none',
  };

  return (
    <>
      <div
        className={styles.helpButton}
        style={helpButtonStyle}
        onClick={(e) => {
          e.stopPropagation();
          setShowDescription(true);
        }}
        onMouseEnter={(e) => e.stopPropagation()}
      >
        ?
      </div>

      {showDescription && (
        <div
          className={styles.description}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.descriptionTitle}>
            {emoji} {title}
          </div>
          <div className={styles.descriptionText}>
            {description}
          </div>
          <div className={styles.descriptionCalculation}>
            <strong>{calculation}</strong>
          </div>
          <div 
            className={styles.descriptionDetails}
            dangerouslySetInnerHTML={{ __html: details }}
          />
          <button
            className={styles.descriptionButton}
            onClick={() => {
              setShowDescription(false);
            }}
          >
            Got it!
          </button>
          <div className={styles.descriptionArrow} />
        </div>
      )}

      {showDescription && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            e.stopPropagation();
            setShowDescription(false);
          }}
        />
      )}
    </>
  );
}
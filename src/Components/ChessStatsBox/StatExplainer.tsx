import React, { useState } from 'react';
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

  if (!showWhenVisible) return null;

  return (
    <>
      <div
        className={styles.helpButton}
        onClick={(e) => {
          e.stopPropagation();
          setShowDescription(!showDescription);
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
            <strong>How it's calculated:</strong>
          </div>
          <div 
            className={styles.descriptionDetails}
            dangerouslySetInnerHTML={{ __html: details }}
          />
          <button
            className={styles.descriptionButton}
            onClick={() => setShowDescription(false)}
          >
            Got it!
          </button>
          <div className={styles.descriptionArrow} />
        </div>
      )}

      {showDescription && (
        <div
          className={styles.overlay}
          onClick={() => setShowDescription(false)}
        />
      )}
    </>
  );
}
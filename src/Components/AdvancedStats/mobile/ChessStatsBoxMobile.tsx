import RivalBox from '../StatBoxes/RivalBox';
import ChildBox from '../StatBoxes/ChildBox';
import ParentBox from '../StatBoxes/ParentBox';
import LosingStreakBox from '../StatBoxes/LosingStreakBox';
import BestWinBox from '../StatBoxes/BestWinBox';
import WorstLossBox from '../StatBoxes/WorstLossBox';
import WinStreakBox from '../StatBoxes/WinStreakBox';
import DedicationBox from '../StatBoxes/DedicationBox';
import NemesisBox from '../StatBoxes/NemesisBox';
import VictimBox from '../StatBoxes/VictimBox';
import type { ChessGame } from '../types';
import styles from '../styles/ChessStatsBoxMobile.module.css';
import { useState } from 'react';
import MobileDescription from './MobileDescription';
import { FeedbackButtonMobile } from '../../Feedback/FeedbackButtonMobile';
import { FeedbackModal } from '../../Feedback/FeedbackModal';
import { submitFeedback } from '../../../lib/services/feedbackService';

interface ChessStatsBoxMobileProps {
  games: ChessGame[];
  currentRating: number;
}

export default function ChessStatsBoxMobile({ games }: ChessStatsBoxMobileProps) {
  // Show skeleton if games array is empty or undefined
  if (!games || games.length === 0) {
    return (
      <div className={styles.mobileContainer}>
        <div className={styles.statboxes}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#2a2c30',
                borderRadius: '0.5rem',
                animation: 'pulse 1.6s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
                border: '1px solid #2f3136',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          ))}
        </div>
        
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
          `}
        </style>
      </div>
    );
  }
  const [modal, setModal] = useState<null | {
    title: string; emoji: string; summary: string; bullets?: string[];
  }>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const close = () => setModal(null);
  const handleFeedbackSubmit = async (feedback: string) => {
    await submitFeedback(feedback);
  };

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.statboxes}>
        {/* Wrap tiles in buttons that open concise modal descriptions on tap */}
        <RivalBox games={games} />
        <NemesisBox games={games} />
        <VictimBox games={games} />
        <DedicationBox games={games} />
        <BestWinBox games={games} />
        <WorstLossBox games={games} />
        <WinStreakBox games={games} />
        <LosingStreakBox games={games} />
        <ChildBox games={games} />
        <ParentBox games={games} />
      </div>
      
      <div className={styles.feedbackContainer}>
        <FeedbackButtonMobile onClick={() => setIsFeedbackModalOpen(true)} />
      </div>

      {modal && (
        <MobileDescription
          title={`${modal.title} Stat`}
          emoji={modal.emoji}
          summary={modal.summary}
          calculation="How it's calculated"
          bullets={modal.bullets}
          onClose={close}
        />
      )}
      
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
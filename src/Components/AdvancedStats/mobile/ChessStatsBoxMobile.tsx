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
  const [modal, setModal] = useState<null | {
    title: string; emoji: string; summary: string; bullets?: string[];
  }>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const open = (payload: { title: string; emoji: string; summary: string; bullets?: string[] }) => setModal(payload);
  const close = () => setModal(null);

  const handleFeedbackSubmit = async (feedback: string) => {
    await submitFeedback(feedback);
  };

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.statboxes}>
        {/* Wrap tiles in buttons that open concise modal descriptions on tap */}
        <div onClick={() => open({ title: 'Rival', emoji: '⚔️', summary: 'Your most played opponent.', bullets: ['Counts games vs each opponent', 'Requires at least 3 games'] })}><RivalBox games={games} /></div>
        <div onClick={() => open({ title: 'Nemesis', emoji: '😈', summary: 'Opponent you have lost to the most.', bullets: ['Counts losses per opponent', 'Minimum 2 losses'] })}><NemesisBox games={games} /></div>
        <div onClick={() => open({ title: 'Victim', emoji: '🎯', summary: 'Opponent you beat the most.', bullets: ['Counts wins per opponent', 'Minimum 2 wins'] })}><VictimBox games={games} /></div>
        <div onClick={() => open({ title: 'Dedication', emoji: '💪', summary: 'Most games played in a single day.', bullets: ['Groups games by date', 'Shows your top day'] })}><DedicationBox games={games} /></div>
        <div onClick={() => open({ title: 'Best Win', emoji: '🏆', summary: 'Biggest rating upset you achieved.', bullets: ['Win where opponent rating - your rating is max'] })}><BestWinBox games={games} /></div>
        <div onClick={() => open({ title: 'Worst Loss', emoji: '💔', summary: 'Loss to a much lower-rated opponent.', bullets: ['Loss where your rating - opponent rating is max'] })}><WorstLossBox games={games} /></div>
        <div onClick={() => open({ title: 'Win Streak', emoji: '🔥', summary: 'Your longest win streak.', bullets: ['Chronological scan for longest run of wins'] })}><WinStreakBox games={games} /></div>
        <div onClick={() => open({ title: 'Losing Streak', emoji: '😓', summary: 'Your worst losing streak.', bullets: ['Chronological scan for longest run of losses'] })}><LosingStreakBox games={games} /></div>
        <div onClick={() => open({ title: 'Child', emoji: '👶', summary: 'Opponent you “adopted” (10+ consecutive wins).', bullets: ['10+ win streak vs same player & time class'] })}><ChildBox games={games} /></div>
        <div onClick={() => open({ title: 'Parent', emoji: '👨‍👧‍👦', summary: 'Opponent who “adopted” you (10+ consecutive losses).', bullets: ['10+ loss streak vs same player & time class'] })}><ParentBox games={games} /></div>
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
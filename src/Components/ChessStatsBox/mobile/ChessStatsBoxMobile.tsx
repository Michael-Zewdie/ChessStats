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

interface ChessStatsBoxMobileProps {
  games: ChessGame[];
  currentRating: number;
}

export default function ChessStatsBoxMobile({ games }: ChessStatsBoxMobileProps) {
  return (
    <div className={styles.mobileContainer}>
      <div className={styles.statboxes}>
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
    </div>
  );
}
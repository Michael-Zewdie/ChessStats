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

interface ChessStatsBoxMobileProps {
  games: ChessGame[];
  currentRating: number;
}

export default function ChessStatsBoxMobile({ games }: ChessStatsBoxMobileProps) {
  return (
    <div className="mobile-dashboard">
      <div className="mobile-chess-stats">
        <div className="chess-stats-container">
          {/* Mobile Stats Grid - Single Column */}
          <div className="chess-stats-grid">
            <RivalBox games={games} />
            <NemesisBox games={games} />
            <VictimBox games={games} />
            <DedicationBox games={games} />
            <BestWinBox games={games} />
            <WorstLossBox games={games} />
            <WinStreakBox games={games} />
            <LosingStreakBox games={games} />
            <div className="child-box-wrapper">
              <ChildBox games={games} />
            </div>
            <div className="parent-box-wrapper">
              <ParentBox games={games} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
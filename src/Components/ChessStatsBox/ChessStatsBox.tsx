import RivalBox from './StatBoxes/RivalBox';
import ChildBox from './StatBoxes/ChildBox';
import ParentBox from './StatBoxes/ParentBox';
import LosingStreakBox from './StatBoxes/LosingStreakBox';
import BestWinBox from './StatBoxes/BestWinBox';
import WorstLossBox from './StatBoxes/WorstLossBox';
import WinStreakBox from './StatBoxes/WinStreakBox';
import DedicationBox from './StatBoxes/DedicationBox';
import NemesisBox from './StatBoxes/NemesisBox';
import VictimBox from './StatBoxes/VictimBox';
import type { ChessGame } from './types';

interface ChessStatsBoxProps {
  games: ChessGame[];
  currentRating: number;
}


export default function ChessStatsBox({ games, currentRating }: ChessStatsBoxProps) {
  
  return (
    <div style={{
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #374151',
      height: '26.5rem',
      width: '60rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '1rem',
        width: '100%',
        maxWidth: 'calc(100% - 3rem)'
      }}>
        <RivalBox games={games} />
        <NemesisBox games={games} />
        <VictimBox games={games} />
        <DedicationBox games={games} />
        <BestWinBox games={games} />
        <WorstLossBox games={games} />
        <WinStreakBox games={games} />
        <LosingStreakBox games={games} />
        <div style={{ gridColumn: '1 / 3' }}>
          <ChildBox games={games} />
        </div>
        <div style={{ gridColumn: '3 / 5' }}>
          <ParentBox games={games} />
        </div>
      </div>
    </div>
  );
}
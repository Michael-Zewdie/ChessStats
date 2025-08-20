import { useState } from 'react';
import type { ChessProfile } from "../../Types/index";
import { RatingProgressionChart, type GameData } from './RatingProgressionChart/RatingProgressionChart';
import ProfileMini from '../MonthlyStats/ProfileMini/ProfileMini.tsx';
import { useAnalytics } from '../../hooks/useAnalytics';
import '../../index.css'

interface MonthlyStatsBoxProps {
  chartData: Record<string, GameData[]>;
  timeClassStats: Record<string, { firstGameDate: string; totalGames: number }>;
  profile?: ChessProfile;
  country?: string | null;
}

const COLORS: Record<string, string> = {
  rapid: '#42A5F5',
  blitz: '#A020F0', 
  bullet: '#FF0000',
  daily: '#00FF00',
};

function getDefaultTimeClass(timeClassStats: Record<string, { totalGames: number }>): string {
  return Object.entries(timeClassStats)
    .reduce((best, [timeClass, stats]) => 
      stats.totalGames > (timeClassStats[best]?.totalGames || 0) ? timeClass : best
    , Object.keys(timeClassStats)[0] || '');
}

export function MonthlyStatsBox({ chartData, timeClassStats, profile, country }: MonthlyStatsBoxProps) {
  const { trackChartInteraction } = useAnalytics();
  const timeClasses = Object.keys(chartData);
  const defaultTimeClass = getDefaultTimeClass(timeClassStats);
  const [selectedClass, setSelectedClass] = useState<string>(defaultTimeClass);
  
  if (!Object.keys(chartData).length) return null;

  const handleTimeClassChange = (timeClass: string) => {
    setSelectedClass(timeClass);
    trackChartInteraction(`rating_progression_${timeClass}`);
  };
  
  const selectedGames = chartData[selectedClass] || [];
  const selectedStats = timeClassStats[selectedClass];
  const firstGameDate = selectedStats?.firstGameDate;
  const totalGames = selectedStats?.totalGames;

  return (
    <div className="monthly-stats-container">
      {profile && (
        <div className="monthly-profile" style={{ padding: '1.5rem' }}>
          <ProfileMini profile={profile} country={country ?? null} />
        </div>
      )}
      <div className="monthly-tabs">
        {timeClasses.map((tc) => (
          <button
            key={tc}
            onClick={() => handleTimeClassChange(tc)}
            className="monthly-tab"
            style={{
              border: selectedClass === tc ? `2px solid ${COLORS[tc] || '#fff'}` : '2px solid transparent',
              backgroundColor: selectedClass === tc ? `${COLORS[tc] || '#fff'}20` : 'transparent',
              color: COLORS[tc] || '#fff',
              fontWeight: selectedClass === tc ? 'bold' : 'normal',
            }}
          >
            {tc.charAt(0).toUpperCase() + tc.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="monthly-chart">
        <RatingProgressionChart
          games={selectedGames}
          title={`${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} Rating Progression`}
          lineColor={COLORS[selectedClass]}
          firstGameDate={firstGameDate}
          totalGames={totalGames}
        />
      </div>
    </div>
  );
}
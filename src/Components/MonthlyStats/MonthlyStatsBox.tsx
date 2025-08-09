import { useMemo, useState } from 'react';
import type { MonthlyRatingPoint } from "../../hooks/useMonthlyStats";
import type { ChessProfile } from "../../Types/ChessProfile";
import { RatingProgressionChart, type GameData } from './RatingProgressionChart/index.ts';
import ProfileMini from '../MonthlyStats/ProfileMini/ProfileMini.tsx';
import '../../index.css'

interface MonthlyStatsBoxProps {
  data: MonthlyRatingPoint[]; // raw MonthlyStats(username) output
  profile?: ChessProfile;
  country?: string | null;
}

const COLORS: Record<string, string> = {
  rapid: '#42A5F5', // green
  blitz: '#A020F0', // yellow
  bullet: '#FF0000', // red
  daily: '#00FF00', // optional fallback for daily/correspondence
};

function convertToGameData(data: MonthlyRatingPoint[]): Record<string, GameData[]> {
  const gamesByTimeClass: Record<string, GameData[]> = {};
  
  data.forEach((point) => {
    if (!gamesByTimeClass[point.time_class]) {
      gamesByTimeClass[point.time_class] = [];
    }
    
    // Use lastGameDate when available; otherwise fallback to last day of month
    let dateIso: string;
    if (point.lastGameDate) {
      dateIso = new Date(point.lastGameDate).toISOString().split('T')[0];
    } else {
      const [year, month] = point.month.split('-');
      const lastDayOfMonth = new Date(parseInt(year), parseInt(month), 0);
      dateIso = lastDayOfMonth.toISOString().split('T')[0];
    }
    
    gamesByTimeClass[point.time_class].push({
      date: dateIso,
      rating: point.end,
      time_class: point.time_class
    });
  });
  
  return gamesByTimeClass;
}


export function MonthlyStatsBox({ data, profile, country }: MonthlyStatsBoxProps) {
  const timeClasses = data && data.length > 0 ? Array.from(new Set(data.map((d) => d.time_class))) : [];

  // Pick the time class with the earliest activity so users see the longest history by default
  const defaultTimeClass = useMemo(() => {
    if (!data || data.length === 0) return '';
    const byClass: Record<string, { firstGameTs: number }> = {};
    for (const point of data) {
      const ts = point.firstGameDate ? new Date(point.firstGameDate).getTime() : new Date(`${point.month}-01`).getTime();
      if (!byClass[point.time_class] || ts < byClass[point.time_class].firstGameTs) {
        byClass[point.time_class] = { firstGameTs: ts };
      }
    }
    const sorted = Object.entries(byClass).sort((a, b) => a[1].firstGameTs - b[1].firstGameTs);
    return sorted[0]?.[0] || timeClasses[0] || '';
  }, [data, timeClasses]);

  const [selectedClass, setSelectedClass] = useState<string>(defaultTimeClass);
  
  if (!data || data.length === 0) return null;
  
  const gamesByTimeClass = convertToGameData(data);
  const selectedGames = gamesByTimeClass[selectedClass] || [];
  
  // Get first game date and total games for selected time class
  const selectedTimeClassData = data.find(d => d.time_class === selectedClass);
  const firstGameDate = selectedTimeClassData?.firstGameDate;
  const totalGames = selectedTimeClassData?.totalGames;

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
            onClick={() => setSelectedClass(tc)}
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
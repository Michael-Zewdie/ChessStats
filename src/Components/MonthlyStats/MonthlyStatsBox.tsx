import React, { useState } from 'react';
import type { MonthlyRatingPoint } from "../../Api/MonthlyStats/route.ts";
import { RatingProgressionChart, type GameData } from '../RatingProgressionChart';
import '../../index.css'

interface MonthlyStatsBoxProps {
  data: MonthlyRatingPoint[]; // raw MonthlyStats(username) output
}

const COLORS: Record<string, string> = {
  rapid: '#00C853', // green
  blitz: '#FFD600', // yellow
  bullet: '#D50000', // red
  daily: '#42A5F5', // optional fallback for daily/correspondence
};

function convertToGameData(data: MonthlyRatingPoint[]): Record<string, GameData[]> {
  const gamesByTimeClass: Record<string, GameData[]> = {};
  
  data.forEach((point) => {
    if (!gamesByTimeClass[point.time_class]) {
      gamesByTimeClass[point.time_class] = [];
    }
    
    // Convert month string (YYYY-MM) to a proper date (end of month for better progression)
    const [year, month] = point.month.split('-');
    const lastDayOfMonth = new Date(parseInt(year), parseInt(month), 0);
    
    gamesByTimeClass[point.time_class].push({
      date: lastDayOfMonth.toISOString().split('T')[0],
      rating: point.end,
      time_class: point.time_class
    });
  });
  
  return gamesByTimeClass;
}

export function MonthlyStatsBox({ data }: MonthlyStatsBoxProps) {
  if (!data || data.length === 0) return null;

  const timeClasses = Array.from(new Set(data.map((d) => d.time_class)));
  const [selectedClass, setSelectedClass] = useState<string>(timeClasses[0]);
  
  const gamesByTimeClass = convertToGameData(data);
  const selectedGames = gamesByTimeClass[selectedClass] || [];

  return (
    <div style={{
      width: '80rem',
      maxWidth: '80rem',
      height: 500,
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #374151',
      marginLeft: 0,
      marginRight: 'auto',
      alignSelf: 'flex-start'
    }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {timeClasses.map((tc) => (
          <button
            key={tc}
            onClick={() => setSelectedClass(tc)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: selectedClass === tc ? `2px solid ${COLORS[tc] || '#fff'}` : '2px solid transparent',
              backgroundColor: selectedClass === tc ? `${COLORS[tc] || '#fff'}20` : 'transparent',
              color: COLORS[tc] || '#fff',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: selectedClass === tc ? 'bold' : 'normal',
              transition: 'all 0.2s ease'
            }}
          >
            {tc.charAt(0).toUpperCase() + tc.slice(1)}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, padding: '1rem' }}>
        <RatingProgressionChart
          games={selectedGames}
          title={`${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} Rating Progression`}
          height={380}
          lineColor={COLORS[selectedClass]}
        />
      </div>
    </div>
  );
}
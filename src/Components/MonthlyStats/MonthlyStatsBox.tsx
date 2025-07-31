import React, { useState } from 'react';
import type { MonthlyRatingPoint } from "../../Api/MonthlyStats/route.ts";
import type { ChessProfile } from "../../Types/ChessProfile";
import { RatingProgressionChart, type GameData } from '../RatingProgressionChart';
import '../../index.css'

interface MonthlyStatsBoxProps {
  data: MonthlyRatingPoint[]; // raw MonthlyStats(username) output
  profile?: ChessProfile;
  country?: string | null;
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

function getCountryFlag(country: string | null): string {
  if (!country) return '🌍';
  
  // Country name to flag emoji mapping
  const countryFlags: Record<string, string> = {
    // Africa
    'ethiopia': '🇪🇹',
    'south africa': '🇿🇦',
    'egypt': '🇪🇬',
    'nigeria': '🇳🇬',
    'kenya': '🇰🇪',
    'morocco': '🇲🇦',
    'ghana': '🇬🇭',
    'tunisia': '🇹🇳',
    'algeria': '🇩🇿',
    'uganda': '🇺🇬',
    'tanzania': '🇹🇿',
    'zimbabwe': '🇿🇼',
    'zambia': '🇿🇲',
    'botswana': '🇧🇼',
    'senegal': '🇸🇳',
    
    // North America
    'united states': '🇺🇸',
    'canada': '🇨🇦',
    'mexico': '🇲🇽',
    'guatemala': '🇬🇹',
    'cuba': '🇨🇺',
    'jamaica': '🇯🇲',
    'costa rica': '🇨🇷',
    'panama': '🇵🇦',
    
    // South America
    'brazil': '🇧🇷',
    'argentina': '🇦🇷',
    'chile': '🇨🇱',
    'colombia': '🇨🇴',
    'peru': '🇵🇪',
    'venezuela': '🇻🇪',
    'ecuador': '🇪🇨',
    'uruguay': '🇺🇾',
    'bolivia': '🇧🇴',
    'paraguay': '🇵🇾',
    
    // Europe
    'united kingdom': '🇬🇧',
    'germany': '🇩🇪',
    'france': '🇫🇷',
    'spain': '🇪🇸',
    'italy': '🇮🇹',
    'russia': '🇷🇺',
    'poland': '🇵🇱',
    'ukraine': '🇺🇦',
    'netherlands': '🇳🇱',
    'belgium': '🇧🇪',
    'switzerland': '🇨🇭',
    'austria': '🇦🇹',
    'sweden': '🇸🇪',
    'norway': '🇳🇴',
    'denmark': '🇩🇰',
    'finland': '🇫🇮',
    'iceland': '🇮🇸',
    'portugal': '🇵🇹',
    'greece': '🇬🇷',
    'turkey': '🇹🇷',
    'czech republic': '🇨🇿',
    'hungary': '🇭🇺',
    'romania': '🇷🇴',
    'bulgaria': '🇧🇬',
    'croatia': '🇭🇷',
    'serbia': '🇷🇸',
    'bosnia and herzegovina': '🇧🇦',
    'slovenia': '🇸🇮',
    'slovakia': '🇸🇰',
    'estonia': '🇪🇪',
    'latvia': '🇱🇻',
    'lithuania': '🇱🇹',
    'ireland': '🇮🇪',
    'luxembourg': '🇱🇺',
    'malta': '🇲🇹',
    'cyprus': '🇨🇾',
    
    // Asia
    'china': '🇨🇳',
    'japan': '🇯🇵',
    'india': '🇮🇳',
    'south korea': '🇰🇷',
    'indonesia': '🇮🇩',
    'thailand': '🇹🇭',
    'vietnam': '🇻🇳',
    'philippines': '🇵🇭',
    'malaysia': '🇲🇾',
    'singapore': '🇸🇬',
    'taiwan': '🇹🇼',
    'hong kong': '🇭🇰',
    'pakistan': '🇵🇰',
    'bangladesh': '🇧🇩',
    'sri lanka': '🇱🇰',
    'nepal': '🇳🇵',
    'myanmar': '🇲🇲',
    'cambodia': '🇰🇭',
    'laos': '🇱🇦',
    'mongolia': '🇲🇳',
    'kazakhstan': '🇰🇿',
    'uzbekistan': '🇺🇿',
    'kyrgyzstan': '🇰🇬',
    'tajikistan': '🇹🇯',
    'turkmenistan': '🇹🇲',
    'afghanistan': '🇦🇫',
    'iran': '🇮🇷',
    'iraq': '🇮🇶',
    'syria': '🇸🇾',
    'lebanon': '🇱🇧',
    'jordan': '🇯🇴',
    'israel': '🇮🇱',
    'palestine': '🇵🇸',
    'saudi arabia': '🇸🇦',
    'united arab emirates': '🇦🇪',
    'qatar': '🇶🇦',
    'kuwait': '🇰🇼',
    'bahrain': '🇧🇭',
    'oman': '🇴🇲',
    'yemen': '🇾🇪',
    'georgia': '🇬🇪',
    'armenia': '🇦🇲',
    'azerbaijan': '🇦🇿',
    
    // Oceania
    'australia': '🇦🇺',
    'new zealand': '🇳🇿',
    'fiji': '🇫🇯',
    'papua new guinea': '🇵🇬',
    'samoa': '🇼🇸',
    'tonga': '🇹🇴',
    'vanuatu': '🇻🇺',
    'solomon islands': '🇸🇧'
  };
  
  return countryFlags[country.toLowerCase()] || '🌍';
}

export function MonthlyStatsBox({ data, profile, country }: MonthlyStatsBoxProps) {
  if (!data || data.length === 0) return null;

  const timeClasses = Array.from(new Set(data.map((d) => d.time_class)));
  const [selectedClass, setSelectedClass] = useState<string>(timeClasses[0]);
  
  const gamesByTimeClass = convertToGameData(data);
  const selectedGames = gamesByTimeClass[selectedClass] || [];

  return (
    <div style={{
      width: '100rem',
      maxWidth: '100rem',
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
      alignSelf: 'flex-start',
      position: 'relative'
    }}>
      {profile && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 10
        }}>
          <img
            src={profile.avatar && profile.avatar.trim() !== "" ? profile.avatar : "/public/default-avatar.png"}
            alt={profile.name}
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #374151'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '1rem', fontWeight: '500' }}>{profile.username}</div>
            <div style={{ fontSize: '1.25rem' }}>{getCountryFlag(country)}</div>
          </div>
        </div>
      )}
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
import React, { useState } from 'react';
import NemesisBox from './StatBoxes/NemesisBox';
import ChildBox from './StatBoxes/ChildBox';
import ParentBox from './StatBoxes/ParentBox';
import BullyBox from './StatBoxes/BullyBox';
import UpsetBox from './StatBoxes/UpsetBox';
import type { ChessGame } from './types';

interface ChessStatsBoxProps {
  games: ChessGame[];
  currentRating: number;
}


export default function ChessStatsBox({ games, currentRating }: ChessStatsBoxProps) {
  const [showChildren, setShowChildren] = useState(false);

  // Helper function for time class formatting (used in children section)
  const formatTimeClass = (timeClass: string) => {
    // Handle specific Chess.com time control codes
    const timeControlMap: Record<string, string> = {
      'bullet': 'Bullet',
      'blitz': 'Blitz', 
      'rapid': 'Rapid',
      'daily': 'Daily',
      // Common Chess.com time control codes
      'z28': 'Blitz (2+8)',
      'z18': 'Bullet (1+8)', 
      'z38': 'Blitz (3+8)',
      'z58': 'Rapid (5+8)',
      'z108': 'Rapid (10+8)',
      'z158': 'Rapid (15+8)',
      'z308': 'Rapid (30+8)',
    };
    
    const mapped = timeControlMap[timeClass.toLowerCase()];
    return mapped || timeClass.charAt(0).toUpperCase() + timeClass.slice(1);
  };

  // Temporary: disable children section to avoid errors
  const children: { opponent: string; timeClass: string; streakLength: number }[] = [];

  return (
    <div style={{
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #374151',
      width: '300px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <NemesisBox games={games} />
        <ChildBox games={games} />
        <ParentBox games={games} />
        <BullyBox games={games} />
        <UpsetBox games={games} />
      </div>


      {/* Children Section */}
      {children.length > 0 && (
        <div>
          <button
            onClick={() => setShowChildren(!showChildren)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#374151',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            <span>👶 Children ({children.length}) - You adopted them</span>
            <span style={{ transform: showChildren ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▼
            </span>
          </button>
          
          {showChildren && (
            <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
              {children.map((child, index) => (
                <div key={index} style={{ 
                  fontSize: '0.8rem', 
                  marginBottom: index < children.length - 1 ? '0.5rem' : '0',
                  color: '#e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    <strong>{child.opponent}</strong>: {child.streakLength} consecutive wins
                  </span>
                  <span style={{ 
                    color: '#9ca3af', 
                    fontSize: '0.75rem',
                    backgroundColor: '#374151',
                    padding: '0.2rem 0.4rem',
                    borderRadius: '0.25rem'
                  }}>
                    {formatTimeClass(child.timeClass)}
                  </span>
                </div>
              ))}
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                backgroundColor: '#374151', 
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#9ca3af'
              }}>
                💡 You beat them 10+ times in a row in the same time control
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Adoptions Message - removed for now since logic moved to individual components */}
    </div>
  );
}
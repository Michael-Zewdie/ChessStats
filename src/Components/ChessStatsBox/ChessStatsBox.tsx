import React, { useState } from 'react';
import RivalBox from './StatBoxes/RivalBox';
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
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <RivalBox games={games} />
        <ChildBox games={games} />
        <ParentBox games={games} />
        <BullyBox games={games} />
        <UpsetBox games={games} />
      </div>
    </div>
  );
}
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import React, { useState } from 'react';
import type { MonthlyRatingPoint } from "../../Api/MonthlyStats/route.ts";
import '../../index.css'

interface MonthlyStatsBoxProps {
  data: MonthlyRatingPoint[]; // raw MonthlyStats(username) output
}

// helper: pivot data so each time_class becomes its own series
type PivotedMonth = { month: string } & { [time_class: string]: number | string };
function pivotByTimeClass(rows: MonthlyRatingPoint[]): PivotedMonth[] {
  const map: Record<string, PivotedMonth> = {};
  rows.forEach((r) => {
    if (!map[r.month]) map[r.month] = { month: r.month };
    map[r.month][r.time_class] = r.end;
  });
  return Object.values(map).sort((a, b) => (a.month > b.month ? 1 : -1));
}

const COLORS: Record<string, string> = {
  rapid: '#00C853', // green
  blitz: '#FFD600', // yellow
  bullet: '#D50000', // red
  daily: '#42A5F5', // optional fallback for daily/correspondence
};

export function MonthlyStatsBox({ data }: MonthlyStatsBoxProps) {
  if (!data || data.length === 0) return null;

  const timeClasses = Array.from(new Set(data.map((d) => d.time_class)));
  const [selectedClasses, setSelectedClasses] = useState<string[]>(timeClasses);

  // Toggle controls for time classes
  // (Inserted before chartData)
  const chartData = pivotByTimeClass(data);
  
  return (
    <div style={{
      width: '104rem',
      maxWidth: '104rem',
      height: 500,
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #374151',
      marginLeft: 0,
      marginRight: 'auto',
      alignSelf: 'flex-start'
    }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        {timeClasses.map((tc) => (
          <label key={tc} style={{ cursor: 'pointer', color: COLORS[tc] || '#fff' }}>
            <input
              type="checkbox"
              checked={selectedClasses.includes(tc)}
              onChange={() =>
                setSelectedClasses((prev) =>
                  prev.includes(tc) ? prev.filter((c) => c !== tc) : [...prev, tc]
                )
              }
              style={{ marginRight: '0.25rem' }}
            />
            {tc}
          </label>
        ))}
      </div>
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {timeClasses
            .filter((tc) => selectedClasses.includes(tc))
            .map((tc) => (
              <Area
                key={tc}
                type="monotone"
                dataKey={tc}
                stroke={COLORS[tc] || '#8884d8'}
                fill={COLORS[tc] || '#8884d8'}
                fillOpacity={0.2}
                strokeWidth={2}
                connectNulls
              />
            ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
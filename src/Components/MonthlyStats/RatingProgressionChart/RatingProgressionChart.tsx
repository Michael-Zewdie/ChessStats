import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface GameData {
  date: string;
  rating: number;
  time_class?: string;
}

export interface ChartDataPoint {
  period: string;
  rating: number;
  date: Date;
  displayLabel: string;
}

export interface RatingProgressionChartProps {
  games: GameData[];
  title?: string;
  height?: number;
  lineColor?: string;
  className?: string;
  firstGameDate?: string;
  totalGames?: number;
}

type TimeInterval = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

function determineTimeInterval(games: GameData[]): TimeInterval {
  if (games.length === 0) return 'monthly';
  
  const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstDate = new Date(sortedGames[0].date);
  const lastDate = new Date(sortedGames[sortedGames.length - 1].date);
  
  const diffInMonths = (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + 
                      (lastDate.getMonth() - firstDate.getMonth());
  
  if (diffInMonths < 6) return 'weekly';
  if (diffInMonths <= 60) return 'monthly';
  return 'yearly';
}

function getIntervalKey(date: Date, interval: TimeInterval): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  switch (interval) {
    case 'weekly':
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      return `${year}-W${Math.ceil((weekStart.getDate() + new Date(year, 0, 1).getDay()) / 7)}`;
    case 'monthly':
      return `${year}-${String(month + 1).padStart(2, '0')}`;
    case 'quarterly':
      return `${year}-Q${Math.ceil((month + 1) / 3)}`;
    case 'yearly':
      return String(year);
  }
}

function formatDisplayLabel(period: string, interval: TimeInterval): string {
  switch (interval) {
    case 'weekly':
      const [year, week] = period.split('-W');
      return `${year} W${week}`;
    case 'monthly':
      const [monthYear, monthNum] = period.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(monthNum) - 1]} ${monthYear}`;
    case 'quarterly':
      const [qYear, quarter] = period.split('-Q');
      return `${qYear} Q${quarter}`;
    case 'yearly':
      return period;
  }
}

function groupGamesByInterval(games: GameData[]): ChartDataPoint[] {
  if (games.length === 0) return [];
  
  const interval = determineTimeInterval(games);
  const intervalMap = new Map<string, { lastRating: number; lastDate: Date }>();
  
  games
    .filter(game => game.rating && !isNaN(game.rating))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .forEach(game => {
      const date = new Date(game.date);
      const intervalKey = getIntervalKey(date, interval);
      
      intervalMap.set(intervalKey, {
        lastRating: game.rating,
        lastDate: date
      });
    });
  
  return Array.from(intervalMap.entries())
    .map(([period, data]) => ({
      period,
      rating: data.lastRating,
      date: data.lastDate,
      displayLabel: formatDisplayLabel(period, interval)
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getRatingBounds(data: ChartDataPoint[]): { min: number; max: number } {
  if (data.length === 0) return { min: 0, max: 2000 };
  
  const ratings = data.map(d => d.rating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const padding = (max - min) * 0.1 || 100;
  
  return {
    min: Math.max(0, Math.floor((min - padding) / 50) * 50),
    max: Math.ceil((max + padding) / 50) * 50
  };
}

function getLineColor(data: ChartDataPoint[]): string {
  if (data.length < 2) return '#8884d8';
  
  const firstRating = data[0].rating;
  const lastRating = data[data.length - 1].rating;
  
  return lastRating >= firstRating ? '#00C853' : '#D50000';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    return (
      <div style={{
        backgroundColor: '#1f2937',
        color: '#fff',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
        border: '1px solid #374151'
      }}>
        <p style={{ fontWeight: '600', marginBottom: '4px' }}>{data.displayLabel}</p>
        <p style={{ fontSize: '14px', marginBottom: '2px' }}>Rating: {data.rating}</p>
        <p style={{ fontSize: '12px', color: '#9ca3af' }}>
          {data.date.toLocaleDateString()}
        </p>
      </div>
    );
  }
  return null;
};

export function RatingProgressionChart({
  games,
  title,
  height = 400,
  lineColor,
  className = '',
  firstGameDate,
  totalGames
}: RatingProgressionChartProps) {
  if (!games || games.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '256px',
        backgroundColor: 'transparent',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#9ca3af' }}>No rating data available</p>
      </div>
    );
  }

  const chartData = groupGamesByInterval(games);
  
  if (chartData.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '256px',
        backgroundColor: 'transparent',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#9ca3af' }}>No valid rating data found</p>
      </div>
    );
  }

  const { min, max } = getRatingBounds(chartData);
  const finalLineColor = lineColor || getLineColor(chartData);
  
  const currentRating = chartData[chartData.length - 1]?.rating;

  return (
    <div style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
      {title && (
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#fff',
            margin: '0 0 8px 0'
          }}>
            {title}
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            margin: 0
          }}>
            {firstGameDate && `Your first ${title?.toLowerCase().includes('blitz') ? 'blitz' : 
                                          title?.toLowerCase().includes('bullet') ? 'bullet' : 
                                          title?.toLowerCase().includes('rapid') ? 'rapid' : 
                                          title?.toLowerCase().includes('daily') ? 'daily' : ''} game was on ${new Date(firstGameDate).toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                          })}`}
          </p>
          {totalGames && (
            <p style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              margin: '4px 0 0 0'
            }}>
              You have played {totalGames.toLocaleString()} total games
            </p>
          )}
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="displayLabel"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            angle={-45}
            textAnchor="end"
            height={60}
            axisLine={{ stroke: '#4b5563' }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <YAxis 
            domain={[min, max]}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={{ stroke: '#4b5563' }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke={finalLineColor}
            strokeWidth={3}
            dot={{ fill: finalLineColor, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: finalLineColor, strokeWidth: 2, fill: '#1f2937' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
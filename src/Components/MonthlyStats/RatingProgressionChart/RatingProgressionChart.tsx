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

type TimeInterval = 'monthly' | 'yearly';

function determineTimeInterval(games: GameData[]): TimeInterval {
  if (games.length === 0) return 'monthly';
  
  const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstDate = new Date(sortedGames[0].date);
  const lastDate = new Date(sortedGames[sortedGames.length - 1].date);
  
  const diffInMonths = (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + 
                      (lastDate.getMonth() - firstDate.getMonth());
  
  return diffInMonths <= 150 ? 'monthly' : 'yearly';
}

function getIntervalKey(date: Date, interval: TimeInterval): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  switch (interval) {
    case 'monthly':
      return `${year}-${String(month + 1).padStart(2, '0')}`;
    case 'yearly':
      return String(year);
  }
}

function formatDisplayLabel(period: string, interval: TimeInterval): string {
  switch (interval) {
    case 'monthly':
      {
        const [year, monthNum] = period.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
      }
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

interface LineTooltipEntry { payload: ChartDataPoint }
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: LineTooltipEntry[] | undefined }) => {
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
  lineColor,
  firstGameDate,
  totalGames
}: Omit<RatingProgressionChartProps, 'height'>) {

  const chartData = groupGamesByInterval(games);
  

  const { min, max } = getRatingBounds(chartData);
  const finalLineColor = lineColor || getLineColor(chartData);
  

  return (
    <div style={{ backgroundColor: 'transparent', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {title && (
        <div style={{  textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#fff',
            margin: '0 0 4px 0'
          }}>
            {title}
          </h3>
          <p style={{ 
            fontSize: '13px', 
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
              fontSize: '13px', 
              color: '#9ca3af',
              margin: '2px 0 0 0'
            }}>
              You have played {totalGames.toLocaleString()} total games{firstGameDate ? (() => {
                const firstDate = new Date(firstGameDate);
                const lastDate = new Date(Math.max(...games.map(g => new Date(g.date).getTime())));
                const daysDiff = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)));
                const gamesPerDay = Math.round((totalGames / daysDiff) * 100) / 100;
                return `, that is ${gamesPerDay} games per day!`;
              })() : ''}
            </p>
          )}
        </div>
      )}
      
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: window.innerWidth < 768 ? 15 : 30,
            left: window.innerWidth < 768 ? 10 : 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="displayLabel"
            tick={{ fontSize: window.innerWidth < 768 ? 10 : 12, fill: '#9ca3af' }}
            angle={-45}
            textAnchor="end"
            height={window.innerWidth < 768 ? 45 : 60}
            axisLine={{ stroke: '#4b5563' }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <YAxis 
            domain={[min, max]}
            tick={{ fontSize: window.innerWidth < 768 ? 10 : 12, fill: '#9ca3af' }}
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
    </div>
  );
}
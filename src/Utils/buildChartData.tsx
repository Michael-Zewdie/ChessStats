import type { ChessProfileStats, ChartRow } from '../Types/index.ts';

const CHESS_TIME_CLASSES = [
    { key: 'chess_daily', name: 'Daily' },
    { key: 'chess_rapid', name: 'Rapid' },
    { key: 'chess_bullet', name: 'Bullet' },
    { key: 'chess_blitz', name: 'Blitz' },
] as const;

export function buildChartData(stats: Partial<ChessProfileStats>): ChartRow[] {
    return CHESS_TIME_CLASSES
        .filter(({ key }) => stats[key])
        .map(({ key, name }) => ({
            name,
            current: stats[key]?.last?.rating ?? 0,
            best: stats[key]?.best?.rating ?? 0,
        }));
}
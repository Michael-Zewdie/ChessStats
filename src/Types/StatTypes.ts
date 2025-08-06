import type { MonthlyRatingPoint as MonthlyRatingPointType } from './MonthlyStats';

export interface ChartRow {
    name: string;
    current: number;
    best: number;
}
export type ModeKey = 'chess_daily' | 'chess_rapid' | 'chess_bullet' | 'chess_blitz';

export interface ComparisonPoint {
    month: string;
    time_class: string;
    [username: string]: string | number;
}

export interface MultiPlayerData {
    [username: string]: MonthlyRatingPointType[];
}

export type MonthlyRatingPoint = MonthlyRatingPointType;

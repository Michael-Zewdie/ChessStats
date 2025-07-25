import { SECTION_CONFIG } from '../Config/statMode.ts'
import type { ChessProfileStats } from '../Types/ChessStats.ts';
import type { ChartRow } from "../Types/StatTypes.ts"

export function buildChartData(stats: ChessProfileStats): ChartRow[] {
    return SECTION_CONFIG
        .filter(({ key }) => stats[key])
        .map(({ key, name }) => ({
            name,
            current: stats[key]?.last?.rating ?? 0,
            best: stats[key]?.best?.rating ?? 0,
        }));
}
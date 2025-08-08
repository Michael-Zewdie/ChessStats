// Re-export the chess game types from the main ChessGame module
export type { ChessGame, ChessComGameRaw } from './ChessGame';
export interface ChessProfile {
    avatar?: string;
    player_id: number;
    '@id': string;
    url: string;
    username: string;
    followers: number;
    country?: string;
    last_online?: number;
    joined: number;
    status: string;
    is_streamer?: boolean;
    verified?: boolean;
    league?: string;
}
export interface GameModeStats {
    last?: {
        rating: number;
        date: number;
        rd: number;
    };
    best?: {
        rating: number;
        date: number;
        game: string;
    };
    record?: {
        win: number;
        loss: number;
        draw: number;
    };
}
export interface ChessProfileStats {
    chess_rapid?: GameModeStats;
    chess_bullet?: GameModeStats;
    chess_blitz?: GameModeStats;
    chess_daily?: GameModeStats;
    fide?: number;
    tactics?: {
        highest?: {
            rating: number;
            date: number;
        };
        lowest?: {
            rating: number;
            date: number;
        };
    };
}
export interface MonthlyRatingPoint {
    month: string;
    start: number;
    end: number;
    change: number;
    time_class: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code?: string;
        details?: unknown;
    };
    timestamp: string;
}
export interface ProfileApiResponse {
    profile: ChessProfile | null;
    stats: ChessProfileStats | null;
    country?: string;
}
export interface GetUserRequest {
    username: string;
}
export interface ApiError {
    message: string;
    statusCode: number;
    code?: string;
    details?: unknown;
}
//# sourceMappingURL=index.d.ts.map
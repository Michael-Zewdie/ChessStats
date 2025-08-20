export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface ChessStatsEvent extends AnalyticsEvent {
  category: 'chess_stats';
}

export interface UserSearchEvent extends ChessStatsEvent {
  action: 'search_user';
  label: string; // username
}

export interface ProfileViewEvent extends ChessStatsEvent {
  action: 'view_profile';
  label: string; // username
}

export interface ChartInteractionEvent extends ChessStatsEvent {
  action: 'chart_interaction';
  label: string; // chart type
}

export interface ErrorEvent extends ChessStatsEvent {
  action: 'error_occurred';
  label: string; // error type
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}
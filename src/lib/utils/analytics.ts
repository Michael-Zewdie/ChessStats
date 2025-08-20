import type { AnalyticsEvent, UserSearchEvent, ProfileViewEvent, ChartInteractionEvent, ErrorEvent } from '../../Types/analytics';

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export const isAnalyticsEnabled = (): boolean => {
  return !!(GA4_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag);
};

export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isAnalyticsEnabled()) {
    console.log('Analytics disabled or not available:', event);
    return;
  }

  try {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
    
    console.log('Analytics event tracked:', event);
  } catch (error) {
    console.warn('Failed to track analytics event:', error);
  }
};

export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsEnabled()) {
    console.log('Page view tracking disabled:', path);
    return;
  }

  try {
    window.gtag('config', GA4_MEASUREMENT_ID!, {
      page_path: path,
      page_title: title || 'ChessStats',
    });
    
    console.log('Page view tracked:', path);
  } catch (error) {
    console.warn('Failed to track page view:', error);
  }
};

// Specific event tracking functions
export const trackUserSearch = (username: string): void => {
  const event: UserSearchEvent = {
    action: 'search_user',
    category: 'chess_stats',
    label: username.toLowerCase(),
  };
  trackEvent(event);
};

export const trackProfileView = (username: string): void => {
  const event: ProfileViewEvent = {
    action: 'view_profile',
    category: 'chess_stats',
    label: username.toLowerCase(),
  };
  trackEvent(event);
};

export const trackChartInteraction = (chartType: string): void => {
  const event: ChartInteractionEvent = {
    action: 'chart_interaction',
    category: 'chess_stats',
    label: chartType,
  };
  trackEvent(event);
};

export const trackError = (errorType: string, errorMessage?: string): void => {
  const event: ErrorEvent = {
    action: 'error_occurred',
    category: 'chess_stats',
    label: errorMessage ? `${errorType}: ${errorMessage}` : errorType,
  };
  trackEvent(event);
};
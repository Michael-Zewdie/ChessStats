import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackPageView, 
  trackUserSearch, 
  trackProfileView, 
  trackChartInteraction, 
  trackError,
  isAnalyticsEnabled 
} from '../lib/utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    const path = location.pathname;
    let title = 'ChessStats';

    // Set appropriate titles for different pages
    if (path === '/') {
      title = 'ChessStats - Home';
    } else if (path.startsWith('/profile/')) {
      const username = path.split('/')[2];
      title = `ChessStats - ${username}`;
    } else if (path === '/error') {
      title = 'ChessStats - Error';
    }

    trackPageView(path, title);
  }, [location]);

  return {
    isEnabled: isAnalyticsEnabled(),
    trackUserSearch,
    trackProfileView,
    trackChartInteraction,
    trackError,
  };
};
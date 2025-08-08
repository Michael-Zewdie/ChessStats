// Configurable minimum game counts for displaying statistics
export const MINIMUM_GAME_COUNTS = {
  // Minimum games required to show statistics for each time control
  BULLET: 100,
  BLITZ: 100, 
  RAPID: 100,
  DAILY: 100,
  
  // Minimum total games across all time controls to show any statistics at all
  TOTAL_MINIMUM: 100
} as const;

// Time control mappings for Chess.com API
export const TIME_CONTROLS = {
  BULLET: 'chess_bullet',
  BLITZ: 'chess_blitz', 
  RAPID: 'chess_rapid',
  DAILY: 'chess_daily'
} as const;

export type TimeControlKey = keyof typeof TIME_CONTROLS;
export type TimeControlValue = typeof TIME_CONTROLS[TimeControlKey];
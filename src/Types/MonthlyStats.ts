export type MonthlyRatingPoint = {
  month: string;          // YYYY-MM
  start: number;          // first rating that month
  end: number;            // last rating that month
  change: number;         // end - start
  time_class: string;     // rapid / blitz / bullet / daily etc.
  firstGameDate?: string; // Date of first game for this time class (ISO string)
  totalGames?: number;    // Total number of games played in this time class
};
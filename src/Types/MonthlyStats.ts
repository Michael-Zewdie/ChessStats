export type MonthlyRatingPoint = {
  month: string;          // YYYY-MM
  start: number;          // first rating that month
  end: number;            // last rating that month
  change: number;         // end - start
  time_class: string;     // rapid / blitz / bullet / daily etc.
};
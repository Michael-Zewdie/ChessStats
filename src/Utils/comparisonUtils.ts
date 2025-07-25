import type { MonthlyRatingPoint } from "../Api/MonthlyStats/route";
import type { ComparisonPoint, MultiPlayerData } from "../Types/StatTypes";

/**
 * Merges multiple players' MonthlyRatingPoint[] data into ComparisonPoint[] format
 * for rendering in comparison charts
 */
export function mergePlayersData(playerData: MultiPlayerData): ComparisonPoint[] {
  const comparisonMap = new Map<string, ComparisonPoint>();

  // Process each player's data
  Object.entries(playerData).forEach(([username, points]) => {
    points.forEach((point) => {
      const key = `${point.month}-${point.time_class}`;
      
      if (!comparisonMap.has(key)) {
        comparisonMap.set(key, {
          month: point.month,
          time_class: point.time_class,
        });
      }
      
      const existing = comparisonMap.get(key)!;
      existing[username] = point.end; // Use end rating for the chart
    });
  });

  // Convert to array and sort by month
  return Array.from(comparisonMap.values()).sort((a, b) => {
    if (a.month !== b.month) {
      return a.month > b.month ? 1 : -1;
    }
    // If same month, sort by time_class for consistency
    return a.time_class.localeCompare(b.time_class);
  });
}

/**
 * Gets all unique time classes from the merged data
 */
export function getTimeClasses(comparisonData: ComparisonPoint[]): string[] {
  const timeClasses = new Set<string>();
  comparisonData.forEach(point => timeClasses.add(point.time_class));
  return Array.from(timeClasses).sort();
}

/**
 * Gets all unique usernames from the merged data
 */
export function getUsernames(comparisonData: ComparisonPoint[]): string[] {
  const usernames = new Set<string>();
  comparisonData.forEach(point => {
    Object.keys(point).forEach(key => {
      if (key !== 'month' && key !== 'time_class') {
        usernames.add(key);
      }
    });
  });
  return Array.from(usernames).sort();
}

/**
 * Generates colors for username + time_class combinations
 */
export function generatePlayerColors(usernames: string[], timeClasses: string[]): Record<string, string> {
  const colors: Record<string, string> = {};
  
  // Base colors for time classes
  const timeClassColors: Record<string, string> = {
    rapid: '#00C853',   // green
    blitz: '#FFD600',   // yellow  
    bullet: '#D50000',  // red
    daily: '#42A5F5',   // blue
  };
  
  // Player color variations (lighter/darker shades)
  const playerVariations = [
    1.0,    // original
    0.7,    // darker
    1.3,    // lighter
    0.4,    // much darker
    1.6,    // much lighter
  ];

  usernames.forEach((username, userIndex) => {
    timeClasses.forEach((timeClass) => {
      const baseColor = timeClassColors[timeClass] || '#8884d8';
      const variation = playerVariations[userIndex % playerVariations.length];
      
      // Simple color variation by adjusting opacity or using CSS filter
      const key = `${username}-${timeClass}`;
      if (variation === 1.0) {
        colors[key] = baseColor;
      } else {
        colors[key] = `${baseColor}${Math.floor(variation * 255).toString(16).padStart(2, '0')}`;
      }
    });
  });

  return colors;
}

/**
 * Filters comparison data by specific time class
 */
export function filterByTimeClass(data: ComparisonPoint[], timeClass: string): ComparisonPoint[] {
  return data.filter(point => point.time_class === timeClass);
} 
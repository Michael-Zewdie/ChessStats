import type { ChessGame } from '../../../Types/ChessGame';

export interface FreefallStats {
  maxPointsLostInOneDay: number;
  dateOfMaxLoss: string | null;
  totalDaysWithLosses: number;
}

export class FreefallService {
  static calculate(games: ChessGame[]): FreefallStats {
    if (!games || games.length === 0) {
      return { maxPointsLostInOneDay: 0, dateOfMaxLoss: null, totalDaysWithLosses: 0 };
    }
    
    try {
      // Sort games by date to ensure chronological order
      const sortedGames = [...games].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Group games by date and calculate rating changes
      const dailyRatingChanges = new Map<string, number>();
      
      for (let i = 0; i < sortedGames.length; i++) {
        const game = sortedGames[i];
        const dateOnly = new Date(game.date).toISOString().split('T')[0];
        
        // Calculate rating change for this game
        let ratingChange = 0;
        
        if (i > 0) {
          // Rating change is difference from previous game
          const previousGame = sortedGames[i - 1];
          ratingChange = game.userRating - previousGame.userRating;
        } else {
          // For the first game, we can't calculate a change, so we skip it
          continue;
        }
        
        // Add this rating change to the daily total
        if (dailyRatingChanges.has(dateOnly)) {
          dailyRatingChanges.set(dateOnly, dailyRatingChanges.get(dateOnly)! + ratingChange);
        } else {
          dailyRatingChanges.set(dateOnly, ratingChange);
        }
      }
      
      // Find the day with the maximum rating loss (most negative change)
      let maxPointsLostInOneDay = 0;
      let dateOfMaxLoss: string | null = null;
      let totalDaysWithLosses = 0;
      
      for (const [date, ratingChange] of dailyRatingChanges.entries()) {
        if (ratingChange < 0) {
          totalDaysWithLosses++;
          
          // Convert to positive number for easier comparison (absolute value)
          const pointsLost = Math.abs(ratingChange);
          if (pointsLost > maxPointsLostInOneDay) {
            maxPointsLostInOneDay = pointsLost;
            dateOfMaxLoss = date;
          }
        }
      }
      
      return {
        maxPointsLostInOneDay,
        dateOfMaxLoss,
        totalDaysWithLosses
      };
    } catch (error) {
      console.error('Error calculating freefall stats:', error);
      return { maxPointsLostInOneDay: 0, dateOfMaxLoss: null, totalDaysWithLosses: 0 };
    }
  }
  
  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  }
}
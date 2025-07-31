import type { ChessGame } from '../../../Types/ChessGame';

export interface ComebackStats {
  maxPointsGainedInOneDay: number;
  dateOfMaxGain: string | null;
  totalDaysWithGains: number;
}

export class ComebackService {
  static calculate(games: ChessGame[]): ComebackStats {
    if (!games || games.length === 0) {
      return { maxPointsGainedInOneDay: 0, dateOfMaxGain: null, totalDaysWithGains: 0 };
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
          // or we could assume it starts from 0, but that would be misleading
          continue;
        }
        
        // Add this rating change to the daily total
        if (dailyRatingChanges.has(dateOnly)) {
          dailyRatingChanges.set(dateOnly, dailyRatingChanges.get(dateOnly)! + ratingChange);
        } else {
          dailyRatingChanges.set(dateOnly, ratingChange);
        }
      }
      
      // Find the day with the maximum rating gain
      let maxPointsGainedInOneDay = 0;
      let dateOfMaxGain: string | null = null;
      let totalDaysWithGains = 0;
      
      for (const [date, ratingChange] of dailyRatingChanges.entries()) {
        if (ratingChange > 0) {
          totalDaysWithGains++;
        }
        
        if (ratingChange > maxPointsGainedInOneDay) {
          maxPointsGainedInOneDay = ratingChange;
          dateOfMaxGain = date;
        }
      }
      
      return {
        maxPointsGainedInOneDay,
        dateOfMaxGain,
        totalDaysWithGains
      };
    } catch (error) {
      console.error('Error calculating comeback stats:', error);
      return { maxPointsGainedInOneDay: 0, dateOfMaxGain: null, totalDaysWithGains: 0 };
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
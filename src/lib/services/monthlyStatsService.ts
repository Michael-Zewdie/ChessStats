import { GameService } from './gameService';
import type { GameData } from '../../Components/MonthlyStats/RatingProgressionChart/RatingProgressionChart';
import type { ChessGame } from '../../Types/index';

export class monthlyStatsService {
  static async fetchChartData(username: string): Promise<Record<string, GameData[]>> {
    const games = await GameService.fetchChessGames(username);
    return games?.length ? this.convertGamesToChartData(games) : {};
  }

  private static convertGamesToChartData(games: ChessGame[]): Record<string, GameData[]> {
    const chartData: Record<string, GameData[]> = {};
    
    games
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach(game => {
        if (!chartData[game.time_class]) {
          chartData[game.time_class] = [];
        }
        
        chartData[game.time_class].push({
          date: game.date.split('T')[0],
          rating: game.userRating,
          time_class: game.time_class
        });
      });
    
    return chartData;
  }

  static getTimeClassStats(games: ChessGame[]) {
    const stats: Record<string, { firstGameDate: string; totalGames: number }> = {};
    
    games.forEach(game => {
      if (!stats[game.time_class]) {
        stats[game.time_class] = {
          firstGameDate: game.date,
          totalGames: 0
        };
      }
      
      stats[game.time_class].totalGames++;
      
      if (game.date < stats[game.time_class].firstGameDate) {
        stats[game.time_class].firstGameDate = game.date;
      }
    });
    
    return stats;
  }
}
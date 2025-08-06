import type { ChessProfile } from '../../Types/ChessProfile';
import type { ChessProfileStats } from '../../Types/ChessStats';
import type { ChessGame } from '../../Types/ChessGame';
import type { MonthlyRatingPoint } from '../../Types/MonthlyStats';

import { ProfileService } from '../services/profileService';
import { GameService } from '../services/gameService';
import { MonthlyStatsService } from '../services/MonthlyStatsService';

export class ChessDataService {
  // Profile methods
  static async fetchUserProfile(username: string): Promise<ChessProfile | null> {
    return ProfileService.fetchUserProfile(username);
  }

  static async fetchUserStats(username: string): Promise<ChessProfileStats> {
    return ProfileService.fetchUserStats(username);
  }

  static async fetchCountryInfo(countryUrl: string): Promise<string> {
    return ProfileService.fetchCountryInfo(countryUrl);
  }

  // Game methods
  static async fetchChessGames(username: string): Promise<ChessGame[]> {
    return GameService.fetchChessGames(username);
  }

  // Monthly stats methods
  static async fetchMonthlyStats(username: string): Promise<MonthlyRatingPoint[]> {
    return MonthlyStatsService.fetchMonthlyStats(username);
  }
}
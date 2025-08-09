import type { ChessProfile, ChessProfileStats, ChessGame } from '../../Types/index';

import { ProfileService } from '../services/profileService';
import { GameService } from '../services/gameService';
import { monthlyStatsService } from '../services/monthlyStatsService';

export class ChessDataService {
  static async fetchUserProfile(username: string): Promise<ChessProfile | null> {
    return ProfileService.fetchUserProfile(username);
  }

  static async fetchUserStats(username: string): Promise<ChessProfileStats> {
    return ProfileService.fetchUserStats(username);
  }

  static async fetchCountryInfo(countryUrl: string): Promise<string> {
    return ProfileService.fetchCountryInfo(countryUrl);
  }

  static async fetchChessGames(username: string): Promise<ChessGame[]> {
    return GameService.fetchChessGames(username);
  }

  static async fetchMonthlyStats(username: string) {
    return monthlyStatsService.fetchChartData(username);
  }
}
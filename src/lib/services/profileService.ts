import type { ChessProfile } from '../../Types/ChessProfile';
import type { ChessProfileStats } from '../../Types/ChessStats';
import { toChessProfile, toChessProfileStats } from '../utils/profileHelpers';

export class ProfileService {
  private static readonly BASE_URL = 'https://api.chess.com/pub/player';

  static async fetchUserProfile(username: string): Promise<ChessProfile | null> {
    try {
      const res = await fetch(`${this.BASE_URL}/${username}`);
      if (!res.ok) {
        return null;
      }
      const raw = await res.json();
      return toChessProfile(raw);
    } catch {
      return null;
    }
  }

  static async fetchUserStats(username: string): Promise<ChessProfileStats> {
    const res = await fetch(`${this.BASE_URL}/${username}/stats`);
    if (!res.ok) {
      throw new Error(`Failed to fetch stats for ${username}: ${res.status}`);
    }
    const json = await res.json();
    return toChessProfileStats(json);
  }

  static async fetchCountryInfo(countryUrl: string): Promise<string> {
    try {
      const res = await fetch(countryUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch country info: ${res.status}`);
      }
      const data = await res.json();
      return data.name;
    } catch {
      return '';
    }
  }
}
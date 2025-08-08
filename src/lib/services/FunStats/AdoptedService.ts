import type { ChessGame } from '../../../Types/ChessGame';

export interface AdoptionRelationship {
  opponent: string;
  timeClass: string;
  streakLength: number;
  type: 'adopted' | 'adopted_by'; // adopted = user adopted opponent, adopted_by = user got adopted
}

export interface AdoptedStats {
  children: AdoptionRelationship[];  // Players user has adopted
  parents: AdoptionRelationship[];   // Players who adopted the user
  totalChildren: number;
  totalParents: number;
}

export class AdoptedService {
  private static groupGamesByOpponentAndTimeClass(games: ChessGame[]): Record<string, ChessGame[]> {
    const grouped: Record<string, ChessGame[]> = {};
    
    games.forEach(game => {
      const key = `${game.opponent}|${game.time_class}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(game);
    });
    
    return grouped;
  }

  private static findLongestWinStreak(games: ChessGame[]): number {
    if (!games || games.length === 0) return 0;
    
    // Sort games by date to get chronological order
    const sortedGames = [...games].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    let longestStreak = 0;
    let currentStreak = 0;
    
    for (const game of sortedGames) {
      if (game.result === 'win') {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return longestStreak;
  }

  private static findLongestLossStreak(games: ChessGame[]): number {
    if (!games || games.length === 0) return 0;
    
    // Sort games by date to get chronological order
    const sortedGames = [...games].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    let longestStreak = 0;
    let currentStreak = 0;
    
    for (const game of sortedGames) {
      if (game.result === 'loss') {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return longestStreak;
  }

  private static analyzeAdoptionRelationships(games: ChessGame[]): AdoptionRelationship[] {
    const relationships: AdoptionRelationship[] = [];
    const groupedGames = this.groupGamesByOpponentAndTimeClass(games);
    
    Object.entries(groupedGames).forEach(([key, opponentGames]) => {
      const [opponent, timeClass] = key.split('|');
      
      // Need at least 10 games to have a potential adoption
      if (opponentGames.length < 10) return;
      
      // Check if user adopted opponent (10+ win streak)
      const longestWinStreak = this.findLongestWinStreak(opponentGames);
      if (longestWinStreak >= 10) {
        relationships.push({
          opponent,
          timeClass,
          streakLength: longestWinStreak,
          type: 'adopted'
        });
      }
      
      // Check if user got adopted by opponent (10+ loss streak)
      const longestLossStreak = this.findLongestLossStreak(opponentGames);
      if (longestLossStreak >= 10) {
        relationships.push({
          opponent,
          timeClass,
          streakLength: longestLossStreak,
          type: 'adopted_by'
        });
      }
    });
    
    return relationships;
  }

  static calculate(games: ChessGame[]): AdoptedStats {
    if (!games || games.length === 0) {
      return {
        children: [],
        parents: [],
        totalChildren: 0,
        totalParents: 0
      };
    }
    
    try {
      const relationships = this.analyzeAdoptionRelationships(games);
      
      const children = relationships
        .filter(rel => rel.type === 'adopted')
        .sort((a, b) => b.streakLength - a.streakLength); // Sort by longest streak first
      
      const parents = relationships
        .filter(rel => rel.type === 'adopted_by')
        .sort((a, b) => b.streakLength - a.streakLength); // Sort by longest streak first
      
      return {
        children,
        parents,
        totalChildren: children.length,
        totalParents: parents.length
      };
    } catch {
      return {
        children: [],
        parents: [],
        totalChildren: 0,
        totalParents: 0
      };
    }
  }

  // Helper method to get the primary child (highest streak)
  static getPrimaryChild(adoptedStats: AdoptedStats): AdoptionRelationship | null {
    return adoptedStats.children.length > 0 ? adoptedStats.children[0] : null;
  }

  // Helper method to get the primary parent (highest streak)
  static getPrimaryParent(adoptedStats: AdoptedStats): AdoptionRelationship | null {
    return adoptedStats.parents.length > 0 ? adoptedStats.parents[0] : null;
  }
}
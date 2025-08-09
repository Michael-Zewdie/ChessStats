import type { ChessGame } from '../../../Types/index';

export interface AdoptionRelationship {
  opponent: string;
  timeClass: string;
  streakLength: number;
  type: 'adopted' | 'adopted_by';
}

export interface AdoptedStats {
  children: AdoptionRelationship[];
  parents: AdoptionRelationship[];
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
      
      if (opponentGames.length < 10) return;
      
      const longestWinStreak = this.findLongestWinStreak(opponentGames);
      if (longestWinStreak >= 10) {
        relationships.push({
          opponent,
          timeClass,
          streakLength: longestWinStreak,
          type: 'adopted'
        });
      }
      
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
    
    const relationships = this.analyzeAdoptionRelationships(games);
    
    const children = relationships
      .filter(rel => rel.type === 'adopted')
      .sort((a, b) => b.streakLength - a.streakLength);
    
    const parents = relationships
      .filter(rel => rel.type === 'adopted_by')
      .sort((a, b) => b.streakLength - a.streakLength);
    
    return {
      children,
      parents,
      totalChildren: children.length,
      totalParents: parents.length
    };
  }

  static getPrimaryChild(adoptedStats: AdoptedStats): AdoptionRelationship | null {
    return adoptedStats.children.length > 0 ? adoptedStats.children[0] : null;
  }

  static getPrimaryParent(adoptedStats: AdoptedStats): AdoptionRelationship | null {
    return adoptedStats.parents.length > 0 ? adoptedStats.parents[0] : null;
  }
}
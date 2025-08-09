import type { ChessGame, ComparisonPoint, MultiPlayerData } from '../../Types/index';

export interface GameFilter {
  timeClass?: string;
  dateFrom?: Date;
  dateTo?: Date;
  result?: 'win' | 'loss' | 'draw';
  ratingDifferenceMin?: number;
  ratingDifferenceMax?: number;
}

export interface OpponentRecord {
  opponent: string;
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  winRate: number;
}

export class ChessHelpers {
  static filterGames(games: ChessGame[], filter: GameFilter): ChessGame[] {
    return games.filter(game => {
      const gameDate = new Date(game.date);
      const ratingDiff = game.opponentRating - game.userRating;
      
      return (!filter.timeClass || game.time_class === filter.timeClass) &&
             (!filter.dateFrom || gameDate >= filter.dateFrom) &&
             (!filter.dateTo || gameDate <= filter.dateTo) &&
             (!filter.result || game.result === filter.result) &&
             (filter.ratingDifferenceMin === undefined || ratingDiff >= filter.ratingDifferenceMin) &&
             (filter.ratingDifferenceMax === undefined || ratingDiff <= filter.ratingDifferenceMax);
    });
  }

  static groupGamesByOpponent(games: ChessGame[]): Record<string, ChessGame[]> {
    return games.reduce((acc, game) => {
      (acc[game.opponent] ??= []).push(game);
      return acc;
    }, {} as Record<string, ChessGame[]>);
  }

  static groupGamesByTimeClass(games: ChessGame[]): Record<string, ChessGame[]> {
    return games.reduce((acc, game) => {
      (acc[game.time_class] ??= []).push(game);
      return acc;
    }, {} as Record<string, ChessGame[]>);
  }

  static calculateOpponentRecords(games: ChessGame[]): OpponentRecord[] {
    const records: Record<string, OpponentRecord> = {};
    
    games.forEach(game => {
      if (!records[game.opponent]) {
        records[game.opponent] = {
          opponent: game.opponent,
          wins: 0,
          losses: 0,
          draws: 0,
          totalGames: 0,
          winRate: 0
        };
      }
      
      const record = records[game.opponent];
      record.totalGames++;
      
      switch (game.result) {
        case 'win':
          record.wins++;
          break;
        case 'loss':
          record.losses++;
          break;
        case 'draw':
          record.draws++;
          break;
      }
      
      record.winRate = record.totalGames > 0 ? (record.wins / record.totalGames) * 100 : 0;
    });
    
    return Object.values(records).sort((a, b) => b.totalGames - a.totalGames);
  }

  static sortGamesByDate(games: ChessGame[], ascending = true): ChessGame[] {
    return [...games].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }

  static sortGamesByRating(games: ChessGame[], ascending = true): ChessGame[] {
    return [...games].sort((a, b) => {
      return ascending ? a.userRating - b.userRating : b.userRating - a.userRating;
    });
  }

  static getRecentGames(games: ChessGame[], count: number): ChessGame[] {
    return this.sortGamesByDate(games, false).slice(0, count);
  }

  static getWinRate(games: ChessGame[]): number {
    if (!games.length) return 0;
    return Math.round((games.filter(game => game.result === 'win').length / games.length) * 100);
  }

  static getAverageRating(games: ChessGame[]): number {
    return games.length ? Math.round(games.reduce((acc, game) => acc + game.userRating, 0) / games.length) : 0;
  }

  static getAverageOpponentRating(games: ChessGame[]): number {
    return games.length ? Math.round(games.reduce((acc, game) => acc + game.opponentRating, 0) / games.length) : 0;
  }

  static getRatingRange(games: ChessGame[]): { min: number; max: number } {
    if (!games.length) return { min: 0, max: 0 };
    const ratings = games.map(game => game.userRating);
    return { min: Math.min(...ratings), max: Math.max(...ratings) };
  }

  static getUniqueOpponents(games: ChessGame[]): string[] {
    return [...new Set(games.map(game => game.opponent))].sort();
  }

  static getUniqueTimeClasses(games: ChessGame[]): string[] {
    return [...new Set(games.map(game => game.time_class))].sort();
  }

  static mergePlayersData(playerData: MultiPlayerData): ComparisonPoint[] {
    const comparisonMap = new Map<string, ComparisonPoint>();

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
        existing[username] = point.end;
      });
    });

    return Array.from(comparisonMap.values()).sort((a, b) => {
      if (a.month !== b.month) {
        return a.month > b.month ? 1 : -1;
      }
      return a.time_class.localeCompare(b.time_class);
    });
  }

  static getTimeClassesFromComparison(comparisonData: ComparisonPoint[]): string[] {
    return [...new Set(comparisonData.map(point => point.time_class))].sort();
  }

  static getUsernamesFromComparison(comparisonData: ComparisonPoint[]): string[] {
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

  static filterComparisonByTimeClass(data: ComparisonPoint[], timeClass: string): ComparisonPoint[] {
    return data.filter(point => point.time_class === timeClass);
  }

  static generatePlayerColors(usernames: string[], timeClasses: string[]): Record<string, string> {
    const colors: Record<string, string> = {};
    
    const timeClassColors: Record<string, string> = {
      rapid: '#00C853',
      blitz: '#FFD600',
      bullet: '#D50000',
      daily: '#42A5F5',
    };
    
    const playerVariations = [1.0, 0.7, 1.3, 0.4, 1.6];

    usernames.forEach((username, userIndex) => {
      timeClasses.forEach((timeClass) => {
        const baseColor = timeClassColors[timeClass] || '#8884d8';
        const variation = playerVariations[userIndex % playerVariations.length];
        
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

  static calculatePerformanceMetrics(games: ChessGame[]) {
    const totalGames = games.length;
    if (totalGames === 0) {
      return {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 0,
        averageRating: 0,
        averageOpponentRating: 0,
        ratingGain: 0
      };
    }

    const wins = games.filter(g => g.result === 'win').length;
    const losses = games.filter(g => g.result === 'loss').length;
    const draws = games.filter(g => g.result === 'draw').length;
    
    const sortedGames = this.sortGamesByDate(games);
    const firstGame = sortedGames[0];
    const lastGame = sortedGames[sortedGames.length - 1];
    const ratingGain = lastGame.userRating - firstGame.userRating;

    return {
      totalGames,
      wins,
      losses,
      draws,
      winRate: Math.round((wins / totalGames) * 100),
      averageRating: this.getAverageRating(games),
      averageOpponentRating: this.getAverageOpponentRating(games),
      ratingGain
    };
  }
}
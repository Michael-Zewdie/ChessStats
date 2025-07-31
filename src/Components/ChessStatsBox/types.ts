export interface ChessGame {
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  userRating: number;
  opponentRating: number;
  date: string;
  time_class: string; // 'bullet', 'blitz', 'rapid', 'daily'
}

export interface AdoptionRelationship {
  opponent: string;
  timeClass: string;
  streakLength: number;
  type: 'parent' | 'child';
}
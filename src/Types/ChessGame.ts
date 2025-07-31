export interface ChessGame {
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  userRating: number;
  opponentRating: number;
  date: string;
  time_class: string;
}

export type ChessComGameDetailed = {
  end_time?: number;
  time_class: string;
  white: { username: string; rating: number; result?: string };
  black: { username: string; rating: number; result?: string };
  rules?: string;
};

export type ChessComGame = {
  end_time?: number;
  time_class: string;
  white: { username: string; rating: number };
  black: { username: string; rating: number };
};
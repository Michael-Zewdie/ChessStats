export type { ChessGame } from '../../Types/ChessGame';

export interface AdoptionRelationship {
  opponent: string;
  timeClass: string;
  streakLength: number;
  type: 'parent' | 'child';
}
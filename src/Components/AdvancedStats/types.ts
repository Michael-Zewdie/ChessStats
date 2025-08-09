export type { ChessGame } from '../../Types/index';

export interface AdoptionRelationship {
  opponent: string;
  timeClass: string;
  streakLength: number;
  type: 'parent' | 'child';
}
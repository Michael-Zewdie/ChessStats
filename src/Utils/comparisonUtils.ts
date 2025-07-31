import { ChessHelpers } from "../lib/utils/helpers";
import type { ComparisonPoint, MultiPlayerData } from "../Types/StatTypes";

export const mergePlayersData = ChessHelpers.mergePlayersData;
export const getTimeClasses = ChessHelpers.getTimeClassesFromComparison;
export const getUsernames = ChessHelpers.getUsernamesFromComparison;
export const generatePlayerColors = ChessHelpers.generatePlayerColors;
export const filterByTimeClass = ChessHelpers.filterComparisonByTimeClass; 
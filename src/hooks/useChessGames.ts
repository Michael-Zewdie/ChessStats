import { useEffect, useState } from "react";
import { ChessDataService } from "../lib/data/chessDataService";
import type { ChessGame } from "../Types/ChessGame";

export function useChessGames(username: string | undefined) {
  const [games, setGames] = useState<ChessGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    ChessDataService.fetchChessGames(username)
      .then(setGames)
      .catch((err) => {
        setError("Failed to fetch chess games.");
        setGames([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return { games, loading, error };
}
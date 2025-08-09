import { useEffect, useState } from "react";
import { ChessDataService } from "../lib/data/chessDataService";
import type { ChessGame } from "../Types/index";

export function useChessGames(username: string | undefined) {
  const [games, setGames] = useState<ChessGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    setUserNotFound(false);
    
    ChessDataService.fetchChessGames(username)
      .then(setGames)
      .catch((err) => {
        if (err instanceof Error && err.message === 'USER_NOT_FOUND') {
          setUserNotFound(true);
        } else {
          setError("Failed to fetch chess games.");
        }
        setGames([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return { games, loading, error, userNotFound };
}
import { useEffect, useState } from "react";
import { fetchChessGames, type ChessGame } from "../Api/ChessGames/route";

export function useChessGames(username: string | undefined) {
  const [games, setGames] = useState<ChessGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    fetchChessGames(username)
      .then(setGames)
      .catch((err) => {
        console.error('Error fetching chess games:', err);
        setError("Failed to fetch chess games.");
        setGames([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return { games, loading, error };
}
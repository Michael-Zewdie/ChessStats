import { useEffect, useState } from "react";
import { ChessDataService } from "../lib/data/chessDataService";
import type { ChessProfile } from "../Types/ChessProfile";

export function useChessProfile(username: string | undefined) {
    const [profile, setProfile] = useState<ChessProfile | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;
        setError(null);
        ChessDataService.fetchUserProfile(username)
            .then((data) => {
                setProfile(data);
                if (data?.country) {
                    ChessDataService.fetchCountryInfo(data.country).then(setCountry);
                }
            })
            .catch(() => {
                setError("Failed to fetch user profile.");
            });
    }, [username]);

    return { profile, country, error };
}
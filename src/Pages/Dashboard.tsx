import { useParams, useNavigate } from "react-router-dom";
import BasicStatsUI from "../Components/BasicStats/BasicStatsUI.tsx";
import MonthlyStatsUI from "../Components/MonthlyStats/MonthlyStatsUI.tsx";
import ChessStatsBoxUI from "../Components/AdvancedStats/AdvancedStatsUI.tsx";
import ErrorPage from "./ErrorPage.tsx";   
import { useChessGames } from "../hooks/useChessGames";
import { useIsMobile } from "../hooks/useIsMobile.ts";
import { hasEnoughGamesInAnyTimeClass } from "../lib/utils/gameFilters";
import { useEffect } from "react";


export default function Dashboard() {
    const { username } = useParams<{ username: string }>();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    
    const { games, loading: gamesLoading, userNotFound } = useChessGames(username);

    // Redirect to error page if user doesn't exist
    useEffect(() => {
        if (userNotFound && username) {
            navigate(`/error?username=${encodeURIComponent(username)}&message=${encodeURIComponent('User not found')}&suggestion=${encodeURIComponent('Please check the username spelling or try a different Chess.com user.')}`);
        }
    }, [userNotFound, username, navigate]);

    // Set document title to the current username
    useEffect(() => {
        if (username) {
            document.title = username;
        }
    }, [username]);

    // Wait for games to load before making decisions
    if (gamesLoading) {
        if (isMobile) {
            return <ChessStatsBoxUI username={username} games={games} />;
        }

        return (
            <div className="responsive-dashboard">
                <div className="stats-grid">
                    <div className="monthly-stats">
                        <MonthlyStatsUI username={username} />
                    </div>
                    <div className="bottom-section">
                        <div className="basic-stats">
                            <BasicStatsUI username={username} games={games} gamesLoading={gamesLoading} />
                        </div>
                        <div className="chess-stats">
                            <ChessStatsBoxUI username={username} games={games} gamesLoading={gamesLoading} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // If games have loaded but user doesn't have enough games in any time_class, show fallback
    if (games && games.length > 0 && !hasEnoughGamesInAnyTimeClass(games)) {
        return <ErrorPage 
            username={username}
            message="Not Enough Games"
            suggestion="Sorry, you haven't played enough games to generate statistics. Play more games to unlock your chess insights and fun facts!"
        />;
    }
    
    // If no games at all (empty array), show fallback
    if (games && games.length === 0) {
        return <ErrorPage 
            username={username}
            message="Not Enough Games"
            suggestion="Sorry, you haven't played enough games to generate statistics. Play more games to unlock your chess insights and fun facts!"
        />;
    }

    if (isMobile) {
        return <ChessStatsBoxUI username={username} games={games} gamesLoading={gamesLoading} />;
    }

    return (
        <div className="responsive-dashboard">
            <div className="stats-grid">
                <div className="monthly-stats">
                    <MonthlyStatsUI username={username} />
                </div>
                <div className="bottom-section">
                    <div className="basic-stats">
                        <BasicStatsUI username={username} games={games} gamesLoading={gamesLoading} />
                    </div>
                    <div className="chess-stats">
                        <ChessStatsBoxUI username={username} games={games} gamesLoading={gamesLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
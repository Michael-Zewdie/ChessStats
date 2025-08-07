import { useParams } from "react-router-dom";
import BasicStatsUI from "../Components/BasicStats/BasicStatsUI.tsx";
import MonthlyStatsUI from "../Components/MonthlyStats/MonthlyStatsUI.tsx";
import ChessStatsBoxUI from "../Components/ChessStatsBox/ChessStatsBoxUI.tsx";
import NoGamesAvailable from "../Components/ChessStatsBox/NoGamesAvailable.tsx";   
import { useChessGames } from "../hooks/useChessGames";
import { hasEnoughGamesInAnyTimeClass } from "../lib/utils/gameFilters";


export default function Dashboard() {
    const { username } = useParams<{ username: string }>();
    
    const { games, loading: gamesLoading } = useChessGames(username);

    // Wait for games to load before making decisions
    if (gamesLoading) {
        return (
            <div>
                <div className="fixed bottom-6 right-6 z-50">
                    <BasicStatsUI username={username} games={games} />
                </div>
                <div className='fixed top-6 left-6 z-10'>
                    <MonthlyStatsUI username={username} games={games} />
                </div>
                <div className="fixed bottom-6 left-6 z-50">
                    <ChessStatsBoxUI username={username} games={games} />
                </div>
            </div>
        );
    }
    
    // If games have loaded but user doesn't have enough games in any time_class, show fallback
    if (games && games.length > 0 && !hasEnoughGamesInAnyTimeClass(games)) {
        return <NoGamesAvailable />;
    }
    
    // If no games at all (empty array), show fallback
    if (games && games.length === 0) {
        return <NoGamesAvailable />;
    }

    return (
        <div>
            <div className="fixed bottom-6 right-6 z-50">
                <BasicStatsUI username={username} games={games} />
            </div>
            <div className='fixed top-6 left-6 z-10'>
                <MonthlyStatsUI username={username} games={games} />
            </div>
            <div className="fixed bottom-6 left-6 z-50">
                <ChessStatsBoxUI username={username} games={games} />
            </div>
        </div>
    );
}
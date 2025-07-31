import { useParams } from "react-router-dom";
import BasicStatsUI from "../Components/BasicStats/BasicStatsUI.tsx";
import MonthlyStatsUI from "../Components/MonthlyStats/MonthlyStatsUI.tsx";
import ChessStatsBoxUI from "../Components/ChessStatsBox/ChessStatsBoxUI.tsx";


export default function Dashboard() {
    const { username } = useParams<{ username: string }>();

    return (
        <div>
            <BasicStatsUI username={username} />
            <MonthlyStatsUI username={username} />
            <div className="fixed bottom-6 left-6 z-50">
                <ChessStatsBoxUI username={username} />
            </div>
        </div>
    );
}
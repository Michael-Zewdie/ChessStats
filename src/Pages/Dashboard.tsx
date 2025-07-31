import { useParams } from "react-router-dom";
import BasicStatsUI from "../Components/BasicStats/BasicStatsUI.tsx";
import MonthlyStatsUI from "../Components/MonthlyStats/MonthlyStatsUI.tsx";


export default function Dashboard() {
    const { username } = useParams<{ username: string }>();

    return (
        <div>
            <BasicStatsUI username={username} />
            <MonthlyStatsUI username={username} />
        </div>
    );
}
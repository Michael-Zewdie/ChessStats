import styles from "./styles/BasicStatsBox.module.css";
import type {ChessProfileStats} from "../../Types/ChessStats";
import {StatsChart} from "./StatsChart.tsx";
import {buildChartData} from "../../Utils/buildChartData.tsx";



interface ChessStatsBoxProps {
  stats: ChessProfileStats | null;
}



export default function BasicStatsBox({ stats }: ChessStatsBoxProps) {
  if (!stats) return null;
  const data = buildChartData(stats);
  if (!data.length) {
    return null
  }
  return (
    <div className={styles.StatsBox}>
      <StatsChart data={data} />
    </div>
  );
}
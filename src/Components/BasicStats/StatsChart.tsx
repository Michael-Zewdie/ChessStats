import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "./styles/BasicStatsBox.module.css";
import type { ChartRow } from "../../Types/index.ts";

type TooltipEntry = { dataKey: 'current' | 'best'; value: number };
interface TooltipProps {
    active?: boolean;
    payload?: TooltipEntry[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;
    const current = payload.find((p) => p.dataKey === "current")?.value;
    const best = payload.find((p) => p.dataKey === "best")?.value;

    return (
        <div className={styles.tooltip}>
            <div className={styles.tooltipLabel}>{label}</div>
            <div>Current: {current}</div>
            <div>Best: {best}</div>
        </div>
    );
};
export const StatsChart = ({data}: { data: ChartRow[] }) => {    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} barSize={window.innerWidth < 768 ? 16 : 22} barGap={8}>
            <defs>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--basic-bar-start)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--basic-bar-end)" stopOpacity={0.8}/>
                </linearGradient>
            </defs>
            <CartesianGrid stroke="#333"/>
            <XAxis
                dataKey="name"
                tick={{fill: "#ccc", fontSize: 14}}
                padding={{left: 10, right: 10}}
            />
            <YAxis tick={{fill: "#ccc", fontSize: 14}}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                    color: "#ccc",
                    fontSize: 12,
                    marginTop: 5,
                    textAlign: "center",
                    justifyContent: "center",
                }}
            />
            <Bar dataKey="current" fill="url(#currentGradient)" radius={[4, 4, 0, 0]}/>
            <Line type="monotone" dataKey="best" stroke="var(--basic-line)" strokeWidth={3} dot={{r: 3}} activeDot={{r: 4}}/>
            </ComposedChart>
        </ResponsiveContainer>
    );
};
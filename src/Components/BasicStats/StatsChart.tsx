import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "./styles/BasicStatsBox.module.css";
import type {ChartRow} from "../../Types/StatTypes.ts";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const current = payload.find((p: any) => p.dataKey === "current")?.value;
    const best = payload.find((p: any) => p.dataKey === "best")?.value;

    return (
        <div className={styles.tooltip}>
            <div className={styles.tooltipLabel}>{label}</div>
            <div>Current: {current}</div>
            <div>Best: {best}</div>
        </div>
    );
};
export const StatsChart = ({data}: { data: ChartRow[] }) => (
    <ResponsiveContainer width="100%" >
        <ComposedChart width={520} height={300} data={data} barSize={22} barGap={8}>
            <defs>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#379683" stopOpacity={0.8}/>
                </linearGradient>
            </defs>
            <CartesianGrid stroke="#333"/>
            <XAxis
                dataKey="name"
                tick={{fill: "#ccc", fontSize: 14}}
                padding={{left: 20, right: 20}}
            />
            <YAxis tick={{fill: "#ccc", fontSize: 14}}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                    color: "#ccc",
                    fontSize: 13,
                    marginTop: 10,
                    textAlign: "center",
                    justifyContent: "center",
                }}
            />
            <Bar dataKey="current" fill="url(#currentGradient)" radius={[4, 4, 0, 0]}/>
            <Line type="monotone" dataKey="best" stroke="#6fb1fc" strokeWidth={3} dot={{r: 3}} activeDot={{r: 4}}/>
        </ComposedChart>
    </ResponsiveContainer>
);
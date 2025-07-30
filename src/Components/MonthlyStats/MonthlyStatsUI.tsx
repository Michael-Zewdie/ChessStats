import { useMonthlyStats } from "../../Hooks/useMonthlyStats";
import { MonthlyStatsBox } from "./MonthlyStatsBox"; // adjust path if needed

interface MonthlyStatsUIProps {
  className?: string;
  username?: string;
}

export default function MonthlyStatsUI({ className, username }: MonthlyStatsUIProps) {
  const { data, loading, error } = useMonthlyStats(username);

  if (loading) return <div className={'fixed top-60 right-60'}>Loading monthly stats…</div>;
  if (error) return null;
  if (!data.length) return <div className={className}>No games found.</div>;

  return (
    <div className='fixed bottom-6 right-8'>
      <MonthlyStatsBox data={data} />
    </div>
  );
}
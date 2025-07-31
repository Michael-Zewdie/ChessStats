import { useMonthlyStats } from "../../Hooks/useMonthlyStats";
import { useChessProfile } from "../../Hooks/useChessProfile";
import { MonthlyStatsBox } from "./MonthlyStatsBox"; // adjust path if needed
import MonthlyStatsSkeleton from "./MonthlyStatsSkeleton";

interface MonthlyStatsUIProps {
  className?: string;
  username?: string;
}

export default function MonthlyStatsUI({ className, username }: MonthlyStatsUIProps) {
  const { data, loading, error } = useMonthlyStats(username);
  const { profile, country } = useChessProfile(username);

  if (loading) return (
    <div className='fixed top-6 right-6 z-10'>
      <MonthlyStatsSkeleton />
    </div>
  );
  if (error) return null;
  if (!data.length) return <div className={className}>No games found.</div>;

  return (
    <div className='fixed top-6 right-6 z-10'>
      <MonthlyStatsBox data={data} profile={profile || undefined} country={country} />
    </div>
  );
}
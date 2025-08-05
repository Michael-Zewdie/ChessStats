import { useMonthlyStats } from "../../hooks/useMonthlyStats";
import { useChessProfile } from "../../hooks/useChessProfile";
import { MonthlyStatsBox } from "./MonthlyStatsBox"; // adjust path if needed
import MonthlyStatsSkeleton from "./MonthlyStatsSkeleton";

interface MonthlyStatsUIProps {
  username?: string;
}

export default function MonthlyStatsUI({ username }: MonthlyStatsUIProps) {
  const { data, loading, error } = useMonthlyStats(username);
  const { profile, country } = useChessProfile(username);

  if (loading) return (
    <div className='fixed top-6 right-6 z-10'>
      <MonthlyStatsSkeleton />
    </div>
  );
  
  if (error || !data.length) {
    return null;
  }

  return (
    <div className='fixed top-6 right-6 z-10'>
      <MonthlyStatsBox data={data} profile={profile || undefined} country={country} />
    </div>
  );
}
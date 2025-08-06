import { useMonthlyStats } from "../../hooks/useMonthlyStats";
import { useChessProfile } from "../../hooks/useChessProfile";
import { MonthlyStatsBox } from "./MonthlyStatsBox";
import MonthlyStatsSkeleton from "./MonthlyStatsSkeleton";
import NoDataMessage from "../NoDataMessage/NoDataMessage";

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
  
  if (error) {
    return (
      <NoDataMessage 
        username={username}
        message="Error loading monthly stats"
        suggestion={error}
      />
    );
  }

  if (!data.length) {
    return (
      <NoDataMessage 
        username={username}
        message="No monthly game data found"
        suggestion="This user doesn't have any game history on Chess.com or their games may be private."
      />
    );
  }

  return (
    <div className='fixed top-6 right-6 z-10'>
      <MonthlyStatsBox data={data} profile={profile || undefined} country={country} />
    </div>
  );
}
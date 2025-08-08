export default function ChessStatsBoxSkeleton() {
  return (
    <div className="chess-stats-container" role="status" aria-busy="true">
      <div className="chess-stats-grid">
        {/* First row: Rival, Nemesis, Victim, Dedication */}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`r1-${i}`} className="skeleton-tile" />
        ))}

        {/* Second row: Best Win, Worst Loss, Win Streak, Losing Streak */}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`r2-${i}`} className="skeleton-tile" />
        ))}

        {/* Child and Parent rows use the same wrappers to preserve grid spans */}
        <div className="child-box-wrapper"><div className="skeleton-tile" /></div>
        <div className="parent-box-wrapper"><div className="skeleton-tile" /></div>
      </div>

      <style>{`
        .skeleton-tile {
          height: 6.25rem;
          border-radius: 0.5rem;
          background: linear-gradient(90deg, #2a2c30 25%, #3a3d42 37%, #2a2c30 63%);
          background-size: 400% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
          border: 1px solid #2f3136;
        }
        @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>
    </div>
  );
}
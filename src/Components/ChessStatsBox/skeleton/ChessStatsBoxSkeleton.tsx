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
        /* Allow scrolling so bottom row never gets clipped on short viewports */
        .chess-stats-container { overflow-y: auto !important; padding-bottom: 0.5rem; }

        /* Force consistent 3-row grid for skeleton, mirroring live layout */
        .chess-stats-grid {
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, minmax(6.75rem, auto));
          gap: 0.75rem;
        }

        .skeleton-tile {
          width: 100%;
          height: 100%;
          border-radius: 0.75rem;
          background: linear-gradient(90deg, #2a2c30 25%, #3a3d42 37%, #2a2c30 63%);
          background-size: 400% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
          border: 1px solid #2f3136;
        }

        /* Ensure bottom wide tiles fill their grid area fully */
        .child-box-wrapper, .parent-box-wrapper {
          display: flex;
          align-items: stretch;
        }
        .child-box-wrapper .skeleton-tile,
        .parent-box-wrapper .skeleton-tile { height: 100%; width: 100%; }

        /* When vertical space is tight, decrease row minimum height a bit */
        @media (max-height: 820px) {
          .chess-stats-grid { grid-template-rows: repeat(3, minmax(6rem, auto)); gap: 0.625rem; }
        }
        @media (max-height: 760px) {
          .chess-stats-grid { grid-template-rows: repeat(3, minmax(5.5rem, auto)); gap: 0.5rem; }
        }
        @media (max-height: 700px) {
          .chess-stats-grid { grid-template-rows: repeat(3, minmax(5rem, auto)); gap: 0.375rem; }
          .chess-stats-container { padding: 0.75rem; }
        }

        @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>
    </div>
  );
}
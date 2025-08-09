import type React from 'react';

export default function ChessStatsBoxSkeleton() {
  const containerStyle: React.CSSProperties & Record<'--csb-skel-bottom-gap', string> = {
    '--csb-skel-bottom-gap': '4.5rem',
  };

  return (
    <div
      className="chess-stats-container"
      role="status"
      aria-busy="true"
      style={containerStyle}
    >
      <div className="chess-stats-grid">
        {/* First row: Rival, Nemesis, Victim, Dedication */}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`r1-${i}`} className="skeleton-tile" />
        ))}

        {/* Second row: Best Win, Worst Loss, Win Streak, Losing Streak */}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`r2-${i}`} className="skeleton-tile" style={{height: '95%'}}/>
        ))}

        {/* Child and Parent rows use the same wrappers to preserve grid spans */}
        <div className="child-box-wrapper"><div className="skeleton-tile" /></div>
        <div className="parent-box-wrapper"><div className="skeleton-tile" /></div>
      </div>

      <style>{`
        /* Allow scrolling so bottom row never gets clipped on short viewports */
        .chess-stats-container { overflow-y: auto !important; padding-bottom: var(--csb-skel-bottom-gap, 1rem); }

        /* Use the same grid sizing as the live component (inherit from global css) */

        .skeleton-tile {
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          padding: 0.75rem; /* match live card padding */
          min-height: 80px; /* match live card min-height */
          box-sizing: border-box; /* include padding/border in size like the real card */
          background-color: #2a2c30;
          animation: pulse 1.6s ease-in-out infinite;
          border: 1px solid #2f3136;
        }

        /* Ensure bottom wide tiles fill their grid area fully */
        .child-box-wrapper, .parent-box-wrapper {
          display: flex;
          align-items: stretch;
        }
        .child-box-wrapper .skeleton-tile,
        .parent-box-wrapper .skeleton-tile { height: 100%; width: 100%; }

        /* Ensure bottom wide tiles visually match live height */
        @media (min-width: 1024px) {
          .child-box-wrapper .skeleton-tile,
          .parent-box-wrapper .skeleton-tile { min-height: 140px; }
        }

        /* No row overrides here; skeleton follows app grid sizes */

        @keyframes pulse { 
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
import styles from "../styles/BasicStatsBox.module.css";

export default function BasicStatsSkeleton() {
  return (
    <div className={styles.StatsBox} role="status" aria-busy="true">
      {/* Chart area skeleton (matches StatsChart footprint) */}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Plot area */}
        <div style={{ position: 'relative', flex: 1, margin: '0.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
          {/* Axes */}
          <div style={{ position: 'absolute', left: '2.5rem', right: '1rem', bottom: '2rem', height: 1, backgroundColor: '#374151' }} />
          <div style={{ position: 'absolute', bottom: '2rem', top: '0.75rem', left: '2.5rem', width: 1, backgroundColor: '#374151' }} />

          {/* Bars */}
          <div style={{ position: 'absolute', left: '3.5rem', right: '2rem', bottom: '2rem', top: '1rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1.25rem', alignItems: 'end' }}>
            {[52, 64, 78, 58].map((h, i) => (
              <div key={i} className="skeleton" style={{ height: `${h}%`, borderRadius: '4px' }} />
            ))}
          </div>

          {/* Line approximation */}
          <div className="skeleton" style={{ position: 'absolute', left: '3.5rem', right: '2rem', bottom: '2rem', height: 3, borderRadius: 2, opacity: 0.7 }} />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', paddingBottom: '0.25rem' }}>
          {["best", "current"].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="skeleton" style={{ width: '0.75rem', height: '0.75rem', borderRadius: 2 }} />
              <span className="skeleton" style={{ width: '3.5rem', height: '0.8rem', borderRadius: 3 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Pulse util (shared with other skeletons) */}
      <style>{`
        .skeleton { 
          background-color: #2a2c30;
          animation: pulse 1.6s ease-in-out infinite;
          border: 1px solid #2f3136;
        }
        @keyframes pulse { 
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
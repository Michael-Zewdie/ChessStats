export default function MonthlyStatsSkeleton() {
  return (
    <div className="monthly-stats-container" role="status" aria-busy="true">
      {/* Profile mini area placeholder */}
      <div className="monthly-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="skeleton" style={{ width: '3rem', height: '3rem', borderRadius: '50%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div className="skeleton" style={{ width: '6rem', height: '0.9rem', borderRadius: 4 }} />
          <div className="skeleton" style={{ width: '1.5rem', height: '1.2rem', borderRadius: 4 }} />
        </div>
      </div>

      {/* Tabs placeholder (4 tabs: Blitz, Bullet, Daily, Rapid) */}
      <div className="monthly-tabs">
        {[0,1,2,3].map((i) => (
          <div key={i} className="skeleton" style={{ width: '5.25rem', height: '2.25rem', borderRadius: '0.5rem' }} />
        ))}
      </div>

      {/* Chart area placeholder (fills remaining height) */}
      <div className="monthly-chart" style={{ position: 'relative' }}>
        {/* Axes */}
        <div style={{ position: 'absolute', left: '3rem', right: '2rem', bottom: '2.5rem', height: 1, backgroundColor: '#374151' }} />
        <div style={{ position: 'absolute', bottom: '2.5rem', top: '1rem', left: '3rem', width: 1, backgroundColor: '#374151' }} />

        {/* Line stub resembling yearly trend */}
        <div className="skeleton" style={{ position: 'absolute', left: '3rem', right: '2rem', bottom: '7rem', height: 3, borderRadius: 2 }} />
      </div>

      <style>{`
        .skeleton { 
          background: linear-gradient(90deg, #2a2c30 25%, #3a3d42 37%, #2a2c30 63%);
          background-size: 400% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
        }
        @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
      `}</style>
    </div>
  );
}
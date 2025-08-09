export default function MonthlyStatsSkeleton() {
  return (
    <div className="monthly-stats-container" role="status" aria-busy="true">
      {/* Profile mini area placeholder (inside box, larger like live UI) */}
      <div
        className="monthly-profile"
        style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}
      >
        <div style={{ position: 'relative', width: '6rem', height: '6rem' }}>
          <div
            className="skeleton"
            style={{ width: '6rem', height: '6rem', borderRadius: '50%', border: '4px solid #374151' }}
          />
        </div>
        <div style={{marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="skeleton" style={{ width: '10rem', height: '2rem', borderRadius: 6 }} />
          <div className="skeleton" style={{ width: '2rem', height: '1.25rem', borderRadius: 3 }} />
        </div>
      </div>

      {/* Tabs placeholder (4 tabs: Blitz, Bullet, Daily, Rapid) */}
      <div className="monthly-tabs">
        {[0,1,2,3].map((i) => (
          <div key={i} className="skeleton" style={{ width: '5.25rem', height: '2.25rem', borderRadius: '0.5rem' }} />
        ))}
      </div>

      {/* Title/description skeletons centered above the chart */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <div className="skeleton" style={{ width: 'min(90%, 20rem)', height: '1.6rem', borderRadius: 6 }} />
        <div className="skeleton" style={{ width: 'min(90%, 26rem)', height: '0.9rem', borderRadius: 4 }} />
        <div className="skeleton" style={{ width: 'min(90%, 32rem)', height: '0.9rem', borderRadius: 4 }} />
      </div>

      {/* Chart area placeholder (fills remaining height) */}
      <div className="monthly-chart" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '3rem', right: '2rem', bottom: '2.5rem', height: 1, backgroundColor: '#374151' }} />
        <div style={{ position: 'absolute', bottom: '2.5rem', top: '1rem', left: '3rem', width: 1, backgroundColor: '#374151' }} />
        <svg aria-hidden width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', left: '3rem', right: '2rem', top: '1rem', bottom: '2.5rem' }}>
          <defs>
            <linearGradient id="skelStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3a3d42" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4a4e55" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3a3d42" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0,70 L8,62 L16,64 L24,52 L32,56 L40,42 L48,46 L56,30 L64,38 L72,28 L80,34 L88,26 L100,32"
            fill="none"
            stroke="url(#skelStroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            shapeRendering="geometricPrecision"
          >
            <animate attributeName="opacity" values="0.7;0.35;0.7" dur="2.2s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

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
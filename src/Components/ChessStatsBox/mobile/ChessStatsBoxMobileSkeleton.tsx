export default function ChessStatsBoxMobileSkeleton() {
  return (
    <div className="mobile-dashboard">
      <div className="mobile-chess-stats">
        <div style={{
          backgroundColor: '#18191b',
          color: '#fff',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
          padding: '1rem',
          border: '1px solid #374151',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          width: '100%',
          height: 'auto',
          marginBottom: '2rem'
        }}>
          {/* Mobile Stats Grid Skeleton - Single Column */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
            width: '100%'
          }}>
            {/* Generate 10 skeleton boxes for mobile */}
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  height: '4rem',
                  backgroundColor: '#374151',
                  borderRadius: '0.5rem',
                  animation: 'pulse 2s infinite',
                  animationDelay: `${i * 0.1}s`,
                  border: '1px solid transparent',
                  width: '100%'
                }}
              />
            ))}
          </div>

          <style>
            {`
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.5;
                }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
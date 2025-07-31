export default function ChessStatsBoxSkeleton() {
  return (
    <div style={{
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #374151',
      height: '26.5rem',
      width: '60rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Main Stats Grid Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '1rem',
        width: '100%',
        maxWidth: 'calc(100% - 3rem)'
      }}>
        {/* Generate 12 skeleton boxes */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              height: '5.5rem',
              backgroundColor: '#374151',
              borderRadius: '0.5rem',
              animation: 'pulse 2s infinite',
              animationDelay: `${i * 0.1}s`,
              border: '1px solid transparent'
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
  );
}
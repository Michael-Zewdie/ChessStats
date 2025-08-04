export default function BasicStatsSkeleton() {
  return (
    <div style={{
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.74rem',
      boxShadow: '0 9.88px 14.82px -2.96px rgba(0,0,0,0.1), 0 3.95px 5.9px -3.95px rgba(0,0,0,0.1)',
      padding: '1.48rem',
      width: '41.46rem',
      height: '26.58rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #374151',
      marginLeft: 0,
      marginRight: 'auto',
      alignSelf: 'flex-start',
      gap: '1rem'
    }}>
      {/* Chart title skeleton */}
      <div style={{
        width: '8rem',
        height: '1.5rem',
        backgroundColor: '#374151',
        borderRadius: '0.25rem',
        animation: 'pulse 2s infinite'
      }} />
      
      {/* Chart skeleton - circular for pie chart */}
      <div style={{
        width: '18rem',
        height: '18rem',
        borderRadius: '50%',
        backgroundColor: '#374151',
        animation: 'pulse 2s infinite',
        position: 'relative'
      }}>
        {/* Inner circle to simulate donut chart */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8rem',
          height: '8rem',
          borderRadius: '50%',
          backgroundColor: '#18191b'
        }} />
      </div>

      {/* Legend skeleton */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#374151',
              borderRadius: '0.125rem',
              animation: 'pulse 2s infinite'
            }} />
            <div style={{
              width: '3rem',
              height: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.25rem',
              animation: 'pulse 2s infinite'
            }} />
          </div>
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
export default function MonthlyStatsSkeleton() {
  return (
    <div style={{
      width: '105rem',
      maxWidth: '105rem',
      height: 500,
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #374151',
      marginLeft: 0,
      marginRight: 'auto',
      alignSelf: 'flex-start',
      position: 'relative'
    }}>
      {/* Profile skeleton */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1.5rem',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          backgroundColor: '#374151',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{
            width: '4rem',
            height: '1rem',
            backgroundColor: '#374151',
            borderRadius: '0.25rem',
            animation: 'pulse 2s infinite'
          }} />
          <div style={{
            width: '1.5rem',
            height: '1.25rem',
            backgroundColor: '#374151',
            borderRadius: '0.25rem',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </div>

      {/* Time class buttons skeleton */}
      <div style={{ 
        marginBottom: '1rem', 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center' 
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: '4rem',
              height: '2.5rem',
              backgroundColor: '#374151',
              borderRadius: '0.5rem',
              animation: 'pulse 2s infinite'
            }}
          />
        ))}
      </div>

      {/* Chart skeleton */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '12rem',
          height: '1.5rem',
          backgroundColor: '#374151',
          borderRadius: '0.25rem',
          margin: '0 auto',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{
          flex: 1,
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          animation: 'pulse 2s infinite'
        }} />
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
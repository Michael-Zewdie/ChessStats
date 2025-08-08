export default function NoMonthlyDataAvailable() {
  return (
    <div style={{
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '2rem',
      border: '1px solid #374151',
      height: '20rem',
      width: '28rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(45deg, rgba(251, 191, 36, 0.02) 0%, transparent 25%),
          linear-gradient(-45deg, rgba(59, 130, 246, 0.02) 0%, transparent 25%)
        `,
        opacity: 0.5
      }} />

      {/* Chart icon background */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        fontSize: '4rem',
        opacity: 0.04,
        color: '#374151'
      }}>
        📈
      </div>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1
      }}>
        {/* Icon */}
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderRadius: '50%',
            width: '4rem',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(251, 191, 36, 0.2)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)'
          }}>
            📊
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#fbbf24',
          marginBottom: '0.75rem'
        }}>
          No Monthly Data
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem',
          color: '#d1d5db',
          lineHeight: '1.5',
          marginBottom: '1.5rem'
        }}>
          Rating progression charts will appear here once the player has monthly game data available.
        </p>

        {/* Mini chart placeholder */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          gap: '0.25rem',
          marginBottom: '1rem',
          height: '3rem'
        }}>
          {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.35].map((height, index) => (
            <div
              key={index}
              style={{
                width: '0.5rem',
                height: `${height * 3}rem`,
                backgroundColor: 'rgba(251, 191, 36, 0.15)',
                borderRadius: '0.125rem',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                opacity: 0.6
              }}
            />
          ))}
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: '0.75rem',
          color: '#9ca3af',
          fontStyle: 'italic'
        }}>
          Charts appear with game history
        </p>
      </div>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';

export default function NoGamesAvailable() {
  const navigate = useNavigate();
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 20px rgba(251, 191, 36, 0.4)',
      padding: '3rem',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      width: '32rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      overflow: 'hidden',
      zIndex: 1000
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.05) 0%, transparent 25%),
          radial-gradient(circle at 75% 75%, rgba(251, 191, 36, 0.03) 0%, transparent 25%),
          radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)
        `,
        opacity: 0.6
      }} />
      
      {/* Chess piece silhouettes in background */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        fontSize: '8rem',
        opacity: 0.03,
        transform: 'rotate(-15deg)',
        color: '#374151'
      }}>
        ♔
      </div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        fontSize: '6rem',
        opacity: 0.03,
        transform: 'rotate(25deg)',
        color: '#374151'
      }}>
        ♛
      </div>
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '20%',
        fontSize: '4rem',
        opacity: 0.03,
        transform: 'rotate(-30deg)',
        color: '#374151'
      }}>
        ♝
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        fontSize: '5rem',
        opacity: 0.03,
        transform: 'rotate(45deg)',
        color: '#374151'
      }}>
        ♞
      </div>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1,
        maxWidth: '32rem'
      }}>
        {/* Icon */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
            borderRadius: '50%',
            width: '5rem',
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(251, 191, 36, 0.2)',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.1)'
          }}>
            🎯
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#fbbf24',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Not Enough Games
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '1rem',
          color: '#d1d5db',
          lineHeight: '1.6',
          marginBottom: '2rem',
          fontWeight: '400',
          textAlign: 'center'
        }}>
          Sorry, you haven't played enough games to generate statistics. 
          Play more games to unlock your chess insights and fun facts!
        </p>

        {/* Decorative Elements */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {['⚔️', '🏆', '🔥', '💪'].map((emoji, index) => (
            <div
              key={index}
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                border: '1px solid rgba(55, 65, 81, 0.6)',
                opacity: 0.6,
                transform: `rotate(${(index * 10) - 15}deg)`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          fontStyle: 'italic'
        }}>
          Statistics will populate once game data is available
        </p>

        {/* Try Another Player Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '2rem',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '0.5rem',
            color: '#fbbf24',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minWidth: '200px',
            margin: '2rem auto 1.5rem auto'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(251, 191, 36, 0.2)';
            e.target.style.borderColor = 'rgba(251, 191, 36, 0.5)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
            e.target.style.borderColor = 'rgba(251, 191, 36, 0.3)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <span>🔍</span>
          Try Another Player
        </button>

        {/* Bottom border decoration */}
        <div style={{
          marginTop: '1rem',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.3) 20%, rgba(251, 191, 36, 0.6) 50%, rgba(251, 191, 36, 0.3) 80%, transparent 100%)',
          borderRadius: '1px'
        }} />
      </div>
    </div>
  );
}
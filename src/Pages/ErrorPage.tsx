import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import type React from 'react';

interface ErrorPageProps {
  username?: string;
  message?: string;
  suggestion?: string;
}

export default function ErrorPage({ 
  username: propUsername, 
  message: propMessage, 
  suggestion: propSuggestion 
}: ErrorPageProps = {}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state as { username?: string; message?: string; suggestion?: string } | null;
  
  // Props take precedence, then state, then URL search params
  const username = propUsername || state?.username || searchParams.get('username') || '';
  const message = propMessage || state?.message || searchParams.get('message') || 'No chess data found';
  const suggestion = propSuggestion || state?.suggestion || searchParams.get('suggestion') || 'This user may not have played any rated games on Chess.com or their games may be private.';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div 
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '0.75rem',
          padding: '2rem',
          maxWidth: '28rem',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 20px rgba(251, 191, 36, 0.4)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          color: '#f0f0f0'
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏁</div>
        
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: '#fbbf24',
          marginBottom: '0.75rem'
        }}>
          {message}
        </h3>
        
        {username && (
          <div style={{ 
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '0.375rem',
            border: '1px solid rgba(75, 85, 99, 0.3)'
          }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Username: </span>
            <span style={{ 
              fontFamily: 'monospace', 
              fontWeight: '500', 
              color: '#60a5fa',
              fontSize: '0.875rem'
            }}>
              {username}
            </span>
          </div>
        )}
        
        <p style={{ 
          color: '#d1d5db', 
          fontSize: '0.875rem', 
          lineHeight: '1.5',
          marginBottom: '1.5rem'
        }}>
          {suggestion}
        </p>
        
        <div 
          style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(75, 85, 99, 0.3)'
          }}
        >
          <p 
            onClick={() => navigate('/')}
            style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLParagraphElement>) => { e.currentTarget.style.color = '#fbbf24'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLParagraphElement>) => { e.currentTarget.style.color = '#6b7280'; }}
          >
            💡 Try searching for a different Chess.com username
          </p>
        </div>
      </div>
    </div>
  );
}
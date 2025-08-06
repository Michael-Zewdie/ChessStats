import type { ChessGame } from './types';

interface ChessStatsBoxProps {
  games: ChessGame[];
}

export default function ChessStatsBoxSimple({ games }: ChessStatsBoxProps) {
  return (
    <div style={{
      backgroundColor: '#18191b',
      color: '#fff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #374151',
      width: '300px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>⚔️</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Rival</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>Test</div>
        </div>

        <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>👶</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Child</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>Test</div>
        </div>

        <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>👨‍👧‍👦</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Parent</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>Test</div>
        </div>

        <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>💪</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Bully</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>Test</div>
        </div>

        <div style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>⚔️</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Upset</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '500' }}>Test</div>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '1rem', 
        backgroundColor: '#1f2937', 
        borderRadius: '0.5rem',
        color: '#9ca3af',
        fontSize: '0.9rem'
      }}>
        Games loaded: {games.length}
      </div>
    </div>
  );
}
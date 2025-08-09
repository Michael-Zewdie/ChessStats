import React from 'react';

interface MobileDescriptionProps {
  title: string;
  emoji: string;
  summary: string; // concise single-sentence summary (e.g., "You lost 73 games to X")
  calculation?: string; // short header like "How it's calculated"
  bullets?: string[]; // 2-3 short bullets
  onClose: () => void;
}

export default function MobileDescription({ title, emoji, summary, calculation, bullets, onClose }: MobileDescriptionProps) {
  return (
    <div role="dialog" aria-modal="true" style={styles.overlay}>
      <div style={styles.sheet}>
        <div style={styles.grabber} />
        <div style={styles.header}>{emoji} {title}</div>
        <p style={styles.summary}>{summary}</p>
        {calculation && <div style={styles.calcTitle}>{calculation}</div>}
        {bullets && bullets.length > 0 && (
          <ul style={styles.list}>
            {bullets.slice(0, 3).map((b, i) => (
              <li key={i} style={styles.listItem}>{b}</li>
            ))}
          </ul>
        )}
        <button onClick={onClose} style={styles.button}>Got it</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 99999,
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '1rem'
  },
  sheet: {
    width: '100%', maxWidth: 480, background: 'linear-gradient(135deg,#1f2937,#111827)',
    borderRadius: '1rem', border: '1px solid #374151', boxShadow: '0 25px 50px -12px rgba(0,0,0,.5)',
    padding: '1rem', color: '#e5e7eb'
  },
  grabber: {
    width: 40, height: 4, borderRadius: 9999, background: '#374151', margin: '0 auto 0.75rem auto'
  },
  header: { fontWeight: 700, fontSize: 18, textAlign: 'center', color: '#fbbf24', marginBottom: 8 },
  summary: { textAlign: 'center', margin: '0 0 8px 0', fontSize: 14 },
  calcTitle: { textAlign: 'center', marginTop: 6, fontWeight: 600, fontSize: 13 },
  list: { margin: '6px 0 10px 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 },
  listItem: { textAlign: 'center', fontSize: 13, color: '#cbd5e1' },
  button: {
    width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #4b5563',
    background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#111827', fontWeight: 700
  }
};

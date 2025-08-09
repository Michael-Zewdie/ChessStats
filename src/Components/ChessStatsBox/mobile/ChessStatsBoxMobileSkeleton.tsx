import styles from '../styles/ChessStatsBoxMobile.module.css';

export default function ChessStatsBoxMobileSkeleton() {
  return (
    <div className={styles.mobileContainer}>
      <div className={styles.statboxes}>
        {/* Generate 10 skeleton boxes for mobile in 2x5 grid */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#2a2c30',
              borderRadius: '0.5rem',
              animation: 'pulse 1.6s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`,
              border: '1px solid #2f3136',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
}
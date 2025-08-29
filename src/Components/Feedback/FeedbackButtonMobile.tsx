import React from 'react';

interface FeedbackButtonMobileProps {
  onClick: () => void;
}

export function FeedbackButtonMobile({ onClick }: FeedbackButtonMobileProps) {
  return (
    <button onClick={onClick} style={styles.button}>
      💬 Send Feedback
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #4b5563',
    background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    boxSizing: 'border-box'
  }
};
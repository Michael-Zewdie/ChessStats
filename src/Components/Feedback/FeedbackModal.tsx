import { useState, useEffect } from 'react';
import styles from './Feedback.module.css';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => Promise<void>;
}

export function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle success state timeout with cleanup
  useEffect(() => {
    if (submitSuccess) {
      const timeoutId = setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFeedback('');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [submitSuccess, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(feedback);
      setSubmitSuccess(true);
    } catch {
      setSubmitError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFeedback('');
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  };

  return (
    <div className={styles.feedbackModalOverlay} onClick={handleClose}>
      <div className={styles.modalContainer}>
        <div className={styles.modalDarkBorderBg} />
        <div className={styles.modalBorder} />
        <div className={styles.modalBackground} />
        <div className={styles.modalGlow} />
        <div className={styles.feedbackModalContent} onClick={e => e.stopPropagation()}>
        {submitSuccess ? (
          <div className={styles.feedbackSuccess}>
            <div className={styles.feedbackSuccessIcon}>✓</div>
            <h3>Thank you!</h3>
            <p>Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <div className={styles.feedbackModalHeader}>
              <h3>Feedback</h3>
              <button
                type="button"
                className={styles.feedbackModalClose}
                onClick={handleClose}
                disabled={isSubmitting}
                aria-label="Close feedback modal"
              >
                ×
              </button>
            </div>
            
            <div className={styles.feedbackModalBody}>
              <p>Thanks for using ChessStats! I will try to respond to your feedback but please send feedback while viewing your account so I know who to respond to. Also shout out to the GOAT <a href="https://www.chess.com/member/the_lorax_lover" target="_blank" rel="noopener noreferrer">The_lorax_lover</a></p>
              
              <form onSubmit={handleSubmit}>
                <textarea
                  className={styles.feedbackTextarea}
                  placeholder="Share your thoughts, suggestions, or report any issues..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  disabled={isSubmitting}
                  required
                />
                
                {submitError && (
                  <div className={styles.feedbackError}>{submitError}</div>
                )}
                
                <div className={styles.feedbackModalActions}>
                  <button
                    type="submit"
                    className={`${styles.feedbackButton} ${styles.feedbackButtonPrimary} ${styles.feedbackButtonFullWidth}`}
                    disabled={isSubmitting || !feedback.trim()}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
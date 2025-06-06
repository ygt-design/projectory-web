import React from 'react';
import ReactDOM from 'react-dom';
import styles from './MultiStepForm.module.css';

interface ConfirmationModalProps {
  message: string;
  email: string;
  onEmailChange: (newEmail: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  email,
  onEmailChange,
  onConfirm,
  onCancel,
  loading = false
}) => {
  const modalContent = (
    <div className={styles['msf-modal-backdrop']}>
      <div className={styles['msf-modal']}>
        <p className={styles['msf-modal-message']}>{message}</p>
        
        {/* Email input */}
        <div className={styles['msf-email-wrapper']}>
           <p className={styles.msfEmailP}>Get a printable card deck and everyone’s responses</p>

          <input
            type="email"
            placeholder="Enter your email here…"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={styles['msf-input-email']}
          />
        </div>

       

        {/* Spinner shown while loading */}
        {loading ? (
          <div className={styles['msf-spinner']} />
        ) : (
          <div className={styles['msf-modal-buttons']}>
            <button
              className={`${styles['msf-btn']} ${styles['msf-btn-secondary']}`}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={`${styles['msf-btn']} ${styles['msf-btn-primary']}`}
              onClick={onConfirm}
            >
              Yes, Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmationModal;
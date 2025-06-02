import React from 'react';
import ReactDOM from 'react-dom';
import styles from './MultiStepForm.module.css';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
  loading = false
}) => {
  const modalContent = (
    <div className={styles['msf-modal-backdrop']}>
      <div className={styles['msf-modal']}>
        <p className={styles['msf-modal-message']}>{message}</p>
        
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
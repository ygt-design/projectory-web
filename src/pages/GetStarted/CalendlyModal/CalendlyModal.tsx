import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FiX } from 'react-icons/fi';
import styles from './CalendlyModal.module.css';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose, url = 'https://calendly.com/oren-/projectory?month=2026-01' }) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !widgetRef.current) return;

    const SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';

    const initWidget = () => {
      if (window.Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = '';
        try {
          window.Calendly.initInlineWidget({ url, parentElement: widgetRef.current });
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      } else {
        setTimeout(initWidget, 100);
      }
    };

    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (window.Calendly) {
        initWidget();
      } else {
        existing.addEventListener('load', initWidget);
        return () => existing.removeEventListener('load', initWidget);
      }
    } else {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }
  }, [isOpen, url]);

  useEffect(() => {
    // Handle ESC key to close modal
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <FiX />
        </button>
        <div 
          ref={widgetRef}
          className={styles.calendlyWidget}
        />
      </div>
    </div>,
    document.body
  );
};

export default CalendlyModal;

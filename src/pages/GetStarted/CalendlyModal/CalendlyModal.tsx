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
    // Load Calendly script
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (isOpen && widgetRef.current) {
      // Wait for Calendly to be available, then initialize
      const initWidget = () => {
        if (window.Calendly && widgetRef.current) {
          // Clear any existing content
          widgetRef.current.innerHTML = '';
          try {
            window.Calendly.initInlineWidget({
              url: url,
              parentElement: widgetRef.current
            });
          } catch (error) {
            console.error('Error initializing Calendly widget:', error);
          }
        } else {
          // Retry after a short delay if Calendly isn't loaded yet
          setTimeout(initWidget, 100);
        }
      };

      // Check if script is already loaded
      const script = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (script) {
        if (window.Calendly) {
          initWidget();
        } else {
          script.addEventListener('load', initWidget);
          const timeoutId = setTimeout(initWidget, 2000);
          return () => {
            script.removeEventListener('load', initWidget);
            clearTimeout(timeoutId);
          };
        }
      } else {
        const timeoutId = setTimeout(initWidget, 1000);
        return () => {
          clearTimeout(timeoutId);
        };
      }
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

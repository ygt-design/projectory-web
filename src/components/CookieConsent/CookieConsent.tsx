import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';
import cookieNoticePdf from '../../assets/documents/cookie-notice.pdf';

const STORAGE_KEY = 'cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceShow = params.get('show-cookie-banner') === '1';

    if (!forceShow) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'accepted' || stored === 'rejected') return;
    }

    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <p className={styles.text}>
          We use cookies to improve your experience.{' '}
          <a
            href={cookieNoticePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readMore}
          >
            Read more
          </a>
        </p>

        <div className={styles.actions}>
          <button className={styles.rejectBtn} onClick={handleReject}>
            Reject
          </button>
          <button className={styles.acceptBtn} onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

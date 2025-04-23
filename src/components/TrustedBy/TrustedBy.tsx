import React from 'react';
import styles from './TrustedBy.module.css';

interface TrustedByProps {
  logos: string[];
}

const TrustedBy: React.FC<TrustedByProps> = ({ logos }) => {
  return (
    <section className={styles.trustedBySection}>
      <h2 className={styles.heading}>Trusted by the leading Event brands</h2>
      <div className={styles.logosGrid}>
        {logos.map((logoSrc, i) => (
          <div key={i} className={styles.logoWrapper}>
            <img src={logoSrc} alt={`Client logo ${i + 1}`} className={styles.logo} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;
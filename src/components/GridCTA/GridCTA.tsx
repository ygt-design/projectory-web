// 📂 src/components/GridCTA/GridCTA.tsx

import styles from './GridCTA.module.css';

const GridCTA = () => {
  return (
    <div className={styles.gridCTA}>
      <h2>Looking to meet a specific objective?</h2>
      <p>
        We’ll work with you to create a custom product that aligns with your event’s needs. Get in touch to learn more.
      </p>
      <a href="/contact" className={styles.ctaButton}>
        Contact Us
      </a>
    </div>
  );
};

export default GridCTA;
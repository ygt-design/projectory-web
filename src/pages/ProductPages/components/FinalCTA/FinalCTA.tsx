import styles from './FinalCTA.module.css';
import { Link } from 'react-router-dom';

interface FinalCTAProps {
  experienceText: string;
  experienceLink: string;
}

const FinalCTA = ({ experienceText, experienceLink }: FinalCTAProps) => {
  return (
    <section className={styles.ctaWrapper}>
      {/* Left Block - Dynamic Content */}
      <div className={styles.ctaBoxDark}>
        <h3>Back to {experienceText}</h3>
        <p>See more experiences that enhance your existing event objectives</p>
        <Link to={experienceLink} className={styles.backLink}>←</Link>
      </div>

      {/* Right Block - Static Content */}
      <div className={styles.ctaBoxLight}>
        <h3>Break free from boring.</h3>
        <p>Discover how Projectory experiences can elevate your events and get more out of your time together.</p>
        <Link to="/get-started" className={styles.ctaButton}>Get Started</Link>
      </div>
    </section>
  );
};

export default FinalCTA;
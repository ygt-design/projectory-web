import { Link } from 'react-router-dom';
import { ctaBanner } from '../../whoWeAreData';
import styles from './CtaBanner.module.css';

const tealBadge =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786649241/projectory-p-teal_twddmb.png';

const CtaBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>{ctaBanner.title}</h2>
        <p className={styles.body}>{ctaBanner.body}</p>
        <div className={styles.actions}>
          <Link to={ctaBanner.primary.to} className={styles.buttonPrimary}>
            {ctaBanner.primary.label}
          </Link>
          <Link to={ctaBanner.secondary.to} className={styles.buttonSecondary}>
            {ctaBanner.secondary.label}
          </Link>
        </div>
      </div>
      <img src={tealBadge} alt="" className={styles.badgeTeal} aria-hidden />
    </section>
  );
};

export default CtaBanner;

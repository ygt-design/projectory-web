import { Link } from 'react-router-dom';
import { catalogueCta } from '../../pricingData';
import styles from './CatalogueCTA.module.css';

const amberBadge =
  'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v1786649240/projectory-p-amber_q8opqw.png';

const CatalogueCTA = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>{catalogueCta.title}</h2>
        <p className={styles.body}>{catalogueCta.body}</p>
        <Link to={catalogueCta.button.to} className={styles.button}>
          {catalogueCta.button.label}
        </Link>
      </div>
      <img src={amberBadge} alt="" className={styles.badgeAmber} aria-hidden />
    </section>
  );
};

export default CatalogueCTA;

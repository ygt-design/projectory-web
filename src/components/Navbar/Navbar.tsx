import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContent}`}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Projectory Logo" className={styles.logoImage} />
        </Link>

        <ul className={styles.navLinks}>
          <li><Link to="/who-we-are">Who We Are</Link></li>
          <li><Link to="/experiences">Experiences</Link></li>
          <li><Link to="/case-studies">Case Studies</Link></li>
          <li><Link to="/contact-us" className={styles.contactUsButton}>Contact Us</Link></li>
          <li>
            <Link to="/build-your-program" className={styles.ctaButton}>
              Build Your Program
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
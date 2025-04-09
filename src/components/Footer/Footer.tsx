import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <h4>Overview</h4>
            <Link to="/who-we-are">Who We Are</Link>
          </div>
          <div className={styles.footerColumn}>
            <h4>What We Do</h4>
            <Link to="/experiences">Experiences</Link>
            <Link to="/case-studies">Case Studies</Link>
          </div>
          <div className={styles.footerColumn}>
            <h4>Get Started</h4>
            <Link to="/build-your-program">Build Your Program</Link>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.socialIcons}>
            <a href="https://ca.linkedin.com/company/theprojectory" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={styles.icon} />
            </a>
            <a href="https://www.youtube.com/@projectorylive/playlists?app=desktop" target="_blank" rel="noopener noreferrer">
              <FaYoutube className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/projectory.live/" target="_blank" rel="noopener noreferrer">
              <FiInstagram className={styles.icon} />
            </a>
          </div>
          <p className={styles.email}>info@projectory.live</p>
          <p className={styles.copyright}>© Projectory 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;